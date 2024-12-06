import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import * as userClient from "../../../Account/client";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { TiPencil } from "react-icons/ti";
import { editQuizzes } from "../reducer";

export default function QuizTaking() {
    const { cid, qid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const [quiz, setQuiz] = useState<any>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<any>([]);
    const [submitted, setSubmitted] = useState(false);
    const [mode, setMode] = useState<"one-by-one" | "all-at-once">("one-by-one");
    const [startTime, setStartTime] = useState(Date.now());
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const navigateToQuizEditor = async () => {
        dispatch(editQuizzes(quiz._id));
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Editor`);
    };

    const fetchQuizDetails = async () => {
        const fetchedQuiz = quizzes.find((quiz: any) => quiz._id === qid && quiz.course._id === cid);
        if (fetchedQuiz) {
            setQuiz(fetchedQuiz);

            // Initialize answers array based on quiz questions
            const initialAnswers = fetchedQuiz.questions.map((question: any) => {
                switch (question.questionType) {
                    case "MultipleChoice":
                        return { answer: [], visited: false, answered: false, correct: false };
                    case "FillInTheBlank":
                        return { answer: "", visited: false, answered: false, correct: false };
                    case "TrueFalse":
                        return { answer: null, visited: false, answered: false, correct: false };
                    default:
                        return { answer: null, visited: false, answered: false, correct: false };
                }
            });
            setAnswers(initialAnswers);
            setMode(fetchedQuiz.oneQuestionAtATime ? "one-by-one" : "all-at-once");
        }
    };

    const handleAnswerChange = (questionIndex: number, answer: any) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = { ...newAnswers[questionIndex], answer, visited: true, answered: answer !== "" && answer !== null };
        setAnswers(newAnswers);
    };

    const handleOptionChange = (questionIndex: number, optionIndex: number, isChecked: boolean) => {
        const newAnswers = [...answers];

        if (isChecked) {
            newAnswers[questionIndex].answer.push(optionIndex);
        }
        else {
            newAnswers[questionIndex].answer = newAnswers[questionIndex].answer.filter((index: number) => index !== optionIndex);
        }

        newAnswers[questionIndex] = { ...newAnswers[questionIndex], visited: true, answered: newAnswers[questionIndex].answer.length > 0 };
        setAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = async () => {
        if (!cid || !qid) return;

        const calculatedScore = calculateScore();
        const elapsedTime = Date.now() - startTime;
        const timeTaken = (elapsedTime / 1000 / 60).toFixed(2).toString();

        const finalResult = { answers: answers, finalScore: calculatedScore, timeTaken: timeTaken, submissionDate: new Date().toISOString() };
        console.log("submittttinggg", finalResult);

        const result = await userClient.submitQuizForUser(cid, qid, finalResult);
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
    };

    const calculateScore = () => {
        let totalScore = 0;
        quiz.questions.forEach((question: any, index: number) => {
            const userAnswer = answers[index];
            switch (question.questionType) {
                case "MultipleChoice":
                    const correctOptions = question.options.filter((option: any) => option.isCorrect).map((option: any) => question.options.indexOf(option));
                    if (JSON.stringify(userAnswer.answer.sort()) === JSON.stringify(correctOptions.sort())) {
                        answers[index] = { ...answers[index], correct: true };
                        totalScore += question.points;
                    }
                    break;
                case "FillInTheBlank":
                    if (question.correctAnswers.includes(userAnswer.answer)) {
                        answers[index] = { ...answers[index], correct: true };
                        totalScore += question.points;
                    }
                    break;
                case "TrueFalse":
                    if (userAnswer.answer === question.isTrue) {
                        answers[index] = { ...answers[index], correct: true };
                        totalScore += question.points;
                    }
                    break;
                default:
                    break;
            }

            answers[index] = { ...answers[index], questionIndex: index };
        });
        return totalScore;
    };

    useEffect(() => {
        fetchQuizDetails();
    }, [qid, cid, quizzes]);

    if (!quiz) {
        return <div>Loading quiz...</div>;
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div className="container">
            <h1>{quiz.title}</h1>

            {/* Preview banner */}
            {currentUser.role === "FACULTY" && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <AiOutlineExclamationCircle className="me-2 fs-5" />
                    This is a preview of the published version of the quiz
                </div>
            )}

            <p className="py-0 mb-0 mt-4">Started: {formatDate(new Date().toISOString())}</p>
            <h3 className="py-0 my-0">Quiz Instructions</h3>
            <hr />
            <div className="quiz-taking">
                {mode === "one-by-one" && (
                    <>
                        <div className="question-container mt-4 border">
                            {/* Question header */}
                            <div id="wd-question-header" className="bg-light border-bottom">
                                <div id="text-div" className="d-flex p-3">
                                    <h4 className="d-flex align-items-center p-0 m-0">Question {currentQuestionIndex + 1}</h4>
                                    <h5 className="ms-auto d-flex align-items-center p-0 m-0">{currentQuestion.points} pts</h5>
                                </div>
                            </div>

                            {/* Question description */}
                            <div id="wd-question-description" className="p-3">
                                <p dangerouslySetInnerHTML={{ __html: currentQuestion.questionText }} />
                            </div>

                            {/* Question answer choices */}
                            <div id="wd-question-answer-choices" className="ps-3 pe-3 pb-3">
                                {currentQuestion.questionType === "MultipleChoice" && (
                                    currentQuestion.options.map((option: any, index: number) => (
                                        <div key={index} className="d-flex align-items-center mb-3">
                                            <input
                                                type="checkbox"
                                                className="me-2"
                                                checked={answers[currentQuestionIndex].answer.includes(index)}
                                                onChange={(e) => handleOptionChange(currentQuestionIndex, index, e.target.checked)}
                                            />
                                            <span>{option.text}</span>
                                        </div>
                                    ))
                                )}
                                {currentQuestion.questionType === "FillInTheBlank" && (
                                    <input
                                        type="text"
                                        className="form-control me-2 w-50"
                                        value={answers[currentQuestionIndex].answer}
                                        onChange={(e) => handleAnswerChange(currentQuestionIndex, e.target.value)}
                                    />
                                )}
                                {currentQuestion.questionType === "TrueFalse" && (
                                    <>
                                        <div className="d-flex align-items-center mb-3">
                                            <input
                                                type="radio"
                                                name={`trueFalseOption${currentQuestionIndex}`}
                                                className="me-2"
                                                checked={answers[currentQuestionIndex].answer === true}
                                                onChange={() => handleAnswerChange(currentQuestionIndex, true)}
                                            />
                                            <span className="me-3">True</span>
                                        </div>
                                        <div className="d-flex align-items-center mb-3">
                                            <input
                                                type="radio"
                                                name={`trueFalseOption${currentQuestionIndex}`}
                                                className="me-2"
                                                checked={answers[currentQuestionIndex].answer === false}
                                                onChange={() => handleAnswerChange(currentQuestionIndex, false)}
                                            />
                                            <span className="me-3">False</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Navigation and Submit buttons */}
                        <div className="d-flex justify-content-between mt-4 mb-4">
                            <div>
                                {currentQuestionIndex > 0 && (
                                    <button className="btn btn-sm btn-secondary" onClick={handlePreviousQuestion}>
                                        &lt; Previous
                                    </button>
                                )}
                            </div>
                            <div>
                                {currentQuestionIndex < quiz.questions.length - 1 && !submitted && (
                                    <button className="btn btn-sm btn-secondary" onClick={handleNextQuestion}>
                                        Next &gt;
                                    </button>
                                )}
                                {currentQuestionIndex === quiz.questions.length - 1 && !submitted && (
                                    <button className="btn btn-sm btn-secondary" onClick={handleSubmit}>
                                        Submit Quiz
                                    </button>
                                )}
                            </div>
                        </div>
                    </>)}

                {/* All at once mode */}
                {mode === "all-at-once" && (
                    <>
                        <div className="all-at-once-container mb-5">
                            {quiz.questions.map((question: any, questionIndex: number) => (
                                <div className="question-container mt-4 border">
                                    {/* Question header */}
                                    <div id="wd-question-header" className="bg-light border-bottom">
                                        <div id="text-div" className="d-flex p-3">
                                            <h4 className="d-flex align-items-center p-0 m-0">Question {questionIndex + 1}</h4>
                                            <h5 className="ms-auto d-flex align-items-center p-0 m-0">{question.points} pts</h5>
                                        </div>
                                    </div>

                                    {/* Question description */}
                                    <div id="wd-question-description" className="p-3">
                                        <p dangerouslySetInnerHTML={{ __html: question.questionText }} />
                                    </div>

                                    {/* Question answer choices */}
                                    <div id="wd-question-answer-choices" className="ps-3 pe-3 pb-3">
                                        {question.questionType === "MultipleChoice" && (
                                            question.options.map((option: any, index: number) => (
                                                <div key={index} className="d-flex align-items-center mb-3">
                                                    <input
                                                        type="checkbox"
                                                        className="me-2"
                                                        checked={answers[questionIndex].answer.includes(index)}
                                                        onChange={(e) => handleOptionChange(questionIndex, index, e.target.checked)}
                                                    />
                                                    <span>{option.text}</span>
                                                </div>
                                            ))
                                        )}
                                        {question.questionType === "FillInTheBlank" && (
                                            <input
                                                type="text"
                                                className="form-control me-2 w-50"
                                                value={answers[questionIndex].answer}
                                                onChange={(e) => handleAnswerChange(questionIndex, e.target.value)}
                                            />
                                        )}
                                        {question.questionType === "TrueFalse" && (
                                            <>
                                                <div className="d-flex align-items-center mb-3">
                                                    <input
                                                        type="radio"
                                                        name={`trueFalseOption${questionIndex}`}
                                                        className="me-2"
                                                        checked={answers[questionIndex].answer === true}
                                                        onChange={() => handleAnswerChange(questionIndex, true)}
                                                    />
                                                    <span className="me-3">True</span>
                                                </div>
                                                <div className="d-flex align-items-center mb-3">
                                                    <input
                                                        type="radio"
                                                        name={`trueFalseOption${questionIndex}`}
                                                        className="me-2"
                                                        checked={answers[questionIndex].answer === false}
                                                        onChange={() => handleAnswerChange(questionIndex, false)}
                                                    />
                                                    <span className="me-3">False</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </>
                )}
                <div className="d-flex justify-content-end align-items-center border p-2 mt-3">
                    <button className="btn btn-sm btn-secondary" onClick={handleSubmit}> Submit Quiz </button>
                </div>


                {currentUser.role === "FACULTY" && (
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <button
                        className="btn btn-secondary me-3 w-100"
                        onClick={navigateToQuizEditor}
                    >
                        <TiPencil className="me-2 fs-5" />
                        Keep Editing This Quiz
                    </button>
                </div>
            )}

                {/* Question navigation at the bottom */}
                <div className="question-navigation mt-4">
                    <h4>Questions</h4>
                    <ul className="list-unstyled">
                        {quiz.questions.map((_question: any, index: number) => {
                            return (
                                <li key={index} className="question-nav-item d-flex align-items-center">
                                    {mode === "one-by-one" && (
                                        <span
                                            className={`d-flex align-items-center  ${index === currentQuestionIndex ? 'text-danger' : ''}`}
                                            onClick={() => setCurrentQuestionIndex(index)}
                                        >
                                            {answers[index].answered
                                                ? <IoIosCheckmarkCircleOutline className="me-2" />
                                                : <HiOutlineQuestionMarkCircle className="me-2" />
                                            }
                                            Question {index + 1}
                                        </span>
                                    )}
                                    {mode === "all-at-once" && (
                                        <span className="d-flex align-items-center">
                                            {answers[index].answered
                                                ? <IoIosCheckmarkCircleOutline className="me-2" />
                                                : <HiOutlineQuestionMarkCircle className="me-2" />
                                            }
                                            Question {index + 1}
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function formatDate(isoDate: string): string {
    if (!isoDate || isNaN(Date.parse(isoDate))) return "N/A";

    const date = new Date(isoDate);

    const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    };

    return date.toLocaleString("en-US", options).replace(",", " at");
}

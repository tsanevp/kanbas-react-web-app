import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { TiPencil } from "react-icons/ti";
import { editQuizzes } from "./reducer";
import { Link } from "react-router-dom";
import * as userClient from "../../Account/client";
import { FcCheckmark } from "react-icons/fc";
import { HiXMark } from "react-icons/hi2";

export default function QuizDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cid, qid } = useParams(); // Extract course and quiz IDs
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const [quiz, setQuiz] = useState<any>(null);
    const [quizResults, setQuizResults] = useState<any>([]);
    const [currentQuizResult, setCurrentQuizResult] = useState<any>(null);
    const [maxScoreQuizResult, setMaxScoreQuizResult] = useState<any>(null);
    const [isVisibleForFaculty, setIsVisibleForFaculty] = useState<any>(false);


    const fetchQuizDetails = async () => {
        const fetchedQuiz = quizzes.find((quiz: any) => quiz._id === qid && quiz.course._id === cid);
        if (fetchedQuiz) setQuiz(fetchedQuiz);
    };

    const fetchPreviousQuizAttempts = async () => {
        if (!cid || !qid) return;

        const fetchedQuizAttempts = await userClient.findQuizResultsForUser(cid, qid);
        console.log(fetchedQuizAttempts)
        if (fetchedQuizAttempts) setQuizResults(fetchedQuizAttempts);
        setMaxScoreQuizResult(getMaxScoreQuizResult(fetchedQuizAttempts));
    };

    const navigateToQuizEditor = async () => {
        dispatch(editQuizzes(quiz._id));
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Editor`);
    };

    useEffect(() => {
        if (qid === "AddNewQuiz") {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Editor`);
            return;
        }

        fetchQuizDetails();
        fetchPreviousQuizAttempts();
    }, [cid, qid]);

    const getMaxScoreQuizResult = (results: any[]) => {
        if (results.length === 0) return null;
        let maxScoreResult = results[0];
        results.forEach(result => {
            if (result.finalScore > maxScoreResult.finalScore ||
                (result.finalScore === maxScoreResult.finalScore &&
                    new Date(result.submissionDate) < new Date(maxScoreResult.submissionDate))
            ) {
                maxScoreResult = result;
            }
        });
        setCurrentQuizResult(maxScoreResult);
        return maxScoreResult;
    };

    if (!quiz) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            {currentUser.role === "FACULTY" && (
                <>
                    <div className="d-flex justify-content-center align-items-center">
                        <button
                            className="btn btn-secondary me-3"
                            onClick={() => {
                                dispatch(editQuizzes(quiz._id))
                                window.location.href = `#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/Preview`
                            }}>
                            Preview
                        </button>
                        <button
                            className="btn btn-secondary me-3"
                            onClick={navigateToQuizEditor}>
                            <TiPencil className="me-2 fs-5" />
                            Edit
                        </button>
                    </div>
                    <hr />
                    <h1>{quiz.title}</h1>

                    <div className="container">
                        {/* Quiz Type */}
                        <div className="d-flex mt-4">
                            <label htmlFor="wd-quiz-type" className="col-5 col-label text-end"> <b>Quiz Type:</b></label>
                            <div className="col-7 ms-2">
                                {quiz.quizType.replace(/([a-z])([A-Z])/g, '$1 $2') || "Graded Quiz"}
                            </div>
                        </div>

                        {/* Total Questions */}
                        <div className="d-flex mt-2">
                            <label htmlFor="wd-quiz-points" className="col-5 col-label text-end"><b>Number of Questions:</b></label>
                            <div className="col-7 ms-2">
                                {quiz.questions.length}
                            </div>
                        </div>

                        {/* Points */}
                        <div className="d-flex mt-2">
                            <label htmlFor="wd-quiz-points" className="col-5 col-label text-end"><b>Points:</b></label>
                            <div className="col-7 ms-2">
                                {getQuizPoints(quiz)}
                            </div>
                        </div>

                        {/* Assignment Group */}
                        <div className="d-flex mt-2">
                            <label htmlFor="wd-quiz-assignment-group" className="col-5 col-label text-end"><b>Assignment Group:</b></label>
                            <div className="col-7  ms-2">
                                {quiz.assignmentGroup || "Quizzes"}
                            </div>
                        </div>

                        {/* Shuffle Answers */}
                        <div className="d-flex mt-2">
                            <label htmlFor="wd-quiz-shuffle-answers" className="col-5 col-label text-end"><b>Shuffle Answers:</b></label>
                            <div className="col-7  ms-2">
                                {quiz.shuffleAnswers ? "Yes" : "No"}
                            </div>
                        </div>

                        {/* Time Limit */}
                        <div className="d-flex mt-2">
                            <label htmlFor="wd-quiz-time-limit" className="col-5 col-label text-end"><b>Time Limit:</b></label>
                            <div className="col-7  ms-2">
                                {quiz.timeLimit.selected ? `${quiz.timeLimit.value} Minutes` : "No limit"}
                            </div>
                        </div>

                        {/* Multiple Attempts */}
                        <div className="d-flex mt-2">
                            <label htmlFor="wd-quiz-multiple-attempts" className="col-5 col-label text-end"><b>Multiple Attempts:</b></label>
                            <div className="col-7  ms-2">
                                {quiz.multipleAttempts.selected ? "Yes" : "No"}
                            </div>
                        </div>

                        {/* How Many Attempts */}
                        {quiz.multipleAttempts.selected && (
                            <div className="d-flex mt-2">
                                <label htmlFor="wd-quiz-attempt-count" className="col-5 col-label text-end"><b>How Many Attempts:</b></label>
                                <div className="col-7  ms-2">
                                    {quiz.multipleAttempts.value}
                                </div>
                            </div>
                        )}

                        {/* Show Correct Answers */}
                        <div className="d-flex mt-2">
                            <label htmlFor="wd-quiz-show-correct-answers" className="col-5 col-label text-end"><b>Show Correct Answers:</b></label>
                            <div className="col-7  ms-2">
                                {quiz.showCorrectAnswers ? "Yes" : "No"}
                            </div>
                        </div>
                        {/* One Question at a Time */}
                        <div className="d-flex mt-2">
                            <label htmlFor="wd-quiz-one-question-at-a-tinme" className="col-5 col-label text-end"><b>One Question at a Time:</b></label>
                            <div className="col-7  ms-2">
                                {quiz.oneQuestionAtATime ? "Yes" : "No"}
                            </div>
                        </div>

                        {/* Webcam Required */}
                        <div className="d-flex mt-2">
                            <label htmlFor="wd-quiz-web-required" className="col-5 col-label text-end"><b>Webcam Required:</b></label>
                            <div className="col-7  ms-2">
                                {quiz.webcamRequired ? "Yes" : "No"}
                            </div>
                        </div>

                        {/* Lock Questions After Answering */}
                        <div className="d-flex mt-2">
                            <label htmlFor="wd-quiz-lock-questions" className="col-5 col-label text-end"><b>Lock Questions After Answering:</b></label>
                            <div className="col-7  ms-2">
                                {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
                            </div>
                        </div>

                        {/* Due Date, Available From, and Available Until in Columns */}
                        <div className="container mt-4">
                            {/* Labels */}
                            <div className="row mt-5">
                                <div className="col py-0 my-0">
                                    <b>Due Date</b>
                                </div>
                                <div className="col py-0 my-0">
                                    <b>For</b>
                                </div>
                                <div className="col py-0 my-0">
                                    <b>Available From</b>
                                </div>
                                <div className="col py-0 my-0">
                                    <b>Available Until</b>
                                </div>
                            </div>

                            <hr />

                            {/* Values */}
                            <div className="row">
                                <div className="col py-0 my-0">
                                    {formatDate(quiz.dueDate)}
                                </div>
                                <div className="col py-0 my-0">
                                    {quiz.assignTo}
                                </div>
                                <div className="col py-0 my-0">
                                    {formatDate(quiz.availableFrom)}
                                </div>
                                <div className="col py-0 my-0">
                                    {formatDate(quiz.availableUntil)}
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                </>
            )}

            {currentUser.role !== "FACULTY" && (
                <>
                    <h1>{quiz.title}</h1>
                    <hr />
                    <div className="quiz-details d-flex flex-wrap ">
                        <p className="mb-1 me-3"><strong>Due:</strong> {formatDate(quiz.dueDate)}</p>
                        <p className="mb-1 me-3"><strong>Points:</strong> {getQuizPoints(quiz)}</p>
                        <p className="mb-1 me-3"><strong>Questions:</strong> {quiz.questions.length}</p>
                        <p className="mb-1 me-3"><strong>Available:</strong> {formatDate(quiz.availableFrom)} - {formatDate(quiz.availableUntil)}</p>
                        <p className="mb-1 me-3"><strong>Allowed Attempts:</strong> {quiz.multipleAttempts.selected ? quiz.multipleAttempts.value : "Unlimited"}</p>
                        <p className="mb-1 me-3"><strong>Time Limit:</strong> {quiz.timeLimit.selected ? `${quiz.timeLimit.value} Minutes` : "None"}</p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center m-3">
                        {new Date(quiz.availableUntil).getTime() > new Date().getTime() &&
                            (
                                // Condition for "Take Quiz"
                                (quizResults && quizResults.length === 0 && (
                                    <Link
                                        id="wd-start-quiz"
                                        className="btn btn-danger"
                                        to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/InProgress`}
                                    >
                                        Take Quiz
                                    </Link>
                                )) ||
                                // Condition for "Retake Quiz"
                                (quizResults &&
                                    quizResults.length > 0 &&
                                    quiz.multipleAttempts.selected &&
                                    quizResults.length < quiz.multipleAttempts.value && (
                                        <Link
                                            id="wd-start-quiz"
                                            className="btn btn-danger"
                                            to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/InProgress`}
                                        >
                                            Retake Quiz
                                        </Link>
                                    )
                                )
                            )
                        }
                    </div>

                    <hr />

                    {maxScoreQuizResult && (
                        <>
                            <h3 className="mt-4 mb-3">Current Grade:</h3>
                            <div>
                                <p>Score for this quiz: <b>{maxScoreQuizResult.finalScore}</b> out of {getQuizPoints(quiz)}</p>
                                <p>Submitted {formatDate(maxScoreQuizResult.submissionDate)}</p>
                            </div>
                        </>
                    )}
                </>
            )}


            {/* Due Date, Available From, and Available Until in Columns */}
            {currentUser.role === "FACULTY" && <h3 className="mt-5 mb-3">Preview Attempt History</h3>}
            {currentUser.role !== "FACULTY" && <h3 className="mt-4 mb-3">Attempt History</h3>}
            <div className="container">
                {/* Labels */}
                <div className="row">
                    <div className="col py-0 my-0">
                    </div>
                    <div className="col py-0 my-0">
                        <b>Attempt</b>
                    </div>
                    <div className="col py-0 my-0">
                        <b>Time</b>
                    </div>
                    <div className="col py-0 my-0">
                        <b>Score</b>
                    </div>
                </div>

                <hr />
                {quizResults && quizResults.map((result: any, index: number) => (
                    <>
                        {/* Values */}
                        <div className="row">
                            <div className="col py-0 my-0">
                                {index === 0 && <b>LATEST</b>}
                                {index !== 0 && formatDate(result.submissionDate)}
                            </div>
                            <div
                                className="col py-0 my-0 text-danger"
                                onClick={() => {
                                    { currentUser.role === "FACULTY" && setIsVisibleForFaculty(true) }
                                    { (currentUser.role !== "FACULTY" || isVisibleForFaculty) && setCurrentQuizResult(quizResults[index]) }
                                }}
                            >
                                Attempt {quizResults.length - index}
                            </div>

                            <div className="col py-0 my-0">
                                {Number.parseFloat(result.timeTaken) > 1.0 ? `${result.timeLimit} minutes` : `${(Number.parseFloat(result.timeTaken) * 60).toFixed(0)} seconds`}
                            </div>

                            <div className="col py-0 my-0">
                                {result.finalScore} out of {getQuizPoints(quiz)}
                            </div>
                        </div>
                        <hr />
                    </>
                ))}
            </div >

            {(currentUser.role !== "FACULTY" || isVisibleForFaculty) && (
                <>
                    {currentUser.role === "FACULTY" &&
                        <div className="d-flex align-items-end">
                            <button
                                className="btn btn-danger mt-3 ms-auto"
                                onClick={() => setIsVisibleForFaculty(false)}>
                                <HiXMark className="me-2 fs-5" />
                                Close Preview Results
                            </button>
                        </div>
                    }
                    {currentQuizResult && quiz.questions.map((currentQuestion: any, currentQuestionIndex: number) => {
                        const userAnswer = currentQuizResult.answers[currentQuestionIndex];
                        const isCorrect = userAnswer.correct;

                        return (
                            <div className="quiz-taking">
                                <div className="question-container mt-4 border">
                                    {/* Question header */}
                                    <div id="wd-question-header" className="bg-light border-bottom">
                                        <div id="text-div" className="d-flex p-3">
                                            <h4 className="d-flex align-items-center p-0 m-0">
                                                <span className="me-2">Question {currentQuestionIndex + 1}</span>
                                                {!userAnswer.correct && (
                                                    <span className="fs-6 text-danger align-text-top">
                                                        (<HiXMark /> Incorrect)
                                                    </span>
                                                )}
                                            </h4>
                                            <h5 className="ms-auto d-flex align-items-center p-0 m-0">
                                                {isCorrect ? currentQuestion.points : 0} / {currentQuestion.points} pts
                                            </h5>
                                        </div>
                                    </div>

                                    {/* Question description */}
                                    <div id="wd-question-description" className="p-3">
                                        <p dangerouslySetInnerHTML={{ __html: currentQuestion.questionText }} />
                                    </div>

                                    {/* Question answer choices */}
                                    <div id="wd-question-answer-choices" className="ps-3 pe-3 pb-3">
                                        {currentQuestion.questionType === "MultipleChoice" && (
                                            <>
                                                {currentQuestion.options.map((option: any, index: number) => {
                                                    const userSelected = userAnswer.answer.includes(index);
                                                    const isOptionCorrect = currentQuestion.options[index].isCorrect;

                                                    return (
                                                        <div key={index} className="d-flex align-items-center">
                                                            <div className="me-2">
                                                                {userSelected && isOptionCorrect
                                                                    ? <FcCheckmark />
                                                                    : userSelected
                                                                        ? <HiXMark className="text-danger" />
                                                                        : <div className="me-3"></div>
                                                                }
                                                            </div>
                                                            <input
                                                                type="checkbox"
                                                                className="me-2"
                                                                checked={userSelected}
                                                                disabled
                                                            />
                                                            <span>{option.text}</span>
                                                        </div>
                                                    );
                                                })}

                                                {/* Display Correct Answer */}
                                                {currentQuestion.options
                                                    .filter((opt: any) => opt.isCorrect)
                                                    .map((correctAnswer: any, index: number) => (
                                                        <div className="text-muted d-flex align-items-center mt-3">
                                                            <div>
                                                                <FcCheckmark className="me-2" />
                                                            </div>
                                                            <span><strong>Answer {index + 1}:</strong>  {correctAnswer.text}</span>
                                                        </div>
                                                    ))
                                                }
                                            </>
                                        )}

                                        {currentQuestion.questionType === "FillInTheBlank" && (
                                            <>
                                                <div className="d-flex align-items-center">
                                                    <div className="me-2">
                                                        {isCorrect
                                                            ? <FcCheckmark className="fs-4" />
                                                            : <HiXMark className="text-danger fs-4" />
                                                        }
                                                    </div>
                                                    <input
                                                        disabled
                                                        type="text"
                                                        className="form-control me-2 w-50"
                                                        value={userAnswer.answer}
                                                    />
                                                </div>

                                                {/* Display Correct Answer */}
                                                {currentQuestion.correctAnswers.map((correctAnswer: string, index: number) => (
                                                    <div className="text-muted d-flex align-items-center mt-3">
                                                        <div>
                                                            <FcCheckmark className="me-2" />
                                                        </div>
                                                        <span><strong>Answer {index + 1}:</strong>  {correctAnswer}</span>
                                                    </div>
                                                ))}
                                            </>
                                        )}

                                        {currentQuestion.questionType === "TrueFalse" && (
                                            <>
                                                <div className="mb-3">

                                                    <div className="d-flex align-items-center">
                                                        <div className="me-2">
                                                            {userAnswer.answer === true && currentQuestion.isTrue === true
                                                                ? <FcCheckmark className="" />
                                                                : userAnswer.answer === true && currentQuestion.isTrue !== true
                                                                    ? <HiXMark className="text-danger fs-4" />
                                                                    : <div className="me-4"></div>
                                                            }
                                                        </div>
                                                        <input
                                                            type="radio"
                                                            name={`trueFalseOption${currentQuestionIndex}`}
                                                            className="me-2"
                                                            checked={userAnswer.answer === true}
                                                            disabled
                                                        />
                                                        <span className="me-3">True</span>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="me-2">
                                                            {userAnswer.answer === false && currentQuestion.isTrue === false
                                                                ? <FcCheckmark className="" />
                                                                : userAnswer.answer === false && currentQuestion.isTrue !== false
                                                                    ? <HiXMark className="text-danger fs-4" />
                                                                    : <div className="me-4"></div>
                                                            }
                                                        </div>
                                                        <input
                                                            type="radio"
                                                            name={`trueFalseOption${currentQuestionIndex}`}
                                                            className="me-2"
                                                            checked={userAnswer.answer === false}
                                                            disabled
                                                        />
                                                        <span className="me-3">False</span>
                                                    </div>
                                                </div>

                                                {/* Display Correct Answer */}
                                                <div className="text-muted d-flex align-items-center">
                                                    <div>
                                                        <FcCheckmark className="me-2" />
                                                    </div>
                                                    <span><strong>Answer:</strong> {currentQuestion.isTrue ? "True" : "False"}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
}

function getQuizPoints(quiz: any) {
    return quiz.questions.reduce((sum: number, question: { points: any; }) => sum + (question.points || 0), 0);
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


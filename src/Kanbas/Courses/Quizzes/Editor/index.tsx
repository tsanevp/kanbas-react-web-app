import { useNavigate, useParams } from "react-router";
import QuizEditorControls from "./QuizEditorControls";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as quizClient from "../client";
import * as courseClient from "../../client";
import { addQuizzes, updateQuizzes } from "../reducer";
import QuizDetailsEditor from "./Details/QuizDetailsEditor";
import QuizQuestionsEditor from "./Questions/QuizQuestionsEditor";
import { Link } from "react-router-dom";

interface Question {
    title: string;
    questionText: string;
    questionType: "MultipleChoice" | "FillInTheBlank" | "TrueFalse";
    points: number;
    options: { text: string; isCorrect: boolean }[];
    correctAnswers: string[];
    isTrue: boolean;
    isEditing: boolean;
    editingIndex: number;
}

export default function QuizEditor() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cid, qid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const [quiz, setQuiz] = useState<{
        published: boolean;
        course: string | undefined;
        title: string;
        description: string;
        assignTo: string;
        quizType: string;
        questions: Question[];
        assignmentGroup: string;
        shuffleAnswers: boolean;
        timeLimit: { selected: boolean; value: number };
        multipleAttempts: { selected: boolean; value: number };
        showCorrectAnswers: boolean;
        accessCode: string;
        oneQuestionAtATime: boolean;
        webcamRequired: boolean;
        lockQuestionsAfterAnswering: boolean;
        dueDate: string;
        availableFrom: string;
        availableUntil: string;
        editing: boolean;
    }>({
        published: false,
        course: cid,
        title: "",
        description: "",
        assignTo: "Everyone",
        quizType: "GradedQuiz",
        questions: [],
        assignmentGroup: "Quizzes",
        shuffleAnswers: false,
        timeLimit: { selected: false, value: 0 },
        multipleAttempts: { selected: true, value: 30 },
        showCorrectAnswers: false,
        accessCode: "",
        oneQuestionAtATime: false,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: "",
        availableFrom: "",
        availableUntil: "",
        editing: false,
    });

    const [activeTab, setActiveTab] = useState("Details"); // Default tab

    const createAndPublishQuizForCourse = async () => {
        if (!cid) return;
        const newQuiz = await courseClient.createQuizzesForCourse(cid, { ...quiz, published: true });
        dispatch(addQuizzes(newQuiz));
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    };

    const saveAndPublishQuiz = async () => {
        if (!quiz.editing) {
            createAndPublishQuizForCourse();
        } else {
            await quizClient.updateQuiz({ ...quiz, editing: false, published: true });
            dispatch(updateQuizzes(quiz));
        }

        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    };

    const createQuizForCourse = async () => {
        if (!cid) return;
        const newQuiz = await courseClient.createQuizzesForCourse(cid, quiz);
        dispatch(addQuizzes(newQuiz));
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    };

    const updateQuizQuestions = (updatedQuestions: Question[]) => {
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    const saveQuiz = async () => {
        if (!quiz.editing) {
            createQuizForCourse();
        } else {
            await quizClient.updateQuiz({ ...quiz, editing: false });
            dispatch(updateQuizzes(quiz));
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
        }

    };

    useEffect(() => {
        if (qid !== "AddNewQuiz") {
            const existingQuiz = quizzes.find((quiz: any) => quiz._id === qid && quiz.course._id === cid);

            if (existingQuiz) setQuiz(existingQuiz);
        }
    }, [qid, quizzes, cid]);

    return (
        <div id="wd-quizzes-editor" className="container mt-4">
            <QuizEditorControls quiz={quiz} />

            <hr className="mt-4 mb-4" />

            {/* Tabs */}
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "Details" ? "active" : "text-danger"}`}
                        onClick={() => setActiveTab("Details")}
                    >
                        Details
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "Questions" ? "active" : "text-danger"}`}
                        onClick={() => setActiveTab("Questions")}
                    >
                        Questions
                    </button>
                </li>
            </ul>

            {/* Tab Content */}
            <div className="tab-content mt-4">
                {activeTab === "Details" && (
                    <div id="details-tab">
                        <QuizDetailsEditor quiz={quiz} setQuiz={setQuiz} />
                    </div>
                )}
                {activeTab === "Questions" && (
                    <div id="questions-tab">
                        <QuizQuestionsEditor quiz={quiz} updateQuizQuestions={updateQuizQuestions} />
                    </div>
                )}
            </div>

            <hr />

            {/* Save and Cancel Buttons */}
            <div className="text-end">
                <Link to={`/Kanbas/Courses/${cid}/Quizzes`} id="wd-cancel" className="btn btn-secondary me-2">
                    Cancel
                </Link>
                {activeTab === "Details" && (
                    <button id="wd-save" className="btn btn-success me-2" onClick={() => { saveAndPublishQuiz() }}
                    >
                        Save & Publish
                    </button>
                )}
                <button id="wd-save" className="btn btn-danger me-2" onClick={() => { saveQuiz() }}
                >
                    Save
                </button>
            </div>
        </div>
    );
}

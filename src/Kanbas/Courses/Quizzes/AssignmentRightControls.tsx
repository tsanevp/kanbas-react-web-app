import { IoEllipsisVertical } from "react-icons/io5";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as quizClient from "./client";
import { editQuizzes, updateQuizzes } from "./reducer";

export default function AssignmentRightControls({ quizId, deleteQuizzes }:
    Readonly<{
        quizId: any;
        deleteQuizzes: (quizId: any) => void;
    }>
) {
    const { cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const [quiz, setQuiz] = useState({
        published: false,
        course: cid,
        title: "",
        description: "",
        assignTo: "",
        quizType: "GradedQuiz",
        points: "",
        questionCount: "",
        assignmentGroup: "",
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
        editing: false
    });

    const updateStatus = async () => {
        const newQuiz = { ...quiz, published: !quiz.published };
        await quizClient.updateQuiz(newQuiz);
        dispatch(updateQuizzes(newQuiz));
    };

    const navigateToQuizEditor = async () => {
        dispatch(editQuizzes(quizId));
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Editor`);
    };

    useEffect(() => {
        const existingQuiz = quizzes.find((quiz: any) => quiz._id === quizId && quiz.course._id === cid);
        if (existingQuiz) setQuiz(existingQuiz);
    }, [quizId, quizzes, cid]);

    return (
        <div className="d-flex justify-contents-center align-items-center">
            {quiz.published ? <IoCheckmarkCircleSharp className="text-success me-2 mt-1" onClick={updateStatus} /> : <AiOutlineStop className="text-danger me-2 mt-1" onClick={updateStatus} />}
            <FaTrash className="text-danger me-2 mt-1" onClick={() => deleteQuizzes(quizId)} />
            <div className="dropdown ms-auto">
                <IoEllipsisVertical className="fs-4" data-bs-toggle="dropdown" />
                <ul className="dropdown-menu">
                    <li>
                        <a id="wd-context-menu-edit-btn" className="dropdown-item" onClick={() => navigateToQuizEditor()}>
                            Edit
                        </a>
                    </li>
                    <li>
                        <a id="wd-context-menu-delete-btn" className="dropdown-item" onClick={() => deleteQuizzes(quizId)}>
                            Delete
                        </a>
                    </li>
                    <li>
                        <a id="wd-context-menu-publish-btn" className="dropdown-item" onClick={updateStatus}>
                            {quiz.published ? "UnPublish" : "Publish"}
                        </a>
                    </li>
                    <li>
                        <a id="wd-context-menu-copy-btn" className="dropdown-item">
                            Copy
                        </a>
                    </li>
                    <li>
                        <a id="wd-context-menu-sort-btn" className="dropdown-item">
                            Sort
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

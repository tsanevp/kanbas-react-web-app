import { IoEllipsisVertical } from "react-icons/io5";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as quizClient from "./client";
import { updateQuizzes } from "./reducer";

export default function AssignmentRightControls({ quizId, deleteQuizzes }:
    Readonly<{
        quizId: any;
        deleteQuizzes: (quizId: any) => void;
    }>
) {
    const { cid } = useParams();
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

    useEffect(() => {
        const existingQuiz = quizzes.find((quiz: any) => quiz._id === quizId && quiz.course._id === cid);
        if (existingQuiz) setQuiz(existingQuiz);
    }, [quizId, quizzes, cid]);

    return (
        <div className="d-flex">
            {quiz.published ? <IoCheckmarkCircleSharp className="text-success me-2 mb-1" onClick={updateStatus} /> : <AiOutlineStop className="text-danger me-2 mb-1" onClick={updateStatus}/>}
            <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteQuizzes(quizId)} />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}

import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AssignmentRightControls from "./AssignmentRightControls";
import QuizLeftControls from "./QuizLeftControls";
import QuizControls from "./QuizControls";
import { IoCaretDownSharp } from "react-icons/io5";
import * as quizClient from "./client";
import { deleteQuizzes, editQuizzes, setQuizzes } from "./reducer";

export default function Quizzes() {
    const { cid } = useParams();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { quizzes } = useSelector((state: any) => state.quizReducer);

    const removeQuiz = async (quizId: string) => {
        await quizClient.deleteQuiz(quizId);
        dispatch(deleteQuizzes(quizId));
    };
    
    const fetchQuizzes = async () => {
        const quizzes = await quizClient.getQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    return (
        <div id="wd-quizzes">
            <QuizControls />
            <hr className="mt-4 mb-4" />
            <ul id="wd-modules" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <IoCaretDownSharp className="me-2 fs-5" />
                        Assignment Quizzes
                    </div>
                    <ul className="wd-lessons list-group rounded-0">
                        {quizzes.filter((quiz: any) => currentUser.role !== "FACULTY" ? quiz.published: true).map((quiz: any) => (
                            <li key={quiz._id} className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between align-items-center">
                                <div className="quiz-left-controls me-3">
                                    <QuizLeftControls />
                                </div>

                                <div className="flex-grow-1">
                                    {currentUser.role === "FACULTY" ?
                                        (
                                            <a className="wd-assignment-link fw-bold"
                                                onClick={() => { dispatch(editQuizzes(quiz._id)) }}
                                                href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}>
                                                {quiz.title}
                                            </a>
                                        ) : <span className="fw-bold">{quiz.title}</span>
                                    }

                                    <div className="text-muted">

                                        {getHeading(quiz.availableFrom, quiz.availableUntil)} | <b>Due</b> {formatDate(quiz.dueDate)} | {quiz.points} pts | {quiz.questionCount} Questions
                                    </div>
                                </div>

                                {currentUser.role === "FACULTY" && (
                                    <div className="quiz-control-buttons ms-3">
                                        <AssignmentRightControls 
                                            quizId={quiz._id}
                                            deleteQuizzes={(quizId) => { removeQuiz(quizId) }}
                                        />
                                    </div>
                                )}
                                
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}

function getHeading(availableFrom: string, availableUntil: string) {
    const currentTime = new Date().getTime();

    if (new Date(availableFrom).getTime() >= currentTime) {
        return <><b>Not available until</b> {formatDate(availableFrom)}</>;
    }

    if (new Date(availableUntil).getTime() < currentTime) {
        return <b>Closed</b>;
    }

    return <b>Available</b>;
}

function formatDate(isoDate: string): string {
    const date = new Date(isoDate);

    // Options for formatting the date
    const options: Intl.DateTimeFormatOptions = {
        month: 'long',  // Full month name ("long" is correct here)
        day: 'numeric', // Numeric day (e.g., "30")
        hour: 'numeric', // Numeric hour (e.g., "11")
        minute: '2-digit', // Two-digit minutes (e.g., "59")
        hour12: true // Use 12-hour format with AM/PM
    };

    // Format the date to: Month Day at Hour:Minute AM/PM
    return date.toLocaleString('en-US', options).replace(',', ' at');
}
import { useParams } from "react-router";
import AssignmentRightControls from "./AssignmentRightControls";
import QuizLeftControls from "./QuizLeftControls";
import QuizControls from "./QuizControls";
import { IoCaretDownSharp } from "react-icons/io5";
import * as db from "../../Database"

export default function Quizzes() {
    const { cid } = useParams();
    const quizzes = db.quizzes;

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
                        {quizzes.filter((assignment: any) => assignment.course === cid && assignment.published).map((assignment: any) => (
                            <li key={assignment._id} className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between align-items-center">
                                <div className="assignment-left-controls me-3">
                                    <QuizLeftControls />
                                </div>

                                <div className="flex-grow-1">
                                    <a className="wd-assignment-link fw-bold"
                                        href={`#/Kanbas/Courses/${cid}/Quizzes/${assignment._id}`}>
                                        {assignment.title}
                                    </a>
                                    <div className="text-muted">

                                        {getHeading(assignment.availableFrom, assignment.availableUntil)} | <b>Due</b> {formatDate(assignment.dueDate)} | {assignment.points} pts | {assignment.questionCount} Questions
                                    </div>
                                </div>

                                <div className="assignment-control-buttons ms-3">
                                    <AssignmentRightControls />
                                </div>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}

function getHeading(availableFrom : string, availableUntil : string) {
    const currentTime = new Date().getTime();

    if (new Date(availableFrom).getTime() >=  currentTime) {
        return <><b>Not available until</b> {formatDate(availableFrom)}</>;
    }

    if (new Date(availableUntil).getTime() <  currentTime) {
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
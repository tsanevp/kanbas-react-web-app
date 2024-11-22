import { useParams } from "react-router";
import AssignmentRightControls from "./AssignmentRightControls";
import AssignmentLeftControls from "./AssignmentLeftControls";
import AssignmentControls from "./AssignmentControls";
import { BsGripVertical } from 'react-icons/bs';
import { IoEllipsisVertical, IoCaretDownSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignments, editAssignments, setAssignments } from "./reducer";
import { useEffect } from "react";
import * as coursesClient from "../client";
import * as assignmentClient from "./client";

export default function Assignments() {
    const { cid } = useParams();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);

    const removeAssignment = async (assignmentId: string) => {
        await assignmentClient.deleteAssignment(assignmentId);
        dispatch(deleteAssignments(assignmentId));
    };

    const fetchAssignments = async () => {
        const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
    };

    useEffect(() => {
        fetchAssignments();
    }, [fetchAssignments]);
    return (
        <div id="wd-assignments">
            <AssignmentControls /><br /><br />
            <ul id="wd-modules" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-1 fs-3" />
                        <IoCaretDownSharp className="me-2 fs-5" />
                        Assignments
                        <div className="float-end ">
                            <span className="grade-percent mx-1">
                                40% of Total
                            </span>
                            {currentUser.role === "FACULTY" && (
                                <>
                                    <FaPlus className="mx-1" />
                                    <IoEllipsisVertical className="mx-1" />
                                </>
                            )}
                        </div>
                    </div>
                    <ul className="wd-lessons list-group rounded-0">
                        {assignments.filter((assignment: any) => assignment.course === cid).map((assignment: any) => (
                            <li key={assignment._id} className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between align-items-center">
                                <div className="assignment-left-controls me-3">
                                    <AssignmentLeftControls />
                                </div>

                                <div className="flex-grow-1">
                                    {currentUser.role === "FACULTY" ?
                                        (
                                            <a className="wd-assignment-link fw-bold"
                                                onClick={() => { dispatch(editAssignments(assignment._id)) }}
                                                href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                                                {assignment.title}
                                            </a>
                                        ) : <span className="fw-bold">{assignment.title}</span>
                                    }

                                    <div className="text-muted">
                                        <span style={{ color: "red" }}>Multiple Modules</span> | <b>Not available until</b> {formatDate(assignment.availableFrom)} | <b>Due</b> {formatDate(assignment.dueDate)} | {assignment.points} pts
                                    </div>
                                </div>

                                {currentUser.role === "FACULTY" && (
                                    <div className="assignment-control-buttons ms-3">
                                        <AssignmentRightControls
                                            assignmentId={assignment._id}
                                            deleteAssignments={(assignmentId) => { removeAssignment(assignmentId) }}
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
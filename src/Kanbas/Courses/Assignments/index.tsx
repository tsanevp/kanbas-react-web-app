
import AssignmentRightControls from "./AssignmentRightControls";
import AssignmentLeftControls from "./AssignmentLeftControls";
import AssignmentControls from "./AssignmentControls";
import { BsGripVertical } from 'react-icons/bs';
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { IoCaretDownSharp } from "react-icons/io5";

export default function Assignments() {
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
                            <FaPlus className="mx-1" />
                            <IoEllipsisVertical className="mx-1" />
                        </div>
                    </div>
                    <ul className="wd-lessons list-group rounded-0">
                        <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between align-items-center">
                            <div className="assignment-left-controls me-3">
                                <AssignmentLeftControls />
                            </div>

                            <div className="flex-grow-1">
                                <a className="wd-assignment-link fw-bold"
                                    href="#/Kanbas/Courses/1234/Assignments/123">
                                    A1
                                </a>
                                <div className="text-muted">
                                    <span style={{ color: "red" }}>Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts
                                </div>
                            </div>

                            <div className="assignment-control-buttons ms-3">
                                <AssignmentRightControls />
                            </div>
                        </li>
                        <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between align-items-center">
                            <div className="assignment-left-controls me-3">
                                <AssignmentLeftControls />
                            </div>

                            <div className="flex-grow-1">
                                <a className="wd-assignment-link fw-bold"
                                    href="#/Kanbas/Courses/1234/Assignments/123">
                                    A2
                                </a>
                                <div className="text-muted">
                                    <span style={{ color: "red" }}>Multiple Modules</span> | <b>Not available until</b> May 13 at 12:00am | <b>Due</b> May 20 at 11:59pm | 100 pts
                                </div>
                            </div>

                            <div className="assignment-control-buttons ms-3">
                                <AssignmentRightControls />
                            </div>
                        </li>
                        <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between align-items-center">
                            <div className="assignment-left-controls me-3">
                                <AssignmentLeftControls />
                            </div>

                            <div className="flex-grow-1">
                                <a className="wd-assignment-link fw-bold"
                                    href="#/Kanbas/Courses/1234/Assignments/123">
                                    A3
                                </a>
                                <div className="text-muted">
                                    <span style={{ color: "red" }}>Multiple Modules</span> | <b>Not available until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm | 100 pts
                                </div>
                            </div>
                            <div className="assignment-control-buttons ms-3">
                                <AssignmentRightControls />
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
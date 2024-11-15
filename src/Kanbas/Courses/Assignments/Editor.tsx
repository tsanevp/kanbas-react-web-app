import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addAssignments, updateAssignments } from "./reducer";
import * as coursesClient from "../client";
import * as assignmentClient from "./client";

export default function AssignmentEditor() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cid, aid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const [assignment, setAssignment] = useState({
        _id: new Date().getTime().toString(),
        title: "",
        course: cid,
        description: "",
        points: "",
        assignmentGroup: "",
        displayGradeAs: "",
        submissionType: "",
        onlineEntryOptions: {
            textEntry: false,
            websiteUrl: false,
            mediaRecordings: false,
            studentAnnotation: false,
            fileUpload: false
        },
        assignTo: "",
        dueDate: "",
        availableFrom: "",
        availableUntil: "",
        editing: false
    });

    const createAssignmentForCourse = async () => {
        if (!cid) return;
        const newAssignment = await coursesClient.createAssignmentsForCourse(cid, assignment);
        dispatch(addAssignments(newAssignment));
    };

    const saveAssignment = async () => {
        await assignmentClient.updateAssignment({ ...assignment, editing: false });
        dispatch(updateAssignments(assignment));
    };

    useEffect(() => {
        if (aid !== "AddNewAssignment") {
            const existingAssignment = assignments.find((a: any) => a._id === aid && a.course === cid);
            if (existingAssignment) setAssignment(existingAssignment);
        }
    }, [aid, assignments, cid]);

    return (
        <div id="wd-assignments-editor" className="container mt-5">
            <form>
                {/* Assignment Name */}
                <div className="mb-3">
                    <label htmlFor="wd-name" className="form-label"><b>Assignment Name</b></label>
                    <input id="wd-name" className="form-control" defaultValue={assignment?.title} onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
                </div>

                {/* Description */}
                <div className="mb-3">
                    <label htmlFor="wd-description" className="form-label"><b>Description</b></label>
                    <textarea id="wd-description" className="form-control" rows={5} defaultValue={assignment?.description} onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}></textarea>
                </div>

                {/* Points */}
                <div className="mb-3 row">
                    <label htmlFor="wd-points" className="col-3 col-form-label text-end">Points</label>
                    <div className="col-9">
                        <input id="wd-points" className="form-control" defaultValue={assignment?.points} onChange={(e) => setAssignment({ ...assignment, points: e.target.value })} />
                    </div>
                </div>

                {/* Assignment Group */}
                <div className="mb-3 row">
                    <label htmlFor="wd-points" className="col-3 col-form-label text-end">Assignment Group</label>
                    <div className="col-9">
                        <select id="wd-group" className="form-select" defaultValue={assignment?.assignmentGroup} onChange={(e) => setAssignment({ ...assignment, assignmentGroup: e.target.value })}>
                            <option value="Assignments">Assignments</option>
                            <option value="Exams">Exams</option>
                            <option value="Projects">Projects</option>
                            <option value="Quizzes">Quizzes</option>
                            <option value="Essays">Essays</option>
                            <option value="Reports">Reports</option>
                            <option value="Presentations">Presentations</option>
                            <option value="Debates">Debates</option>
                            <option value="ResearchPapers">Research Papers</option>
                            <option value="ReflectionPapers">Reflection Papers</option>
                            <option value="PracticalExercises">Practical Exercises</option>
                        </select>
                    </div>
                </div>

                {/* Display Grade As */}
                <div className="mb-3 row">
                    <label htmlFor="wd-display-grade-as" className="col-3 col-form-label text-end">Display Grade As</label>
                    <div className="col-9">
                        <select id="wd-display-grade-as" className="form-select" defaultValue={assignment?.displayGradeAs} onChange={(e) => setAssignment({ ...assignment, displayGradeAs: e.target.value })}>
                            <option value="Percentage">Percentage</option>
                            <option value="Points">Points</option>
                        </select>
                    </div>
                </div>

                {/* Submission Type */}
                <div className="mb-3 row">
                    <label htmlFor="wd-submission-type" className="col-3 col-form-label text-end">Submission Type</label>
                    <div className="col-9 edit-container">
                        <select id="wd-submission-type" className="form-select" defaultValue={assignment?.submissionType} onChange={(e) => setAssignment({ ...assignment, submissionType: e.target.value })}>
                            <option value="SubmissionType">Online</option>
                        </select>

                        {/* Online Entry Options */}
                        <div className="mb-3">
                            <label className="mt-3 edit-labels">
                                Online Entry Options
                            </label>
                            <div className="form-check mt-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="wd-text-entry"
                                    checked={assignment.onlineEntryOptions.textEntry}
                                    onChange={(e) => setAssignment({
                                        ...assignment,
                                        onlineEntryOptions: {
                                            ...assignment.onlineEntryOptions,
                                            textEntry: e.target.checked
                                        }
                                    })
                                    }
                                />
                                <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
                            </div>
                            <div className="form-check mt-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="wd-website-url"
                                    checked={assignment.onlineEntryOptions.websiteUrl}
                                    onChange={(e) => setAssignment({
                                        ...assignment,
                                        onlineEntryOptions: {
                                            ...assignment.onlineEntryOptions,
                                            websiteUrl: e.target.checked
                                        }
                                    })
                                    }
                                />
                                <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
                            </div>
                            <div className="form-check mt-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="wd-media-recordings"
                                    checked={assignment?.onlineEntryOptions.mediaRecordings}
                                    onChange={(e) => setAssignment({
                                        ...assignment,
                                        onlineEntryOptions: {
                                            ...assignment.onlineEntryOptions,
                                            mediaRecordings: e.target.checked
                                        }
                                    })
                                    }
                                />
                                <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
                            </div>
                            <div className="form-check mt-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="wd-student-annotation"
                                    checked={assignment?.onlineEntryOptions.studentAnnotation}
                                    onChange={(e) => setAssignment({
                                        ...assignment,
                                        onlineEntryOptions: {
                                            ...assignment.onlineEntryOptions,
                                            studentAnnotation: e.target.checked
                                        }
                                    })
                                    }
                                />
                                <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
                            </div>
                            <div className="form-check mt-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="wd-file-upload"
                                    checked={assignment?.onlineEntryOptions.fileUpload}
                                    onChange={(e) => setAssignment({
                                        ...assignment,
                                        onlineEntryOptions: {
                                            ...assignment.onlineEntryOptions,
                                            fileUpload: e.target.checked
                                        }
                                    })
                                    }
                                />
                                <label className="form-check-label" htmlFor="wd-file-upload">File Upload</label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Assign To */}
                <div className="mb-3 row">
                    <label htmlFor="wd-assign-to" className="col-3 col-form-label text-end">Assign</label>
                    <div className="col-9 edit-container">
                        <div className="mb-3">
                            <label htmlFor="wd-assign-to" className="edit-labels">Assign To</label>
                            <input id="wd-assign-to" className="form-control" defaultValue={assignment?.assignTo} onChange={(e) => setAssignment({ ...assignment, assignTo: e.target.value })} />
                        </div>

                        {/* Due Date */}
                        <div className="mb-3">
                            <label htmlFor="wd-due-date" className="edit-labels">Due Date</label>
                            <input type="datetime-local" id="wd-due-date" className="form-control" defaultValue={assignment?.dueDate} onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })} />
                        </div>

                        {/* Available From and Until */}
                        <div className="row d-flex align-items-start">
                            <div className="mb-3 col-6 mt-0">
                                <label htmlFor="wd-available-from" className="edit-labels">Available From</label>
                                <input type="datetime-local" id="wd-available-from" className="form-control" defaultValue={assignment?.availableFrom} onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })} />
                            </div>

                            <div className="mb-3 col-6 mt-0">
                                <label htmlFor="wd-available-until" className="edit-labels">Until</label>
                                <input type="datetime-local" id="wd-available-until" className="form-control" defaultValue={assignment?.availableUntil} onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })} />
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                {/* Save and Cancel Buttons */}
                <div className="text-end">
                    <Link to={`/Kanbas/Courses/${cid}/Assignments`} id="wd-cancel" className="btn btn-secondary me-2">
                        Cancel
                    </Link>
                    <button id="wd-save" className="btn btn-danger me-2" onClick={(e: any) => {
                        e.preventDefault();
                        !assignment.editing ? createAssignmentForCourse() : saveAssignment();
                        navigate(`/Kanbas/Courses/${cid}/Assignments`);
                    }}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

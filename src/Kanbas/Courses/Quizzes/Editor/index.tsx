import { useParams } from "react-router";
import * as db from '../../../Database';
import { Link } from "react-router-dom";
import QuizEditorControls from "./QuizEditorControls";

export default function QuizEditor() {
    const { cid, aid } = useParams();
    const assignment = db.quizzes.find((assignment: any) => assignment._id === aid && assignment.course === cid);
    return (
        <div id="wd-assignments-editor" className="container mt-5">
            <QuizEditorControls />
            <br />
            <br />

            <hr className="mt-4 mb-4" />
            <form>
                {/* Assignment Name */}
                <div className="mb-3">
                    <label htmlFor="wd-name" className="form-label"><b>Title</b></label>
                    <input id="wd-name" className="form-control" defaultValue={assignment?.title} />
                </div>

                {/* Description */}
                <div className="mb-3">
                    <label htmlFor="wd-description" className="form-label"><b>Quiz Instructions</b></label>
                    <textarea id="wd-description" className="form-control" rows={5} defaultValue={assignment?.description}></textarea>
                </div>

                {/* Quiz Type */}
                <div className="mb-3 row">
                    <label htmlFor="wd-points" className="col-3 col-form-label text-end">Quiz Type</label>
                    <div className="col-9">
                        <select id="wd-group" className="form-select" defaultValue={assignment?.assignmentGroup && "GradedQuiz"}>
                            <option value="GradedQuiz">Graded Quiz</option>
                            <option value="PracticeQuiz">Practice Quiz</option>
                            <option value="GradedSurvey"> Graded Survey</option>
                            <option value="UngradedSurvey">Ungraded Survey</option>
                        </select>
                    </div>
                </div>

                {/* Assignment Group */}
                <div className="mb-3 row">
                    <label htmlFor="wd-points" className="col-3 col-form-label text-end">Assignment Group</label>
                    <div className="col-9">
                        <select id="wd-group" className="form-select" defaultValue={assignment?.assignmentGroup && "Quizzes"}>
                            <option value="Quizzes">Quizzes</option>
                            <option value="Exams">Exams</option>
                            <option value="Assignments">Assignments</option>
                            <option value="Project">Project</option>
                        </select>
                    </div>
                </div>

                {/* Submission Type */}
                <div className="mb-3 row">
                    <label htmlFor="wd-submission-type" className="col-3 col-form-label text-end">Options</label>
                    <div className="col-9 edit-container">
                        {/* Options */}
                        <div className="mb-3">
                            <label className="edit-labels">
                                Options
                            </label>
                            <div className="form-check mt-3">
                                <input className="form-check-input" type="checkbox" id="wd-shuffle-answers" defaultChecked={assignment?.shuffleAnswers} />
                                <label className="form-check-label" htmlFor="wd-shuffle-answers">Shuffle Answers</label>
                            </div>
                            <div className="d-flex edit-container mt-3">
                                <div className="form-check col-4">
                                    <input className="form-check-input" type="checkbox" id="wd-time-limit" defaultChecked={assignment?.timeLimit.selected} />
                                    <label className="form-check-label" htmlFor="wd-time-limit">Time Limit</label>
                                </div>
                                <div className="form-check ms-5">
                                    <input className="form-check-input" type="text" id="wd-time-limit-value" defaultValue={assignment?.timeLimit.value} />
                                    <label className="form-check-label" htmlFor="wd-time-limit-value">Minutes</label>
                                </div>
                            </div>
                            <div className="d-flex edit-container mt-3">
                                <div className="form-check col-4">
                                    <input className="form-check-input" type="checkbox" id="wd-multiple-attempts" defaultChecked={assignment?.multipleAttempts.selected} />
                                    <label className="form-check-label" htmlFor="wd-multiple-attempts">Allow Multiple Attemps</label>
                                </div>
                                <div className="form-check ms-5">
                                    <input className="form-check-input" type="text" id="wd-multiple-attempts-value" defaultValue={assignment?.multipleAttempts.value} />
                                    <label className="form-check-label" htmlFor="wd-multiple-attempts-value">Attempts</label>
                                </div>
                            </div>
                            <div className="form-check mt-3">
                                <input className="form-check-input" type="checkbox" id="wd-shuffle-answers" defaultChecked={assignment?.shuffleAnswers} />
                                <label className="form-check-label" htmlFor="wd-shuffle-answers">Show Correct Answers</label>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="wd-shuffle-answers">Access Code</label>
                                <input className="form-check-input" type="text" id="wd-shuffle-answers" defaultChecked={assignment?.shuffleAnswers} />
                            </div>
                            <div className="form-check mt-3">
                                <input className="form-check-input" type="checkbox" id="wd-shuffle-answers" defaultChecked={assignment?.shuffleAnswers} />
                                <label className="form-check-label" htmlFor="wd-shuffle-answers">One Question at a Time</label>
                            </div>
                            <div className="form-check mt-3">
                                <input className="form-check-input" type="checkbox" id="wd-shuffle-answers" defaultChecked={assignment?.shuffleAnswers} />
                                <label className="form-check-label" htmlFor="wd-shuffle-answers">Webcam Required</label>
                            </div>
                            <div className="form-check mt-3">
                                <input className="form-check-input" type="checkbox" id="wd-shuffle-answers" defaultChecked={assignment?.shuffleAnswers} />
                                <label className="form-check-label" htmlFor="wd-shuffle-answers">Lock Questions After Answering</label>
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
                            <input id="wd-assign-to" className="form-control" defaultValue={assignment?.assignTo} />
                        </div>

                        {/* Due Date */}
                        <div className="mb-3">
                            <label htmlFor="wd-due-date" className="edit-labels">Due Date</label>
                            <input type="datetime-local" id="wd-due-date" className="form-control" defaultValue={assignment?.dueDate} />
                        </div>

                        {/* Available From and Until */}
                        <div className="row d-flex align-items-start">
                            <div className="mb-3 col-6 mt-0">
                                <label htmlFor="wd-available-from" className="edit-labels">Available From</label>
                                <input type="datetime-local" id="wd-available-from" className="form-control" defaultValue={assignment?.availableFrom} />
                            </div>

                            <div className="mb-3 col-6 mt-0">
                                <label htmlFor="wd-available-until" className="edit-labels">Until</label>
                                <input type="datetime-local" id="wd-available-until" className="form-control" defaultValue={assignment?.availableUntil} />
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
                    <Link to={`/Kanbas/Courses/${cid}/Assignments`} id="wd-save" className="btn btn-danger me-2">
                        Save
                    </Link>

                </div>
            </form>
        </div>
    );
}

export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor" className="container mt-5">
            <form>
                {/* Assignment Name */}
                <div className="mb-3">
                    <label htmlFor="wd-name" className="form-label"><b>Assignment Name</b></label>
                    <input id="wd-name" className="form-control" value="A1 - ENV + HTML" />
                </div>

                {/* Description */}
                <div className="mb-3">
                    <label htmlFor="wd-description" className="form-label"><b>Description</b></label>
                    <textarea id="wd-description" className="form-control" rows={5}>
                        The assignment is available online. Submit a link to the landing page of your web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories. The Kanbas application should include a link to navigate back to the landing page.
                    </textarea>
                </div>

                {/* Points */}
                <div className="mb-3 row">
                    <label htmlFor="wd-points" className="col-3 col-form-label text-end">Points</label>
                    <div className="col-9">
                        <input id="wd-points" className="form-control" value={100} />
                    </div>
                </div>

                {/* Assignment Group */}
                <div className="mb-3 row">
                    <label htmlFor="wd-points" className="col-3 col-form-label text-end">Assignment Group</label>
                    <div className="col-9">
                        <select id="wd-group" className="form-select">
                            <option value="Assignments">ASSIGNMENTS</option>
                        </select>
                    </div>
                </div>

                {/* Display Grade As */}
                <div className="mb-3 row">
                    <label htmlFor="wd-display-grade-as" className="col-3 col-form-label text-end">Display Grade As</label>
                    <div className="col-9">
                        <select id="wd-display-grade-as" className="form-select">
                            <option value="Percentage">Percentage</option>
                        </select>
                    </div>
                </div>

                {/* Submission Type */}
                <div className="mb-3 row">
                    <label htmlFor="wd-submission-type" className="col-3 col-form-label text-end">Submission Type</label>
                    <div className="col-9 edit-container">
                        <select id="wd-submission-type" className="form-select">
                            <option value="SubmissionType">Online</option>
                        </select>

                        {/* Online Entry Options */}
                        <div className="mb-3">
                            <label className="mt-3 edit-labels">
                                Online Entry Options
                            </label>
                            <div className="form-check mt-3">
                                <input className="form-check-input" type="checkbox" id="wd-text-entry" />
                                <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
                            </div>
                            <div className="form-check mt-3">
                                <input className="form-check-input" type="checkbox" id="wd-website-url" />
                                <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
                            </div>
                            <div className="form-check mt-3">
                                <input className="form-check-input" type="checkbox" id="wd-media-recordings" />
                                <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
                            </div>
                            <div className="form-check mt-3">
                                <input className="form-check-input" type="checkbox" id="wd-student-annotation" />
                                <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
                            </div>
                            <div className="form-check mt-3">
                                <input className="form-check-input" type="checkbox" id="wd-file-upload" />
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
                            <input id="wd-assign-to" className="form-control" value="Everyone" />
                        </div>

                        {/* Due Date */}
                        <div className="mb-3">
                            <label htmlFor="wd-due-date" className="edit-labels">Due Date</label>
                            <input type="datetime-local" id="wd-due-date" className="form-control" value="2024-05-13 23:59" />
                        </div>

                        {/* Available From and Until */}
                        <div className="row d-flex align-items-start">
                            <div className="mb-3 col-6 mt-0">
                                <label htmlFor="wd-available-from" className="edit-labels">Available From</label>
                                <input type="datetime-local" id="wd-available-from" className="form-control" value="2024-05-13 23:59" />
                            </div>

                            <div className="mb-3 col-6 mt-0">
                                <label htmlFor="wd-available-until" className="edit-labels">Until</label>
                                <input type="datetime-local" id="wd-available-until" className="form-control" value="2024-05-13 23:59" />
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                {/* Save and Cancel Buttons */}
                <div className="text-end">
                    <button type="button" id="wd-cancel" className="btn btn-secondary me-2">Cancel</button>
                    <button type="button" id="wd-save" className="btn btn-danger">Save</button>
                </div>
            </form>
        </div>
    );
}

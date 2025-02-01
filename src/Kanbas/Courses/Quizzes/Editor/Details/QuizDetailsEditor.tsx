import Editor from 'react-simple-wysiwyg';

export default function QuizDetailsEditor({ quiz, setQuiz }:
    {
        quiz: any;
        setQuiz: (quiz: any) => void;
    }) {

    return (
        <form>
            {/* Quiz Name */}
            <div className="mb-3">
                <label htmlFor="wd-name" className="form-label"><b>Title</b></label>
                <input id="wd-name" className="form-control" defaultValue={quiz?.title} onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} />
            </div>

            {/* Description */}
            <div className="mb-3">
                <label htmlFor="wd-description" className="form-label"><b>Quiz Instructions</b></label>
                <Editor value={quiz?.description} onChange={(e) => setQuiz({ ...quiz, description: e.target.value })} />
            </div>

            {/* Quiz Type */}
            <div className="mb-3 row">
                <label htmlFor="wd-points" className="col-3 col-form-label text-end">Quiz Type</label>
                <div className="col-9">
                    <select id="wd-group" className="form-select" defaultValue={quiz?.quizType && "GradedQuiz"} onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}>
                        <option value="GradedQuiz">Graded Quiz</option>
                        <option value="PracticeQuiz">Practice Quiz</option>
                        <option value="GradedSurvey"> Graded Survey</option>
                        <option value="UngradedSurvey">Ungraded Survey</option>
                    </select>
                </div>
            </div>

            {/* Quiz Group */}
            <div className="mb-3 row">
                <label htmlFor="wd-points" className="col-3 col-form-label text-end">Quiz Group</label>
                <div className="col-9">
                    <select id="wd-group" className="form-select" defaultValue={quiz?.assignmentGroup && "Quizzes"} onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}>
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
                            <input className="form-check-input" type="checkbox" id="wd-shuffle-answers" defaultChecked={quiz?.shuffleAnswers} onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })} />
                            <label className="form-check-label" htmlFor="wd-shuffle-answers">Shuffle Answers</label>
                        </div>
                        <div className="d-flex edit-container mt-3">
                            <div className="form-check col-4">
                                <input className="form-check-input" type="checkbox" id="wd-time-limit" defaultChecked={quiz?.timeLimit.selected} onChange={(e) => setQuiz({
                                    ...quiz,
                                    timeLimit: {
                                        ...quiz.timeLimit,
                                        selected: e.target.checked
                                    }
                                })
                                } />
                                <label className="form-check-label" htmlFor="wd-time-limit">Time Limit</label>
                            </div>
                            <div className="form-check ms-5">
                                <input className="form-check-input" type="text" id="wd-time-limit-value" defaultValue={quiz?.timeLimit.value} onChange={(e) => setQuiz({
                                    ...quiz,
                                    timeLimit: {
                                        ...quiz.timeLimit,
                                        value: e.target.valueAsNumber
                                    }
                                })
                                } />
                                <label className="form-check-label" htmlFor="wd-time-limit-value">Minutes</label>
                            </div>
                        </div>
                        <div className="d-flex edit-container mt-3">
                            <div className="form-check col-4">
                                <input className="form-check-input" type="checkbox" id="wd-multiple-attempts" defaultChecked={quiz?.multipleAttempts.selected} onChange={(e) => setQuiz({
                                    ...quiz,
                                    multipleAttempts: {
                                        ...quiz.multipleAttempts,
                                        selected: e.target.checked
                                    }
                                })
                                } />
                                <label className="form-check-label" htmlFor="wd-multiple-attempts">Allow Multiple Attempts</label>
                            </div>
                            <div className="form-check ms-5">
                                <input className="form-check-input" type="text" id="wd-multiple-attempts-value" defaultValue={quiz?.multipleAttempts.value} onChange={(e) => setQuiz({
                                    ...quiz,
                                    multipleAttempts: {
                                        ...quiz.multipleAttempts,
                                        value: e.target.valueAsNumber
                                    }
                                })
                                } />
                                <label className="form-check-label" htmlFor="wd-multiple-attempts-value">Attempts</label>
                            </div>
                        </div>
                        <div className="form-check mt-3">
                            <input className="form-check-input" type="checkbox" id="wd-show-correct-answers" defaultChecked={quiz?.showCorrectAnswers} onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.checked })} />
                            <label className="form-check-label" htmlFor="wd-show-correct-answers">Show Correct Answers</label>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="wd-access-code">Access Code</label>
                            <input className="form-check-input" type="text" id="wd-access-code" defaultValue={quiz?.accessCode} onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })} />
                        </div>
                        <div className="form-check mt-3">
                            <input className="form-check-input" type="checkbox" id="wd-one-question-at-time" defaultChecked={quiz?.oneQuestionAtATime} onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })} />
                            <label className="form-check-label" htmlFor="wd-one-question-at-time">One Question at a Time</label>
                        </div>
                        <div className="form-check mt-3">
                            <input className="form-check-input" type="checkbox" id="wd-webcam-required" defaultChecked={quiz?.shuffleAnswers} onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })} />
                            <label className="form-check-label" htmlFor="wd-webcam-required">Webcam Required</label>
                        </div>
                        <div className="form-check mt-3">
                            <input className="form-check-input" type="checkbox" id="wd-lock-questions" defaultChecked={quiz?.lockQuestionsAfterAnswering} onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })} />
                            <label className="form-check-label" htmlFor="wd-lock-questions">Lock Questions After Answering</label>
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
                        <input id="wd-assign-to" className="form-control" defaultValue={quiz?.assignTo} onChange={(e) => setQuiz({ ...quiz, assignTo: e.target.value })} />
                    </div>

                    {/* Due Date */}
                    <div className="mb-3">
                        <label htmlFor="wd-due-date" className="edit-labels">Due Date</label>
                        <input type="datetime-local" id="wd-due-date" className="form-control" defaultValue={quiz?.dueDate} onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })} />
                    </div>

                    {/* Available From and Until */}
                    <div className="row d-flex align-items-start">
                        <div className="mb-3 col-6 mt-0">
                            <label htmlFor="wd-available-from" className="edit-labels">Available From</label>
                            <input type="datetime-local" id="wd-available-from" className="form-control" defaultValue={quiz?.availableFrom} onChange={(e) => setQuiz({ ...quiz, availableFrom: e.target.value })} />
                        </div>

                        <div className="mb-3 col-6 mt-0">
                            <label htmlFor="wd-available-until" className="edit-labels">Until</label>
                            <input type="datetime-local" id="wd-available-until" className="form-control" defaultValue={quiz?.availableUntil} onChange={(e) => setQuiz({ ...quiz, availableUntil: e.target.value })} />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

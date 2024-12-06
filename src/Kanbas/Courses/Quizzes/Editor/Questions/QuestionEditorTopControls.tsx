export default function QuestionEditorTopControls({ question, setQuestion }:
    {
        question: any
        setQuestion: (question: any) => void;
    }) {

    return (
        <div id="question-editor-top-controls" className="d-flex w-100">
            <div className="mb-3 w-25 me-3">
                <label htmlFor="wd-question-title" className="edit-labels">Title</label>
                <input id="wd-question-title" className="form-control" defaultValue={question?.title} onChange={(e) => setQuestion({ ...question, title: e.target.value })} />
            </div>
            <div className="mb-3 w-auto">
                <label htmlFor="wd-question-type" className="edit-labels">Type</label>
                <select id="wd-question-type" className="form-select" defaultValue={question?.questionType} onChange={(e) => setQuestion({ ...question, questionType: e.target.value })} >
                    <option value="MultipleChoice">Multiple Choice</option>
                    <option value="TrueFalse">True or False</option>
                    <option value="FillInTheBlank">Fill In The Blank</option>
                </select>
            </div>
            <div className="ms-auto me-2">
                <label htmlFor="wd-question-points" className="edit-labels">pts</label>
                <input
                    type="number"
                    id="wd-question-points"
                    className="form-control"
                    defaultValue={question?.points}
                    onChange={(e) => {
                        setQuestion({ ...question, points: e.target.value });
                    }}
                />
            </div>
        </div>
    );
}

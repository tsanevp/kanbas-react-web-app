export default function QuestionEditorButtons({ updateQuestionCallback, cancelUpdateCallback }:
    {
        updateQuestionCallback: () => void;
        cancelUpdateCallback: () => void;
    }) {

    return (
        <div id="question-editors-buttons">
                <button
                    className="btn btn-sm btn-secondary me-2"
                    onClick={() => cancelUpdateCallback()}
                >
                    Cancel
                </button>
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => updateQuestionCallback()}
                >
                    Update Question
                </button>
        </div>
    );
}

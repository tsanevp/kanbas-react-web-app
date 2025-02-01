import { Editor, EditorProvider } from "react-simple-wysiwyg";

export default function TrueFalseEditor({ question, setQuestion, updateQuestionCallback, cancelUpdateCallback }:
    {
        question: any
        setQuestion: (question: any) => void;
        updateQuestionCallback: () => void;
        cancelUpdateCallback: () => void;
    }) {

    return (
        <div id="question-true-false">
            {/* True/False Description */}
            <p>Enter your True/False question and select the correct answer</p>
            <p className="fw-bold mb-0">Question:</p>
            <EditorProvider>
                <Editor
                    value={question?.questionText}
                    onChange={(e) => {
                        setQuestion({ ...question, questionText: e.target.value });
                    }}
                />
            </EditorProvider>

            {/* True/False Questions & Answers */}
            <div className="mb-3 mt-4">
                <label className="fw-bold mb-2">Answers:</label>
                <div className="d-flex align-items-center mb-3">
                    <input
                        type="radio"
                        name="trueFalseOption"
                        className="me-2"
                        defaultChecked={question.isTrue}
                        onChange={() =>
                            setQuestion({ ...question, isTrue: !question.isTrue })
                        }
                    />
                    <span className="me-3">True</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                    <input
                        type="radio"
                        name="trueFalseOption"
                        className="me-2"
                        defaultChecked={!question.isTrue}
                        onChange={() =>
                            setQuestion({ ...question, isTrue: !question.isTrue })
                        }
                    />
                    <span className="me-3">False</span>
                </div>
            </div>
            <hr />
        </div>
    );
}

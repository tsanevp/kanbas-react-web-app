import Editor, { EditorProvider } from 'react-simple-wysiwyg';
import { FaPlus, FaTrash } from "react-icons/fa";

export default function MultipleChoiceEditor({ question, setQuestion, updateQuestionCallback, cancelUpdateCallback }:
    {
        question: any
        setQuestion: (question: any) => void;
        updateQuestionCallback: () => void;
        cancelUpdateCallback: () => void;
    }) {

    const handleAddOption = () => {
        const updatedOptions = [...question.options, { text: "", isCorrect: false }];
        setQuestion({ ...question, options: updatedOptions });
    };

    const handleOptionChange = (index: number, updatedOption: any) => {
        const updatedOptions = question.options.map((option: any, i: number) =>
            i === index ? updatedOption : option
        );
        setQuestion({ ...question, options: updatedOptions });
    };

    const handleRemoveOption = (index: number) => {
        const updatedOptions = question.options.filter((_: any, i: number) => i !== index);
        setQuestion({ ...question, options: updatedOptions });
    };

    return (
        <div id="question-preview-card">
            {/* Multiple Choice Description */}
            <p>Enter your question and multiple answers, then select the one correct answer</p>
            <p className="fw-bold mb-0">Question:</p>
            <EditorProvider>
                <Editor
                    value={question?.questionText}
                    onChange={(e) => {
                        setQuestion({ ...question, questionText: e.target.value });
                    }}
                />
            </EditorProvider>

            {/* Multiple Choice Questions & Answers */}
            <div className="mb-3 mt-4">
                <label className="fw-bold mb-2">Answers:</label>
                {question.options.map((option: any, index: number) => (
                    <div key={index} className="d-flex align-items-center mb-3">
                        <input
                            type="checkbox"
                            className="me-2"
                            checked={option.isCorrect}
                            onChange={(e) =>
                                handleOptionChange(index, { ...option, isCorrect: e.target.checked })
                            }
                        />
                        <span className="col-2 me-5">{option.isCorrect ? "Correct Answer:" : "Possible Answer:"} </span>
                        <textarea
                            className="form-control p-1 w-50"
                            style={{ height: "1.5rem" }}
                            placeholder={`Option ${index + 1}`}
                            value={option.text}
                            onChange={(e) =>
                                handleOptionChange(index, { ...option, text: e.target.value })
                            }
                        />
                        <FaTrash className="text-danger me-2 mb-1 ms-auto" onClick={() => handleRemoveOption(index)} />
                    </div>
                ))}
                <div className="ms-auto me-2">
                    <button type="button" className="btn btn-secondary mt-2 float-end" onClick={handleAddOption}>
                        <FaPlus className="me-2" />
                        Add Another Answer
                    </button>
                </div>
            </div>
            <br />
            <br />
            <hr />
        </div>
    );
}

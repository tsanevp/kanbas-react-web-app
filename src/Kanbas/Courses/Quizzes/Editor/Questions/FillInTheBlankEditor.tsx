import Editor, { EditorProvider } from 'react-simple-wysiwyg';
import { FaPlus, FaTrash } from "react-icons/fa";

export default function FillInTheBlankEditor({ question, setQuestion, updateQuestionCallback, cancelUpdateCallback }:
    {
        question: any
        setQuestion: (question: any) => void;
        updateQuestionCallback: () => void;
        cancelUpdateCallback: () => void;
    }) {

    const handleAddAnswer = () => {
        const updatedAnswers = [...question.correctAnswers, ""];
        setQuestion({ ...question, correctAnswers: updatedAnswers });
    };

    const handleAnswerChange = (index: number, updatedAnswer: string) => {
        const updatedAnswers = question.correctAnswers.map((answer: string, i: number) =>
            i === index ? updatedAnswer : answer
        );
        setQuestion({ ...question, correctAnswers: updatedAnswers });
    };

    const handleRemoveAnswer = (index: number) => {
        const updatedAnswers = question.correctAnswers.filter((_: string, i: number) => i !== index);
        setQuestion({ ...question, correctAnswers: updatedAnswers });
    };

    return (
        <div id="question-preview-card">
            {/* Fill in the Blank Description */}
            <p>Enter your question, points, then define all possible correct answers for the blank.
                Students will see the question followed by a small text box to type their answer.</p>

            {/* Question (WYSIWYG) */}
            <p className="fw-bold mb-0">Question:</p>
            <EditorProvider>
                <Editor
                    value={question?.questionText}
                    onChange={(e) => {
                        setQuestion({ ...question, questionText: e.target.value });
                    }}
                />
            </EditorProvider>

            {/* Blank and Possible Correct Answers */}
            <div className="mb-3 mt-4">
                <label className="fw-bold mb-2">Answers:</label>
                {question.correctAnswers.map((answer: string, index: number) => (
                    <div key={index} className="d-flex align-items-center mb-3">
                        <span className="me-3">Possible Answer: </span>
                        <input
                            type="text"
                            className="form-control me-2 w-50"
                            placeholder={`Correct Answer ${index + 1}`}
                            value={answer}
                            onChange={(e) =>
                                handleAnswerChange(index, e.target.value)
                            }
                        />
                        <FaTrash className="text-danger me-2 mb-1 ms-auto" onClick={() => handleRemoveAnswer(index)} />
                    </div>
                ))}
                <div className="ms-auto me-2">
                    <button type="button" className="btn btn-secondary mt-2 float-end" onClick={handleAddAnswer}>
                        <FaPlus className="me-2" />
                        Add Another Correct Answer
                    </button>
                </div>
            </div>
            <br />
            <br />
            <hr />
        </div>
    );
}

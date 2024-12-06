import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import FillInTheBlankEditor from "./FillInTheBlankEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import QuestionEditorTopControls from "./QuestionEditorTopControls";
import QuestionEditorButtons from "./QuestionEditorButtons";

interface Question {
    title: string;
    questionText: string;
    questionType: "MultipleChoice" | "FillInTheBlank" | "TrueFalse";
    points: number;
    options: { text: string; isCorrect: boolean }[];
    correctAnswers: string[];
    isTrue: boolean;
    isEditing: boolean;
    editingIndex: number;
}

export default function QuizQuestionsEditor({ quiz, updateQuizQuestions }:
    {
        quiz: any;
        updateQuizQuestions: (updatedQuestions: Question[]) => void;
    }
) {
    const newQuestion: Question = {
        title: "New Question",
        questionText: "",
        questionType: "MultipleChoice", // Default type
        points: 1,
        options: [],
        correctAnswers: [],
        isTrue: false,
        isEditing: false,
        editingIndex: -1,
    };

    const [questions, setQuestions] = useState<Question[]>([]);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

    const cancelEditing = (deleteing: boolean, index?: number | undefined) => {
        if (editingQuestion) {
            // Cancel editing by resetting `isEditing` and `editingIndex`
            const updatedQuestions = [...questions];
            const updatedQuestion = { ...editingQuestion, isEditing: false }; // Set isEditing to false
            updatedQuestions[editingQuestion.editingIndex] = updatedQuestion;
            setQuestions(updatedQuestions);
            setEditingQuestion(null); // Clear the editing question state
        }

        if (deleteing && index) {
            deleteQuestion(index);
        } else { addQuestion() }
    };

    const addQuestion = () => {
        const updatedQuestions = [...questions, { ...newQuestion }];
        setQuestions(updatedQuestions);
        updateQuizQuestions(updatedQuestions);
    };

    const updateQuestion = (index: number, question: Question) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = { ...question, isEditing: !question.isEditing };
        if (updatedQuestions[index].isEditing) {
            updatedQuestions[index] = { ...updatedQuestions[index], editingIndex: index };
            setEditingQuestion({ ...updatedQuestions[index], editingIndex: index });
        }
        setQuestions(updatedQuestions);
        updateQuizQuestions(updatedQuestions);
    };

    const deleteQuestion = (index: number) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
        updateQuizQuestions(updatedQuestions); // Sync with parent state
    };

    useEffect(() => {
        setQuestions(quiz?.questions);
    }, [quiz]);

    return (
        <div>
            {/* Button to Add New Question */}
            <div className="w-100 d-flex justify-content-center mb-3">
                <button className="btn btn-sm btn-secondary mb-2"
                    onClick={() => addQuestion()}>
                    <FaPlus className="me-2" />
                    New Question
                </button>
            </div>

            {/* List of Questions */}
            {questions.map((question, index) => (
                <div key={index} className="p-3 border rounded mb-3">
                    {!question.isEditing && (
                        <div id="question-preview-card">
                            <div className="d-flex w-100">
                                <h6 className="fw-bold">Question {index + 1}</h6>
                                <h6 className="ms-auto me-2">{question.points} pts</h6>
                            </div>
                            <hr />
                            <p><b>Text:</b> {question.questionText}</p>
                            <p><b>Type:</b> {question.questionType}</p>

                            {question.questionType === "MultipleChoice" && (
                                <div>
                                    <b>Options:</b>
                                    <ul>
                                        {question.options.map((option: { text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; isCorrect: any; }, optionIndex: Key | null | undefined) => (
                                            <li key={optionIndex}>
                                                <span>{option.text}</span>
                                                {option.isCorrect && <span className="text-success ms-2">(Correct)</span>}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => {
                                    updateQuestion(index, question)
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteQuestion(index)}
                            >
                                Delete
                            </button>
                        </div>
                    )}

                    {question.isEditing && editingQuestion && (

                        // Dynamically render the correct editor based on questionType
                        <>
                            <QuestionEditorTopControls question={editingQuestion} setQuestion={setEditingQuestion} />
                            <hr />

                            {editingQuestion.questionType === "MultipleChoice" && (
                                <MultipleChoiceEditor
                                    question={editingQuestion}
                                    setQuestion={setEditingQuestion}
                                    updateQuestionCallback={() => updateQuestion(index, editingQuestion)}
                                    cancelUpdateCallback={() => updateQuestion(index, question)}
                                />
                            )}
                            {editingQuestion.questionType === "FillInTheBlank" && (
                                <FillInTheBlankEditor
                                    question={editingQuestion}
                                    setQuestion={setEditingQuestion}
                                    updateQuestionCallback={() => updateQuestion(index, editingQuestion)}
                                    cancelUpdateCallback={() => updateQuestion(index, question)}
                                />
                            )}
                            {editingQuestion.questionType === "TrueFalse" && (
                                <TrueFalseEditor
                                    question={editingQuestion}
                                    setQuestion={setEditingQuestion}
                                    updateQuestionCallback={() => updateQuestion(index, editingQuestion)}
                                    cancelUpdateCallback={() => updateQuestion(index, question)}
                                />
                            )}

                            {/* Question Save & Cancel Buttons */}
                            <QuestionEditorButtons
                                cancelUpdateCallback={() => updateQuestion(index, question)}
                                updateQuestionCallback={() => updateQuestion(index, editingQuestion)}
                            />
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

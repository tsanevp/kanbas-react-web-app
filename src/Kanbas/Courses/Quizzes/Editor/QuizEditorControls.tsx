import { AiOutlineStop } from "react-icons/ai";
import { IoCheckmarkCircleSharp, IoEllipsisVertical } from "react-icons/io5";

export default function QuizEditorControls({ quiz }: { quiz: any }) {
    return (
        <div
            id="wd-modules-controls"
            className="d-flex justify-content-end align-items-center text-nowrap fs-5"
        >
            {/* Published Status */}
            <div id="wd-add-quiz" className="mx-2 d-flex align-items-center">
                {quiz.published ? (
                    <IoCheckmarkCircleSharp className="text-success me-1" />
                ) : (
                    <AiOutlineStop className="text-danger me-1" />
                )}
                <span>Published</span>
            </div>

            {/* Points */}
            <div id="wd-add-quiz" className="mx-2 d-flex align-items-center">
                <span>Points {getQuizPoints(quiz)}</span>
            </div>

            {/* Dropdown Menu */}
            <div className="dropdown mx-2">
                <button
                    id="wd-context-menu"
                    className="btn btn-sm btn-secondary"
                    type="button"
                    data-bs-toggle="dropdown"
                >
                    <IoEllipsisVertical />
                </button>
                <ul className="dropdown-menu">
                    <li className="m-3">
                        Edit
                    </li>
                </ul>
            </div>
        </div>

    );
}

function getQuizPoints(quiz: any) {
    return quiz.questions.reduce((sum: number, question: { points: any; }) => sum + (question.points || 0), 0);
}

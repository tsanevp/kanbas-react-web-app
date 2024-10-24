import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";

export default function QuizEditorControls() {
    return (
        <div id="wd-modules-controls" className="text-nowrap">
            <div className="dropdown d-inline me-1 float-end">
                <button id="wd-context-menu" className="btn btn-lg btn-secondary" type="button" data-bs-toggle="dropdown">
                    <IoEllipsisVertical className="fs-4" style={{ bottom: "1px" }} />
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <a id="wd-context-menu-edit-btn" className="dropdown-item" href="/">
                            Edit
                        </a>
                    </li>
                </ul>
            </div>

            <div id="wd-add-quiz" className="me-1 float-end">
                Points 0
            </div>
            
        </div>
    );
}

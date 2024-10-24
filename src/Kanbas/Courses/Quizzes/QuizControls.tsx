import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";

export default function QuizControls() {
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
                    <li>
                        <a id="wd-context-menu-delete-btn" className="dropdown-item" href="/">
                            Delete
                        </a>
                    </li>
                    <li>
                        <a id="wd-context-menu-publish-btn" className="dropdown-item" href="/">
                            Publish
                        </a>
                    </li>
                    <li>
                        <a id="wd-context-menu-copy-btn" className="dropdown-item" href="/">
                            Copy
                        </a>
                    </li>
                    <li>
                        <a id="wd-context-menu-sort-btn" className="dropdown-item" href="/">
                            Sort
                        </a>
                    </li>
                </ul>
            </div>

            <button id="wd-add-quiz" className="btn btn-lg btn-danger me-1 float-end">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Quiz
            </button>

            <div style={{ position: "relative", display: "inline-block", width: "50%" }}>
                <input
                    id="wd-search-quiz"
                    placeholder="Search for Quiz"
                    className="form-control form-control-lg"
                    style={{
                        borderRadius: ".3rem",
                        border: "1px solid #6c757d",
                        height: "calc(1.5em + .75rem + 2px)",
                        width: "100%"
                    }}
                />
            </div>
        </div>
    );
}

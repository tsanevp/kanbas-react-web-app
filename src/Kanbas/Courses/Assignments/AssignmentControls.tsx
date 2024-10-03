import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

export default function AssignmentControls() {
    return (
        <div id="wd-modules-controls" className="text-nowrap">

            <button id="wd-add-assignment" className="btn btn-lg btn-danger me-1 float-end">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Assignment
            </button>

            <button id="wd-add-assignment-group" className="btn btn-lg btn-secondary me-1 float-end">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Group
            </button>

            <div style={{ position: "relative", display: "inline-block", width: "50%" }}>
            <label
                htmlFor="wd-search-assignment"
                style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "1.5rem", 
                    color: "#6c757d"
            }}>
                <CiSearch />
            </label>
            
            <input
                id="wd-search-assignment"
                placeholder="Search..."
                className="form-control form-control-lg ps-5"
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

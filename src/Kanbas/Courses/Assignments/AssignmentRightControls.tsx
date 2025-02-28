import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";

export default function AssignmentRightControls({ assignmentId, deleteAssignments }:
    Readonly<{
        assignmentId: string;
        deleteAssignments: (assignmentId: string) => void;
    }>
) {
    return (
        <div className="d-flex">
            <GreenCheckmark />
            <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteAssignments(assignmentId)} />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}

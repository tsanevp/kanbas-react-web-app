import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import GreenCheckmark from "./GreenCheckmark";
import { useSelector } from "react-redux";

export default function ModuleControlButtons({ moduleId, deleteModule, editModule }:
    {
        moduleId: string;
        deleteModule: (moduleId: string) => void;
        editModule: (moduleId: string) => void;
    }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    return (
        <>
            {currentUser.role === "FACULTY" && (
                <div className="float-end">
                    <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-2" />
                    <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)} />
                    <GreenCheckmark />
                    <GoPlus className="fs-4" />
                    <IoEllipsisVertical className="fs-4" />
                </div>
            )}
        </>
    );
}

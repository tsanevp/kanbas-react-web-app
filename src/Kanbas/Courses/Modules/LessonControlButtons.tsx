import { IoEllipsisVertical } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import GreenCheckmark from "./GreenCheckmark";

export default function LessonControlButtons() {
    return (
        <div className="float-end">
            <GreenCheckmark />
            <GoPlus className="fs-4" />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}

import { BsGripVertical } from 'react-icons/bs';
import { RiNewspaperLine } from "react-icons/ri";

export default function AssignmentLeftControls() {
    return (
        <div className="d-flex">
            <BsGripVertical className="fs-4" />
            <RiNewspaperLine className="fs-4 mx-4" style={{color: "green"}} />
        </div>
    );
}

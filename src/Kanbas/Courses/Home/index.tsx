import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {

    return (
        <div className="d-flex" id="wd-home">
            <div className="flex-fill">
                <Modules />
            </div>
            <div className="d-none d-lg-block" style={{ marginLeft: "50px" }}>
                <CourseStatus />
            </div>
        </div>
    );
}

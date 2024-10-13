import { Link } from "react-router-dom";
import * as db from "../Database";
import "./styles.css"

export default function Dashboard() {
    const courses = db.courses;
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
            <div id="wd-dashboard-courses" className="row row-cols-1 row-cols-md-5 g-4">
                {courses.map((course) => (
                    <div key={course._id} className="wd-dashboard-course col" style={{ width: "262px" }}>
                        <div className="card rounded-2 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to={`/Kanbas/Courses/${course._id}/Home`}>
                                <img src={course.imgUrl} width="100%" height={140} alt="the course icon" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title ellipsis">
                                        {course.name}
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text ellipsis">
                                        {`${course.number}.${course.department}`}
                                    </p>
                                    <div className="wd-dashboard-course-title card-subtext ellipsis" title={course.description}>
                                        {course.description}
                                    </div>
                                </div>
                            </Link>
                            <div className="card-footer-icons">
                                <Link to={`/Kanbas/Courses/${course._id}/Assignments`}>
                                    <img src="./images/Assignment.png" style={{ width: "18px", marginLeft: "5px" }} alt="Assignments" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

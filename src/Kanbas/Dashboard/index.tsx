import { Link } from "react-router-dom";
import "./styles.css"

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses" className="row row-cols-1 row-cols-md-5 g-4">
                <div className="row row-cols-1 row-cols-md-5 g-4 course-card">
                    <div className="wd-dashboard-course col" style={{ width: "262px" }}>
                        <div className="card rounded-2 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                                <img src="./images/CSharpCourse.webp" width="100%" height={140} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title ellipsis">
                                        CS6240 21487 Parallel Data Processing SEC 02 Fall 2024
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text ellipsis">
                                        CS5610.20596.202510
                                    </p>
                                    <div className="wd-dashboard-course-title card-subtext ellipsis" title="202510_2 Fall 2024 Semester Full Term Grad">
                                        202510_2 Fall 2024 Semester Full Term Grad
                                    </div>
                                </div>
                            </Link>
                            <div className="card-footer-icons">
                                <Link to="/Kanbas/Courses/1234/Assignments">
                                    <img src="./images/Assignment.png" style={{ width: "18px", marginLeft: "5px" }} alt="Assignments" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-md-5 g-4 course-card">
                    <div className="wd-dashboard-course col" style={{ width: "262px" }}>
                        <div className="card rounded-2 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                                <img src="./images/AWSCourse.png" width="100%" height={140} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title ellipsis">
                                        CS5001 AWS 101
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text ellipsis">
                                        CS5001.20596.202510
                                    </p>
                                    <div className="wd-dashboard-course-title card-subtext ellipsis" title="202510_2 Fall 2024 Semester Full Term Grad">
                                        202510_2 Fall 2024 Semester Full Term Grad
                                    </div>
                                </div>
                            </Link>
                            <div className="card-footer-icons">
                                <Link to="/Kanbas/Courses/1234/Assignments">
                                    <img src="./images/Assignment.png" style={{ width: "18px", marginLeft: "5px" }} alt="Assignments" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-md-5 g-4 course-card">
                    <div className="wd-dashboard-course col" style={{ width: "262px" }}>
                        <div className="card rounded-2 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                                <img src="./images/CSharpCourse.webp" width="100%" height={140} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title ellipsis">
                                        CS5002 C# 101
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text ellipsis">
                                        CS5002.20596.202510
                                    </p>
                                    <div className="wd-dashboard-course-title card-subtext ellipsis" title="202510_2 Fall 2024 Semester Full Term Grad">
                                        202510_2 Fall 2024 Semester Full Term Grad
                                    </div>
                                </div>
                            </Link>
                            <div className="card-footer-icons">
                                <Link to="/Kanbas/Courses/1234/Assignments">
                                    <img src="./images/Assignment.png" style={{ width: "18px", marginLeft: "5px" }} alt="Assignments" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-md-5 g-4 course-card">
                    <div className="wd-dashboard-course col" style={{ width: "262px" }}>
                        <div className="card rounded-2 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                                <img src="./images/GoCourse.png" width="100%" height={140} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title ellipsis">
                                        CS5003 GoLang 101
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text ellipsis">
                                        CS5003.20596.202510
                                    </p>
                                    <div className="wd-dashboard-course-title card-subtext ellipsis" title="202510_2 Fall 2024 Semester Full Term Grad">
                                        202510_2 Fall 2024 Semester Full Term Grad
                                    </div>
                                </div>
                            </Link>
                            <div className="card-footer-icons">
                                <Link to="/Kanbas/Courses/1234/Assignments">
                                    <img src="./images/Assignment.png" style={{ width: "18px", marginLeft: "5px" }} alt="Assignments" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-md-5 g-4 course-card">
                    <div className="wd-dashboard-course col" style={{ width: "262px" }}>
                        <div className="card rounded-2 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                                <img src="./images/NodeJsCourse.png" width="100%" height={140} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title ellipsis">
                                        CS5004 NodeJs 101
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text ellipsis">
                                        CS5004.20596.202510
                                    </p>
                                    <div className="wd-dashboard-course-title card-subtext ellipsis" title="202510_2 Fall 2024 Semester Full Term Grad">
                                        202510_2 Fall 2024 Semester Full Term Grad
                                    </div>
                                </div>
                            </Link>
                            <div className="card-footer-icons">
                                <Link to="/Kanbas/Courses/1234/Assignments">
                                    <img src="./images/Assignment.png" style={{ width: "18px", marginLeft: "5px" }} alt="Assignments" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-md-5 g-4 course-card">
                    <div className="wd-dashboard-course col" style={{ width: "262px" }}>
                        <div className="card rounded-2 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                                <img src="./images/PythonCourse.png" width="100%" height={140} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title ellipsis">
                                        CS5005 Python 101
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text ellipsis">
                                        CS5005.20596.202510
                                    </p>
                                    <div className="wd-dashboard-course-title card-subtext ellipsis" title="202510_2 Fall 2024 Semester Full Term Grad">
                                        202510_2 Fall 2024 Semester Full Term Grad
                                    </div>
                                </div>
                            </Link>
                            <div className="card-footer-icons">
                                <Link to="/Kanbas/Courses/1234/Assignments">
                                    <img src="./images/Assignment.png" style={{ width: "18px", marginLeft: "5px" }} alt="Assignments" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-md-5 g-4 course-card">
                    <div className="wd-dashboard-course col" style={{ width: "262px" }}>
                        <div className="card rounded-2 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                                <img src="./images/ReactCourse.png" width="100%" height={140} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title ellipsis">
                                        CS5006 React JS 101
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text ellipsis">
                                        CS5006.20596.202510
                                    </p>
                                    <div className="wd-dashboard-course-title card-subtext ellipsis" title="202510_2 Fall 2024 Semester Full Term Grad">
                                        202510_2 Fall 2024 Semester Full Term Grad
                                    </div>
                                </div>
                            </Link>
                            <div className="card-footer-icons">
                                <Link to="/Kanbas/Courses/1234/Assignments">
                                    <img src="./images/Assignment.png" style={{ width: "18px", marginLeft: "5px" }} alt="Assignments" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-md-5 g-4 course-card">
                    <div className="wd-dashboard-course col" style={{ width: "262px" }}>
                        <div className="card rounded-2 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                                <img src="./images/VSCodeCourse.png" width="100%" height={140} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title ellipsis">
                                        CS5007 VS Code 101
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text ellipsis">
                                        CS5007.20596.202510
                                    </p>
                                    <div className="wd-dashboard-course-title card-subtext ellipsis" title="202510_2 Fall 2024 Semester Full Term Grad">
                                        202510_2 Fall 2024 Semester Full Term Grad
                                    </div>
                                </div>
                            </Link>
                            <div className="card-footer-icons">
                                <Link to="/Kanbas/Courses/1234/Assignments">
                                    <img src="./images/Assignment.png" style={{ width: "18px", marginLeft: "5px" }} alt="Assignments" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

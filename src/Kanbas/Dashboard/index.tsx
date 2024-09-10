import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <img src="./images/AWSCourse.png" width={200} alt="aws course" />
                    <div>
                        <Link className="wd-dashboard-course-link"
                            to="/Kanbas/Courses/1234/Home">
                            CS5001 AWS 101
                        </Link>
                        <p className="wd-dashboard-course-title">
                            Cloud Developer 101
                        </p>
                        <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
                    </div>
                </div>
                <div className="wd-dashboard-course">
                    <img src="./images/CSharpCourse.webp" width={200} alt="c sharp course" />
                    <div>
                        <Link className="wd-dashboard-course-link"
                            to="/Kanbas/Courses/1234/Home">
                            CS5002 C# 101
                        </Link>
                        <p className="wd-dashboard-course-title">
                            Learning The Basics of C# & .NET
                        </p>
                        <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
                    </div>
                </div>
                <div className="wd-dashboard-course">
                    <img src="./images/GoCourse.png" width={200} alt="go course" />
                    <div>
                        <Link className="wd-dashboard-course-link"
                            to="/Kanbas/Courses/1234/Home">
                            CS5003 GoLang 101
                        </Link>
                        <p className="wd-dashboard-course-title">
                            Learning The Basics of Go
                        </p>
                        <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
                    </div>
                </div>
                <div className="wd-dashboard-course">
                    <img src="./images/NodeJsCourse.png" width={200} alt="node js course" />
                    <div>
                        <Link className="wd-dashboard-course-link"
                            to="/Kanbas/Courses/1234/Home">
                            CS5004 NodeJs 101
                        </Link>
                        <p className="wd-dashboard-course-title">
                            Learning Backend Development
                        </p>
                        <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
                    </div>
                </div>
                <div className="wd-dashboard-course">
                    <img src="./images/PythonCourse.png" width={200} alt="python course" />
                    <div>
                        <Link className="wd-dashboard-course-link"
                            to="/Kanbas/Courses/1234/Home">
                            CS5005 Python 101
                        </Link>
                        <p className="wd-dashboard-course-title">
                            Learning Python & Leetcode
                        </p>
                        <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
                    </div>
                </div>
                <div className="wd-dashboard-course">
                    <img src="./images/ReactCourse.png" width={200} alt="react course" />
                    <div>
                        <Link className="wd-dashboard-course-link"
                            to="/Kanbas/Courses/1234/Home">
                            CS5006 React JS 101
                        </Link>
                        <p className="wd-dashboard-course-title">
                            Full Stack software developer
                        </p>
                        <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
                    </div>
                </div>
                <div className="wd-dashboard-course">
                    <img src="./images/VSCodeCourse.png" width={200} alt="vs code course" />
                    <div>
                        <Link className="wd-dashboard-course-link"
                            to="/Kanbas/Courses/1234/Home">
                            CS5007 VS Code 101
                        </Link>
                        <p className="wd-dashboard-course-title">
                            Full Stack software developer in VS Code
                        </p>
                        <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

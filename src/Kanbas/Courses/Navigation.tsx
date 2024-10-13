import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router";

export default function CoursesNavigation() {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link key={link} to={`/Kanbas/Courses/${cid}/${link}`} id={`wd-course-${link.toLowerCase()}-link`} className={`list-group-item  ${pathname.includes(link) ? "active" : "text-danger"} border border-0`}>
                    {link}
                </Link>    
            ))}
        </div>
    );
}
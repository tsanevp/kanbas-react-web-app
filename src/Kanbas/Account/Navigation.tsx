import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function AccountNavigation() {
    const { pathname } = useLocation();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const links = currentUser ? ["Profile", "Users"] : ["Signin", "Signup"];

    return (
        <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => {
                if (link === "Users" && currentUser && currentUser.role !== "ADMIN") {
                    return null; // Skip rendering this link
                }
                return (
                    <Link
                        key={link}
                        to={`/Kanbas/Account/${link}`}
                        className={`list-group-item ${pathname.includes(link) ? "active" : "text-danger"} border border-0`}
                    >
                        {link}
                    </Link>
                );
            })}
        </div>
    );
}

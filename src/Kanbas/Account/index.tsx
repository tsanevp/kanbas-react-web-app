import { Routes, Route, Navigate } from "react-router";
import AccountNavigation from "./Navigation";
import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import { useSelector } from "react-redux";
import Users from "./Users";
import ProtectedRoute from "./ProtectedRoute";

export default function Account() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    return (
        <div id="wd-account-screen" className="d-flex">
            <div>
                <AccountNavigation />
            </div>
            <div style={{ marginLeft: "20px" }}>
                <Routes>
                    <Route path="/" element={<Navigate to={currentUser ? "/Kanbas/Account/Profile" : "/Kanbas/Account/Signin"} />} />
                    <Route path="/Signin" element={<Signin />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/Users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                    <Route path="/Users/:uid" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                </Routes>
            </div>
        </div>
    );
}

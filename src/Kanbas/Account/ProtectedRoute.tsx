import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }: Readonly<{ children: any }>) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    if (currentUser) {
        return children;
    } else {
        return <Navigate to="/Kanbas/Account/Signin" />;
    }
}
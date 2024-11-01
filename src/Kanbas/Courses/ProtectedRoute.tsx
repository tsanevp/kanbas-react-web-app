import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
export default function ProtectedRoute({ children, }: { children: any }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const { cid } = useParams();

    const isEnrolledInCourse = enrollments.some((enrollment: any) => enrollment.course === cid && enrollment.user === currentUser._id);
    
    if (isEnrolledInCourse) {
        return children;
    } else {
        return <Navigate to="/Kanbas/Dashboard" />;
    }
}
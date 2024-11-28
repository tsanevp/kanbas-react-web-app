import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import * as userClient from "../Account/client";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }: Readonly<{ children: any }>) {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch courses on component mount
    useEffect(() => {
        const findCoursesForUser = async () => {
            try {
                const courses = await userClient.findCoursesForUser(currentUser._id);
    
                setCourses(courses);
            } catch (error) {
                setError("Failed to fetch courses.");
            } finally {
                setLoading(false);
            }
        };

        findCoursesForUser();
    }, []);

    // If loading or there's an error, return a loading or error state
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Check if the user is enrolled in the course
    const isEnrolledInCourse = courses.some((course: any) => course._id === cid);

    if (isEnrolledInCourse || currentUser.role === "FACULTY") {
        return children;
    } else {
        return <Navigate to="/Kanbas/Dashboard" />;
    }
}
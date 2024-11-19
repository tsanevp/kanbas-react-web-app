import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import * as userClient from "../Account/client";

export default function ProtectedRoute({ children }: Readonly<{ children: any }>) {
    const { cid } = useParams();
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const fetchedCourses = await userClient.findMyCourses();
                setCourses(fetchedCourses);
            } catch (error) {
                setError("Failed to fetch courses.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
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

    if (isEnrolledInCourse) {
        return children;
    } else {
        return <Navigate to="/Kanbas/Dashboard" />;
    }
}
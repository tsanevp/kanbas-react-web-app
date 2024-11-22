import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigaton from "./Navigation"
import Courses from "./Courses";
import * as userClient from "./Account/client";
import { useEffect, useState } from "react";
import "./styles.css";
import ProtectedRoute from "./Account/ProtectedRoute";
import ProtectedCourseRoute from "./Courses/ProtectedRoute";
import Session from "./Account/Session";
import { useSelector } from "react-redux";
import * as courseClient from "./Courses/client";


export default function Kanbas() {
    const [courses, setCourses] = useState<any[]>([]);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const fetchCourses = async () => {
        let courses = [];
        try {
            courses = await userClient.findMyCourses();
        } catch (error) {
            console.error(error);
        }
        setCourses(courses);
    };
    useEffect(() => {
        fetchCourses();
    }, [currentUser]);
    const [course, setCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", department: "000",
        credits: 0, imgUrl: "./images/ReactCourse.png", description: "New Description"
    });
    const addNewCourse = async () => {
        const newCourse = await userClient.createCourse(course);
        setCourses([...courses, { ...course, ...newCourse }]);
    };
    const deleteCourse = async (courseId: string) => {
        await courseClient.deleteCourse(courseId);
        setCourses(courses.filter((course) => course._id !== courseId));
    };
    const updateCourse = async () => {
        try {
            await courseClient.updateCourse(course);
            setCourses(
                courses.map((c) => {
                    if (c._id === course._id) {
                        return course;
                    } else {
                        return c;
                    }
                })
            );
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Session>
            <div id="wd-kanbas">
                <KanbasNavigaton />
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Account" />} />
                        <Route path="/Account/*" element={<Account />} />
                        <Route
                            path="/Dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard
                                        courses={courses}
                                        course={course}
                                        setCourse={setCourse}
                                        setCourses={setCourses}
                                        addNewCourse={addNewCourse}
                                        deleteCourse={deleteCourse}
                                        updateCourse={updateCourse}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/Courses/:cid/*"
                            element={
                                <ProtectedRoute>
                                    <ProtectedCourseRoute>
                                        <Courses courses={courses} />
                                    </ProtectedCourseRoute>
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/Calendar" element={<h1>Calendar</h1>} />
                        <Route path="/Inbox" element={<h1>Inbox</h1>} />
                    </Routes>
                </div>
            </div>
        </Session>
    );
}
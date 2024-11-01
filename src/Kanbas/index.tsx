import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigaton from "./Navigation"
import Courses from "./Courses";
import * as db from "./Database";
import { useState } from "react";
import "./styles.css";
import { Provider } from "react-redux";
import store from "./store";
import ProtectedRoute from "./Account/ProtectedRoute";
import ProtectedCourseRoute from "./Courses/ProtectedRoute";

export default function Kanbas() {
    const [courses, setCourses] = useState<any[]>(db.courses);
    const [course, setCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", department: "000",
        credits: 0, imgUrl: "./images/ReactCourse.png", description: "New Description"
    });
    const addNewCourse = () => {
        const newCourse = {
            ...course,
            _id: new Date().getTime().toString()
        };
        setCourses([...courses, { ...course, ...newCourse }]);
    };
    const deleteCourse = (courseId: string) => {
        setCourses(courses.filter((course) => course._id !== courseId));
    };
    const updateCourse = () => {
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                } else {
                    return c;
                }
            })
        );
    };
    return (
        <Provider store={store}>
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
        </Provider>
    );
}
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import CoursesNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import QuizEditor from "./Quizzes/Editor";
import Quizzes from "./Quizzes";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useEffect, useState } from "react";
import * as client from "./client";
import QuizDetails from "./Quizzes/QuizDetailScreen";
import QuizTaking from "./Quizzes/TakingQuiz/QuizTaking";

export default function Courses({ courses }: Readonly<{ courses: any[]; }>) {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const [users, setUsers] = useState<any[]>([]);

    const course = courses.find((course) => course._id === cid);
    const fetchUsers = async () => {
        if (!cid) return;
        const users = await client.findUsersForCourse(cid);
        setUsers(users);
    };
    useEffect(() => {
        fetchUsers();
    }, [cid]);

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course?.name} &gt; {pathname.split('/')[4]}
            </h2>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CoursesNavigation />
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Quizzes" element={<Quizzes />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />                        
                        <Route path="Quizzes/:qid" element={<QuizDetails />} />
                        <Route path="Quizzes/:qid/Editor" element={<QuizEditor />} />
                        <Route path="Quizzes/:qid/InProgress" element={<QuizTaking />} />
                        <Route path="Quizzes/:qid/Preview" element={<QuizTaking />} />
                        <Route path="People" element={<PeopleTable users={users} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

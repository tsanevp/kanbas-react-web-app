import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import * as enrollmentClient from "../Enrollments/client";
import { useEffect, useState } from "react";

export default function PeopleTable() {
    const { cid } = useParams();

    const [enrollments, setEnrollments] = useState<any[]>([]);
    const fetchEnrollments = async () => {
        let enrollments = [];
        try {
            enrollments = await enrollmentClient.getAllEnrollmentsForCourse(cid);
        } catch (error) {
            console.error(error);
        }
        setEnrollments(enrollments);
    };
    useEffect(() => {
        fetchEnrollments();
    });

    return (
        <div id="wd-people-table">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Login ID</th>
                        <th>Section</th>
                        <th>Role</th>
                        <th>Last Activity</th>
                        <th>Total Activity</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments
                        .map((user: any) => (
                            <tr key={user._id}>
                                <td className="wd-full-name text-nowrap">
                                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                                    <span className="wd-first-name">{user.firstName}</span>
                                    <span className="wd-last-name">{user.lastName}</span>
                                </td>
                                <td className="wd-login-id">{user.loginId}</td>
                                <td className="wd-section">{user.section}</td>
                                <td className="wd-role">{user.role}</td>
                                <td className="wd-last-activity">{user.lastActivity}</td>
                                <td className="wd-total-activity">{user.totalActivity}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
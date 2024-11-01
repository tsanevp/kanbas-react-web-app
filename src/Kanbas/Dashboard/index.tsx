import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.css"
import { addEnrollment, removeEnrollment } from "../Courses/reducer";
import { useState } from "react";

export default function Dashboard({
    courses,
    course,
    setCourse,
    addNewCourse,
    deleteCourse, updateCourse
}: {
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (course: any) => void;
    updateCourse: () => void;
}) {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const [showCourses, setShowCourses] = useState(false);

    const enrolledCourses = courses
        .filter((course) =>
            enrollments.some(
                (enrollment: { user: any; course: any; }) =>
                    enrollment.user === currentUser._id &&
                    enrollment.course === course._id
            )
        );

    const unenrolledCourses = courses.filter((course) =>
        !enrollments.some(
            (enrollment: { user: any; course: any; }) =>
                enrollment.user === currentUser._id &&
                enrollment.course === course._id
        )
    );

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            {currentUser?.role === "FACULTY" && (
                <>
                    <h5>New Course
                        <button
                            className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={addNewCourse}
                        >
                            Add
                        </button>
                        <button className="btn btn-warning float-end me-2"
                            onClick={updateCourse} id="wd-update-course-click">
                            Update
                        </button>
                    </h5>
                    <br />
                    <input value={course.name} className="form-control mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                    <textarea value={course.description} className="form-control" onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                    <hr />
                </>
            )}

            {currentUser?.role === "STUDENT" && (
                <>
                    <button
                        className="btn btn-primary float-end me-4"
                        id="wd-add-new-course-click"
                        onClick={() => setShowCourses(!showCourses)}
                    >
                        Enrollments
                    </button>
                </>
            )}
            <h2 id="wd-dashboard-published">{!showCourses ? `Published Courses (${enrolledCourses.length})` : `All Courses (${courses.length})`}</h2> <hr />
            <div id="wd-dashboard-courses" className="row row-cols-1 row-cols-md-5 g-4">
                {showCourses && (unenrolledCourses
                    .map((course) => (
                        <div key={course._id} className="wd-dashboard-course col" style={{ width: "262px" }}>
                            <div className="card rounded-2 overflow-hidden">
                                <Link className="wd-dashboard-course-link text-decoration-none text-dark" to={`/Kanbas/Courses/${course._id}/Home`}>
                                    <img src={course.imgUrl} width="100%" height={140} alt="the course icon" />
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title ellipsis">
                                            {course.name}
                                        </h5>
                                        <p className="wd-dashboard-course-title card-text ellipsis">
                                            {`${course.number}.${course.department}`}
                                        </p>
                                        <div className="wd-dashboard-course-title card-subtext ellipsis" title={course.description}>
                                            {course.description}
                                        </div>
                                    </div>
                                </Link>
                                <div className="card-footer-icons">
                                    <Link to={`/Kanbas/Courses/${course._id}/Assignments`}>
                                        <img src="./images/Assignment.png" style={{ width: "18px", marginLeft: "5px" }} alt="Assignments" />
                                    </Link>
                                    {currentUser?.role === "STUDENT" && (
                                        <>
                                            <button
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    dispatch(addEnrollment({ currentUserId: currentUser._id, enrollment: course._id }));
                                                }}
                                                className="btn btn-sm btn-success me-2 float-end"
                                                id="wd-enroll-in-course-click"
                                            >
                                                Enroll
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )))
                }

                {enrolledCourses
                    .map((course) => (
                        <div key={course._id} className="wd-dashboard-course col" style={{ width: "262px" }}>
                            <div className="card rounded-2 overflow-hidden">
                                <Link className="wd-dashboard-course-link text-decoration-none text-dark" to={`/Kanbas/Courses/${course._id}/Home`}>
                                    <img src={course.imgUrl} width="100%" height={140} alt="the course icon" />
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title ellipsis">
                                            {course.name}
                                        </h5>
                                        <p className="wd-dashboard-course-title card-text ellipsis">
                                            {`${course.number}.${course.department}`}
                                        </p>
                                        <div className="wd-dashboard-course-title card-subtext ellipsis" title={course.description}>
                                            {course.description}
                                        </div>
                                    </div>
                                </Link>
                                <div className="card-footer-icons">
                                    <Link to={`/Kanbas/Courses/${course._id}/Assignments`}>
                                        <img src="./images/Assignment.png" style={{ width: "18px", marginLeft: "5px" }} alt="Assignments" />
                                    </Link>
                                    {currentUser?.role === "FACULTY" && (
                                        <>
                                            <button
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    deleteCourse(course._id);
                                                }}
                                                className="btn btn-sm btn-danger me-2 float-end"
                                                id="wd-delete-course-click"
                                            >
                                                Delete
                                            </button>
                                            <button id="wd-edit-course-click"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setCourse(course);
                                                }}
                                                className="btn btn-sm btn-warning me-2 float-end"
                                            >
                                                Edit
                                            </button>
                                        </>
                                    )}

                                    {currentUser?.role === "STUDENT" && (
                                        <>
                                            <button
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    dispatch(removeEnrollment({ currentUserId: currentUser._id, courseId: course._id }));
                                                }}
                                                className="btn btn-sm btn-danger me-2 float-end"
                                                id="wd-enroll-in-course-click"
                                            >
                                                UnEnroll
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div >
    );
}

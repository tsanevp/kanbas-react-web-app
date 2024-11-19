import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.css"
import { useEffect, useState } from "react";
import * as courseClient from "../Courses/client";
import * as enrollmentClient from "../Courses/Enrollments/client";


export default function Dashboard({
    courses,
    course,
    setCourse,
    setCourses,
    addNewCourse,
    deleteCourse, updateCourse
}: Readonly<{
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    setCourses: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (course: any) => void;
    updateCourse: () => void;
}>) {
    const [allCourses, setAllCourses] = useState<any[]>([]);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [showCourses, setShowCourses] = useState(false);

    const fetchAllCourses = async () => {
        let courses = [];
        try {
            courses = await courseClient.fetchAllCourses();
        } catch (error) {
            console.error(error);
        }
        setAllCourses(courses);
    };
    useEffect(() => {
        fetchAllCourses();
    }, []);

    const unenrolledCourses = allCourses.filter(
        (course) =>
            !courses.some((enrolledCourse: { _id: string }) => enrolledCourse._id === course._id)
    );

    const removeEnrollment = async (courseId: string) => {
        try {
            await enrollmentClient.deleteEnrollment(courseId);
            setCourses((prevCourses: any) => prevCourses.filter((course: any) => course._id !== courseId));
        } catch (error) {
            console.error('Error removing enrollment:', error);
        }
    };

    const addEnrollment = async (courseId: string) => {
        try {
            await enrollmentClient.createEnrollment(courseId);
            setCourses([...courses, allCourses.find((course) => course._id === courseId)]);
        } catch (error) {
            console.error('Error enrolling in course:', error);
        }
    };

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            {currentUser?.role === "FACULTY" && (
                <>
                    <div className="d-flex w-100">
                        <h5>New Course</h5>
                        <button
                            className="btn btn-primary ms-auto"
                            id="wd-add-new-course-click"
                            onClick={addNewCourse}
                        >
                            Add
                        </button>
                        <button className="btn btn-warning float-end ms-2"
                            onClick={updateCourse} id="wd-update-course-click">
                            Update
                        </button>
                    </div>
                    <br />
                    <input value={course.name} className="form-control mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                    <textarea value={course.description} className="form-control" onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                    <hr />
                </>
            )}

            {currentUser?.role === "STUDENT" && (
                <button
                    className="btn btn-primary float-end me-4"
                    id="wd-add-new-course-click"
                    onClick={() => setShowCourses(!showCourses)}
                >
                    Enrollments
                </button>
            )}
            <h2 id="wd-dashboard-published">{!showCourses ? `Published Courses (${courses.length})` : `All Courses (${allCourses.length})`}</h2> <hr />
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
                                        <button
                                            onClick={(event) => {
                                                event.preventDefault();
                                                addEnrollment(course._id);
                                            }}
                                            className="btn btn-sm btn-success me-2 float-end"
                                            id="wd-enroll-in-course-click"
                                        >
                                            Enroll
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )))
                }

                {courses
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
                                        <button
                                            onClick={(event) => {
                                                event.preventDefault();
                                                removeEnrollment(course._id);
                                            }}
                                            className="btn btn-sm btn-danger me-2 float-end"
                                            id="wd-enroll-in-course-click"
                                        >
                                            UnEnroll
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div >
    );
}

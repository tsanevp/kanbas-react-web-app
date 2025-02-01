import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.css"

export default function Dashboard({
    courses,
    course,
    setCourse,
    addNewCourse,
    deleteCourse,
    updateCourse,
    enrolling,
    setEnrolling,
    updateEnrollment
}: Readonly<{
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (course: any) => void;
    updateCourse: () => void;
    enrolling: boolean;
    setEnrolling: (enrolling: boolean) => void;
    updateEnrollment: (courseId: string, enrolled: boolean) => void;
}>) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">
                Dashboard
                <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary me-4" >
                    {enrolling ? "My Courses" : "All Courses"}
                </button>
            </h1>
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
            <h2 id="wd-dashboard-published">{!enrolling ? `Published Courses (${courses.length})` : `All Courses (${courses.length})`}</h2> <hr />
            <div id="wd-dashboard-courses" className="row row-cols-1 row-cols-md-5 g-4">
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
                                    {enrolling && (
                                        <button onClick={(event) => {
                                            event.preventDefault();
                                            updateEnrollment(course._id, !course.enrolled);
                                        }}
                                            className={`btn btn-sm ${course.enrolled ? "btn-danger" : "btn-success"} me-2 float-end`} >
                                            {course.enrolled ? "Unenroll" : "Enroll"}
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

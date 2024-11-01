import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";


const initialState = {
    enrollments: enrollments
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        addEnrollment: (state, { payload: { currentUserId, enrollment } }) => {
            const newEnrollment = {
                _id: new Date().getTime().toString(), 
                user: currentUserId,
                course: enrollment
            };
            state.enrollments.push(newEnrollment);
        },
        removeEnrollment: (state, { payload: { currentUserId, courseId } }) => {
            state.enrollments = state.enrollments.filter(
                (enrollment: any) => !(enrollment.course === courseId && enrollment.user === currentUserId)
            );
        }
    },
});

export const { addEnrollment, removeEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
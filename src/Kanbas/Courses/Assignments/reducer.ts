import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

const initialState = {
    assignments: assignments,
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignments: (state, { payload: assignment }) => {
            const newAssignment: any = 
            {
                _id: new Date().getTime().toString(),
                title: assignment.title,
                course:assignment.course,
                description: assignment.description,
                points: assignment.points,
                assignmentGroup: assignment.assignmentGroup,
                displayGradeAs: assignment.displayGradeAs,
                submissionType: assignment.submissionType,
                onlineEntryOptions: assignment.onlineEntryOptions,
                assignTo: assignment.assignTo,
                dueDate: assignment.dueDate,
                availableFrom: assignment.availableFrom,
                availableUntil: assignment.availableUntil
            }
            state.assignments = [...state.assignments, newAssignment] as any;
        },
        deleteAssignments: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (a: any) => a._id !== assignmentId);
        },
        updateAssignments: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((a: any) =>
                a._id === assignment._id ? assignment : a
            ) as any;
        },
        editAssignments: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.map((a: any) =>
                a._id === assignmentId ? { ...a, editing: true } : a
            ) as any;
        },
    },
});

export const { addAssignments, deleteAssignments, updateAssignments, editAssignments } =
assignmentsSlice.actions;
export default assignmentsSlice.reducer;


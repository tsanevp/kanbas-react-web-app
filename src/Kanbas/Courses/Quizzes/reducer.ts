import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [],
};

const quizsSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
        addQuizzes: (state, { payload: quiz }) => {
            const newQuiz: any =
            {
                _id: quiz._id,
                published: quiz.published,
                course: quiz.course,
                title: quiz.title,
                description: quiz.description,
                assignTo: quiz.assignTo,
                quizType: quiz.quizType,
                points: quiz.points,
                questionCount: quiz.questionCount,
                assignmentGroup: quiz.assignmentGroup,
                shuffleAnswers: quiz.shuffleAnswers,
                timeLimit: quiz.timeLimit,
                multipleAttempts: quiz.multipleAttempts,
                showCorrectAnswers: quiz.showCorrectAnswers,
                accessCode: quiz.accessCode,
                oneQuestionAtATime: quiz.oneQuestionAtATime,
                webcamRequired: quiz.webcamRequired,
                lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering,
                dueDate: quiz.dueDate,
                availableFrom: quiz.availableFrom,
                availableUntil: quiz.availableUntil
            }
            state.quizzes = [...state.quizzes, newQuiz] as any;
        },
        deleteQuizzes: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter(
                (q: any) => q._id !== quizId);
        },
        updateQuizzes: (state, { payload: quiz }) => {
            state.quizzes = state.quizzes.map((q: any) =>
                q._id === quiz._id ? quiz : q
            ) as any;
        },
        editQuizzes: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.map((q: any) =>
                q._id === quizId ? { ...q, editing: true } : q
            ) as any;
        },
    },
});

export const { setQuizzes, addQuizzes, deleteQuizzes, updateQuizzes, editQuizzes } =
    quizsSlice.actions;
export default quizsSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const testSlice = createSlice({
  name: "test",
  initialState: {
    currentTest: [],
    testAnswers: [],
    userAnswers: [],
    correctAns: 0,
    wrongAns: 0,
    attemptedAns: 0,
    accuracy: 0,
    score: 0,
    negMarks: 0,
    totalMarks: 0,
    queue: [],
    trace: [],
    questions: [],
    allQuestions: [],
    startTest: false,
    isRunning: false,
    areResultsOut:false
  },
  reducers: {
    startTestAction: (state, action) => {
      state.startTest = true;
      state.isRunning = true;
      state.currentTest = action.payload;
      state.testAnswers = [];
      state.userAnswers = [];
      state.correctAns = 0;
      state.wrongAns = 0;
      state.attemptedAns = 0;
      state.accuracy = 0;
      state.score = 0;
      state.negMarks = 0;
      state.totalMarks = 0;
      state.queue = [];
      state.trace = [];
      state.questions = [];
      state.allQuestions = [];
    },
    addAnswer: (state, action) => {
      const cStr = state.userAnswers.find(
        (item) => item.slice(2) === action.payload.slice(2)
      );
      if (cStr) {
        state.userAnswers = state.userAnswers.filter(
          (item) => item.slice(2) !== cStr.slice(2)
        );
      }
      state.userAnswers = [...state.userAnswers, action.payload];
    },
    removeAnswer: (state, action) => {
      const cStr = state.userAnswers.find(
        (item) => item.slice(2) === action.payload.slice(2)
      );
      if (cStr) {
        state.userAnswers = state.userAnswers.filter(
          (item) => item.slice(2) !== cStr.slice(2)
        );
      }
      state.userAnswers = [...state.userAnswers];
    },
    submitTest: (state, action) => {
      state.testAnswers = action.payload;

      state.totalMarks = action.payload.length;

      state.userAnswers.map((uAns, i) => {
        const cAns = state.testAnswers.find((tAns) => tAns === uAns);
        // console.log(cAns);
        if (cAns) {
          state.score += 1;
          state.correctAns += 1;
        } else {
          state.wrongAns += 1;
        }
      });
      state.attemptedAns = state.userAnswers.length;
      // state.wrongAns = state.userAnswers.length - state.correctAns;
      state.negMarks = 0.25 * state.wrongAns;
      state.score = state.score - state.negMarks;
      state.accuracy = (state.correctAns / state.attemptedAns) * 100;
      // state.startTest = false;
      // state.isRunning = false;
      state.currentTest = state.currentTest.map((q) => {
        const uAnsStr = state.userAnswers.find(
          (uAnsStr) => uAnsStr.split(" ")[1] === q._id
        );
        if (uAnsStr) {
          const userIndex = Number(uAnsStr.slice(" ")[0]);
          return { ...q, userIndex };
        } else {
          return q;
        }
      });
    },
    stopTest:(state,action)=>{
state.startTest=false
    },
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.test,
        };
      },
    },
  },
});

export const { startTestAction, addAnswer, removeAnswer, submitTest,stopTest } =
  testSlice.actions;

export default testSlice;

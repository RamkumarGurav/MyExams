import Layout from "../layout/Layout";
import React from "react";
import Link from "next/link";
// import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import {
  Box, //acts as a div where we can easily give width or height as props
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addAnswer, startTestAction, submitTest } from "../redux/testSlice";

const instructions = ({ initialData }) => {
  const { startTest } = useSelector((state) => state.test);
  const dispatch = useDispatch();
  const currentTest = initialData?.data.questions;

  const handleStartTest = () => {
    dispatch(startTestAction(currentTest));
  };

  return (
    <div
      className={`flex flex-col w-[80%] min-h-[70vh] items-center mx-auto  my-10 gap-1 py-2  ${
        startTest ? "hidden" : "visible"
      }`}
    >
      <h3 className="my-2 text-xl text-purple-700 text-center font-semibold border-b-2 border-b-purple-800/70 w-[250px] ">
        Instructions for Test
      </h3>
      <ol className="text-gray-700 list-decimal">
        <li className="text-sm sm:text-base my-2 text-gray-900 px-2 ">
          Each question carries 1 mark.
        </li>
        <li className="text-sm sm:text-base my-2 text-gray-900 px-2 ">
          For Each Wrong answer 0.25 mark will be deducted.
        </li>
        <li className="text-sm sm:text-base my-2 text-gray-900 px-2 ">
          There will 100 questions with Timing of 1hr:30min.
        </li>
        <li className="text-sm sm:text-base my-2 text-gray-900 px-2 ">
          These instructions contain details pertaining to various aspects of
          the examination you are going to take and important instructions about
          the related matters. The assessment of answer sheets of
          ‘Objective-Multiple Choice Type’ will be done by a geographyized
          machine. Hence, you should carefully read the instructions regarding
          handling of the answer sheet and the method of marking answers.
        </li>
        <li className="text-sm sm:text-base my-2 text-gray-900 px-2 ">
          The Commission will reject at any stage, the candidature of any
          candidate who does not reach the eligibility criteria (cut-off)
          prescribed by the Commission in different papers at different stages
          of the examination.
        </li>
        <li className="text-sm sm:text-base my-2 text-gray-900 px-2 ">
          Please note that since this is a competitive examination, you have to
          obtain a high rank in the order of merit to secure appointment. You
          should, therefore, put in your best efforts in the examination.
        </li>
      </ol>

      <button
        className="bg-purple-700 my-5  hover:bg-purple-900/80 text-white py-2 px-10 rounded"
        onClick={handleStartTest}
      >
        START TEST
      </button>
    </div>
  );
};

export default instructions;

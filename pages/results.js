import Layout from "../layout/Layout";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useState } from "react";
import { startTestAction ,stopTest} from "../redux/testSlice";
import Head from "next/head";
import { useEffect } from "react";

const results = () => {
  const {
    currentTest,
    testAnswers,
    userAnswers,
    correctAns,
    wrongAns,
    attemptedAns,
    accuracy,
    score,
    negMarks,
    totalMarks,
  } = useSelector((state) => state.test);

  const dispatch = useDispatch();
const currentTestX=currentTest

useEffect(()=>{
  dispatch(stopTest())
},[])

  const handleRestart = () => {
    dispatch(startTestAction(currentTestX));
  };


  return (
    <Layout home >
     <Head>
          <title>Results | MyExams.com</title>
        </Head>
    <div className="bg-gray-50">
    <section
        className=" flex flex-col items-center  w-full md:px-5 py-10"
        style={{ minHeight: "77vh" }}
      >
        <div className="border-4 border-green-600 mx-3 my-4 w-[80%] md:w-[600px]  ">
          <h1 className="text-xl sm:text-3xl text-center">Test Results</h1>
        </div>
        <div className="py-4 px-8 w-[80%] md:w-[600px] ubuntu border border-gray-700 flex flex-col gap-4  mx-2">
          <div className="flex  justify-between">
            {" "}
            <p>Score :</p>
            <p>{score}</p>
          </div>
          <div className="flex justify-between">
            {" "}
            <p>Total Marks :</p>
            <p>{totalMarks}</p>
          </div>

          <div className="flex justify-between">
            {" "}
            <p>Attempted :</p>
            <p>{attemptedAns}</p>
          </div>
          <div className="flex justify-between">
            {" "}
            <p>Correct :</p>
            <p>{correctAns}</p>
          </div>
          <div className="flex justify-between">
            {" "}
            <p>Wrong :</p>
            <p>{wrongAns}</p>
          </div>
          <div className="flex justify-between">
            {" "}
            <p>Unattempted :</p>
            <p>{testAnswers.length - attemptedAns}</p>
          </div>
          <div className="flex justify-between">
            {" "}
            <p>Accuracy :</p>
            <p>{accuracy.toFixed(2)}%</p>
          </div>
        </div>
        {/* <div className="flex justify-center">
          <Link
            href="/test"
            className="bg-blue-500 my-5 hover:bg-blue-700 text-white py-2 uppercase px-4 rounded"
            onClick={handleRestart}
          >
            Restart Test
          </Link>
        </div> */}
      </section>
      <section id="qs-block" className="container mx-auto  py-10">
      <h1 className="mx-4 text-center text-green-600 text-2xl font-semibold border-b-2 border-b-green-600">Answers</h1>
    {


        currentTest?.map((question,i)=>{
      return (<Question data={...question}  qno={i}  key={i}/>)
      })

    }
    </section>
    </div>
   
    </Layout>
  );
};

export default results;

function Question({ data, qno }) {
  const [kannada, setKannada] = useState(true);
  const translateHandler = () => {
    setKannada(!kannada);
  };
  const { questionK, question, answersK, answers, answerIndex,userIndex } = data;
  return (
    <div className="q_block container px-2 py-4 max-w-[600px]">
      <div className="flex">
        <p className="quesno text-black  whitespace-nowrap mr-3">
          {qno + 1} .{" "}
        </p>{" "}
        <div className="text-sm text-black sm:text-md">
        {question}
          {/* {kannada ? questionK : question}
          <span className=" text-blue-600 hover:bg-blue-500 active:bg-blue-500 border border-blue-500 active:text-white hover:text-white rounded-md   text-[10px] cursor-pointer ml-2 px-1" style={{whiteSpace:'nowrap'}} onClick={translateHandler}>{kannada?"ಕ - EN":"EN - ಕ"}</span> */}
        
        </div>
        <div></div>
      </div>

      <div className="q_options py-1 pl-7  ">
        {answers.map((a, i) => (
          <div key={i} className={`my-1  flex bg-white text-sm border border-gray-400 text-black rounded-sm`}>
            <div className={`  px-2 py-1 flex items-center lowercase bg-gray-300 ${i==userIndex ? 'red text-white':''} ${(i==answerIndex) ? 'green text-white':''}`} >
              {`(${String.fromCharCode(i + 1 + 64)})`}{" "}
            </div>
            <div className="ml-4 text-black flex items-center">
            {a}{" "}
            </div>
   
          </div>
        ))}
      </div>
    </div>
  );
}

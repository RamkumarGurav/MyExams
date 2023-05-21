import React, { useState,useEffect } from "react";
// import jsonQs from "../data/questions.json";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Pagination from "react-js-pagination";
import { useQuery } from "react-query";
import Spinner from "./Spinner";
import Error from "./Error";


const SectionQ = (props) => {
 const {initialData,subject,limit}=props
  const [pageIndex, setPageIndex] = useState(1);
  const [qsData, setQsData] = useState(initialData);//
  

   const fetcher = async (pageIndex) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/questions?subject=${subject}&page=${pageIndex}&limit=${limit}`);
    const data = await res.json();

    setQsData(data)
    return data
  };
  const { data, isLoading, isError,error } = useQuery(["politymcqs",pageIndex], ()=>fetcher(pageIndex),{
    keepPreviousData:true
  });

  const {resultsPerPage,filteredQuestionsCount}=qsData?.data
  const setPageIndexHandler = (e) => {
    setPageIndex(e);
  };


  {isLoading && <Spinner />}
  {isError && <Error />}
  return (
    <section id="qs-block" className="container mx-auto  py-10 px-2 lg:px-8">
    {
      qsData?.data.questions?.map((question,i)=>{
      return (<Question data={...question} qno={i+((pageIndex-1)*resultsPerPage)} key={i}/>)
      })
    }
    {resultsPerPage < filteredQuestionsCount && (
        <div className="paginationBox">
          {(
            <Pagination
              activePage={pageIndex}
              itemsCountPerPage={Number(resultsPerPage)}
              totalItemsCount={Number(filteredQuestionsCount)}
              onChange={setPageIndexHandler}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          )}
        </div>
      )}
    </section>
  );
};

export default SectionQ;


function Question({data,qno}){
  const [kannada,setKannada]=useState(true)
  const translateHandler =()=>{
    setKannada(!kannada)
  }
 const {questionK,question,answersK,answers,answerIndex}=data
  return (
    <div className="q_block container px-2 py-4 ">
    <div className="flex">
    <p className="quesno text-base sm:text-lg text-gray-800  whitespace-nowrap mr-3">{qno+1} .{" "} </p> <div className="text-base text-gray-800 sm:text-lg">
    {question}
   {/* {kannada ? questionK:question}
   <span className=" text-blue-500 bg-white active:bg-white hover:bg-blue-500 hover:text-white active:text-blue-500 border border-blue-500 active:border-blue-500 rounded-full   text-[10px] cursor-pointer ml-2 px-1" onClick={translateHandler} style={{whiteSpace:'nowrap'}}>{kannada?"ಕ-EN":"EN-ಕ"}</span> */}
      </div>
     
      <div></div>
    </div>
    {/* //-------------------------------------------------------- */}
    {/* <div  className="q_options py-1 pl-7">
    {
      (kannada ? answersK: answers).map((a,i)=>(
        <p key={i} className="my-1 text-base sm:text-lg text-gray-800">
        <span className="mr-4 lowercase">{`(${String.fromCharCode(i + 1 + 64)})`}{" "}</span>{a} </p>
      ))
    }
    </div> */}
    {/* //-------------------------------------------------------- */}
    <div  className="q_options py-1 pl-7">
    {
   answers.map((a,i)=>(
        <p key={i} className="my-1 text-base sm:text-lg text-gray-800">
        <span className="mr-4 lowercase">{`(${String.fromCharCode(i + 1 + 64)})`}{" "}</span>{a} </p>
      ))
    }
  
    </div>
    <div className="showAnswer flex w-ful ">
     
      <Accordion style={{margin:0,padding:0 }}>
        <AccordionSummary
          id="panel1-header"
          aria-controls="panel1-content"
          // style={{minHeight:'35px' }}
          expandIcon={<ExpandMoreIcon className="text-white" />}
          className="bg-blue-500 text-md text-white" style={{backgroundColor:'#9321df',color:'white'}}
        >
          <p>Show Answer</p>
        </AccordionSummary>
        <AccordionDetails className="text-black flex items-center lowercase"
        >{`(${String.fromCharCode(answerIndex + 1 + 64)})`}</AccordionDetails>
      </Accordion>
    </div>
  </div>
  )
}




import SectionQ2 from "../components/SectionQ2";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Layout from "../layout/Layout";
import Head from "next/head";
import Link from 'next/link'
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import { BiSearch } from "react-icons/bi";
import { MdReplayCircleFilled } from "react-icons/md";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useSWRMutation from 'swr/mutation'
import ButtonLoader  from '../components/ButtonLoader'
import {toast} from 'react-toastify'
import Cookies from "js-cookie";
import axios from "axios";
import Spinner from "@/components/Spinner";
import Error from "@/components/Error";

const limit = 20;
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const AllMcqs = () => {
  const router = useRouter();
  //--------------------------------------------------------
  const [pageIndex, setPageIndex] = useState(1);
  const [qsData, setQsData] = useState(null)
    const [search,setSearch]=useState('')
  const [subject,setSubject]=useState('')
  

   const fetcher = async (pageIndex) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/questions?page=${pageIndex}&limit=${limit}`);
    const data = await res.json();

    return data
  };
  const { data, isLoading, isError,error,refetch } = useQuery(["all-mcqs",pageIndex], ()=>fetcher(pageIndex),{
    keepPreviousData:true,onSuccess:(data)=>{
      setQsData(data)
    },
    onError:(err)=>{
console.log(err.message);
    }
  });


  const setPageIndexHandler = (e) => {
    setPageIndex(e);
  };
  //------------searching and filtering--------------------------------------------








  const searchFetcher = async (pageIndex) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/questions?page=${pageIndex}&limit=20&keyword=${search.trim()}${subject&&`&subject=${subject}`}`
    );
    const data = await res.json();

    return data;
  };
  const { data:sData, isLoading:sLoading, isError:sIsError, error:sError ,refetch:srefetch} = useQuery(
    ["search-mcqs", pageIndex],
    () => searchFetcher(pageIndex),
    {
      keepPreviousData: true,
      enabled:false,
      onSuccess:(data)=>{
        setQsData(data)
      },
      onError:(error)=>{
toast.error(error.message)
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setPageIndex(1)
    
    return srefetch()
  };

  const handleRefetchAll =()=>{
    setPageIndex(1)
    setSearch('')
    setSubject("")
    return refetch()
  }

useEffect(()=>{
  if(subject){
    console.log(subject);
setPageIndex(1)
    srefetch()
  }
},[subject,srefetch,setPageIndex])


if(!qsData){
  return <Spinner/>
}

if(isLoading){
  return <Spinner/>
}
if(error){
  return <Error/>
}


const {resultsPerPage,filteredQuestionsCount}=qsData && qsData?.data

//--------------------------------------------------------
  return (
    <Layout home gray>
      <Head>
        <title>All MCQS | MyExams.com</title>
      </Head>
    
      {/* <h1 className="mx-auto w-[50%] text-gray-900 font-semibold text-center pt-4 text-2xl  border-b-2 border-gray-200">
        ALL MCQS
      </h1> */}
      <div className="flex flex-col sm:flex-row items-center justify-around gap-4 px-10 mt-8">
        <div className="">
          <select
            name="subject"
            value={subject}
            id="subject"
            onChange={(e)=>(setSubject(e.target.value) )}
            required
            className="shadow min-w-[250px] border  rounded w-full py-2  text-gray-600 px-4 leading-tight focus:outline-none focus:shadow-outline border-purple-500 "
          >
            <option value="">Filter by Subject </option>
            <option value="gk">gk</option>
            <option value="history">History</option>
            <option value="geography">Geography</option>
            <option value="science">Science</option>
            <option value="polity">Polity</option>
            <option value="economics">Economics</option>
            <option value="english">English</option>
          </select>
        </div>
        <form
          className="rounded-full min-w-[300px] md:w-full border-2 overflow-hidden flex justify-center items-center border-purple-600"

        >
          <input
            type="text"
            name="search"
            value={search}
            onChange={(e)=>(setSearch(e.target.value) )}
            placeholder="Search Questions.."
            className="w-full appearance-none focus:outline-none focus-visible:none px-4 sm:px-6 py-1 text-gray-700 poppins"
          />
          <BiSearch
            className="text-white text-[35px] py-1 w-[70px] bg-primary cursor-pointer "
           onClick={handleSubmit}
          />
        </form>
        <MdReplayCircleFilled size={40} className="col-primary cursor-pointer" onClick={handleRefetchAll}/>
      </div>

      <section id="qs-block" className="container mx-auto  py-10 px-2 lg:px-8">
      {qsData?.data.questions.length===0? (
                <div className="flex justify-center items-start p-10 min-h-[55vh]">
                  <h1 className="text-xl text-gray-700">No MCQS Found</h1>
                </div>
              ) : (qsData?.data.questions?.map((question,i)=>{
      return (<Question data={...question} qno={i+((pageIndex-1)*resultsPerPage)} key={i}  />)
      }))}
      
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
    </Layout>
  );
};

export default AllMcqs;

function Question({data,qno}){
  const [kannada,setKannada]=useState(true)
  const translateHandler =()=>{
    setKannada(!kannada)
  }
 const {questionK,question,answersK,answers,answerIndex,_id}=data

 


  return (
    <div className="q_block container px-2 py-4  my-2">
    <div className="flex">
    <p className="quesno text-base sm:text-lg text-gray-800  whitespace-nowrap mr-3">{qno+1} .{" "} </p> <div className="text-base text-gray-800 sm:text-lg">
    {question}
   {/* {kannada ? questionK:question}
   <span className=" text-bl  hover:bg-blue-500 hover:text-white active:text-blue-500 border border-blue-500 active:border-blue-500 rounded-full   text-[10px] cursor-pointer ml-2 px-1" onClick={translateHandler} style={{whiteSpace:'nowrap'}}>{kannada?"ಕ-EN":"EN-ಕ"}</span> */}
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
    <div className="showAnswer flex justify-between items-center  w-full   ">
     
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


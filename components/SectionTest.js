import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import {RiTimerFill} from 'react-icons/ri'
import Link from "next/link";
import { useQuery } from "react-query";
// import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import {
  Box,//acts as a div where we can easily give width or height as props
FormControl,
FormLabel,
FormControlLabel,
RadioGroup,
Radio,
Button
} from "@mui/material";
import { useDispatch,useSelector } from 'react-redux';
import { addAnswer,startTestAction, submitTest } from "../redux/testSlice";
import Pagination from "react-js-pagination";
import Spinner from "./Spinner";
import Error from "./Error";





const SectionTest = (props) => {
  const {initialData,baseUrl,limit,qSetId}=props
//--------------------------------------------------------
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  //--------------------------------------------------------
 const dispatch=useDispatch();
 const {startTest,isRunning}=useSelector((state)=>state.test)
 const router = useRouter()


let testAnswers=[]
initialData?.data?.questions?.map((item)=>{
  const cStr=`${item.answerIndex} ${item._id}`
testAnswers.push(cStr)
})
//--------------------------------------------------------
// console.log(initialData?.data);




  const handleSubmitTest =()=>{
    setSeconds(0);
    setMinutes(30);
    setHours(1)
    dispatch(submitTest(testAnswers))
    router.push('/results')

  }




  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours((hours) => hours - 1);
          setMinutes(59);
          setSeconds(59);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds, minutes, hours]); //adding all the dependencies is very important

  useEffect(function(){
    if(isRunning){
      if(seconds===0 && minutes===0 && hours===0){
        setSeconds(20);
        setMinutes(0);
        setHours(0)
        dispatch(submitTest(testAnswers))
        router.push('/results')

      }
    }
  },[isRunning,seconds,minutes,hours,testAnswers])

  return (
    <section id="qs-block" className="flex flex-col items-center justify-start py-10">
      <div className="ubuntu poppins flex sticky top-0 py-2 w-full justify-between bg-yellow-300 z-[998] px-2 md:px-8">
      <div className="flex items-center text-sm" >
      <span className="mr-2 text-gray-600"><RiTimerFill size={22} className="text-gray-800"/></span>
        <span className="mr-1">{hours > 9 ? hours : "0" + hours} hr  :{'  '}</span>
        <span className="mr-1">{minutes > 9 ? minutes : "0" + minutes} min  :{'  '} </span>
        <span className="mr-1">{seconds > 9 ? seconds : "0" + seconds} secs </span>
      </div>
      <Link href='/results' className="bg-black text-sm text-white hover:bg-gray-700 px-4 py-1 rounded" onClick={handleSubmitTest}>SUBMIT</Link>
      </div>

    <div className={`${startTest?'visible':'hidden'} border-b-2 border-purple-500/90 mb-5 w-full`}>
    {
      initialData?.data.questions.map((question,i)=>{
      return (<Question data={...question} qno={i+1} key={i} />)
      })
    }
    </div>
 

   
    <div className="flex justify-center ">
    <Link href='/results' className="bg-black text-white hover:bg-gray-700 px-4 py-1 rounded" onClick={handleSubmitTest}>SUBMIT</Link>
      
    </div>
  
    </section>
  );
};

export default SectionTest;


function Question({data,qno}){
  const dispatch=useDispatch();

  const [kannada,setKannada]=useState(true)
  const translateHandler =()=>{
    setKannada(!kannada)
  }
  const [values, setvalues] = useState(null)

const handleChange =(e)=>{
  setvalues(e.target.value)
dispatch(addAnswer(e.target.value))
}


 const {_id,questionK,question,answersK,answers,answerIndex}=data
 
 
  return (
    <div className="q_block container w-full px-6 py-4 border-b-[1px] border-gray-300 ">

    <div className="flex">
    <p className="quesno text-black  whitespace-nowrap mr-3">{qno} .{" "} </p> 
    <div className="text-sm text-black sm:text-md">
    {question}
   {/* {kannada ? questionK:question}
   <span className=" text-blue-600 hover:bg-blue-500 active:bg-blue-500 border border-blue-500 active:text-white hover:text-white rounded-md   text-[10px] cursor-pointer ml-2 px-1" style={{whiteSpace:'nowrap'}} onClick={translateHandler}>{kannada?"ಕ - EN":"EN - ಕ"}</span> */}
      </div>
     
      <div></div>
    </div>
   
    <div  className="q_options py-1  ">
    {/* {
      (kannada ? answersK: answers).map((a,i)=>(
        <p key={i} className="my-1 text-sm text-gray-800">
        <span className="mr-4 lowercase">{`(${String.fromCharCode(i + 1 + 64)})`}{" "}</span>{a} </p>
      ))
    } */}
    <Box           >
        <FormControl   className="flex items-start" >
          
            <RadioGroup
            name="choices" 
            value={values}
            onChange={handleChange}
            className="flex items-start"
            >

{
      (answers).map((a,i)=>(
                <FormControlLabel key={i} className=" flex items-start" control={<Radio color='warning' 
                />}  name={`${_id}`} value={`${i} ${_id}`}
                label={<div className="text-sm text-black flex items-center "><div className="lowercase mr-2">{`(${String.fromCharCode(i + 1 + 64)}). `}</div> <div>{`${a}`}</div> </div>} 

                />   
                
                 ))
                }
                   
            </RadioGroup>
        </FormControl>
        </Box>


  
    </div>
   
  </div>
  )
}




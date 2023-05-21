import React, { use, useEffect, useState } from "react";
import { useQuery } from "react-query";
import Layout from "../../layout/Layout";
import Head from "next/head";
import BookCard from "../../components/BookCard";
import Pagination from 'react-js-pagination'
import {BiSearch} from 'react-icons/bi'
import {BsFillFileArrowDownFill,BsFillFileArrowUpFill} from 'react-icons/bs'
import {HiArrowSmDown,HiArrowSmUp} from 'react-icons/hi'
import {toast} from 'react-toastify'


//--------------------------------------------------------
const books = ({ initialData }) => {
  const [booksData, setBooksData] = useState(initialData);
  const [pageIndex, setPageIndex] = useState(1);
  const [search,setSearch]=useState('')
  const [min,setMin]=useState(1)
  const [max,setMax]=useState(24000)
  const [sort,setSort]=useState('')
  const [toggleD,setToggleD]=useState(false)
  const [toggleU,setToggleU]=useState(false)


  const fetcher = async (pageIndex) => {
    const res = await fetch(
      `https://talented-ant-loincloth.cyclic.app/api/v1/products?page=${pageIndex}&limit=9`
    );
    const data = await res.json();

    return data;
  };


  const onSuccess = (data) => {
    setBooksData(data);
  };
  const onError = (e) => {
  toast.error(e.message);
  };

  const { data, isLoading, isError, error } = useQuery(
    ["books", pageIndex],
    () => fetcher(pageIndex),
    {
      keepPreviousData: true,
      onSuccess,
      onError
    }
  );




//--------------------------------------------------------
  const searchFetcher = async (pageIndex) => {
    const res = await fetch(
      `https://talented-ant-loincloth.cyclic.app/api/v1/products?keyword=${search.trim()}&page=${pageIndex}&limit=9&price[gte]=${max>0?min:1}&price[lte]=${max>0?max:25000}&sort=${sort}`
    );
    const data = await res.json();

    return data;
  };
  const { data:sData, isLoading:sLoading, isError:sIsError, error:sError ,refetch} = useQuery(
    ["searchbooks", pageIndex],
    () => searchFetcher(pageIndex),
    {
      keepPreviousData: true,
      enabled:false,
      onSuccess:(data)=>{
        setBooksData(data)
      },
      onError:(error)=>{
toast.error(error.message)
      }
    }
  );




  const { resultsPerPage, filteredProductsCount } = booksData?.data;
  const setPageIndexHandler = (e) => {
    setPageIndex(e);
  };

console.log(sort);
  

  const handleSubmit =(e)=>{
    e.preventDefault()
   return  refetch()
  }

  const handleFilter =(e)=>{
      e.preventDefault()
      return  refetch()
  }

  useEffect(()=>{
    if(sort){
      refetch()
    }
  },[sort])



  return (
<>
<Layout home gray>
      <Head>
        <title>Buy Books | MyExams</title>
      </Head>
      
      <div className="flex flex-col justify-center items-center p-1 bg-gray-100 ">
      <h1 className="text-xl text-gray-800 font-semibold border-b-2 border-gray-300 my-2">Books</h1>
      <div className=" py-2 w-full flex flex-col justify-center items-center md:flex-row md:justify-around md:items-center "> 
      {/* <div className=" w-[50%] bg-white border-2  overflow-hidden"> */}
      <form className="flex gap-2 sm:gap-4 min-w-[300px] items-center">
      <div className="flex w-[70px]">
      <HiArrowSmUp  className={`${toggleU?'text-[#6300e6d7]':'text-[#9747ff6c]'}  text-[40px] py-1 cursor-pointer `} onClick={(e)=>{
            setToggleU(!toggleU)
            setToggleD(toggleU)
            return setSort('price')

          }}/>
          <HiArrowSmDown  className={`${toggleD?'text-[#6300e6d7]':'text-[#9747ff6c]'} text-[40px] py-1  cursor-pointer `} onClick={(e)=>{
            setToggleD(!toggleD)
            setToggleU(toggleD)
           return setSort('-price')
          }}/>
        

          </div>
          
            <input type="number" max='25000' min='1' onChange={(e)=>setMin(e.target.value)} placeholder="Min Price"
className="shadow  appearance-none border focus:border-purple-500 rounded py-2 sm:py-2 sm:px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-200/60 text-sm"

            />
        

            <input type="number" max='25000' min='1' onChange={(e)=>setMax(e.target.value)} placeholder="Max Price"
className="shadow  appearance-none border focus:border-purple-500 rounded text-sm py-2  sm:py-2 sm:px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-200/60"

            />
            
     
          <button
            className="bg-primary  flex justify-center items-center hover:bg-[#9747ffd7] text-white uppercase  text-sm py-2 px-2 rounded-full focus:outline-none focus:shadow-outline my-4"
          onClick={handleFilter}  >Filter</button>
        
        </form>
        <form className=" rounded-full min-w-[300px] border-2 overflow-hidden flex justify-center items-center border-purple-600">
          <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search Books.." className="w-full appearance-none focus:outline-none focus-visible:none px-4 sm:px-6 py-1 text-gray-700 poppins" /><BiSearch  className="text-white text-[35px] py-1 w-[70px] bg-primary cursor-pointer " onClick={handleSubmit}/>
        </form>
       
      {/* </div> */}
      </div>
            {/* <div className=" px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-5  justify-center justify-items-center place-content-center place-items-center min-h-[500px]"> */}
            {booksData.data.products.length===0 ? (<div className="w-full min-h-[600px]">
              <h1 className="text-gray-700 text-base nunito text-center my-4">No Books Found</h1>
            </div>):(
              <div className=" px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-5  justify-center justify-items-center place-content-center place-items-center min-h-[500px]">
              {booksData.data.products.map((book, i) => (
            <BookCard key={i} book={...book} />
          ))}
          </div>
            )}
         
        {/* </div> */}
        {/* <p>paginate</p> */}
        {resultsPerPage < filteredProductsCount && (
          <div className="paginationBox py-2">
            {
              <Pagination
                activePage={pageIndex}
                itemsCountPerPage={Number(resultsPerPage)}
                totalItemsCount={Number(filteredProductsCount)}
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
            }
          </div>
        )}
      </div>
    </Layout>
    
</>

    
    
  );
};

export default books;

export async function getServerSideProps() {
  const res = await fetch(`https://talented-ant-loincloth.cyclic.app/api/v1/products?page=1&limit=9`);
  const data = await res.json();

  return {
    props: {
      initialData: data,
    },
  };
}

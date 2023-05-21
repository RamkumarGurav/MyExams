import React from "react";
import Image from "next/image";
import Link from "next/link";

const Error = () => {
  return (
    <div className="text-center flex flex-col items-center py-10">
      {/* <h1 className='text-3xl font-bold text-orange-600 py-10'>Something Went Wrong</h1> */}
      
      <Image
        src={"/images/wrong1.jpg"}
        width={400}
        height={400}
        alt="error"
      ></Image>
      <Link
        href={"/"}
        className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-1 uppercase rounded"
      >
        Back to Homepage
      </Link>
    </div>
  );
};

export default Error;

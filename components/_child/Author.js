import Image from "next/image";
import Link from "next/link";
import React from "react";

const Author = ({ name, img, designation }) => {
  return (
    <div className="author flex py-5">
      <Image
        src={img}
        width={60}
        height={60}
        alt="author"
        className="rounded-full"
      ></Image>
      <div className="flex flex-col justify-center px-4 ">
        <Link
          href={"/about"}
          className="text-md font-bold text-gray-800 hover:text-gray-600"
        >
          {name}
        </Link>
        <span className="text-md text-gray-500">{designation}</span>
      </div>
    </div>
  );
};

export default Author;

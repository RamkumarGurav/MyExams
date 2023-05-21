import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthorSmall = ({ name, img, designation }) => {
  return (
    <div className="author flex py-3">
      <Image
        src={img || "/images/author/author1.jpg"}
        width={35}
        height={35}
        alt="author"
        className="rounded-full"
      ></Image>
      <div className="flex flex-col justify-center px-2 ">
        <Link
          href={"/about"}
          className="text-xs md:text-sm font-bold text-gray-800 hover:text-gray-600"
        >
          {name || "Unknown"}
        </Link>
        <span className="text-xs md:text-sm text-gray-500">
          {designation || "Unknown"}
        </span>
      </div>
    </div>
  );
};

export default AuthorSmall;

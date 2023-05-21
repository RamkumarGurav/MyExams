import Link from "next/link";
import {
  BsFacebook,
  BsTwitter,
  BsYoutube,
  BsInstagram,
  BsGithub,
} from "react-icons/bs";

import { AiFillLinkedin } from "react-icons/ai";
import { RiInstagramFill } from "react-icons/ri";
import Newslatter from "./_child/Newslatter";

const Footer = () => {
  return (
    <footer className="py-1 sm:py-4 gap-2 flex flex-col justify-center items-center w-full ">
      <style jsx>
        {`
          footer {
            background: linear-gradient(135deg, #fdd819 10%, #e80505 100%),
              url("https://png.pngtree.com/background/20210709/original/pngtree-sketch-drawing-of-city-building-picture-image_895642.jpg")
                no-repeat center;
            background-size: cover;
          }
        `}
      </style>

      {/* <Newslatter /> */}
      <div className=" py-2  px-12 flex flex-col gap-2  text-center w-full lg:flex-row justify-between items-center">
        <p className="text-sm text-gray-900  w-[300px]">
          All rights reserved 2023
        </p>
        <div className="flex justify-between w-[300px] items-center">
          <a href="/">
            <BsFacebook
              size={20}
              className="text-gray-900 hover:text-gray-100"
            />
          </a>
          <a href="/">
            <BsTwitter
              size={20}
              className="text-gray-900 hover:text-gray-100"
            />
          </a>
          <a href="/">
            <AiFillLinkedin
              size={20}
              className="text-gray-900 hover:text-gray-100"
            />
          </a>
          <a href="/">
            <RiInstagramFill
              size={20}
              className="text-gray-900 hover:text-gray-100"
            />
          </a>
          <a href="/">
            <BsGithub size={20} className="text-gray-900 hover:text-gray-100" />
          </a>
        </div>
        <p className="text-sm text-gray-900 w-[300px]">
          Designed by: Ramkumar Gurav
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import Link from "next/link";
import Image from "next/image";
import { BsCart4 } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa";

// import { GiHamburgerMenu, GiClose } from "react-icons/gi";
// import { BiClose, BiHamburgerMenu } from "react-icons/bi";
// import { AiClose, AiHamburgerMenu ,AiOutlineMenu} from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUser,
  setLogout,
  setAuthFalse,
  setAuthTrue,
} from "../redux/authSlice";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const HeaderX = ({ home }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { cartItems } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      if (JSON.parse(localStorage.getItem("profile"))) {
        const profile = JSON.parse(localStorage.getItem("profile"));

        dispatch(setUser(profile));
        // Cookies.set("jwt", profile.token);
        Cookies.set("loggedIn", true);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (Cookies.get("loggedIn") === true) {
      // Cookies.set("jwt", user?.token);
    }
  }, [dispatch, user]);

  const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

  const fetcher = async () => {
    const data = await axios.get(`${baseURL}/users/logout`);
    return data;
  };

  const onSuccess = () => {
    router.push("/");

    dispatch(setLogout());
    Cookies.remove("loggedIn");
    Cookies.remove("jwt");
    toast.success("Logged out Successfully");
  };
  const onError = () => {
    toast.error("Logout failed, Something went wrong");
  };

  const { isLoading, isError, data, isFetching, refetch } = useQuery(
    "logout",
    fetcher,
    {
      enabled: false,
      onSuccess,
      onError,
    }
  );

  return (
    <header className="bg-[#9321df]  shadow-md  w-full">
      <div className="py-5 px-[2vmax] lg:px-[4vmax]  flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center">
        <div className="flex justify-between items-center z-40 ">
          <Link
            href="/"
            className="text-xl  flex items-center font-bold rounded-2xl px-2 ubuntu text-[#fafafa] "
          >
            MyExams.com
            <FaGraduationCap size={29} className="ml-1" />
          </Link>

          {open ? (
            <CgClose
              size={30}
              color={"white"}
              onClick={handleOpen}
              className="visible lg:hidden cursor-pointer"
            />
          ) : (
            <HiMenu
              size={30}
              color={"white"}
              onClick={handleOpen}
              className="visible lg:hidden cursor-pointer"
            />
          )}
        </div>

        <div
          className={`flex pb-5 pt-5  bg-[#9321df] text-white duration-500 ease-in-out  flex-col gap-5 absolute lg:static  ${
            open
              ? "top-16 left-0 pl-[3vmax] w-[180px] items-start shadow-md"
              : "top-16  left-[-100%]"
          } lg:flex-row lg:justify-between lg:items-center  lg:w-[70%] lg:p-0 lg:shadow-none z-[999]`}
        >
          {/* <div className="flex flex-col gap-5  lg:flex-row  lg:justify-center lg:items-center"> */}
          {/* <input
            type="text"
            placeholder="Search..."
            className="text-sm block w-60 px-3 py-1 mt-2 lg:mt-none bg-white text-gray-600 rounded-full shadow-sm placeholder-slate-500  border border-slate-300 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
              
              "
          /> */}

          <Link
            href={"/"}
            className="text-md navlink relative text-white hover:text-gray-200 duration-300 "
          >
            Home
          </Link>

          <Link
            href={"/tests"}
            className="text-md navlink relative text-white hover:text-gray-200 duration-300"
          >
            Tests
          </Link>
          <Link
            href={"/mcqs"}
            className="text-md navlink relative text-white hover:text-gray-200 duration-300"
          >
            MCQS
          </Link>
          <Link
            href={"/books"}
            className="text-md navlink relative text-white hover:text-gray-200 duration-300"
          >
            Buy Books
          </Link>

          {/* <Link
            href={"/about"}
            className="text-md navlink relative text-white hover:text-gray-200 duration-300"
          >
            About
          </Link> */}
          {isAuthenticated ? (
            <div className="flex flex-col items-center lg:flex-row gap-4">
              <button
                onClick={refetch}
                className="text-md bg-white font-semibold text-[#9321df] duration-300 border-2 border-gray-50 px-2 py-1 rounded-md hover:bg-[#9321df] hover:text-white"
              >
                Logout
              </button>
              <Link href={"/account"} className="flex items-center">
                {/* <Image
                  src={"/Profile6.png"}
                  width={40}
                  height={40}
                  alt="author"
                  className="rounded-full"
                ></Image> */}
                <BiUser size={25} />
              </Link>
              <Link href={"/cart"} className=" relative flex items-center">
                {/* <Image
                  src={"/Profile6.png"}
                  width={40}
                  height={40}
                  alt="author"
                  className="rounded-full"
                ></Image> */}
                <BsCart4 size={25} />
                {}
                <div className="absolute text-sm top-[-10px] right-[-5px]  rounded-full text-white">
                  {cartItems.length === 0 ? null : cartItems.length}
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-2">
              <Link
                href={"/login"}
                className="text-md bg-white font-semibold text-[#9321df] duration-300 border-2 border-gray-50 px-2 py-1 rounded-md hover:bg-[#9321df] hover:text-white"
              >
                Login
              </Link>

              <Link
                href={"/register"}
                className="text-md bg-white font-semibold text-[#9321df] duration-300 border-2 border-gray-50 px-2 py-1 rounded-md hover:bg-[#9321df] hover:text-white"
              >
                Register
              </Link>
            </div>
          )}

          {/* </div> */}
        </div>
      </div>
    </header>
  );
};

export default HeaderX;

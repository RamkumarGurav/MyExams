/* eslint-disable */
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { toast } from "react-toastify";
import Layout from "../layout/Layout";
import { IoIosArrowForward } from "react-icons/io";
import { AiTwotoneSetting } from "react-icons/ai";
import { BsShieldLockFill } from "react-icons/bs";
import { FaPenNib } from "react-icons/fa";
import { BsFillClipboard2CheckFill, BsFillBookmarksFill } from "react-icons/bs";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import axios from "axios";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState(user);

  const fetcher = async () => {
    const jwt = Cookies.get("jwt");
    // const instance = axios.create({
    //   withCredentials: true, //adding cookies
    // });

    // instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    // const res = await instance.get(
    //   `${process.env.NEXT_PUBLIC_SERVER_URL}/users/me`
    // );
    const res = axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/me`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return res.data;
  };

  const { data, isLoading, isError, error, refetch } = useQuery(
    "profile",
    fetcher,
    {
      keepPreviousData: true,
      enabled: false,
      onSuccess: (data) => {
        setUserInfo({ ...userInfo, ...data });
        // toast.success("success");
      },
      onError: (err) => {
        console.log(err);
        // toast.error(err.response.data.message);
      },
    }
  );
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Layout>
      <Head>
        <title>{`${userInfo?.data.user.name || "Your"}'s Profile`}</title>
      </Head>
      <div className="flex flex-col sm:flex-row w-full min-h-[80vh]">
        <div className="left-bottom w-full sm:w-[300px] cg-footer text-white  py-4 flex flex-col gap-4">
          <div className="flex justify-center items-center">
            <h3 className="text-center font-semibold text-lg">My Account</h3>
          </div>

          <Link
            href={"/update-profile"}
            className="flex justify-between items-center text-white text-base px-2  p-2 hover:bg-violet-500"
          >
            <span className="flex">
              <AiTwotoneSetting
                size={20}
                color="white"
                className="mr-[1vmax]"
              />{" "}
              Update Profile{" "}
            </span>

            <IoIosArrowForward color="white" size={20} />
          </Link>
          <Link
            href={"/update-password"}
            className="flex justify-between items-center text-white text-base px-2  p-2 hover:bg-violet-500"
          >
            <span className="flex">
              <BsShieldLockFill
                size={20}
                color="white"
                className="mr-[1vmax] inline-block"
              />{" "}
              <span className="whitespace-nowrap">Change Password</span>
            </span>

            <IoIosArrowForward color="white" size={20} />
          </Link>
    
          <Link
            href={"/my-orders"}
            className="flex justify-between items-center text-white text-base px-2  p-2 hover:bg-violet-500"
          >
            <span className="flex">
              <BsFillClipboard2CheckFill
                size={20}
                color="white"
                className="mr-[1vmax]"
              />{" "}
              My Orders
            </span>

            <IoIosArrowForward color="white" size={20} />
          </Link>
          {userInfo?.data.user.role === "admin" && (
            <Link
              href={"/mcqs/create"}
              className="flex justify-between items-center text-white text-base px-2  p-2 hover:bg-violet-500"
            >
              <span className="flex">
                <FaPenNib size={20} color="white" className="mr-[1vmax]" />{" "}
                Create MCQS
              </span>

              <IoIosArrowForward color="white" size={20} />
            </Link>
          )}
          {userInfo?.data.user.role === "admin" && (
            <Link
              href={"/mcqs/manage"}
              className="flex justify-between items-center text-white text-base px-2  p-2 hover:bg-violet-500"
            >
              <span className="flex">
                <BsFillBookmarksFill
                  size={20}
                  color="white"
                  className="mr-[1vmax]"
                />{" "}
                Manage MCQS
              </span>

              <IoIosArrowForward color="white" size={20} />
            </Link>
          )}
        </div>
        <div className="right-top flex flex-col items-center w-full   py-4">
          <h3 className="text-center bg-[#6cff47] cg-safron px-10 py-2 text-white my-4">
            My Profile
          </h3>
          <div>
            <Image
              src={userInfo?.data.user.avatar || "/Profile6.jpg"}
              width={180}
              height={180}
              alt="avatar"
              className="rounded-full"
            ></Image>
          </div>
          <div className="my-4">
            <h2 className="my-4">
              <span className="font-semibold text-base text-gray-800">
                Name :
              </span>
              <span className="text-gray-800 text-base mx-2">
                {userInfo?.data.user.name}
              </span>
            </h2>
            <h2 className="my-4">
              <span className="font-semibold text-base text-gray-800">
                Email :
              </span>
              <span className="text-gray-800 text-base mx-2">
                {userInfo?.data.user.email}
              </span>
            </h2>
            <h2 className="my-4">
              <span className="font-semibold text-base text-gray-800">
                Joined At :
              </span>
              <span className="text-gray-800 text-base mx-2">
                {String(userInfo?.data.user.createdAt).substring(0, 10)}
              </span>
            </h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

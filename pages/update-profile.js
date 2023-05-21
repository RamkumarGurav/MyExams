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
import { BsFillClipboard2CheckFill } from "react-icons/bs";
import FileBase from "react-file-base64";
import { useMutation } from "react-query";
import ButtonLoader from "../components/ButtonLoader";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import Cookies from "js-cookie";

const EditProfile = ({ userInfo }) => {
  const { user } = useSelector((state) => ({
    ...state.auth,
  }));
  const dispatch = useDispatch();
  const [btnLoading, setBtnLoading] = useState(false);

  const [formValue, setFormValue] = useState({
    name: userInfo?.data.user.name,
    email: userInfo?.data.user.email,
  });
  const { name, email, password, passwordConfirm } = formValue;

  const [image, setImage] = useState(userInfo?.data.user.avatar);

  const UpdateDataChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
      avatar: image,
    });
  };

  //--------------------------------------------------------

  const onSuccess = (data) => {
    const profile = data.data;
    const profileWithToken = { ...user, ...profile };
    localStorage.setItem("profile", JSON.stringify({ ...profileWithToken }));
    dispatch(setUser(profileWithToken));
    toast.success("Profile Updated Successfully");
    setBtnLoading(false);
  };
  const onError = (error) => {
    console.log(error.response.data.message);
    setBtnLoading(false);
    toast.error("Update Failed, Try agian!");
  };

  const fetcherUpdate = async (formData) => {
    const jwt = Cookies.get("jwt");
    const instance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
      withCredentials: true, //adding cookies
    });

    instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    const data = await instance.patch(`/users/me/update`, formData);

    return data;

    //--------------------------------------------------------
    // const res = await fetch(
    //   `${process.env.NEXT_PUBLIC_SERVER_URL}/users/me/update`,
    //   {
    //     method: PATCH,
    //     credentials: "include",//this set access-Control-Allow-Credentials: true
    //   }
    // );
    // const xdata = res.json();
    // const data = { data: xdata };
    // return data;

    //--------------------------------------------------------
  };
  const {
    mutate: mutateUpdate,
    data: dataUpdate,
    isError: isErrorUpdate,
    isLoading: isLoadingUpdate,
    error: errorUpdate,
  } = useMutation(fetcherUpdate, {
    onSuccess,
    onError,
  }); //here mutate is the function that passes input data to fetcher function directly

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formValue);
    setBtnLoading(true);
    mutateUpdate(formValue); //passing input formdata to api call
  };

  return (
    <Layout>
      <Head>
        <title>{`${user?.data.user.name}'s Profile`}</title>
      </Head>
      <div className="flex flex-col sm:flex-row w-full min-h-[80vh]">
        <div className="right-top flex flex-col items-center w-full  py-4">
          <h3 className="text-center bg-[#6cff47] cg-safron px-10 py-2 text-white my-4">
            Update My Profile
          </h3>
          {/* <div>
            <Image
              src={user?.data.user.avatar || "/defaultProfile.png"}
              width={180}
              height={180}
              className="rounded-full"
            ></Image>
          </div> */}
          <form
            className=" shadow-lg rounded-md px-6 py-4 mb-4 min-w-[300px] sm:w-[400px]
            border-[.5px]  border-purple-700/50"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <input
                className="shadow appearance-none border focus:border-purple-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-200/60"
                id="name"
                type="text"
                placeholder="Name"
                name="name"
                required
                value={name}
                autoComplete="off"
                onChange={UpdateDataChange}
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border focus:border-purple-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-200/60"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                required
                value={email}
                autoComplete="off"
                onChange={UpdateDataChange}
              />
            </div>
            <div
              className="signUpImage flex items-center px-[2px]"
              id="signUpImage"
            >
              <Image
                src={image}
                alt="avatar"
                width={100}
                height={100}
                className="my-2"
                priority
              />

              <FileBase
                type="file"
                className="w-full"
                multiple={false}
                onDone={({ base64 }) => {
                  setImage(base64);
                  setFormValue({ ...formValue, avatar: base64 });
                }}
              />
            </div>
            <button
              className="bg-[tomato] w-full flex justify-center items-center hover:bg-[#ff6347d7] text-white uppercase font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline my-4"
              type="submit"
            >
              update
              {btnLoading ? <ButtonLoader /> : <></>}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;

export async function getServerSideProps(context) {
  //in ssr or ssg we need to manually add the cookie in the headers ,cookie state is alreadey stored in browser can be accessed using 'context.req.cookies' method
  const { jwt } = context.req.cookies;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/users/me`,
    {
      headers: { Cookie: `jwt=${jwt};` }, //'withCredentials:true' doesnt work inside getServerSideProps
    }
  );
  const data = res.data;

  // Pass data to the page via props
  return { props: { userInfo: data } };
}

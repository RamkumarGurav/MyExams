import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Layout from "../layout/Layout";
import { useRouter } from "next/router";
import ButtonLoader from "@/components/ButtonLoader";
import Link from "next/link";
import { toast } from "react-toastify";
import { setUser, setLogout } from "../redux/authSlice";
import Cookies from "js-cookie";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Head from "next/head";

const login = () => {
  const { user, isAuthenticated } = useSelector((state) => ({
    ...state.auth,
  }));

  const dispatch = useDispatch();
  const router = useRouter();
  const [btnLoading, setBtnLoading] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const initialState = {
    email: "",
    password: "",
  };
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;

  const [image, setImage] = useState("/Profile6.jpg");

  const registerDataChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
      // avatar: image,
    });
  };

  const handleVisible = (e) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  };
  const handleVisible2 = (e) => {
    e.preventDefault();
    setIsVisible2(!isVisible2);
  };

  //--------------------------------------------------------

  const onSuccess = (data) => {
    const profile = data.data;
    localStorage.setItem("profile", JSON.stringify({ ...profile }));
    toast.success("LoggedIn Successfully");
    setBtnLoading(false);
    setFormValue(initialState);
    dispatch(setUser(profile));
    Cookies.set("loggedIn", true);
    // Cookies.set("jwt", profile.token); //in next js you need to manually set the cookies that are sent by the backend server
    router.back();
  };
  const onError = (error) => {
    // localStorage.clear();
    setBtnLoading(false);
    // dispatch(setLogout());
    // Cookies.remove("loggedIn");
    // Cookies.remove("jwt");
    toast.error(error.response.data.message);
  };

  const fetcherRegister = (formData) => {
    return axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`,
      formData
    );
  };
  const {
    mutate: mutateRegister,
    data: dataRegister,
    isError: isErrorRegister,
    isLoading: isLoadingRegister,
    error: errorRegister,
  } = useMutation(fetcherRegister, {
    onSuccess,
    onError,
  }); //here mutate is the function that passes input data to fetcher function directly

  const registerSubmit = (e) => {
    e.preventDefault();
    // console.log(formValue);
    setBtnLoading(true);
    mutateRegister(formValue); //passing input formdata to api call
  };

  return (
    <Layout home gray>
      <Head>
        <title>Login | MyExams.com</title>
      </Head>
      <div className="container flex justify-center items-center mx-auto min-h-[400px] my-16">
        <form
          className=" px-6 pt-6 pb-4 mb-4 min-w-[300px] sm:w-[400px] backdrop-blur-lg border-[.5px] border-purple-500 bg-gray-100/20 shadow-lg shadow-purple-700 rounded-md"
          onSubmit={registerSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  border-purple-200 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500  "
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              required
              value={email}
              autoComplete="off"
              onChange={registerDataChange}
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 "
              id="password"
              type={`${isVisible ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              required
              value={password}
              autoComplete="off"
              onChange={registerDataChange}
            />
            <div
              className="icon absolute bottom-2 right-4 cursor-pointer"
              onClick={handleVisible}
            >
              {isVisible ? (
                <BsEyeFill size={20} color="gray" />
              ) : (
                <BsEyeSlashFill size={20} color="gray" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-primary w-full flex justify-center items-center hover:bg-purple-500 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              LOGIN
              {btnLoading ? <ButtonLoader /> : <></>}
            </button>
          </div>
          <div className="py-2 flex flex-col ">
            <Link
              className="self-end my-4 font-semibold text-sm col-primary hover:text-blue-800"
              href="/password/forgot"
            >
              Forgot Password ?
            </Link>
            <div className=" self-end text-right font-aemibold flex items-center text-sm text-gray-900">
              Don't have an Account yet ?{" "}
              <Link
                href={"/register"}
                className="col-primary font-bold  flex justify-center items-center hover:text-blue-700 ml-4 "
              >
                REGISTER
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default login;

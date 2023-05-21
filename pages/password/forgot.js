/* eslint-disable */
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { toast } from "react-toastify";
import Layout from "../../layout/Layout";
import { IoIosArrowForward } from "react-icons/io";
import { AiTwotoneSetting } from "react-icons/ai";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { BsFillClipboard2CheckFill } from "react-icons/bs";
import FileBase from "react-file-base64";
import { useMutation } from "react-query";
import ButtonLoader from "../../components/ButtonLoader";
import axios from "axios";

const forgotPassword = () => {
  const dispatch = useDispatch();

  //--------------------------------------------------------
  const [btnLoading, setBtnLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);

  const handleVisible = (e) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  };
  const handleVisible2 = (e) => {
    e.preventDefault();
    setIsVisible2(!isVisible2);
  };
  const handleVisible3 = (e) => {
    e.preventDefault();
    setIsVisible3(!isVisible3);
  };
  //--------------------------------------------------------

  const initialState = {
    email: "",
  };

  const [formValue, setFormValue] = useState(initialState);
  const { email } = formValue;

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  //--------------------------------------------------------

  const onSuccess = (data) => {
    toast.success("PasswordReset Link is Sent ,Please Check your Email.");
    setFormValue(initialState);
   
    setBtnLoading(false);
   
  };
  const onError = (error) => {
    setBtnLoading(false);
    toast.error(error.response.data.message);
    console.log(error.response.data.message);
  };

  const fetcher = (formData) => {
    return axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/users/password/forgot`,
      formData,
      {
        withCredentials: true,
      }
    );
  };
  const { mutate, data, isError, isLoading, error } = useMutation(fetcher, {
    onSuccess,
    onError,
  }); //here mutate is the function that passes input data to fetcher function directly

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formValue);
    setBtnLoading(true);
    mutate(formValue); //passing input formdata to api call
  };

  return (
    <Layout>
      <Head>
        <title>Forgot Password | MyExams.com</title>
      </Head>
      <div className="flex flex-col sm:flex-row w-full min-h-[80vh]">
        <div className="right-top flex flex-col items-center w-full  py-4">
          <h3 className="text-center bg-[#6cff47] cg-safron px-10 py-2 text-white my-4">
          Forgot Password
          </h3>
    
          <form
            className=" shadow-lg rounded-md px-6 py-8 mb-4 min-w-[300px] sm:w-[400px]
            border-[.5px]  border-purple-700/50"
            onSubmit={handleSubmit}
          >
            <div className=" relative mb-8">
              <input
                className="shadow  appearance-none border focus:border-purple-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-200/60"
                id="email"
                type="email"
                placeholder="Enter your Email"
                name="email"
                required
                value={email}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>

            <button
              className="bg-[tomato] w-full flex justify-center items-center hover:bg-[#ff6347d7] text-white uppercase  py-2 px-10 rounded focus:outline-none focus:shadow-outline my-4"
              type="submit"
            >
              {btnLoading ? "Sending Link to Email" : "Submit"}
              {btnLoading ? <ButtonLoader /> : <></>}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default forgotPassword;

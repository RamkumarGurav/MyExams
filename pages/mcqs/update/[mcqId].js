import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../../layout/Layout";
import { useRouter } from "next/router";
import ButtonLoader from "../../../components/ButtonLoader";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import Head from "next/head";
import FileBase from "react-file-base64";
import Cookies from "js-cookie";

const createMCQS = ({ initialData }) => {
  const { user, isAuthenticated } = useSelector((state) => ({
    ...state.auth,
  }));

  const dispatch = useDispatch();
  const router = useRouter();
  const { mcqId } = router.query;
  const [btnLoading, setBtnLoading] = useState(false);

  const initialState = {
    question: initialData?.data.question.question,
    answerIndex: initialData?.data.question.answerIndex,
    difficulty: initialData?.data.question.difficulty,
    subject: initialData?.data.question.subject,
    topics: initialData?.data.question.topics,
    qSetId: initialData?.data.question.qSetId,
  };

  const [ansA, setAnsA] = useState(initialData?.data.question.answers[0]);
  const [ansB, setAnsB] = useState(initialData?.data.question.answers[1]);
  const [ansC, setAnsC] = useState(initialData?.data.question.answers[2]);
  const [ansD, setAnsD] = useState(initialData?.data.question.answers[3]);

  const [formValue, setFormValue] = useState(initialState);
  const { subject, topics, question, answerIndex, difficulty, qSetId } =
    formValue;

  //--------------------------------------------------------

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (ansA || ansB || ansC || ansD) {
      setFormValue({ ...formValue, answers: [ansA, ansB, ansC, ansD] });
    }
  }, [ansA, ansB, ansC, ansD, setFormValue]);

  //--------------------------------------------------------

  const onSuccess = (data) => {
    toast.success("Successfully Update the MCQ");
    setBtnLoading(false);
  };
  const onError = (error) => {
    setBtnLoading(false);
    console.log(error.response.data.message);
    toast.error(error.response.data.message);
  };

  const fetcherUpdate = async (formValue) => {
    const jwt = Cookies.get("jwt");
    const instance = axios.create({
      withCredentials: true, //adding cookies
    });

    instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    const res = await instance.patch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/questions/${mcqId}`,
      formValue
    );

    return res.data;
  };
  const { mutate, data, isError, isLoading, error } = useMutation(
    fetcherUpdate,
    {
      onSuccess,
      onError,
    }
  ); //here mutate is the function that passes input data to fetcher function directly

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValue);

    setBtnLoading(true);
    mutate(formValue); //passing input formdata to api call
  };

  return (
    <Layout>
      <Head>
        <title>Create MCQ | MyExams.com</title>
      </Head>

      <div className=" flex flex-col justify-center items-center w-full min-h-[400px] py-10 bg-wite">
        <h1 className="text-center text-xl  cg-safron text-white  px-6 rounded-lg py-2 my-2 ">
          Create A MCQ
        </h1>
        <form
          className=" px-6 pt-6 pb-4 mb-4 min-w-[300px] w-[95%] sm:w-[80%]  border-[2px] border-[#ffffff8a] shadow-lg shadow-purple-500 rounded-lg bg-black/10 backdrop-blur-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-600 text-base sm:text-xl font-sembold mb-2"
              htmlFor="question"
            >
              Question
            </label>
            <textarea
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 "
              rows={5}
              cols={40}
              id="question"
              name="question"
              placeholder="Enter the Question"
              required
              value={question}
              autoComplete="off"
              onChange={handleChange}
            />{" "}
          </div>
          <div className="mb-4 flex items-center">
            <label
              className="block h-full text-gray-600 text-base sm:text-xl font-sembold mr-2"
              htmlFor="ansA"
            >
              {`(A)`}
            </label>
            <textarea
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 "
              rows={2}
              cols={40}
              id="ansA"
              placeholder="Enter the Option-A Answer"
              name="ansA"
              required
              value={ansA}
              autoComplete="off"
              onChange={(e) => setAnsA(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label
              className="block h-full text-gray-600 text-base sm:text-xl font-sembold mr-2"
              htmlFor="ansB"
            >
              {`(B)`}
            </label>
            <textarea
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 "
              rows={2}
              cols={40}
              id="ansB"
              placeholder="Enter the Option-B Answer"
              name="ansB"
              required
              value={ansB}
              autoComplete="off"
              onChange={(e) => setAnsB(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label
              className="block h-full text-gray-600 text-base sm:text-xl font-sembold mr-2"
              htmlFor="ansC"
            >
              {`(C)`}
            </label>
            <textarea
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 "
              rows={2}
              cols={40}
              id="ansC"
              placeholder="Enter the Option-C Answer"
              name="ansC"
              required
              value={ansC}
              autoComplete="off"
              onChange={(e) => setAnsC(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label
              className="block h-full text-gray-600 text-base sm:text-xl font-sembold mr-2"
              htmlFor="ansD"
            >
              {`(D)`}
            </label>
            <textarea
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 "
              rows={2}
              cols={40}
              id="ansD"
              placeholder="Enter the Option-D Answer"
              name="ansD"
              required
              value={ansD}
              autoComplete="off"
              onChange={(e) => setAnsD(e.target.value)}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-x-10 ">
            <div className="mb-4 ">
              <label
                className="block text-gray-600 text-base sm:text-xl font-sembold mb-2"
                htmlFor="answerIndex"
              >
                Answer
              </label>
              <select
                name="answerIndex"
                value={answerIndex}
                id="answerIndex"
                onChange={handleChange}
                required
                className="shadow  border  rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 "
              >
                <option value="">Select Correct Answer</option>
                <option value="0">Option-A</option>
                <option value="1">Option-B</option>
                <option value="2">Option-C</option>
                <option value="3">Option-D</option>
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-x-10 mb-4">
            <div className="mb-4 ">
              <label
                className="block text-gray-600 text-base sm:text-xl font-sembold mb-2"
                htmlFor="subject"
              >
                Subject
              </label>
              <select
                name="subject"
                value={subject}
                id="subject"
                onChange={handleChange}
                required
                className="shadow  border  rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 "
              >
                <option value="">Select Subject of the Question </option>
                <option value="gk">gk</option>
                <option value="history">History</option>
                <option value="geography">Geography</option>
                <option value="science">Science</option>
                <option value="polity">Polity</option>
                <option value="economics">Economics</option>
                <option value="english">English</option>
              </select>
            </div>
            <div className="mb-4 ">
              <label
                className="block text-gray-600 text-base sm:text-xl font-sembold mb-2"
                htmlFor="topics"
              >
                Topic
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 "
                id="topics"
                type="text"
                placeholder="Enter Topic Name of the Question"
                name="topics"
                value={topics}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-x-10 mb-4">
            <div className="mb-4 ">
              <label
                className="block text-gray-600 text-base sm:text-xl font-sembold mb-2"
                htmlFor="difficulty"
              >
                Difficulty Level
              </label>
              <select
                name="difficulty"
                value={difficulty}
                id="difficulty"
                onChange={handleChange}
                required
                className="shadow  border  rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 "
              >
                <option value="">Select Level of Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="mb-4 ">
              <label
                className="block text-gray-600 text-base sm:text-xl font-sembold mb-2"
                htmlFor="qSetId"
              >
                Question Paper ID
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 "
                id="qSetId"
                type="text"
                placeholder="Enter Question Paper ID"
                name="qSetId"
                value={qSetId}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="cg-purple rounded-lg w-full">
              <button
                className=" bg-white/20 backdrop-blur-md w-full flex justify-center items-center hover:bg-[#35c2932a] border-white/70 border-2 text-white  py-2 px-10 rounded focus:outline-none focus:shadow-outline  "
                type="submit"
              >
                SUBMIT
                {btnLoading ? <ButtonLoader /> : <></>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default createMCQS;

export async function getServerSideProps(context) {
  const { mcqId } = context.params; // Use `context.params` to get dynamic params//gettig id from dynamic route

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/questions/${mcqId}`
  );
  const data = await res.json();
  if (data.status !== "success") {
    return {
      notFound: true, //if test for mcqId is not found (when results is 0) redirect it to 404 page
    };
  }

  return {
    props: {
      initialData: data || null,
    },
  };
}

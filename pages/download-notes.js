import SectionQ2 from "../components/SectionQ2";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Layout from "../layout/Layout";
import Head from "next/head";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import NotesCard from "../components/NotesCard";

const limit = 20;
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const Notes = () => {
  const router = useRouter();
  //-------------private route-------------------------------------------
  // const { isAuthenticated } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   isAuthenticated ? router.push("/mcqs") : router.push("/login");
  // }, []);

  // if (!isAuthenticated) {
  //   return <h1> </h1>; //to avoid flickering
  // }
  //--------------------------------------------------------
  return (
    <Layout home gray>
      <Head>
        <title>Download Notes | MyExams.com</title>
      </Head>
      <div className="flex flex-col justify-center items-center py-10 px-4" id="notes">
        <h1 className="text-xl py-2 skew-x-[-12] bg-gray-800 cg-safron w-full text-white font-bold border-b-2  text-center">
          Download Notes and PDF
        </h1>
        <div className=" px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-5  justify-center justify-items-center">
          <NotesCard
            title={"Polity Notes"}
            fileName={"polity1"}
            downloadName={"polityNotes"}
            bg={"green-600"}
            cg={"navbar"}
          />
          <NotesCard
            title={"History Notes"}
            fileName={"polity1"}
            downloadName={"historyNotes"}
            bg={"blue-900"}
            cg={"cg-green"}
          />
          <NotesCard
            title={"Science Notes"}
            fileName={"polity1"}
            downloadName={"scienceNotes"}
            bg={"red-600"}
            cg={"cg-purple"}
          />
          <NotesCard
            title={"Economics Notes"}
            fileName={"polity1"}
            downloadName={"economicsNotes"}
            cg={"cg-dark-red"}
          />
          <NotesCard
            title={"General Studies Notes"}
            fileName={"polity1"}
            downloadName={"GSNotes"}
            cg={"cg-blue"}
          />
          <NotesCard
            title={"Essay Writings"}
            fileName={"polity1"}
            downloadName={"essayNotes"}
            cg={"cg-sblack"}
          />
          <NotesCard
            title={"English  Notes"}
            fileName={"polity1"}
            downloadName={"englishNotes"}
            cg={"cg-syellow"}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Notes;

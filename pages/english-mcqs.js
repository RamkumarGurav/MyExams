import SectionQ from "../components/SectionQ";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Layout from "../layout/Layout";
import Head from "next/head";

const limit = 20;
const subject = "geography";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const KQuestions = ({ initialData }) => {
  return (
    <Layout>
      <Head>
        <title>English MCQS | MyExams.com</title>
      </Head>
      <div className="py-2 flex flex-col items-center">
        <h1 className="text-xl py-2 skew-x-[-12]  text-gray-600 font-bold w-[200px] border-b-2 border-b-gray-600/50  text-center">
          MCQS of English
        </h1>
        <SectionQ
          initialData={initialData}
          baseUrl={baseUrl}
          subject={subject}
          limit={limit}
        />
      </div>
    </Layout>
  );
};

export default KQuestions;

export async function getServerSideProps() {
  const res = await fetch(
    `${baseUrl}/questions?subject=${subject}&page=1&limit=${limit}`
  );
  const data = await res.json();
  // console.log(data);

  return {
    props: {
      initialData: data,
    },
  };
}

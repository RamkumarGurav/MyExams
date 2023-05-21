import SectionQ from "../components/SectionQ";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Layout from "../layout/Layout";
import Head from "next/head";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const limit = 20;
const subject = "geography";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const PolityQuestions = ({ initialData }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();

  // useEffect(() => {
  //   isAuthenticated ? router.push("/polity-mcqs") : router.push("/login");
  // }, []);

  // if (!isAuthenticated) {
  //   return <h1> </h1>; //to avoid flickering
  // }

  return (
    <Layout gray>
      <Head>
        <title>Polity MCQS | MyExams.com</title>
      </Head>
      <div className="py-2 flex flex-col items-center">
        <h1 className="text-xl py-2 skew-x-[-12]  text-gray-600 font-bold w-[200px] border-b-2 border-b-gray-600/50  text-center">
          MCQS of Polity
        </h1>
        <SectionQ
          initialData={initialData}
          baseUrl={baseUrl}
          subject={"geography"}
          limit={limit}
        />
      </div>
    </Layout>
  );
};

export default PolityQuestions;

export async function getServerSideProps() {
  const res = await fetch(
    `${baseUrl}/questions?subject=${subject}&page=1&limit=${limit}`
  );
  const data = await res.json();

  return {
    props: {
      initialData: data,
    },
  };
}

import SectionQ2 from "../components/SectionQ2";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Layout from "../layout/Layout";
import Head from "next/head";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const limit = 20;
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const AllMcqs = ({ initialData }) => {
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
        <title>All MCQS | MyExams.com</title>
      </Head>
      <h1 className="mx-auto w-[50%] text-gray-900 font-semibold text-center pt-4 text-2xl  border-b-2 border-gray-200">
        ALL MCQS
      </h1>
      <SectionQ2 initialData={initialData} baseUrl={baseUrl} limit={limit} />
    </Layout>
  );
};

export default AllMcqs;

export async function getServerSideProps() {
  const res = await fetch(`${baseUrl}/questions?&page=1&limit=${limit}`);
  const data = await res.json();

  return {
    props: {
      initialData: data,
    },
  };
}

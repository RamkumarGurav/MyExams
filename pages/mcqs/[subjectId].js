import SectionQ from "../../components/SectionQ";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Layout from "../../layout/Layout";
import Head from "next/head";
import { useRouter } from "next/router";

const limit = 20;

const SubjectMCQS = ({ initialData }) => {
  const router = useRouter();
  const { subjectId } = router.query;

  return (
    <Layout>
      <Head>
        <title>{`MCQS of ${subjectId.toUpperCase()}| MyExams.com`}</title>
      </Head>
      <div className="py-2 flex flex-col items-center">
        <h1 className="text-xl py-2 skew-x-[-12]  text-gray-600 font-bold min-w-[310px] border-b-2 border-b-gray-600/50  text-center uppercase">
          {`MCQS of ${subjectId}`}
        </h1>
        <SectionQ initialData={initialData} subject={subjectId} limit={limit} />
      </div>
    </Layout>
  );
};

export default SubjectMCQS;

export async function getStaticProps(context) {
  const { subjectId } = context.params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/questions?subject=${subjectId}&page=1&limit=${limit}`
  );
  const data = await res.json();
  // console.log(data);

  return {
    props: {
      initialData: data,
    },
  };
}

export async function getStaticPaths() {
  const subs = [
    "geography",
    "economics",
    "gk",
    "science",
    "history",
    "polity",
    "english",
  ];
  const paths = subs.map((item) => ({
    params: { subjectId: item.toString() }, //always convert it to string
  }));

  return {
    paths,
    fallback: false,
  };
}

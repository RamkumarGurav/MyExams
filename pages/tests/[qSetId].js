import React from "react";
import { useRouter } from "next/router";
import SectionTest from "../../components/SectionTest";
import Layout from "@/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import Instructions from "../../components/Instructions";
import Head from "next/head";

const limit = 100;

const Test = ({ initialData }) => {
  const { startTest } = useSelector((state) => state.test);
  const router = useRouter();
  const { qSetId } = router.query;
  const dispatch = useDispatch();

  return (
    <Layout home gray>
      <Head>
        <title>Test | MyExams.com</title>
      </Head>
      {startTest ? (
        <SectionTest initialData={initialData} limit={limit} qSetId={qSetId} />
      ) : (
        <Instructions initialData={initialData} />
      )}
    </Layout>
  );
};

export default Test;

export async function getServerSideProps(context) {
  const { qSetId } = context.params; // Use `context.params` to get dynamic params//gettig id from dynamic route

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/questions?qSetId=${qSetId}&page=1&limit=100`
  );
  const data = await res.json();

  if (data.results === 0) {
    return {
      notFound: true, //if test for qsetId is not found (when results is 0) redirect it to 404 page
    };
  }

  return {
    props: {
      initialData: data || null,
    },
  };
}

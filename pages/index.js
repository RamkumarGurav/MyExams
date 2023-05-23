import Head from "next/head";
import { Inter } from "next/font/google";

import Layout from "../layout/Layout";

import SectionQ2 from "../components/SectionQ2";
import PSITestBoxes from "../components/PSITestBoxes";
import McqsLinks from "../components/McqsLinks";
import NotesCard from "../components/NotesCard";
import { useSelector } from "react-redux";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ initialData }) {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  return (
    <>
      <Layout gray>
        <Head>
          <title>MyExams | Home</title>
        </Head>

        {isAuthenticated && user && (
          <div className="max-w-[1280]px relative pt-10">
            <div
              className={`px-6 py-2 rounded-l-full absolute top-4 right-0 text-sm sm:text-lg text-white uppercase bg-[#9321df] cg-safron text-right`}
            >
              Welcome back {user?.data.user.name.split(" ")[0]}
            </div>
          </div>
        )}

        <McqsLinks />
        <div className=" bg-yellow-100 flex flex-col items-center">
          <h1 className="text-xl py-2 skew-x-[-12]  text-black font-bold w-[200px] border-b-2 border-b-gray-600  text-center">
            Top MCQS of Today
          </h1>
          <SectionQ2 initialData={initialData} />
        </div>

        <PSITestBoxes />

        {/* <div
          className="flex flex-col justify-center items-center p-1"
          id="notes"
        >
          <h1 className="text-xl py-2 skew-x-[-12] bg-gray-800 w-full text-white font-bold border-b-2  text-center">
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
        </div> */}
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(
    "https://talented-ant-loincloth.cyclic.app/api/v1/questions?page=1&limit=10"
  );

  const data = res.data;

  return {
    props: {
      initialData: data,
    },
  };
}

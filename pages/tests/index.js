import PSITestBoxes from "../../components/PSITestBoxes";
import Layout from "../../layout/Layout";
import Head from "next/head";

const index = () => {
  return (
    <Layout home gray>
      <Head>
        <title>Tests | MyExams.com</title>
      </Head>
      <PSITestBoxes />
    </Layout>
  );
};

export default index;

import React, { Children } from "react";
import HeaderX from "../components/HeaderX";
import HeaderY from "../components/HeaderY";
import Footer from "../components/Footer";
import Head from "next/head";

const Layout = ({ children, home, gray }) => {
  return (
    <div className="flex justify-center">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`layout w-full xl:w-[1280px] ${gray ? "bg-gray-100" : "bg-white"}`}
      >
        {home ? <HeaderX /> : <HeaderY />}

        {children}
        <Footer />
      </div>
      {/* <div className="xl:w-[1200px] bg-gray-100">
        {home ? <HeaderX /> : <HeaderY />}

        {children}
        <Footer />
      </div> */}
    </div>
  );
};

export default Layout;

import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";
import Image from "next/image";

const pageNotFound = () => {
  return (
    <div id="notfound">
      <Head>
        <title>Page Not Found | 404</title>
      </Head>
      <div className="notfound">
        {/* <div className="notfound_404">
          <h1 className="title">404</h1>
        </div> */}

        <Image
          src={
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjg4ZTQ0ZmI5NjEzODQ1OTdkZDY2MTRhYTg1MjcwOGJiOTdkNWEzYiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/lqFHf5fYMSuKcSOJph/giphy.gif"
          }
          width={400}
          height={400}
          alt="error"
        ></Image>
        <h2 className="sub_title" style={{ textTransform: "upperCase" }}>
          We are sorry, Page Not Found!
        </h2>

        <p className="text-sm" style={{ textTransform: "upperCase" }}>
          The page you are looking for might have been removed or had its name
          changed or is temporarily unavailable
        </p>
        <Link
          href="/"
          className="bbtn small_txt "
          style={{ textTransform: "upperCase", fontSize: "12px" }}
        >
          Back To Homepage
        </Link>
      </div>
    </div>
  );
};

export default pageNotFound;

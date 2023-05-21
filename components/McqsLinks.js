import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const McqsLinks = () => {
  return (
    <section className="flex justify-center py-6 px-4">
            <div className="flex flex-col items-center w-[500px] gap-4 ">
              <Link
                href="/gk-mcqs"
                className="mcqs-heading1 relative w-full z-10  text-white text-md flex justify-center items-center text-center py-2"
              >
                GK MCQS{" "}
                <span className="self-end absolute top-[-0px] shadow-md skew-x-[-0deg] right-[1vmax] sm:right-[10%] border ">
                  <Image
                    src="/mcqlogo3.jpg"
                    width={40}
                    height={40}
                    alt="Picture of the author"
                  />
                </span>
              </Link>
              <Link
                href="/polity-mcqs"
                className="mcqs-heading2 relative w-full z-10  text-white text-md flex justify-center items-center text-center py-2"
              >
                Polity MCQS{" "}
                <span className="self-end absolute top-[-0px] shadow-md skew-x-[-0deg] right-[1vmax] sm:right-[10%] border ">
                  <Image
                    src="/mcqlogo3.jpg"
                    width={40}
                    height={40}
                    alt="Picture of the author"
                  />
                </span>
              </Link>
              <Link
                href="/history-mcqs"
                className="mcqs-heading3 relative w-full z-10  text-white text-md flex justify-center items-center text-center py-2"
              >
                History MCQS{" "}
                <span className="self-end absolute top-[-0px] shadow-md skew-x-[-0deg] right-[1vmax] sm:right-[10%] border ">
                  <Image
                    src="/mcqlogo3.jpg"
                    width={40}
                    height={40}
                    alt="Picture of the author"
                  />
                </span>
              </Link>
              <Link
                href="/geography-mcqs"
                className="mcqs-heading4 relative w-full z-10  text-white text-md flex justify-center items-center text-center py-2"
              >
                Geography MCQS{" "}
                <span className="self-end absolute top-[-0px] shadow-md skew-x-[-0deg] right-[1vmax] sm:right-[10%] border ">
                  <Image
                    src="/mcqlogo3.jpg"
                    width={40}
                    height={40}
                    alt="Picture of the author"
                  />
                </span>
              </Link>
              <Link
                href="/science-mcqs"
                className="mcqs-heading5 relative w-full z-10  text-white text-md flex justify-center items-center text-center py-2"
              >
                Science MCQS{" "}
                <span className="self-end absolute top-[-0px] shadow-md skew-x-[-0deg] right-[1vmax] sm:right-[10%] border ">
                  <Image
                    src="/mcqlogo3.jpg"
                    width={40}
                    height={40}
                    alt="Picture of the author"
                  />
                </span>
              </Link>
              <Link
                href="/economics-mcqs"
                className="mcqs-heading6 relative w-full z-10  text-white text-md flex justify-center items-center text-center py-2"
              >
                Economics MCQS{" "}
                <span className="self-end absolute top-[-0px] shadow-md skew-x-[-0deg] right-[1vmax] sm:right-[10%] border ">
                  <Image
                    src="/mcqlogo3.jpg"
                    width={40}
                    height={40}
                    alt="Picture of the author"
                  />
                </span>
              </Link>
              <Link
                href="/english-mcqs"
                className="mcqs-heading7 relative w-full z-10  text-white text-md flex justify-center items-center text-center py-2"
              >
                English MCQS{" "}
                <span className="self-end absolute top-[-0px] shadow-md skew-x-[-0deg] right-[1vmax] sm:right-[10%] border ">
                  <Image
                    src="/mcqlogo3.jpg"
                    width={40}
                    height={40}
                    alt="Picture of the author"
                  />
                </span>
              </Link>
            </div>
          </section>
  )
}

export default McqsLinks
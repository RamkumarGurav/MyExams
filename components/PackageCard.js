import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FaCartPlus } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi";
import { BsFire } from "react-icons/bs";
import { HiBookmark } from "react-icons/hi";
import { BsLightningFill } from "react-icons/bs";

const BookCard = () => {
  return (
    <div className="book_card relative  w-[300px] mx-1 bg-white rounded-md pb-2 shadow-lg ">
      {/* <div className="book-type-sticker absolute top-2 left-0 bg-red-600 z-10 text-white pl-2 pr-6 text-sm">
        Best Seller
      </div> */}
      <div className="book_card_container ">
        <div className="img_container flex flex-col items-center py-4 bg--700 rounded-t-md black-glass-bg px-4">
          {/* <Link href={`/books`} className="w-full">
            <div className="relative w-full h-[200px]">
              <Image
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu3CZ_dn8GzE8iSPfPi0pekUlZoWKlo8GNEL11GH9k85RkKzBuW_AyQnf_mvoxNE9VvpI&usqp=CAU"
                }
                alt="profile"
                fill
                sizes="(max-width: 640px) 100vw
              (max-width: 1024px) 50vw,
              33vw" //thie is used when we use grid with cards images (this downloads small size imagees at bigger devices width and bigger images at smaller devices width to improve userexperience)
                // sizes="100vw"//befualt width size that generates defualt srcsets(srcsets defines dowinloading of diff sized images for diff divice widths )//use this property when u cant ur image responsive but its not used in grid (eg-when u want to dispaly single image in full window with certain height)

                // priority //When true, the image will be considered high priority and preload. Lazy loading is automatically disabled for images using priority.
                className="rounded-md object-contain" //always give object-cover class to make image responsive without losing its aspects ratio( The image keeps its aspect ratio and fills the given dimension. The image will be clipped to fit)
              />
            </div>
          </Link> */}
          <div className="flex items-center ">
            <BsFire size={24} color="white" />{" "}
            <h3 className=" text-xl merriweather my-1 bg--700  p-1 rounded-sm text-gray-50 font-bold">
              5000 MCQS of Polity
            </h3>
          </div>
          <div className="flex items-center ">
            <HiBookmark size={24} color="white" />{" "}
            <h3 className=" text-xl merriweather my-1 bg--700  p-1 rounded-sm text-gray-50 font-bold">
              Unlimited Mock Tests
            </h3>
          </div>
          <div className="flex items-center">
            <BsLightningFill size={24} color="white" />{" "}
            <h3 className=" text-xl merriweather my-1 bg--700  p-1 rounded-sm text-gray-50 font-bold">
              1 Year Validity
            </h3>
          </div>

          {/* <h3 className=" text-xl merriweather my-1 bg--700  p-1 rounded-sm text-gray-50 font-bold">
            Unlimited Tests
          </h3>
          <h3 className=" text-2xl merriweather my-1 bg--700  p-1 rounded-sm text-gray-50 font-bold">
            FOR 1 YEAR
          </h3> */}
        </div>
        <div className="book_details_container flex flex-col gap-1  pt-4">
        <h3
            className="book_title text-[15px] font-semibold text-gray-700 mx-2"
            style={{ lineHeight: "16px" }}
          >
           5000 MCQS Polity Package
          </h3>
          <div className="ratings"></div>
          <div className="price-details mx-2 ">
        
            <span className="pr-2 text-xl font-semibold ubuntu text-gray-900">
              ₹299
            </span>
            <span className="px-2 text-gray-400 line-through ubuntu">₹599</span>
            <span className="px-2 text-sm text-green-500 ubuntu">
              (50% Off)
            </span>
          </div>
          <div className="flex flex-col justify-between my-1 gap-2 mx-2">
            <button className="add-to-cart-btn  flex justify-center bg-[#9411ff] hover:bg-[#6915ad]  text-white py-2 px-4 rounded gap-2 uppercase text-sm">
              <FaCartPlus size={18} className="" />
              <p className="text-white">ADD TO CART</p>{" "}
            </button>
            <button className="buy-btn hover:navbar flex  justify-center bg-[#ff7c11] hover:bg-[#e06907] text-white py-2 px-4 rounded gap-2 uppercase text-sm">
              <HiShoppingBag size={18} className="text-white " />
              <p className="text-white">Buy Now</p>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

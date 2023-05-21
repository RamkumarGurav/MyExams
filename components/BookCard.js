import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FaCartPlus } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import Cookies from "js-cookie";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const {
    name,
    author,
    publication,
    popularityType,
    price,
    discount,
    orgPrice,
    images,
    stock,
    _id,
  } = book;

  const truncName = name.length > 63 ? `${name.slice(0, 63)} ...` : name;
  const authorStr = `- by ${author} (author),${publication}(publisher) `;
  const truncAuthor =
    authorStr.length > 40 ? `${authorStr.slice(0, 40)} ...` : authorStr;
  // console.log(book);

  const router = useRouter();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: _id,
        name: name,
        price: price,
        image: images[0].url,
        stock: stock,
        quantity: 1,
      })
    );
    if (!Cookies.get("loggedIn")) {
      return router.push("/login");
    }
  };

  const handleBuyNow = () => {
    dispatch(
      addToCart({
        product: _id,
        name: name,
        price: price,
        image: images[0].url,
        stock: stock,
        quantity: 1,
      })
    );
    // isAuthenticated ? router.push("/cart") : router.push("/login");
    router.push("/cart");
  };

  return (
    <div className="book_card relative px-2 py-1 w-[300px] mx-1 bg-white rounded-md shadow-md ">
      <div
        className={`book-type-sticker absolute top-2 p-1 left-0 ${
          popularityType === "Best Seller" ? "bg-blue-600" : "navbar"
        } z-10 text-white pl-2 pr-6 text-[12px]`}
      >
        {popularityType}
      </div>
      <div className="book_card_container flex flex-col justify-between h-full">
        <div className="img_container">
          <Link href={`/books/${_id}`} className="w-full">
            <div className="relative w-full h-[200px]">
              <Image
                src={images[0].url}
                alt="profile"
                fill={true}
                sizes="(max-width: 640px) 100vw
              (max-width: 1024px) 50vw,
              33vw" //thie is used when we use grid with cards images (this downloads small size imagees at bigger devices width and bigger images at smaller devices width to improve userexperience)
                // sizes="100vw"//befualt width size that generates defualt srcsets(srcsets defines dowinloading of diff sized images for diff divice widths )//use this property when u cant ur image responsive but its not used in grid (eg-when u want to dispaly single image in full window with certain height)

                priority={true} //When true, the image will be considered high priority and preload. Lazy loading is automatically disabled for images using priority.
                className="rounded-md object-contain" //always give object-cover class to make image responsive without losing its aspects ratio( The image keeps its aspect ratio and fills the given dimension. The image will be clipped to fit)
                placeholder="blur"
                blurDataURL={images[0].url}
              />
            </div>
          </Link>
        </div>
        <div className="book_details_container flex flex-col gap-1  pt-4">
          <h3
            className="book_title text-[15px] min-h-[30px] font-semibold text-gray-700"
            style={{ lineHeight: "16px" }}
          >
            {/* Chiguru For Psi & Pc Spardhatmaka Tayarige Upayukthavada Pustaka */}
            {truncName}
          </h3>
          <p className="author_publication text-[12px] text-gray-400 font-semibold">
            {/* - by Babu Reddy, Chiguru Book Publications */}
            {truncAuthor}
          </p>
          <div className="ratings"></div>
          <div className="price-details flex items-center roboto">
            <span className="pr-2 text-xl font-semibold ubuntu text-gray-900">
              {`₹${price}`}
            </span>
            <span className="px-2 text-gray-400 line-through ubuntu">{`₹${orgPrice}`}</span>
            <span className="px-2 text-sm text-green-500 ubuntu">{`${discount}% off`}</span>
          </div>
          <div className="flex flex-col justify-between my-1 gap-2">
            <button
              className="add-to-cart-btn  flex justify-center bg-[#9411ff] hover:bg-[#6915ad]  text-white py-2 px-4 rounded gap-2 uppercase text-sm"
              onClick={handleAddToCart}
            >
              <FaCartPlus size={18} className="" />
              <p className="text-white">ADD TO CART</p>{" "}
            </button>
            <button
              className="buy-btn hover:navbar flex  justify-center bg-[#ff7c11] hover:bg-[#e06907] text-white py-2 px-4 rounded gap-2 uppercase text-sm"
              onClick={handleBuyNow}
            >
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

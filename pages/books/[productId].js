import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useQuery } from "react-query";
import Head from "next/head";
import Layout from "../../layout/Layout";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import Cookies from "js-cookie";

const bookDetails = ({ initialData }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [pData, setPData] = useState(initialData);
  const router = useRouter();
  const { productId } = router.query;

  const fetcher = async (productId) => {
    const res = await fetch(
      `https://talented-ant-loincloth.cyclic.app/api/v1/products/${productId}`
    );
    const data = await res.json();

    return data;
  };

  const onSuccess = (data) => {
    setPData(data);
  };

  const { data, isLoading, isError, error } = useQuery(
    ["book", productId],
    () => fetcher(productId),
    {
      keepPreviousData: true,
      onSuccess,
    }
  );

  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;
  const product = pData && pData?.data?.product;

  const increaseQuantity = () => {
    if (quantity >= product.stock) {
      return;
    }
    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: productId,
        name: product?.name,
        price: product?.price,
        image: product?.images[0].url,
        stock: product?.stock,
        quantity,
      })
    );
    if (!Cookies.get("loggedIn")) {
      return router.push("/login");
    }
  };

  const handleBuyNow = () => {
    dispatch(
      addToCart({
        product: productId,
        name: product?.name,
        price: product?.price,
        image: product?.images[0].url,
        stock: product?.stock,
        quantity,
      })
    );
    router.push("/cart");
  };

  const authorStr = `- by ${product?.author} (author),${product?.publication}(publisher) `;
  return (
    <>
      <Layout home gray>
        <Head>
          <title>{`MyExams | ${product?.name}`}</title>
        </Head>
        <section className="bookDetails grid grid-cols-1 md:grid-cols-2  sm:py-4 sm:px-12">
          <div className="top-or-left flex justify-center py-4 px-4">
            <div className="w-[200px] sm:w-[70%]">
              <Carousel autoPlay showThumbs={false}>
                {product?.images &&
                  product.images.map((img, i) => (
                    <div key={img.url} className="slide-card">
                      <Image
                        className="CarouselImage"
                        src={img.url}
                        alt={`${i + 1} Slide`}
                        priority
                        width={320}
                        height={320}
                      />
                    </div>
                  ))}
              </Carousel>
            </div>
          </div>
          <div className="bottom-or-right px-4 md:py-4 md:px-8 flex flex-col  gap-4">
            <p className="author_publication text-sm sm:text-base text-gray-400 font-semibold">
              #{productId}
            </p>
            <h3 className="book_title  text-lg sm:text-2xl font-semibold text-gray-900">
              {/* Chiguru For Psi & Pc Spardhatmaka Tayarige Upayukthavada Pustaka */}
              {product?.name}
            </h3>
            <p className="author_publication text-sm sm:text-base text-gray-500 font-semibold">
              {/* - by Babu Reddy, Chiguru Book Publications */}
              {authorStr}
            </p>
            <p className="author_publication text-sm text-gray-700 ">
              {/* - by Babu Reddy, Chiguru Book Publications */}
              <span className="text-black font-semibold">
                Description
              </span>: {product?.description}
            </p>

            {/* <div className="ratings"></div> */}
            <div className="price-details flex items-center roboto">
              <span className="pr-2 text-2xl md:text-4xl font-semibold ubuntu text-gray-900">
                {`₹${product?.price}`}
              </span>
              <span className="px-2 text-gray-400 line-through ubuntu text-md md:text-xl">{`₹${product?.orgPrice}`}</span>
              <span className="px-2 text-md md:text-xl text-green-500 ubuntu">{`${product?.discount}% off`}</span>
            </div>
            <div className="flex flex-col justify-between my-1 gap-2">
              <div className="detailsBlock-3-1-1 flex ">
                <button onClick={decreaseQuantity}>-</button>
                <input type="number" value={quantity} readOnly />
                <button onClick={increaseQuantity}>+</button>

                <div
                  className="add-to-cart-btn  flex justify-center bg-[#9411ff] hover:bg-[#6915ad]  text-white py-2 px-4 rounded gap-2 uppercase text-sm ml-10 cursor-pointer"
                  onClick={handleAddToCart}
                >
                  <FaCartPlus size={18} className="" />
                  <p className="text-white">ADD TO CART</p>{" "}
                </div>
              </div>

              <button
                className="buy-btn my-4 mb-12 sm:my-12 hover:navbar flex  justify-center bg-[#ff7c11] hover:bg-[#e06907] text-white py-2 px-4 rounded gap-2 uppercase text"
                onClick={handleBuyNow}
              >
                <HiShoppingBag size={25} className="text-white " />
                <p className="text-white">Buy Now</p>{" "}
              </button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default bookDetails;

export async function getServerSideProps(context) {
  const { productId } = context.params; // Use `context.params` to get dynamic params//gettig id from dynamic route

  const res = await fetch(
    `https://talented-ant-loincloth.cyclic.app/api/v1/products/${productId}`
  );
  const data = await res.json();
  if (data.status !== "success") {
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

import React, { useState } from "react";
import Layout from "../../layout/Layout";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const index = ({ initialData }) => {
  const [orders, setOrders] = useState(initialData);
  var catchId;

  const fetcher = async () => {
    const jwt = Cookies.get("jwt");
    const instance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
      withCredentials: true, //adding cookies
    });

    instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    const res = await instance.get(`/orders/me`);
    const data = res.data;

    return data;
  };

  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchOrders,
  } = useQuery("orders", fetcher, {
    enabled: false,
    onSuccess: (data) => {
      console.log(data);
      setOrders(data?.data.orders);
    },
    onError: (error) => {
      toast.error("Something went wrong");
    },
  });

  //---------------cancel my order-----------------------------------------

  const handleCancelOrder = () => {
    return refetch();
  };

  const cancelFetcher = async (catchId) => {
    const jwt = Cookies.get("jwt");
    const instance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
      withCredentials: true, //adding cookies
    });

    instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    const res = await instance.patch(`/orders/cancel-my-order/${catchId}`);

    const data = res.data;
    return data;
  };

  const {
    data: d,
    isLoading: iL,
    isError: iE,
    error: e,
    refetch,
  } = useQuery(["cancelOrder", catchId], () => cancelFetcher(catchId), {
    enabled: false,
    onSuccess: () => {
      return refetchOrders();
    },
  });

  //--------------------------------------------------------
  return (
    <Layout home gray>
      <Head>
        <title>My Oders | MyExams.com</title>
      </Head>
      {!orders || orders.length === 0 ? (
        <div className="cart-empty flex flex-col gap-4 justify-center items-center min-h-[79vh] mb-4 ">
          {/* <h1 className="sub-title">Empty Cart</h1>*/}
          <h1 className="text-2xl font-bold text-[tomato]">No Orders</h1>
          {/* <RemoveShoppingCartIcon
            style={{ color: "tomato", fontSize: "10vmax" }}
            className="title"
          /> */}
          <div className="relative w-full h-[200px]">
            <Image
              src="/images/emptyCart2.png"
              alt="profile"
              fill
              sizes="(max-width: 640px) 100vw
              (max-width: 1024px) 50vw,
              33vw" //thie is used when we use grid with cards images (this downloads small size imagees at bigger devices width and bigger images at smaller devices width to improve userexperience)
              // sizes="100vw"//befualt width size that generates defualt srcsets(srcsets defines dowinloading of diff sized images for diff divice widths )//use this property when u cant ur image responsive but its not used in grid (eg-when u want to dispaly single image in full window with certain height)

              priority //When true, the image will be considered high priority and preload. Lazy loading is automatically disabled for images using priority.
              className="rounded-md object-contain" //always give object-cover class to make image responsive without losing its aspects ratio( The image keeps its aspect ratio and fills the given dimension. The image will be clipped to fit)
            />
          </div>
          <Link
            href="/books"
            className="flex justify-center bg-[tomato] hover:bg-[#ff6347c7]  text-white py-2 px-10  gap-2 uppercase text-sm rounded-full"
          >
            Go Buy Books
          </Link>
        </div>
      ) : (
        <div className="confirmCartItems min-h-[79vh] mb-8">
          <h2
            className="text-xl sm:text-2xl text-gray-700 font-semibold"
            style={{ margin: "1rem 0" }}
          >
            My Orders :
          </h2>

          <div className="sm:flex cg-safron py-4   text-xl sm:visible hidden  mb-4">
            <div className="w-[60%] text-center text-base md:text-xl">
              Orders
            </div>
            <div className="w-[20%] text-center text-base md:text-xl">
              Total Price
            </div>
            <div className="w-[20%] text-center text-base md:text-xl">
              Order Status
            </div>
          </div>
          <div className="bg-white flex flex-col gap-4 ">
            {orders &&
              orders?.map((order, i) => (
                <div key={i} className="shadow-lg border border-gray-400">
                  <section
                    // style={{ margin: "2vmax" }}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center   "
                  >
                    <div className="sm:w-[60%] px-1">
                      {order.orderedItems.map((item, i2) => {
                        return (
                          <div
                            className="my-2 flex items-center w-full shadow-md  "
                            key={i2}
                          >
                            <Image
                              src={item.image}
                              alt="Product"
                              priority
                              width={55}
                              height={55}
                              className="mr-2"
                            />
                            <div className=" w-full ">
                              <Link
                                href={`/product/${item?.productId}`}
                                className="sm:w-[50%] w-full px-1"
                              >
                                <p className="text-sm ms:text-base text-gray-700 hover:text-purple-800 font-semibold text-left w-full">
                                  {item?.name}
                                </p>
                              </Link>

                              <div className="roboto flex">
                                <span className="roboto">{`${
                                  item?.quantity
                                } X ₹${item?.price} = ${" "}`}</span>
                                <span className="roboto  text-[tomato]">{` ₹${
                                  item?.price * item?.quantity
                                }`}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="w-full sm:w-[20%] flex sm:justify-center  bg-white sm:gap-4  text-center roboto  text-[tomato] font-semibold border-[.5px] border-t-gray-500 sm:border-none">
                      <span className="visible sm:hidden w-[50%] bg-yellow-300 text-gray-700 font-semibold">
                        Total Price
                      </span>
                      <span className="text-[tomato] w-[50%] sm:w-full roboto font-semibold text-center">
                        ₹{order.totalPrice}
                      </span>
                    </div>
                    <div className="w-full sm:w-[20%]   sm:bg-white flex sm:justify-center  sm:gap-4 text-center  border-[.5px] border-t-gray-700 sm:border-none">
                      <span className="visible sm:hidden w-[50%] bg-yellow-300 text-gray-700 font-semibold">
                        Order Status
                      </span>{" "}
                      <span
                        className={`${
                          order.orderStatus === "cancelled"
                            ? "text-red-600"
                            : "text-green-600"
                        } w-[50%] sm:w-full font-semibold text-center`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </section>
                  {order.orderStatus === "cancelled" ||
                  order.orderStatus === "requested for cancelation" ||
                  order.orderStatus === "recieved" ||
                  order.orderStatus === "refunded" ? null : (
                    <div className="w-full px-2 flex justify-end border-t-0 border-t-red-500">
                      <button
                        className="bg-[#ff6347d0]  flex justify-center items-center hover:bg-[#ff6347d0] text-white uppercase  text-sm py-2 px-2 rounded focus:outline-none focus:shadow-outline mb-2 mr-10"
                        onClick={(e) => {
                          catchId = order._id;
                          handleCancelOrder();
                        }}
                        disabled={
                          order.orderStatus === "cancelled" ||
                          order.orderStatus === "requested for cancelation" ||
                          order.orderStatus === "recieved" ||
                          order.orderStatus === "refunded"
                        }
                      >
                        Cancel Order
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default index;

export async function getServerSideProps(context) {
  //in ssr or ssg we need to manually add the cookie in the headers ,cookie state is alreadey stored in browser can be accessed using 'context.req.cookies' method
  const { jwt } = context.req.cookies;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/me`,
    {
      headers: { Cookie: `jwt=${jwt};` }, //'withCredentials:true' doesnt work inside getServerSideProps
    }
  );
  const data = res.data;
  return {
    props: {
      initialData: data?.data.orders,
    },
  };
}

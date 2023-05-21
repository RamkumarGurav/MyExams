import React, { useEffect, useState } from "react";
import CheckoutSteps from "../../../components/CheckoutSteps";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  createOrder,
  clearCartItems,
  addToOrderedList,
  removeOrderDetails,
  setOrderFinished,
} from "../../../redux/cartSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Head from "next/head";
import Layout from "../../../layout/Layout";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "react-query";
import Loader from "../../../components/Loader";
import Error from "../../../components/Error";
import axios from "axios";
import Cookies from "js-cookie";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { successId } = router.query;
  const { orderDetails } = useSelector((state) => state.cart);
  var successIdServer = "pi_BkSw7WFuxtjr1RaUmjFUDtj";

  //--------------------------------------------------------
  const onSuccess = (data) => {
    dispatch(clearCartItems());
    // dispatch(removeOrderDetails());
    // dispatch(setOrderFinished(true))
    dispatch(addToOrderedList(orderDetails));
    toast.success("Order placed Successfully");
    successIdServer = null;
  };
  const onError = (error) => {
    // toast.error("Something went wrong");
    console.log(error.response.data.message);
  };

  const fetcher = async (formData) => {
    const jwt = Cookies.get("jwt");
    const instance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
      withCredentials: true, //adding cookies
    });

    instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    return await instance.post(`/orders`, formData);
  };
  const { mutate, data, isError, isLoading, error } = useMutation(fetcher, {
    onSuccess,
    onError,
  }); //here mutate is the function that passes input data to fetcher function directly

  useEffect(() => {
    if (orderDetails) {
      if (successId === successIdServer) {
        mutate(orderDetails);
      } else {
        router.push("/");
      }
    }
  }, [successId, successIdServer, orderDetails, dispatch]);

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  const alertUser = () => {
    successIdServer = "wrong";
  };

  // console.log({ successId });
  // console.log(orderDetails);
  // console.log({ successIdServer });

  if (isError) {
    return <Error />;
  }
  if (isLoading) {
    return <Loader />;
  }

  // if (successId !== successIdServer) {
  //   return <Error />;
  // }
  //--------------------------------------------------------

  return (
    <Layout home gray>
      <div style={{ paddingTop: "6vmax", height: "100vh" }}>
        <Head>
          <title>Payment Success | MyExams.com</title>
        </Head>
        <CheckoutSteps activeStep={2} />
        <div
          className="shippingContainer"
          style={{ padding: "2vmax", justifyContent: "start" }}
        >
          <h1 className="text-xl" style={{ color: "green", margin: "4vmax" }}>
            Order Placed Successfully
          </h1>
          <CheckCircleIcon
            style={{ color: "green", fontSize: "10vmax" }}
            className="title"
          />
          <Link href="/books" className="paymentBtn">
            Go Buy Books
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;

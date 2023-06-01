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

  useEffect(() => {
    dispatch(clearCartItems());
  }, [dispatch]);

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

import React, { useState, useEffect } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";

import Cookies from "js-cookie";
// import { loadStripe } from "@stripe/stripe-js";
import { saveOrderDetails } from "../redux/cartSlice";
import Head from "next/head";
import Layout from "@/layout/Layout";

const stripePublishableApi =
  "pk_test_51McTEySCJPc5Ykk3JHYunC9jtkmPFDskUjxObsW4QLy5rppW2ER1bnsaLaxTZValgL2eWfIZnQEKe7CHHq89AlPc00314PZsTZ";

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  //-------------solution when u get hydration error-------------------------------------------
  const [userX, setUserX] = useState();
  useEffect(() => {
    setUserX({ ...user });
  }, [user]);
  //-------------solution when u get hydration error-------------------------------------------
  const [cItems, setCItems] = useState();
  useEffect(() => {
    setCItems([...cartItems]);
  }, [cartItems]);
  //--------------------------------------------------------
  //-------------solution when u get hydration error-------------------------------------------
  const [shippingInfoX, setShippingInfoX] = useState();
  useEffect(() => {
    setShippingInfoX({ ...shippingInfo });
  }, [shippingInfo]);
  //--------------------------------------------------------

  //---------------------testing-----------------------------------
  // const subtotal = cartItems.reduce(
  //   (acc, curItem) => acc + curItem.quantity * curItem.price,
  //   0
  // );
  // const shippingcharges = subtotal > 1000 ? 0 : 60;
  // let tax = subtotal * 0.18;
  // let totalPrice = subtotal + tax + shippingcharges;
  //-----------------------testing---------------------------------

  let totalPrice = cItems?.reduce(
    (acc, curItem) => acc + Number(curItem.quantity) * Number(curItem.price),
    0
  );
  totalPrice = Number(totalPrice);

  const address = `${shippingInfoX?.name}, ${shippingInfoX?.address}, ${shippingInfoX?.city}, ${shippingInfoX?.state},${shippingInfoX?.pinCode}, ${shippingInfoX?.country}`;

  const orderedItemsDetails = cItems?.map((item) => {
    return { productId: item.product, quantity: item.quantity };
  });
  console.log(orderedItemsDetails);

  let bodyData;
  useEffect(() => {
    bodyData = {
      shippingInfo: shippingInfoX,
      orderedItemsDetails,

      totalPrice,
    };
  }, [shippingInfoX, orderedItemsDetails, totalPrice]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    // console.log("bodyData", bodyData);
    // console.log(bodyData);

    try {
      const jwt = Cookies.get("jwt");
      const instance = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
        withCredentials: true, //adding cookies
      });

      instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const res = await instance.post(
        `/orders/create-checkout-session`,
        bodyData
      );

      const session = res.data.session;
      dispatch(saveOrderDetails(res.data));
      const sid = Date.now();
      localStorage.setItem("sid", JSON.stringify(sid));
      router.push(session.url);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      // console.log(error.response.data.message);
      // navigate("/order/payment-cancelled");
    }
  };

  //--------------------------------------------------------
  // const onSuccess = (data) => {
  //   // const profile = data.data;
  //   // localStorage.setItem("profile", JSON.stringify({ ...profile }));
  //   // toast.success("LoggedIn Successfully");
  //   // setBtnLoading(false);
  //   // setFormValue(initialState);
  //   // dispatch(setUser(profile));
  //   // Cookies.set("loggedIn", true);
  //   // router.back();
  // };
  // const onError = (error) => {
  //   // localStorage.clear();
  //   // setBtnLoading(false);
  //   // dispatch(setLogout());
  //   toast.error(error.response.data.message);
  // };

  // const fetcherCheckout = (formData) => {
  //   return axios.post(`http://localhost:5000/api/v1/orders/create-checkout-session`, formData);
  // };
  // const {
  //   mutate: mutateCheckout,
  //   data: dataCheckout,
  //   isError: isErrorCheckout,
  //   isLoading: isLoadingCheckout,
  //   error: errorCheckout,
  // } = useMutation(fetcherCheckout, {
  //   onSuccess,
  //   onError,
  // }); //here mutate is the function that passes input data to fetcher function directly

  // const handleCheckout = (e) => {
  //   e.preventDefault();
  //   // console.log(formValue);
  //   // setBtnLoading(true);
  //   mutateCheckout(formValue); //passing input formdata to api call
  // };
  //--------------------------------------------------------

  useEffect(() => {
    if (totalPrice === 0) {
      router.push("/cart");
    }
  }, []);

  return (
    <Layout home gray={false}>
      <Head>
        <title>Confirm Order | MyExams.com</title>
      </Head>
      <div style={{ paddingTop: "4vmax" }}>
        <CheckoutSteps activeStep={1} />
        <div className="confirmOrderPage" style={{ marginTop: "4vmax" }}>
          <div>
            <div className="confirmShippingArea">
              <h2 className="sub-title-big mutedColor font-semibold ">
                Shipping Info :{" "}
              </h2>
              <div className="confirmShippingAreaBox">
                <div>
                  <span>Name : </span>
                  <span className="mutedColor">{userX?.data?.user?.name}</span>
                </div>

                <div>
                  <span>Phone : </span>
                  <span className="mutedColor">{shippingInfoX?.phoneNo}</span>
                </div>
                <div>
                  <span>Address : </span>
                  <span className="mutedColor">{address}</span>
                </div>
              </div>
            </div>

            <div className="confirmCartItems">
              <h2
                className="sub-title-big mutedColor font-semibold"
                style={{ margin: "1rem 0" }}
              >
                Your Cart Items :
              </h2>
              <div className="confirmCartItemsContainer">
                {cItems &&
                  cItems?.map((item, i) => (
                    <div key={i} className="shadow-lg">
                      {/* <img
                      src={item.image}
                      alt="Product"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    /> */}
                      <section
                        // style={{ margin: "2vmax" }}
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 border border-gray-400 my-2 px-3 gap-2 "
                      >
                        <Link
                          href={`/product/${item?.product}`}
                          className="sm:w-[50%] w-full"
                        >
                          <p className="text-gray-700 hover:text-purple-800 font-semibold text-left w-full">
                            {item?.name}
                          </p>
                        </Link>
                        <div className="roboto flex">
                          <span className="roboto">{`${item?.quantity} X ₹${
                            item?.price
                          } = ${" "}`}</span>
                          <span className="roboto  text-[tomato]">{` ₹${
                            item?.price * item?.quantity
                          }`}</span>
                        </div>
                      </section>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* dsjl */}

          <div>
            <div className="orderSummaray">
              <h2 className="sub-title-big mutedColor text-center font-semibold">
                Order Summary
              </h2>
              {/* <div>
              <div>
                <span>Subtotal: </span>
                <span className="mutedColor">₹{subtotal}</span>
              </div>
              <div>
                <span>Shipping Charges: </span>
                <span className="mutedColor">₹{shippingcharges}</span>
              </div>
              <div>
                <span>GST: </span>
                <span className="mutedColor">₹{tax}</span>
              </div>
            </div> */}

              <div className="orderSummaryTotal">
                <b>Total:</b>
                <span className="roboto">₹{totalPrice}</span>
              </div>
              <button
                className="paymentBtn ubuntu text-base"
                onClick={handleCheckout}
                disabled={totalPrice <= 1}
              >
                Proceed To Payment ₹{totalPrice}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConfirmOrder;

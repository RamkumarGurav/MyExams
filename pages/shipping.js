import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
// import { Country, State } from "country-state-city";
import Head from "next/head";
import { saveShippingInfo } from "../redux/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cart);
  const [name, setName] = useState(shippingInfo ? shippingInfo.name : "");
  const [address, setAddress] = useState(
    shippingInfo ? shippingInfo.address : ""
  );
  const [city, setCity] = useState(shippingInfo ? shippingInfo.city : "");
  const [state, setState] = useState(shippingInfo ? shippingInfo.state : "");
  const [country, setCountry] = useState(
    shippingInfo ? shippingInfo.country : ""
  );
  const [pinCode, setPinCode] = useState(
    shippingInfo ? shippingInfo.pinCode : ""
  );
  const [phoneNo, setPhoneNo] = useState(
    shippingInfo ? shippingInfo.phoneNo : ""
  );
  const router = useRouter();
  const dispatch = useDispatch();
  let cookie = Cookies.get("loggedIn");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Phone Number Should be 10 digits long");
      return;
    }
    dispatch(
      saveShippingInfo({
        name,
        address,
        city,
        state,
        country,
        pinCode,
        phoneNo,
      })
    );
    toast.success("successfully added the shipping details ");
    router.push("/order-confirm");
  };

  return (
    <Layout home gray>
      <Head>
        {" "}
        <title>Shipping Details | MyExams</title>
      </Head>
      <div className="py-4">
        <CheckoutSteps activeStep={0} />

        <div className="container flex flex-col justify-center items-center mx-auto ">
          <h1 className="text-xl text-gray-500 font-semibold py-2 my-4 border-b-2 border-b-gray-300">
            shipping Details
          </h1>

          <form
            className="bg-white shadow-lg rounded px-6 py-4 mb-4 min-w-[300px] sm:w-[400px]"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <input
                className="shadow appearance-none border focus:border-purple-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-200/60"
                id="name"
                type="text"
                placeholder="Name"
                name="name"
                required
                value={name}
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border focus:border-purple-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-200/60"
                id="address"
                type="text"
                placeholder="Address"
                name="address"
                required
                value={address}
                autoComplete="off"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border focus:border-purple-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-200/60"
                id="city"
                type="text"
                placeholder="City"
                name="city"
                required
                value={city}
                autoComplete="off"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border focus:border-purple-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-200/60"
                id="pinCode"
                type="number"
                placeholder="Pincode"
                name="pinCode"
                required
                value={pinCode}
                autoComplete="off"
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border focus:border-purple-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-200/60"
                id="phoneNo"
                type="number"
                placeholder="Phone Number"
                name="phonNo"
                required
                value={phoneNo}
                size="10"
                autoComplete="off"
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border focus:border-purple-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-200/60"
                id="country"
                type="text"
                placeholder="Country"
                name="country"
                required
                value={country}
                autoComplete="off"
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border focus:border-purple-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-200/60"
                id="state"
                type="text"
                placeholder="State"
                name="state"
                required
                value={state}
                autoComplete="off"
                onChange={(e) => setState(e.target.value)}
              />
            </div>

            {/* <div className="mb-4">
            <select
              required
              value={country}
              className="shadow appearance-none border focus:border-purple-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-200/60"
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Country</option>
              {Country.getAllCountries().map((item) => (
                <option value={item.isoCode} key={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {country && (
            <div className="mb-4">
              <select
                required
                value={state}
                className="shadow appearance-none border focus:border-purple-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-200/60"
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )} */}

            <div className="flex items-center justify-between">
              <button
                className="bg-[tomato] w-full flex justify-center items-center hover:bg-[#ff6347d7] text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                CONTINUE
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default shipping;

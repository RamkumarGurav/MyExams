/* eslint-disable */
import React, { Fragment, useEffect, useState } from "react";
import CartItemCard from "../components/CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../layout/Layout";
import Image from "next/image";
import Head from "next/head";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();

  // const [userX, setUserX] = useState(user);
  // useEffect(() => {
  //   setUserX({ ...user });
  // }, [user]);

  // // //-------------private route-------------------------------------------
  // useEffect(() => {
  //   !userX && router.push("/login");
  // }, [userX]);

  // //--------------------------------------------------------

  //-------------solution when u get hydration error-------------------------------------------
  const [cItems, setCItems] = useState();
  useEffect(() => {
    setCItems([...cartItems]);
  }, [cartItems]);
  //--------------------------------------------------------

  const increaseQuantity = (item) => {
    if (item.quantity >= item.stock) {
      return;
    }
    const newQty = item.quantity + 1;
    // console.log(newQty);
    dispatch(
      addToCart({
        product: item?.product,
        name: item?.name,
        price: item?.price,
        image: item?.image,
        stock: item?.stock,
        quantity: newQty,
      })
    );
  };
  const decreaseQuantity = (item) => {
    if (item.quantity <= 1) {
      return;
    }
    const newQty = item.quantity - 1;
    dispatch(
      addToCart({
        product: item?.product,
        name: item?.name,
        price: item?.price,
        image: item?.image,
        stock: item?.stock,
        quantity: newQty,
      })
    );
  };

  // const handelCheckout = () => {
  //   router.push("/shipping");
  // };

  // const handleRemoveItem = () => {
  //   dispatch(removeFromCart());
  // };

  // if (!userX) {
  //   return <h1> </h1>; //to avoid flickering
  // }

  return (
    <Layout home gray>
    <Head>
        <title>Cart | MyExams.com</title>
      </Head>
      {!cItems || cItems.length === 0 ? (
        <div className="cart-empty flex flex-col gap-4 justify-center items-center h-[79vh] ">
          {/* <h1 className="sub-title">Empty Cart</h1>*/}
          <h1 className="text-2xl font-bold text-[tomato]">Empty Cart</h1>
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
        <div className="cartpage">
          <div className="cart-header navbar">
            <p className="para-small">Product</p>
            <p className="para-small">Quantity</p>
            <p className="para-small">SubTotal</p>
          </div>

          {cItems &&
            cItems?.map((item, i) => (
              <div className="cart-container" key={i}>
                <CartItemCard item={item} />
                <div className="cart-container-quantity">
                  <div>
                    <button onClick={() => decreaseQuantity(item)}>-</button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() => increaseQuantity(item)}>+</button>
                  </div>
                </div>
                <div className="cart-container-price">
                  <p className="para roboto">
                    ₹{`${item.price * item.quantity}`}
                  </p>
                </div>
              </div>
            ))}

          <div className="cart-gross-profit">
            <div></div>
            <div className="cart-gross-profit-box">
              <p className="text-lg">Gross Total</p>
              <span className="para">
                ₹
                {`${cItems?.reduce(
                  (acum, item) => acum + item.price * item.quantity,
                  0
                )}`}
              </span>
            </div>
          </div>
          <div className="checkout-box">
            <div></div>
            <Link
              href={"/shipping"}
              className="buy-btn bg-[#ff7c11] hover:bg-[#e06907] text-white text-base py-2 px-4 rounded gap-2 uppercase text-center"
              // onClick={handelCheckout}
            >
              Check Out
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Cart;

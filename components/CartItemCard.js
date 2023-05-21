import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.product));
  };
  return (
    <div className="cart-item-card">
      {/* <Link href={`/books/${item.product}` } className="relative">
        <Image
          src={item.image}
          alt="cart item"
          width={100}
          height={100}
          priority
          className="object-fit absolute "
        />
      </Link> */}

      <div>
      
        <Link href={`/books/${item.product}`} className="para-small">
          {item.name}
        </Link>
        <p className="para-small roboto">Price : ₹{item.price}</p>
        <p className="para-small" onClick={handleRemoveFromCart}>
          Remove
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;

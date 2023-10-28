import React, { useState, useEffect } from "react";
import Navigasi from "../Components/Navigasi";
import Footer from "../Components/Footer";

import "../Items/cart.css"

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleDeleteClick = (productIndex) => {
    const updatedCart = cart.filter((_, index) => index !== productIndex);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecreaseClick = (productIndex) => {
    if (cart[productIndex].quantity > 1) {
      const updatedCart = [...cart];
      updatedCart[productIndex].quantity--;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleIncreaseClick = (productIndex) => {
    const updatedCart = [...cart];
    updatedCart[productIndex].quantity++;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="bg-white min-h-screen">
      <Navigasi />
      <div className="flex mt-10"></div>
      <div className="relative w-full mt-20 bg-white">
      {cart.map((product, index) => (
  <div key={index} className="flex items-center">
    <img src={product.produk} className="w-24 ml-3" alt={product.nama} />
    <div className="ml-3 text-lg grid">{product.nama}</div>
    <div className="flex items-center ml-auto mr-5">
      <div className="flex mt-2">
        <button
          className="bg-green-400 w-8 h-7 rounded-lg"
          onClick={() => handleDecreaseClick(index)}
        >
          <h1 className="text-center text-lg font-bold text-white">-</h1>
        </button>
        <h1 className="ml-2 border border-black w-10 text-center rounded-lg">
          {product.quantity}
        </h1>
        <button
          className="bg-green-400 w-8 h-7 ml-2 rounded-lg"
          onClick={() => handleIncreaseClick(index)}
        >
          <h1 className="text-center text-lg font-bold text-white">+</h1>
        </button>
      </div>
      <button
        className="bg-red-500 w-20 h-8 mt-2 rounded-lg text-white font-bold ml-1"
        onClick={() => handleDeleteClick(index)}
      >
        Delete
      </button>
    </div>
  </div>
))}
      </div>
      <div className="w-full h-20 bg-white border border-gray-400 mt-10 sm:mt-96">
        <div className="flex justify-center items-center mt-5">
          <button className="rounded-lg w-28 h-10 text-xl font-bold bg-green-500 text-white hover:bg-black duration-200">Checkout</button>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}

export default Cart;

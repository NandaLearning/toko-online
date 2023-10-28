import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firestore from "../Utils/firebase-slide";
import { doc, getDoc } from "firebase/firestore";
import Navigasi from "../Components/Navigasi";
import Footer from "../Components/Footer";

function Items() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [beliSuccess, setBeliSuccess] = useState(false);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const productDoc = doc(firestore, "store", id);
        const productData = await getDoc(productDoc);

        if (productData.exists()) {
          setProduct({ id: productData.id, ...productData.data(), quantity: 1 });
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    getProductDetails();
  }, [id]);

  const handleBeliClick = () => {
    if (product) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const itemInCart = cart.find((item) => item.id === product.id);

      if (itemInCart) {
        // If the product is already in the cart, increase its quantity.
        itemInCart.quantity++;
      } else {
        // If the product is not in the cart, add it with a quantity of 1.
        cart.push({ ...product });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      setBeliSuccess(true);
    }
  };

  const handleCardClick = () => {
    setBeliSuccess(false);
  };

  return (
    <div className="bg-white min-h-screen">
      <div>
        <Navigasi/>
      </div>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-4 text-center">
          <img
            src={product ? product.produk : ""}
            alt={product ? product.nama : ""}
            className="w-80 max-w-md mx-auto"
            onClick={handleCardClick}
          />
        </div>
        <div className="md:w-1/2 p-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold">{product ? product.nama : ""}</h1>
          <h1 className="text-3xl">Rp. {product ? product.harga : ""}</h1>
          <button
            onClick={handleBeliClick}
            className="border border-gray-500 rounded-lg hover:bg-black hover:'' w-40 h-8 mt-5 bg-green-500 text-white font-bold duration-200"
          >
            Beli
          </button>
        </div>
      </div>
      {beliSuccess && <InputBerhasil onCardClick={handleCardClick} />}
      <Footer />
    </div>
  );
}

export default Items;

function InputBerhasil({ onCardClick }) {
  const handleClick = () => {
    onCardClick();
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="bg-green-400 w-96 h-96 rounded-xl duration-200" onClick={handleClick}>
        <div className="grid justify-center items-center">
          <h1 className="text-center font-bold mt-5 text-3xl text-white">Produk di Keranjang</h1>
          <div className="justify-center flex items-center">
            <div className=" text-white mt-16 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" className="mt-16 text-white animate-bounce" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

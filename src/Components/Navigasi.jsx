import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../Utils/firebase-config";

export default function Navigasi({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Set the user's photo URL or a default URL
        setUserPhoto(user.photoURL || 'https://firebasestorage.googleapis.com/v0/b/belajar-f464e.appspot.com/o/profile.png?alt=media&token=a7fedc0c-b675-48ad-967a-fcb705499552&_gl=1*637x9d*_ga*NTMwMTg4NTk2LjE2OTY2NTE5LjI5LjE2OTY2NTIyLjAuMC4wLjA*');
      } else {
        setUserPhoto(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="navbar bg-white w-full drop-shadow-lg">
      <div className="flex-1">
        <Link to="/">
          <h1 className="ml-2 text-green-400 font-bold text-xl">WhatShop.</h1>
        </Link>
      </div>
      <div className="flex-none gap-2 mr-2 text-black">
        <input
          type="search"
          placeholder=" Cari Produk"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress} 
          className="h-8 rounded-lg bg-white border w-40 border-gray-400 ml-3" 
        />
      </div>
      <Link to="/cart">
        <button>
          <div className="flex-none gap-2  mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              className="text-black"
              height="20"
              fill="currentColor"
              class="bi bi-cart"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          </div>
        </button>
      </Link>
      {userPhoto ? (
        <Link to="/profile">
          <div className="rounded-full w-[24px] mr-2">
          <img src={userPhoto}  /> {/* Set width and height */}
          </div>
        </Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}

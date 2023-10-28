import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Utils/firebase-config";
import Navigasi from "../Components/Navigasi";
import Footer from "../Components/Footer";

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  // Define a state variable to track the user's authentication status
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Use Firebase's onAuthStateChanged to listen for authentication changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated
        setLoggedIn(true);
      } else {
        // User is not authenticated
        setLoggedIn(false);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  // Check if the user is authenticated before displaying the profile
  if (!loggedIn) {
    // User is not authenticated, redirect to the login page
    navigate("/login");
    return null;
  }

  // Dapatkan data pengguna dari location.state atau inisialisasikan dengan nilai default
  const location = useLocation();
  const { state } = location;

  const email = state ? state.email : "Tidak ada email";
  const password = state ? state.password : "Tidak ada password";

  // Create a masked password string with the same length as the actual password
  const maskedPassword = password ? "*".repeat(password.length) : "Tidak ada password";

  return (
    <div className="bg-white min-h-screen">
      <Navigasi />

      <div className="justify-center items-center grid mt-16">
        <div className=" justify-center items-center flex">
          <img src="profile.png" className="w-32" alt="" />
        </div>
        <h1 className="text-center text-2xl mt-5">{email}</h1>
        <h1 className="text-center text-2xl mt-2">{maskedPassword}</h1>
      </div>

      <div className="justify-center items-center flex mt-10">
        <button
          className="font-bold ml-4 text-xl border border-gray-400 bg-red-500 text-white w-20 h-10 rounded-lg hover-bg-black duration-200"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="mt-40">
        <Footer />
      </div>
    </div>
  );
}

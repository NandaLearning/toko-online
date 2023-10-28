import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Utils/firebase-config";
import Navigasi from "../Components/Navigasi";
import Footer from "../Components/Footer";

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Hapus data akun dari Local Storage saat logout
      localStorage.removeItem("userAccount");
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
        // Simpan data akun pengguna dalam Local Storage
        localStorage.setItem("userAccount", JSON.stringify({ email: user.email, password: "*****" }));
      } else {
        // User is not authenticated
        setLoggedIn(false);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  // Muat data akun dari Local Storage atau gunakan nilai default jika tidak ada data
  const storedAccount = localStorage.getItem("userAccount");
  const userAccount = storedAccount ? JSON.parse(storedAccount) : { email: "Tidak ada email", password: "Tidak ada password" };

  return (
    <div className="bg-white min-h-screen">
      <Navigasi />

      <div className="justify-center items-center grid mt-16">
        <div className=" justify-center items-center flex">
          <img src="profile.png" className="w-32" alt="" />
        </div>
        <h1 className="text-center text-2xl mt-5">{userAccount.email}</h1>
        <h1 className="text-center text-2xl mt-2">{userAccount.password}</h1>
      </div>

      <div className="justify-center items-center flex mt-10">
       <Link to="/edit"><button className="font-bold ml-4 text-xl border border-gray-400 bg-green-500 text-white w-20 h-10 rounded-lg hover-bg-black duration-200">Edit</button></Link>
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

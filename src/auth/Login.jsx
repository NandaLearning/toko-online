import { Link, useNavigate } from "react-router-dom";
import Navigasi from "../Components/Navigasi";
import Footer from "../Components/Footer";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../Utils/firebase-config";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setIsLoginSuccessful(true);

      // Navigasi ke halaman Profile dengan mengirim data pengguna sebagai state
      navigate("/profile", { state: { email: loginEmail, password: loginPassword } });
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <Navigasi isLoginSuccessful={isLoginSuccessful} setIsLoginSuccessful={setIsLoginSuccessful} />

      <Link to="/beranda">
        <button className="flex mt-5 ml-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="ml-5 hover:text-green-500 duration-200" fill="currentColor" class="bi bi-backspace" viewBox="0 0 16 16">
            <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
            <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/>
          </svg>
          <h1 className="text-xl mt-1 ml-3">Ke Beranda</h1>
        </button>
      </Link>

      <div className="flex">
        {isPopupVisible && <InputBerhasil />}
      </div>

      <div className="justify-center items-center grid">
        <div className="bg-white drop-shadow-xl w-96 h-96 mt-20 rounded-lg">
          <h1 className="text-3xl font-bold text-center mt-10">Login</h1>
          <div className="grid w-72 ml-10 mt-10">
            <input
              type="text"
              placeholder="Email"
              className="h-8 bg-white border border-gray-400"
              value={loginEmail}
              onChange={(event) => { setLoginEmail(event.target.value) }}
            />
            <input
              type="password"
              placeholder="Password"
              className="mt-5 h-8 bg-white border border-gray-400"
              value={loginPassword}
              onChange={(event) => { setLoginPassword(event.target.value) }}
            />
            <button
              className="mt-5 h-7 bg-green-400 text-white hover-bg-black duration-200 border border-gray-400"
              onClick={handleLogin}
            >
              Login
            </button>
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            <h1 className="mt-6">
              Belum Punya Akun?<span className="text-green-400 underline"><Link to="/register">Register</Link></span>
            </h1>
          </div>
        </div>
      </div>

      {isLoginSuccessful && <InputBerhasil />}
      <Footer />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import Navigasi from "../Components/Navigasi";
import SlideBeranda from "../beranda/SlideBeranda";
import firestore from "../Utils/firebase-slide";
import Footer from "../Components/Footer";

export default function Beranda() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "store"));
        const storeData = [];
        querySnapshot.forEach((doc) => {
          storeData.push({ id: doc.id, ...doc.data() }); // Sertakan ID dokumen
        });
        setData(storeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navigasi onSearch={setSearchQuery} />
      <SlideBeranda />

      <div className="flex flex-wrap justify-center items-center mt-10">
        {data
          .filter((item) =>
            item.nama.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((item, index) => (
            <Link to={`/items/${item.id}`} key={index}>
              <div className="card bg-green-50 text-black w-40 drop-shadow-xl mr-5">
                <img src={item.produk} alt="" />
                <div className="card-body">
                  <p className="text-2xl">{item.nama}</p>
                  <p>Rp.{item.harga}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <Footer />
    </div>
  );
}

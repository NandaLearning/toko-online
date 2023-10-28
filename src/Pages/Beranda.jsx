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

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-10">
        {data
          .filter((item) =>
            item.nama.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((item, index) => (
            <Link to={`/items/${item.id}`} key={index}>
              <div className="bg-green-50 text-black p-4 rounded shadow-md">
                <img src={item.produk} alt="" className="w-32" />
                <div className="mt-2">
                  <p className="text-xl font-semibold">{item.nama}</p>
                  <p className="text-sm text-gray-600">Rp.{item.harga}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <Footer />
    </div>
  );
}

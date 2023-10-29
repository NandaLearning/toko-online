// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useEffect, useState } from 'react';
import firestore from '../Utils/firebase-slide'; // Pastikan Anda menyesuaikan dengan lokasi berkas Firebase Anda
import { collection, getDocs } from 'firebase/firestore';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './slide.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function SlideBeranda() {
  const [promoData, setPromoData] = useState([]);

  useEffect(() => {
    // Membaca data dari Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'promo'));
        const promoItems = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Pastikan nama bidang sesuai dengan dokumen Firestore Anda
          promoItems.push({
            id: doc.id,
            slide: data.slide, // Sesuaikan dengan bidang slide Anda
          });
        });
        setPromoData(promoItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='slide'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {promoData.map((promo) => (
          <SwiperSlide key={promo.id}>
            <img src={promo.slide} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

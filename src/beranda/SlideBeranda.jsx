// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useEffect, useState } from 'react';
import firestore from '../Utils/firebase-slide';// Pastikan Anda menyesuaikan dengan lokasi berkas Firebase Anda
import { collection, getDocs } from 'firebase/firestore';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './slide.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function SlideBeranda() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Membaca data dari Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'slide'));
        const usersData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          usersData.push({
            id: doc.id,
            slide1: data.slide1,
            slide2: data.slide2,
            slide3:data.slide3,
          });
        });
        setUserData(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='slide'>

    {userData.map((user) => (
      
      <Swiper key={user.id}
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
        <SwiperSlide><img src={user.slide1} alt="" /></SwiperSlide>
        <SwiperSlide><img src={user.slide2} alt="" /></SwiperSlide>
        <SwiperSlide><img src={user.slide3} alt="" /></SwiperSlide>
        </Swiper>
        ))}
        
        </div>
        );
      }
      
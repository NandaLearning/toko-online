// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useEffect, useState } from 'react';
import firestore from '../Utils/firebase-slide';// Pastikan Anda menyesuaikan dengan lokasi berkas Firebase Anda
import { collection, getDocs } from 'firebase/firestore';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './slide.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

export default function Slide() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Membaca data dari Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'post'));
        const usersData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          usersData.push({
            id: doc.id,
            converse: data.converse,
            iphone: data.iphone,
            vans:data.vans,
            vans2:data.vans2,
            lego:data.lego,
            laptop:data.laptop,
            keyboard:data.keyboard,
            mouse:data.mouse
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
    <>
      {userData.map((user) => (
        <Swiper key={user.id}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={user.iphone} alt="iPhone" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={user.vans} alt="Vans" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={user.converse} alt="converse" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={user.laptop} alt="laptop" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={user.vans2} alt="vans2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={user.lego} alt="lego" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={user.keyboard} alt="keyboard" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={user.mouse} alt="mouse" />
          </SwiperSlide>
        </Swiper>
      ))}
      
      <Link to="/beranda">
      <div className='justify-center items-center flex'>
        <button className='mt-5 border border-slate-300 bg-black w-36 h-9 text-white rounded-xl hover:bg-green-500 hover:text-white font-bold duration-200 animate-bounce'>Belanja Sekarang</button>
      </div>
      </Link>
    </>
  );
}
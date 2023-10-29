// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useEffect, useState } from 'react';
import firestore from '../Utils/firebase-slide';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './slide.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function SlideBeranda() {
  const [promoData, setPromoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'promo'));
        const promoItems = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          promoItems.push({
            id: doc.id,
            slide: data.slide,
          });
        });
        setPromoData(promoItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const unsubscribe = onSnapshot(collection(firestore, 'promo'), (snapshot) => {
      const promoItems = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        promoItems.push({
          id: doc.id,
          slide: data.slide,
        });
      });
      setPromoData(promoItems);
    });

    return () => unsubscribe();
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

import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../css//swiper.css";
import { image500 } from '../constants/appInfos';
import { Movie } from '../model/movie';

interface Props {
    data: Movie[];
    onSlideClick: (item: Movie) => void;

}

const SwiperTrenDing: React.FunctionComponent<Props> = ({ data,onSlideClick }) => {
    const shouldLoop = data.length >= 5;
    return (
        <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            autoplay={{
                delay: 2500,
                disableOnInteraction: true,
            }}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
            }}
            initialSlide={3}
            pagination={true}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper"
            loop={shouldLoop}
        >
            {data.map((item: Movie, index: number) => (
                <SwiperSlide
                    className="swiper-slide"
                    key={index}
                    onClick={() => onSlideClick(item)} // Gọi hàm xử lý từ props
                >
                    <img
                        style={{ borderRadius: 10 }}
                        src={image500(item.poster_path) || ""}
                        alt={`slide-${index}`}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
};

export default SwiperTrenDing;

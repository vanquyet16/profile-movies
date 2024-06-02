import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../css/swiper.css";
import { image500 } from '../constants/appInfos';
import { Movie } from '../model/movie';

interface Props {
    data: Movie[];
    onSlideClick: (item: Movie) => void;
}

const SwiperNew: React.FunctionComponent<Props> = ({ data, onSlideClick }) => {
    const shouldLoop = data.length > 0;
    return (
        <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 0,
                modifier: 0,
                slideShadows: false,
            }}
            pagination={false}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="swiper-new"
            loop={shouldLoop}
        >
            {data.map((item: Movie, index: number) => (
                <SwiperSlide
                    className="swiperSlide-new"
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

export default SwiperNew;

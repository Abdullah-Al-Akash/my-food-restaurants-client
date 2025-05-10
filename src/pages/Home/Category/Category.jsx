// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import img1 from "../../../assets/home/slide1.jpg";
import img2 from "../../../assets/home/slide2.jpg";
import img3 from "../../../assets/home/slide3.jpg";
import img4 from "../../../assets/home/slide4.jpg";
import img5 from "../../../assets/home/slide5.jpg";

const Category = () => {
  return (
    <div className="py-8">
      <Swiper
  slidesPerView={4}
  spaceBetween={30}
  freeMode={true}
  loop={true}
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
  }}
  pagination={{
    clickable: true,
  }}
  modules={[FreeMode, Pagination, Autoplay]}
  className="mySwiper"
>
        <SwiperSlide>
            <img src={img1} alt="" />
            <h2 className="md:text-4xl text-md pb-4 md:-mt-16 -mt-8 text-white text-center font-semibold uppercase">Salads</h2>
        </SwiperSlide>
        <SwiperSlide>
            <img src={img2} alt="" />
            <h2 className="md:text-4xl text-md pb-4 md:-mt-16 -mt-8 text-white text-center font-semibold uppercase">Pizzas</h2>
        </SwiperSlide>
        <SwiperSlide>
            <img src={img3} alt="" />
            <h2 className="md:text-4xl text-md pb-4 md:-mt-16 -mt-8 text-white text-center font-semibold uppercase">Soups</h2>
        </SwiperSlide>
        <SwiperSlide>
            <img src={img4} alt="" />
            <h2 className="md:text-4xl text-md pb-4 md:-mt-16 -mt-8 text-white text-center font-semibold uppercase">Deserts</h2>
        </SwiperSlide>
        <SwiperSlide>
            <img src={img5} alt="" />
            <h2 className="md:text-4xl text-md pb-4 md:-mt-16 -mt-8 text-white text-center font-semibold uppercase">Salads</h2>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Category;

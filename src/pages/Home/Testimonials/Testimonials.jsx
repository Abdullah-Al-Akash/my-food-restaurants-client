import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import "@smastrom/react-rating/style.css";
import { Rating } from "@smastrom/react-rating";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Testimonials = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: reviews = [],
    // isLoading,
    // refetch,
  } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axiosPublic.get("/review");
      return res.data; // ✅ return fetched data directly
    },
  });
  return (
    <div className="py-8">
      <SectionTitle
        subHeading={"---What Our Clients Say---"}
        heading={"TESTIMONIALS"}
      ></SectionTitle>

      <div className="md:mx-16 mx-2">
        <Swiper
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {reviews?.map((r) => (
            <SwiperSlide key={r._id}>
              <div className="md:p-16 p-8 text-center">
                <div className="flex justify-center">
                  <Rating
                    style={{ maxWidth: 180 }}
                    value={r?.rating}
                    readOnly
                  />
                </div>
                <div>
                  <img
                    className="mx-auto w-6/12 md:w-1/6 p-8 rounded-full"
                    src={r?.photo}
                    alt=""
                  />
                  <p className="text-xl my-4 leading-8 w-3/4 mx-auto">
                    {r.details}
                  </p>
                  <p className="text-2xl text-yellow-500 font-semibold">
                    {r.name}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;

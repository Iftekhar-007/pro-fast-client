// ClientReviewSlider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";

const reviews = [
  {
    name: "Rahim",
    feedback: "Amazing delivery service! Always on time.",
    location: "Dhaka",
  },
  {
    name: "Karim",
    feedback: "Very professional and trustworthy.",
    location: "Chittagong",
  },
  {
    name: "Fatima",
    feedback: "Their customer support is top-notch.",
    location: "Sylhet",
  },
  {
    name: "Nadia",
    feedback: "Highly recommend to everyone!",
    location: "Rajshahi",
  },
  {
    name: "Hasan",
    feedback: "Quick and safe delivery. Loved it!",
    location: "Khulna",
  },
  {
    name: "Lima",
    feedback: "Smooth experience with real-time tracking.",
    location: "Barisal",
  },
  {
    name: "Imran",
    feedback: "Delivered my parcel with care. Great team!",
    location: "Comilla",
  },
  {
    name: "Shila",
    feedback: "Super fast service, polite delivery guy.",
    location: "Mymensingh",
  },
  {
    name: "Jahir",
    feedback: "Really satisfied with their service!",
    location: "Rangpur",
  },
  {
    name: "Mita",
    feedback: "Trustworthy and consistent. 10/10!",
    location: "Bogura",
  },
];

export default function ClientReviewSlider() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">
        What Our Clients Say
      </h2>
      <Swiper
        modules={[EffectCoverflow, Autoplay]}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        className="w-full"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white shadow-xl rounded-xl p-6 text-center transition-all duration-300 scale-90 opacity-60 swiper-slide-active:scale-100 swiper-slide-active:opacity-100">
              <h3 className="text-xl font-semibold mb-2">{review.name}</h3>
              <p className="text-gray-600 italic mb-2">"{review.feedback}"</p>
              <p className="text-sm text-gray-500">{review.location}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

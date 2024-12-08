import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function CourseCarousel() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // 从API获取轮播图数据
    fetchBanners();
  }, []);

  return (
    <div className="w-full aspect-[21/9] bg-gray-100">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link to={`/course/${banner.courseId}`}>
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <h3 className="text-white text-2xl font-bold">{banner.title}</h3>
                <p className="text-white/80 mt-2">{banner.description}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CourseCarousel; 
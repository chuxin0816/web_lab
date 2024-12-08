import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function CourseCarousel() {
  const [banners] = useState([
    {
      id: 1,
      title: '示例课程1',
      description: '这是一个示例课程描述',
      imageUrl: 'https://via.placeholder.com/1200x400',
      courseId: '1'
    },
    {
      id: 2,
      title: '示例课程2',
      description: '这是另一个示例课程描述',
      imageUrl: 'https://via.placeholder.com/1200x400',
      courseId: '2'
    }
  ]);

  return (
    <div className="w-full aspect-[21/9] bg-gray-100 mb-8">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link to={`/course/${banner.courseId}`}>
              <div className="relative w-full h-full">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h3 className="text-white text-2xl font-bold">{banner.title}</h3>
                  <p className="text-white/80 mt-2">{banner.description}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CourseCarousel; 
import { useState, useEffect } from 'react';
import CourseCarousel from '../components/CourseCarousel';
import CourseList from '../components/CourseList';
import CategoryList from '../components/CategoryList';

function Home() {
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [hotCourses, setHotCourses] = useState([]);
  const [newCourses, setNewCourses] = useState([]);

  useEffect(() => {
    // 从API获取课程数据
    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <CourseCarousel />
      
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">推荐课程</h2>
        <CourseList courses={recommendedCourses} />
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">热门课程</h2>
        <CourseList courses={hotCourses} />
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">最新课程</h2>
        <CourseList courses={newCourses} />
      </section>
    </div>
  );
}

export default Home; 
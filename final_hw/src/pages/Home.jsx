import { useState, useEffect } from 'react';
import CourseCarousel from '../components/CourseCarousel.jsx';
import CourseList from '../components/CourseList.jsx';
import CategoryList from '../components/CategoryList.jsx';

function Home() {
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [hotCourses, setHotCourses] = useState([]);
  const [newCourses, setNewCourses] = useState([]);

  useEffect(() => {
    // 模拟数据
    setRecommendedCourses([
      {
        id: '1',
        title: '示例推荐课程1',
        description: '这是一个示例推荐课程',
        coverImage: 'https://via.placeholder.com/300x200',
        teacherName: '张老师',
        enrollCount: 100,
        likeCount: 50
      },
      // ... 更多示例课程
    ]);

    setHotCourses([
      {
        id: '2',
        title: '示例热门课程1',
        description: '这是一个示例热门课程',
        coverImage: 'https://via.placeholder.com/300x200',
        teacherName: '李老师',
        enrollCount: 200,
        likeCount: 80
      },
      // ... 更多示例课程
    ]);

    setNewCourses([
      {
        id: '3',
        title: '示例最新课程1',
        description: '这是一个示例最新课程',
        coverImage: 'https://via.placeholder.com/300x200',
        teacherName: '王老师',
        enrollCount: 50,
        likeCount: 20
      },
      // ... 更多示例课程
    ]);
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
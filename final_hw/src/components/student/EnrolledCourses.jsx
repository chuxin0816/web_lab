import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function EnrolledCourses({ showAll = false }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await fetch('/api/student/enrolled-courses');
      const data = await response.json();
      setCourses(showAll ? data : data.slice(0, 4));
    } catch (err) {
      console.error('获取已报名课程失败:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map(course => (
          <Link
            key={course.id}
            to={`/course/${course.id}`}
            className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-video relative">
              <img
                src={course.coverImage}
                alt={course.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex items-center justify-between text-white">
                  <span>{course.progress}% 已完成</span>
                  <span>{course.lastStudyTime}</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900">{course.title}</h3>
              <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                <span>{course.teacherName}</span>
                <span>{course.totalStudyTime} 小时</span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {!showAll && courses.length > 0 && (
        <div className="text-center">
          <Link
            to="/student/courses"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            查看全部
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}

export default EnrolledCourses; 
import { Link } from 'react-router-dom';

function CourseList({ courses }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {courses.map(course => (
        <Link 
          key={course.id}
          to={`/course/${course.id}`}
          className="group"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-105">
            <div className="aspect-video relative">
              <img
                src={course.coverImage}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-blue-600">
                {course.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {course.description}
              </p>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>{course.enrollCount} 人已报名</span>
                <span>{course.likeCount} 人点赞</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CourseList; 
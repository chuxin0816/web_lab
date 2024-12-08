import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import CourseContent from '../components/CourseContent';
import CourseDiscussion from '../components/CourseDiscussion';
import CourseNotes from '../components/CourseNotes';

function CourseDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('content');
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    // 获取课程详情
    fetchCourseDetail(id);
    // 检查是否已报名
    if (user) {
      checkEnrollmentStatus(id);
    }
  }, [id, user]);

  const handleEnroll = async () => {
    try {
      await enrollCourse(id);
      setIsEnrolled(true);
    } catch (err) {
      console.error('报名失败:', err);
    }
  };

  if (!course) {
    return <div>加载中...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 课程信息 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={course.coverImage}
              alt={course.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="mt-4 text-gray-600">{course.description}</p>
              
              <div className="mt-6 flex items-center space-x-4">
                <div className="flex items-center">
                  <span className="text-gray-500">讲师:</span>
                  <span className="ml-2">{course.teacher.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500">学生数:</span>
                  <span className="ml-2">{course.enrollCount}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500">点赞数:</span>
                  <span className="ml-2">{course.likeCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 课程内容标签页 */}
          <div className="mt-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('content')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'content'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  课程内容
                </button>
                <button
                  onClick={() => setActiveTab('discussion')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'discussion'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  讨论区
                </button>
                {isEnrolled && (
                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'notes'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    我的笔记
                  </button>
                )}
              </nav>
            </div>

            <div className="mt-6">
              {activeTab === 'content' && <CourseContent course={course} isEnrolled={isEnrolled} />}
              {activeTab === 'discussion' && <CourseDiscussion courseId={id} />}
              {activeTab === 'notes' && isEnrolled && <CourseNotes courseId={id} />}
            </div>
          </div>
        </div>

        {/* 课程操作 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <div className="text-center">
              <span className="text-3xl font-bold text-blue-600">
                {course.price ? `￥${course.price}` : '免费'}
              </span>
            </div>

            {!isEnrolled ? (
              <button
                onClick={handleEnroll}
                disabled={!user}
                className="mt-6 w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {user ? '立即报名' : '请先登录'}
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('content')}
                className="mt-6 w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                继续学习
              </button>
            )}

            <div className="mt-6 space-y-4">
              <h3 className="font-medium text-gray-900">课程信息</h3>
              <div className="flex justify-between text-sm text-gray-500">
                <span>课时数</span>
                <span>{course.materials.length} 节</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>总时长</span>
                <span>{course.totalDuration} 分钟</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>难度等级</span>
                <span>{course.level}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>更新时间</span>
                <span>{new Date(course.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail; 
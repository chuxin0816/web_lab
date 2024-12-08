import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

function CourseContent({ course, isEnrolled }) {
  const [activeSection, setActiveSection] = useState(0);
  const { user } = useAuth();

  const handleMaterialClick = (index) => {
    if (!isEnrolled && !course.materials[index].preview) {
      return;
    }
    setActiveSection(index);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 课程目录 */}
      <div className="md:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-medium mb-4">课程目录</h3>
          <div className="space-y-2">
            {course.materials.map((material, index) => (
              <button
                key={material.id}
                onClick={() => handleMaterialClick(index)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeSection === index
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50'
                } ${
                  !isEnrolled && !material.preview
                    ? 'opacity-60 cursor-not-allowed'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex-1">{material.title}</span>
                  {!isEnrolled && !material.preview && (
                    <span className="text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  )}
                </div>
                {material.duration && (
                  <span className="text-sm text-gray-500">
                    时长: {material.duration} 分钟
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 课程内容 */}
      <div className="md:col-span-2">
        <div className="bg-white rounded-lg shadow-md p-4">
          {!isEnrolled && !course.materials[activeSection].preview ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">需要报名后才能查看</h3>
              <p className="mt-1 text-sm text-gray-500">
                请先报名课程以解锁完整内容
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-medium mb-4">
                {course.materials[activeSection].title}
              </h2>
              {course.materials[activeSection].type === 'video' && (
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <video
                    src={course.materials[activeSection].url}
                    controls
                    className="w-full h-full rounded-lg"
                  />
                </div>
              )}
              {course.materials[activeSection].type === 'document' && (
                <div className="prose max-w-none">
                  {/* 这里可以使用Markdown渲染器或其他文档查看器 */}
                  <div dangerouslySetInnerHTML={{ 
                    __html: course.materials[activeSection].content 
                  }} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseContent; 
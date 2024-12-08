import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import TeacherSidebar from '../../components/teacher/Sidebar';
import CourseManagement from '../../components/teacher/CourseManagement';
import StudentManagement from '../../components/teacher/StudentManagement';
import AssignmentManagement from '../../components/teacher/AssignmentManagement';
import Statistics from '../../components/teacher/Statistics';

function TeacherDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 侧边栏 */}
          <TeacherSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* 主内容区 */}
          <div className="lg:col-span-3 space-y-8">
            {/* 欢迎信息 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold text-gray-900">
                欢迎回来, {user.nickname || user.username}
              </h1>
              <p className="mt-2 text-gray-600">
                开始管理您的课程吧！
              </p>
            </div>

            {activeTab === 'overview' && <Statistics />}
            {activeTab === 'courses' && <CourseManagement />}
            {activeTab === 'students' && <StudentManagement />}
            {activeTab === 'assignments' && <AssignmentManagement />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard; 
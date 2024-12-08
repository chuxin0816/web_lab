import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import StudentSidebar from '../../components/student/Sidebar';
import EnrolledCourses from '../../components/student/EnrolledCourses';
import TodoList from '../../components/student/TodoList';
import LearningProgress from '../../components/student/LearningProgress';

function StudentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 侧边栏 */}
          <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* 主内容区 */}
          <div className="lg:col-span-3 space-y-8">
            {/* 欢迎信息 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold text-gray-900">
                欢迎回来, {user.nickname || user.username}
              </h1>
              <p className="mt-2 text-gray-600">
                继续你的学习之旅吧！
              </p>
            </div>

            {activeTab === 'overview' && (
              <>
                {/* 学习进度概览 */}
                <LearningProgress />

                {/* 待办事项 */}
                <TodoList />

                {/* 已报名课程 */}
                <EnrolledCourses />
              </>
            )}

            {activeTab === 'courses' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">我的课程</h2>
                <EnrolledCourses showAll />
              </div>
            )}

            {activeTab === 'todos' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">待办事项</h2>
                <TodoList showAll />
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">学习笔记</h2>
                {/* 学习笔记组件 */}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">个人资料</h2>
                {/* 个人资料编辑组件 */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard; 
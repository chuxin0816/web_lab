import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import AdminSidebar from '../../components/admin/Sidebar';
import SystemSettings from '../../components/admin/SystemSettings';
import UserManagement from '../../components/admin/UserManagement';
import CourseReview from '../../components/admin/CourseReview';
import Statistics from '../../components/admin/Statistics';

function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 侧边栏 */}
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* 主内容区 */}
          <div className="lg:col-span-3 space-y-8">
            {/* 欢迎信息 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold text-gray-900">
                欢迎回来, {user.nickname || user.username}
              </h1>
              <p className="mt-2 text-gray-600">
                管理员控制面板
              </p>
            </div>

            {activeTab === 'overview' && <Statistics />}
            {activeTab === 'users' && <UserManagement />}
            {activeTab === 'courses' && <CourseReview />}
            {activeTab === 'settings' && <SystemSettings />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 
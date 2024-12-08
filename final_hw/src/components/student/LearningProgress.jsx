import { useState, useEffect } from 'react';

function LearningProgress() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLearningStats();
  }, []);

  const fetchLearningStats = async () => {
    try {
      const response = await fetch('/api/student/learning-stats');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('获取学习统计失败:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">学习进度</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-blue-600 text-sm font-medium">总学习时长</div>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-bold text-blue-600">
              {stats.totalStudyHours}
            </span>
            <span className="ml-1 text-blue-600">小时</span>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-green-600 text-sm font-medium">已完成课程</div>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-bold text-green-600">
              {stats.completedCourses}
            </span>
            <span className="ml-1 text-green-600">门</span>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-yellow-600 text-sm font-medium">学习天数</div>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-bold text-yellow-600">
              {stats.studyDays}
            </span>
            <span className="ml-1 text-yellow-600">天</span>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-purple-600 text-sm font-medium">获得证书</div>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-bold text-purple-600">
              {stats.certificates}
            </span>
            <span className="ml-1 text-purple-600">个</span>
          </div>
        </div>
      </div>

      {/* 最近学习记录 */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">最近学习</h3>
        <div className="space-y-4">
          {stats.recentActivities.map(activity => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={activity.courseImage}
                    alt={activity.courseName}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {activity.courseName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.description}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(activity.time).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 学习目标 */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">���习目标</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.learningGoals.map(goal => (
            <div
              key={goal.id}
              className="p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-900">
                  {goal.title}
                </span>
                <span className="text-sm text-gray-500">
                  {goal.progress}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LearningProgress; 
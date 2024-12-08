import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Statistics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week'); // week, month, year

  useEffect(() => {
    fetchStatistics();
  }, [timeRange]);

  const fetchStatistics = async () => {
    try {
      const response = await fetch(`/api/teacher/statistics?range=${timeRange}`);
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('获取统计数据失败:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div className="space-y-8">
      {/* 概览数据 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="text-blue-600 text-sm font-medium">总课程数</div>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-bold text-blue-600">
              {stats.totalCourses}
            </span>
            <span className="ml-1 text-blue-600">门</span>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <div className="text-green-600 text-sm font-medium">总学生数</div>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-bold text-green-600">
              {stats.totalStudents}
            </span>
            <span className="ml-1 text-green-600">人</span>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-6">
          <div className="text-yellow-600 text-sm font-medium">本月新增学生</div>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-bold text-yellow-600">
              {stats.newStudentsThisMonth}
            </span>
            <span className="ml-1 text-yellow-600">人</span>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <div className="text-purple-600 text-sm font-medium">作业完成率</div>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-bold text-purple-600">
              {stats.assignmentCompletionRate}
            </span>
            <span className="ml-1 text-purple-600">%</span>
          </div>
        </div>
      </div>

      {/* 趋势图表 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">学习趋势</h3>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="week">最近一周</option>
            <option value="month">最近一月</option>
            <option value="year">最近一年</option>
          </select>
        </div>
        <div className="h-80">
          <Line
            data={{
              labels: stats.trend.labels,
              datasets: [
                {
                  label: '活跃学生数',
                  data: stats.trend.activeStudents,
                  borderColor: 'rgb(59, 130, 246)',
                  tension: 0.1,
                },
                {
                  label: '完成作业数',
                  data: stats.trend.completedAssignments,
                  borderColor: 'rgb(16, 185, 129)',
                  tension: 0.1,
                }
              ]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>
      </div>

      {/* 热门课程 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium mb-4">热门课程</h3>
        <div className="space-y-4">
          {stats.popularCourses.map(course => (
            <div
              key={course.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {course.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {course.studentCount} 名学生
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                完成率 {course.completionRate}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Statistics; 
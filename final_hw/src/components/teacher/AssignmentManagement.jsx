import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AssignmentManagement() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('all');

  useEffect(() => {
    fetchAssignments();
    fetchCourses();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await fetch('/api/teacher/assignments');
      const data = await response.json();
      setAssignments(data);
    } catch (err) {
      console.error('获取作业列表失败:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/teacher/courses');
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      console.error('获取课程列表失败:', err);
    }
  };

  const handleDelete = async (assignmentId) => {
    if (!window.confirm('确定要删除这个作业吗？')) {
      return;
    }

    try {
      await fetch(`/api/teacher/assignments/${assignmentId}`, {
        method: 'DELETE',
      });
      fetchAssignments();
    } catch (err) {
      console.error('删除作业失败:', err);
    }
  };

  const filteredAssignments = selectedCourse === 'all'
    ? assignments
    : assignments.filter(a => a.courseId === selectedCourse);

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold">作业管理</h2>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">全部课程</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        <Link
          to="/teacher/assignments/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          布置作业
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                作业标题
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                所属课程
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                截止时间
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                提交情况
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAssignments.map(assignment => (
              <tr key={assignment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {assignment.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {assignment.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {assignment.courseName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(assignment.dueDate).toLocaleString()}
                  </div>
                  {new Date(assignment.dueDate) < new Date() && (
                    <span className="text-xs text-red-500">已截止</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    已提交: {assignment.submittedCount} / {assignment.totalStudents}
                  </div>
                  <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{
                        width: `${(assignment.submittedCount / assignment.totalStudents) * 100}%`
                      }}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <Link
                    to={`/teacher/assignments/${assignment.id}/submissions`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    查看提交
                  </Link>
                  <Link
                    to={`/teacher/assignments/${assignment.id}/edit`}
                    className="text-green-600 hover:text-green-900"
                  >
                    编辑
                  </Link>
                  <button
                    onClick={() => handleDelete(assignment.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssignmentManagement; 
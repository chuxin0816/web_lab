import { useState, useEffect } from 'react';

function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [registrationEnabled, setRegistrationEnabled] = useState(false);

  useEffect(() => {
    fetchStudents();
    checkRegistrationStatus();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/teacher/students');
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      console.error('获取学生列表失败:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkRegistrationStatus = async () => {
    try {
      const response = await fetch('/api/teacher/registration-status');
      const data = await response.json();
      setRegistrationEnabled(data.enabled);
    } catch (err) {
      console.error('获取注册状态失败:', err);
    }
  };

  const handleToggleRegistration = async () => {
    try {
      await fetch('/api/teacher/toggle-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ enabled: !registrationEnabled }),
      });
      setRegistrationEnabled(!registrationEnabled);
    } catch (err) {
      console.error('切换注册状态失败:', err);
    }
  };

  const handleResetPassword = async (studentId) => {
    if (!window.confirm('确定要重置该学生的密码吗？')) {
      return;
    }

    try {
      await fetch(`/api/teacher/students/${studentId}/reset-password`, {
        method: 'POST',
      });
      alert('密码重置成功');
    } catch (err) {
      console.error('重置密码失败:', err);
    }
  };

  const handleToggleStatus = async (studentId, currentStatus) => {
    try {
      await fetch(`/api/teacher/students/${studentId}/toggle-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ enabled: !currentStatus }),
      });
      fetchStudents();
    } catch (err) {
      console.error('切换学生状态失败:', err);
    }
  };

  const handleDelete = async (studentId) => {
    if (!window.confirm('确定要删除该学生吗？此操作不可恢复。')) {
      return;
    }

    try {
      await fetch(`/api/teacher/students/${studentId}`, {
        method: 'DELETE',
      });
      fetchStudents();
    } catch (err) {
      console.error('删除学生失败:', err);
    }
  };

  const handleBatchDelete = async () => {
    if (!window.confirm(`确定要删除选中的 ${selectedStudents.length} 名学生吗？此操作不可恢复。`)) {
      return;
    }

    try {
      await fetch('/api/teacher/students/batch-delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentIds: selectedStudents }),
      });
      setSelectedStudents([]);
      fetchStudents();
    } catch (err) {
      console.error('批量删除学生失败:', err);
    }
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">学生管理</h2>
        <div className="space-x-4">
          <button
            onClick={handleToggleRegistration}
            className={`px-4 py-2 rounded-md ${
              registrationEnabled
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-green-600 hover:bg-green-700'
            } text-white`}
          >
            {registrationEnabled ? '关闭注册' : '开放注册'}
          </button>
          {selectedStudents.length > 0 && (
            <button
              onClick={handleBatchDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              批量删除 ({selectedStudents.length})
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedStudents(students.map(s => s.id));
                    } else {
                      setSelectedStudents([]);
                    }
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                学生信息
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状态
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                注册时间
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map(student => (
              <tr key={student.id}>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStudents([...selectedStudents, student.id]);
                      } else {
                        setSelectedStudents(selectedStudents.filter(id => id !== student.id));
                      }
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={student.avatar || '/default-avatar.png'}
                        alt={student.username}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {student.username}
                      </div>
                      <div className="text-sm text-gray-500">
                        {student.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        学号: {student.studentId}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    student.enabled
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {student.enabled ? '正常' : '已禁用'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(student.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleResetPassword(student.id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    重置密码
                  </button>
                  <button
                    onClick={() => handleToggleStatus(student.id, student.enabled)}
                    className={student.enabled ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                  >
                    {student.enabled ? '禁用' : '启用'}
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
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

export default StudentManagement; 
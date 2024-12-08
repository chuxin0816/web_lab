import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CreateAssignment() {
  const { id } = useParams(); // 如果是编辑模式，会有id
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    courseId: '',
    title: '',
    description: '',
    dueDate: '',
    totalScore: 100,
    attachments: [],
    allowLateSubmission: false,
    requirements: ''
  });

  useEffect(() => {
    fetchCourses();
    if (id) {
      fetchAssignment();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/teacher/courses');
      const data = await response.json();
      setCourses(data);
      if (!id && data.length > 0) {
        setFormData(prev => ({ ...prev, courseId: data[0].id }));
      }
    } catch (err) {
      console.error('获取课程列表失败:', err);
    }
  };

  const fetchAssignment = async () => {
    try {
      const response = await fetch(`/api/teacher/assignments/${id}`);
      const data = await response.json();
      setFormData({
        courseId: data.courseId,
        title: data.title,
        description: data.description,
        dueDate: new Date(data.dueDate).toISOString().slice(0, 16),
        totalScore: data.totalScore,
        attachments: [],
        allowLateSubmission: data.allowLateSubmission,
        requirements: data.requirements
      });
    } catch (err) {
      console.error('获取作业详情失败:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'attachments') {
          formDataToSend.append(key, formData[key]);
        }
      });
      formData.attachments.forEach(file => {
        formDataToSend.append('attachments', file);
      });

      const url = id 
        ? `/api/teacher/assignments/${id}`
        : '/api/teacher/assignments';
      
      const method = id ? 'PUT' : 'POST';

      await fetch(url, {
        method,
        body: formDataToSend
      });

      alert(id ? '作业更新成功！' : '作业布置成功！');
      navigate(`/teacher/courses/${formData.courseId}`);
    } catch (err) {
      console.error('保存作业失败:', err);
      alert('保存失败，请重试');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">
            {id ? '编辑作业' : '布置新作业'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                选择课程
              </label>
              <select
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
                required
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                作业标题
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                作业说明
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                截止时间
              </label>
              <input
                type="datetime-local"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                总分
              </label>
              <input
                type="number"
                name="totalScore"
                value={formData.totalScore}
                onChange={handleChange}
                min="0"
                max="100"
                required
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                附件
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                multiple
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {formData.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {formData.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        删除
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="allowLateSubmission"
                checked={formData.allowLateSubmission}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                允许迟交
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                提交要求
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="请输入具体的提交要求..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                取消
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
              >
                {saving ? '保存中...' : (id ? '更新' : '发布')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAssignment; 
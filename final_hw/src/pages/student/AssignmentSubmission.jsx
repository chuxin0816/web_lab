import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AssignmentSubmission() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [submission, setSubmission] = useState({
    content: '',
    attachments: []
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAssignment();
  }, [id]);

  const fetchAssignment = async () => {
    try {
      const response = await fetch(`/api/assignments/${id}`);
      const data = await response.json();
      setAssignment(data);
    } catch (err) {
      console.error('获取作业详情失败:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('content', submission.content);
      submission.attachments.forEach(file => {
        formData.append('attachments', file);
      });

      await fetch(`/api/assignments/${id}/submit`, {
        method: 'POST',
        body: formData
      });

      alert('作业提交成功！');
      navigate(`/course/${assignment.courseId}`);
    } catch (err) {
      console.error('提交作业失败:', err);
      alert('提交失败，请重试');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSubmission(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeFile = (index) => {
    setSubmission(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  if (!assignment) {
    return <div>作业不存在</div>;
  }

  const isOverdue = new Date(assignment.dueDate) < new Date();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">{assignment.title}</h1>
          
          <div className="mb-6">
            <div className="text-gray-600 mb-2">截止时间：{new Date(assignment.dueDate).toLocaleString()}</div>
            {isOverdue && (
              <div className="text-red-500">已过截止时间</div>
            )}
            <div className="prose max-w-none mt-4">
              {assignment.description}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                作业内容
              </label>
              <textarea
                value={submission.content}
                onChange={(e) => setSubmission(prev => ({ ...prev, content: e.target.value }))}
                rows={6}
                required
                disabled={isOverdue}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="请输入你的答案..."
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
                disabled={isOverdue}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {submission.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {submission.attachments.map((file, index) => (
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

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting || isOverdue}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
              >
                {submitting ? '提交中...' : '提交作业'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AssignmentSubmission; 
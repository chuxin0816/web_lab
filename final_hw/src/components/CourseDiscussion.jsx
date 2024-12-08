import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

function CourseDiscussion({ courseId }) {
  const [discussions, setDiscussions] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    // 获取课程讨论列表
    fetchDiscussions();
  }, [courseId]);

  const fetchDiscussions = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/discussions`);
      const data = await response.json();
      setDiscussions(data);
    } catch (err) {
      console.error('获取讨论列表失败:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`/api/courses/${courseId}/discussions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        setNewComment('');
        fetchDiscussions();
      }
    } catch (err) {
      console.error('发表评论失败:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* 评论输入框 */}
      {user && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="comment" className="sr-only">
              评论内容
            </label>
            <textarea
              id="comment"
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="写下你的想法..."
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              发表评论
            </button>
          </div>
        </form>
      )}

      {/* 评论列表 */}
      <div className="space-y-4">
        {discussions.map((discussion) => (
          <div key={discussion.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={discussion.user.avatar}
                  alt={discussion.user.username}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {discussion.user.username}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(discussion.createdAt).toLocaleString()}
                </p>
                <div className="mt-2 text-sm text-gray-700">
                  {discussion.content}
                </div>
                {/* 回复按钮和回复列表可以在这里添加 */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseDiscussion; 
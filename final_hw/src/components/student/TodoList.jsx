import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TodoList({ showAll = false }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/student/todos');
      const data = await response.json();
      setTodos(showAll ? data : data.slice(0, 5));
    } catch (err) {
      console.error('获取待办事项失败:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (todoId) => {
    try {
      const response = await fetch(`/api/student/todos/${todoId}/complete`, {
        method: 'POST',
      });
      if (response.ok) {
        fetchTodos();
      }
    } catch (err) {
      console.error('更新待办事项状态失败:', err);
    }
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">待办事项</h2>
        {!showAll && todos.length > 0 && (
          <Link
            to="/student/todos"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            查看全部
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {todos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            暂无待办事项
          </div>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleComplete(todo.id)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium ${
                    todo.completed ? 'text-gray-400 line-through' : 'text-gray-900'
                  }`}>
                    {todo.title}
                  </p>
                  <span className="text-sm text-gray-500">
                    {todo.dueDate && new Date(todo.dueDate).toLocaleDateString()}
                  </span>
                </div>
                <Link
                  to={`/course/${todo.courseId}`}
                  className="mt-1 text-sm text-blue-600 hover:text-blue-500"
                >
                  {todo.courseName}
                </Link>
                {todo.description && (
                  <p className="mt-1 text-sm text-gray-600">
                    {todo.description}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList; 
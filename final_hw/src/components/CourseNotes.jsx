import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

function CourseNotes({ courseId }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchNotes();
  }, [courseId]);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/notes`);
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      console.error('获取笔记失败:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      const response = await fetch(`/api/courses/${courseId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newNote }),
      });

      if (response.ok) {
        setNewNote('');
        fetchNotes();
      }
    } catch (err) {
      console.error('保存笔记失败:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* 笔记编辑器 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            添加笔记
          </label>
          <textarea
            id="note"
            rows={6}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="记录你的学习心得..."
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            保存笔记
          </button>
        </div>
      </form>

      {/* 笔记列表 */}
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm text-gray-500">
                  {new Date(note.createdAt).toLocaleString()}
                </p>
                <div className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">
                  {note.content}
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseNotes; 
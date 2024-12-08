import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function OnlineExam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    fetchExam();
  }, [id]);

  useEffect(() => {
    if (exam && exam.duration) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [exam]);

  const fetchExam = async () => {
    try {
      const response = await fetch(`/api/exams/${id}`);
      const data = await response.json();
      setExam(data);
      setTimeLeft(data.duration * 60); // 转换为秒
      
      // 初始化答案对象
      const initialAnswers = {};
      data.questions.forEach(q => {
        initialAnswers[q.id] = q.type === 'multiple' ? [] : '';
      });
      setAnswers(initialAnswers);
    } catch (err) {
      console.error('获取测试失败:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, value, type) => {
    if (type === 'multiple') {
      setAnswers(prev => ({
        ...prev,
        [questionId]: prev[questionId].includes(value)
          ? prev[questionId].filter(v => v !== value)
          : [...prev[questionId], value]
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [questionId]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!window.confirm('确定要提交吗？提交后无法修改。')) {
      return;
    }

    setSubmitting(true);

    try {
      await fetch(`/api/exams/${id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      alert('提交成功！');
      navigate(`/student/exam/${id}/result`);
    } catch (err) {
      console.error('提交失败:', err);
      alert('提交失败，请重试');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  if (!exam) {
    return <div>测试不存在</div>;
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{exam.title}</h1>
            <div className="text-lg font-medium text-red-600">
              剩余时间: {formatTime(timeLeft)}
            </div>
          </div>

          <div className="mb-6">
            <div className="text-gray-600">总分: {exam.totalScore}分</div>
            <div className="text-gray-600">题目数: {exam.questions.length}</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {exam.questions.map((question, index) => (
              <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start mb-4">
                  <span className="font-medium mr-2">{index + 1}.</span>
                  <div>
                    <div className="font-medium">{question.content}</div>
                    <div className="text-sm text-gray-500">
                      ({question.score}分)
                    </div>
                  </div>
                </div>

                {question.type === 'single' && (
                  <div className="space-y-2 ml-6">
                    {question.options.map((option, optionIndex) => (
                      <label key={optionIndex} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value, 'single')}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === 'multiple' && (
                  <div className="space-y-2 ml-6">
                    {question.options.map((option, optionIndex) => (
                      <label key={optionIndex} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={option}
                          checked={answers[question.id].includes(option)}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value, 'multiple')}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === 'text' && (
                  <div className="ml-6">
                    <textarea
                      value={answers[question.id]}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value, 'text')}
                      rows={4}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="请输入你的答案..."
                    />
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
              >
                {submitting ? '提交中...' : '提交答案'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OnlineExam; 
import { Link } from 'react-router-dom';

function CategoryList() {
  const categories = [
    { id: 'programming', name: '编程开发', courseCount: 120 },
    { id: 'design', name: '设计创意', courseCount: 85 },
    { id: 'business', name: '商业管理', courseCount: 64 },
    { id: 'language', name: '语言学习', courseCount: 45 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">课程分类</h2>
      <div className="space-y-2">
        {categories.map(category => (
          <Link
            key={category.id}
            to={`/courses?category=${category.id}`}
            className="block px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-center justify-between">
              <span>{category.name}</span>
              <span className="text-sm text-gray-500">
                {category.courseCount} 门课程
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryList; 
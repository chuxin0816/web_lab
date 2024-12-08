import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');

  useEffect(() => {
    // 从API获取分类数据
    fetchCategories();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">课程分类</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/courses?category=${category.id}`}
            className={`block px-4 py-2 rounded-lg transition-colors ${
              currentCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{category.name}</span>
              <span className="text-sm">
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
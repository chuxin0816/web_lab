import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-1/3">
      <div className="relative">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="搜索课程..."
          className="w-full px-4 py-2 rounded-full border focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          搜索
        </button>
      </div>
    </form>
  );
}

export default SearchBar; 
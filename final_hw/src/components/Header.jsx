import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SearchBar from './SearchBar';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
          <span className="ml-2 text-xl font-bold">在线课程平台</span>
        </Link>

        <SearchBar />

        <nav className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-600">
                {user.role === 'STUDENT' && '我的学习'}
                {user.role === 'TEACHER' && '课程管理'}
                {user.role === 'ADMIN' && '系统管理'}
              </Link>
              <button 
                onClick={logout}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                退出
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login"
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                登录
              </Link>
              <Link 
                to="/register"
                className="px-4 py-2 rounded border border-blue-500 text-blue-500 hover:bg-blue-50"
              >
                注册
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header; 
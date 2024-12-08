import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function PrivateRoute({ children, roles }) {
  const { user } = useAuth();

  if (!user) {
    // 未登录，重定向到登录页
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    // 用户角色不匹配，重定向到首页
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute; 
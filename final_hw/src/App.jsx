import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/student/Dashboard';
import TeacherDashboard from './pages/teacher/Dashboard';
import AssignmentSubmission from './pages/student/AssignmentSubmission';
import CreateAssignment from './pages/teacher/CreateAssignment';
import OnlineExam from './pages/student/OnlineExam';
import { UserRole } from './types/user';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* 学生路由 */}
          <Route path="/student/*" element={
            <PrivateRoute roles={[UserRole.STUDENT]}>
              <Routes>
                <Route path="/" element={<StudentDashboard />} />
                <Route path="/assignment/:id" element={<AssignmentSubmission />} />
                <Route path="/exam/:id" element={<OnlineExam />} />
              </Routes>
            </PrivateRoute>
          } />

          {/* 教师路由 */}
          <Route path="/teacher/*" element={
            <PrivateRoute roles={[UserRole.TEACHER]}>
              <Routes>
                <Route path="/" element={<TeacherDashboard />} />
                <Route path="/assignment/new" element={<CreateAssignment />} />
                <Route path="/assignment/:id/edit" element={<CreateAssignment />} />
              </Routes>
            </PrivateRoute>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App; 
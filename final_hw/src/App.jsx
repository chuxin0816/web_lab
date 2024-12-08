import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import StudentDashboard from './pages/student/Dashboard.jsx';
import TeacherDashboard from './pages/teacher/Dashboard.jsx';
import AssignmentSubmission from './pages/student/AssignmentSubmission.jsx';
import CreateAssignment from './pages/teacher/CreateAssignment.jsx';
import OnlineExam from './pages/student/OnlineExam.jsx';
import { UserRole } from './types/user.ts';
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
  console.log('App rendering');
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
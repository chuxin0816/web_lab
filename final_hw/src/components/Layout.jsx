import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

function Layout() {
  console.log('Layout rendering');
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout; 
import {Outlet} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MainLayout({}) {

  return (
    <div className="">
      <header className="">
        <Navbar />
      </header>
      <main className="px-4 md:px-8 lg:px-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
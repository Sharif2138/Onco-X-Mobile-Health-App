import LandingNavbar from './LandingNavbar';
import { Outlet } from 'react-router-dom';

const LandingLayout = () => (
  <>
    <LandingNavbar />
    <main className="min-h-screen">
      <Outlet />
    </main>
  </>
);

export default LandingLayout;

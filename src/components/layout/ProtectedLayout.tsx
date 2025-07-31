import ProtectedNavbar from './ProtectedNavbar';
import Bottom from './BottomNav';
import { Outlet } from 'react-router-dom';

const ProtectedLayout = () => (
  <>
    <ProtectedNavbar />
    <main className="min-h-screen bg-gray-50">
      <Outlet />
    </main>
    <Bottom />
  </>
);

export default ProtectedLayout;

import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading, error }) => {
  let content = <Outlet />;
  if (loading) content = <p>Đang tải...</p>;
  else if (error) content = <p className="error">{error}</p>;

  return (
    <div>
      <NavBar />
      <main>{content}</main>
    </div>
  );
};

export default Layout;

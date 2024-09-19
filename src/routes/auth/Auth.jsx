import { Outlet, Link, useNavigate } from 'react-router-dom';
import { TbBrandGravatar } from "react-icons/tb";
import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

const Auth = () => {
  const navigate = useNavigate();
  const { token } = useSelector(state => state.auth);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [pathname, token]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500'>
      <div className='max-w-[400px] flex-1 flex flex-col items-center bg-white rounded-lg shadow-lg p-8'>
        <Link to="/" className='flex items-center space-x-2 mb-8'>
          <TbBrandGravatar className="text-4xl text-blue-600" />
          <span className='text-2xl font-bold text-blue-600'>MyApp</span>
        </Link>
        <Outlet />
      </div>
    </div>
  );
}

export default Auth;

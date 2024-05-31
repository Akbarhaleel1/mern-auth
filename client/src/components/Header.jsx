import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (currentUser) {
      navigate('/profile');
    }
  };

 // Check if the current route is the admin login page
 const isOnAdminLogin = location.pathname === '/admin-login';

 // If on the admin login page, return null to hide the header
 if (isOnAdminLogin) {
   return null;
 }

  return (
    <div className='bg-slate-200'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold'>Auth App</h1>
        </Link>
        <ul className='flex gap-10'>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/about'>
            <li>About</li>
          </Link>
          {currentUser ? (
            <img
              src={currentUser.profilePicture}
              alt='profile'
              className='h-7 w-7 rounded-full object-cover cursor-pointer'
              onClick={handleProfileClick}
            />
          ) : (
            <Link to='/sign-in'>
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}

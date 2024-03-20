import { useRoutes } from 'react-router-dom';
import { ForgotPassword, AuthTabs, ResetPassword } from './pages/auth';

export const AppRouter = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <AuthTabs />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '/reset-password',
      element: <ResetPassword />,
    },
  ]);

  return element;
};

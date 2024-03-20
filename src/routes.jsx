import { useRoutes } from 'react-router-dom';
import { AuthTabs, ForgotPassword, ResetPassword } from 'src/pages/auth';
import Streams from 'src/pages/social/streams/Streams';

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
    {
      path: '/app/social/streams',
      element: <Streams />,
    },
  ]);

  return element;
};

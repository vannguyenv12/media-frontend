import { useRoutes } from 'react-router-dom';
import { AuthTabs, ForgotPassword, ResetPassword } from 'src/pages/auth';
import ProtectedRoute from 'src/pages/ProtectedRoute';
import Error from 'src/pages/error/Error';
import { Suspense, lazy } from 'react';
import StreamsSkeleton from 'src/pages/social/streams/StreamsSkeleton';

const Social = lazy(() => import('src/pages/social/Social'));
const Chat = lazy(() => import('src/pages/social/chat/Chat'));
const Followers = lazy(() => import('src/pages/social/followers/Followers'));
const Following = lazy(() => import('src/pages/social/following/Following'));
const Notifications = lazy(() =>
  import('src/pages/social/notifications/Notifications')
);
const People = lazy(() => import('src/pages/social/people/People'));
const Photos = lazy(() => import('src/pages/social/photos/Photos'));
const Profile = lazy(() => import('src/pages/social/profile/Profile'));
const Streams = lazy(() => import('src/pages/social/streams/Streams'));

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
      path: '/app/social',
      element: (
        <ProtectedRoute>
          <Social />
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'streams',
          element: (
            <Suspense fallback={<StreamsSkeleton />}>
              <Streams />
            </Suspense>
          ),
        },
        {
          path: 'chat/messages',
          element: (
            <Suspense>
              <Chat />
            </Suspense>
          ),
        },
        {
          path: 'people',
          element: (
            <Suspense>
              <People />
            </Suspense>
          ),
        },
        {
          path: 'followers',
          element: (
            <Suspense>
              <Followers />
            </Suspense>
          ),
        },
        {
          path: 'following',
          element: (
            <Suspense>
              <Following />
            </Suspense>
          ),
        },
        {
          path: 'photos',
          element: (
            <Suspense>
              <Photos />
            </Suspense>
          ),
        },
        {
          path: 'notifications',
          element: (
            <Suspense>
              <Notifications />
            </Suspense>
          ),
        },
        {
          path: 'profile/:username',
          element: (
            <Suspense>
              <Profile />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: '*',
      element: <Error />,
    },
  ]);

  return element;
};

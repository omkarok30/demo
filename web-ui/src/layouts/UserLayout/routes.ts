import { lazy } from 'react';
import { IRouter } from '@/@types/router';

const pathPre = '/user';

const UserLayoutRoutes: IRouter[] = [
  {
    path: `${pathPre}/login`,
    meta: {
      title: 'Login',
    },
    component: lazy(() => import('@/pages/user/login')),
  },
  {
    path: `${pathPre}/register`,
    meta: {
      title: 'Register',
    },
    component: lazy(() => import('@/pages/user/register')),
  },
];

export default UserLayoutRoutes;

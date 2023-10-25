import { lazy } from 'react';
import { IRouter } from '@/@types/router.d';

const routeRoles: IRouter = {
  path: '/roles',
  redirect: '/roles/all',
  meta: {
    icon: 'permissions',
    title: 'Permission to verify',
    roles: ['settings', 'roles'],
  },
  children: [
    {
      path: 'all',
      meta: {
        icon: 'detail',
        title: 'All users have permissions',
      },
      component: lazy(() => import('@/pages/roles/all')),
    },
    {
      path: 'user',
      meta: {
        icon: 'detail',
        title: 'Users have permission',
      },
      component: lazy(() => import('@/pages/roles/user')),
    },
    {
      path: 'test',
      meta: {
        icon: 'detail',
        title: 'Tests have permission',
        roles: ['roles'],
      },
      component: lazy(() => import('@/pages/roles/test')),
    },
  ],
};
export default routeRoles;

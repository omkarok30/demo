import React, { lazy } from 'react';
import { IRouter } from '@/@types/router.d';

const routeLibrary: IRouter = {
  path: '/library',
  meta: {
    icon: 'detail',
    title: 'Library Management',
    roles: ['Library Management'],
  },
  children: [
    {
      redirect: '/library/manageBooks/list',
      path: 'manageBooks',
      meta: {
        icon: '',
        title: 'Manage books',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/library/managebooks',
          },
          component: lazy(
            () => import('@/pages/library/managebooks/list/index'),
          ),
        },
        {
          path: 'updateTitle',
          meta: {
            title: 'Update Title',
            selectLeftMenu: '/library/managebooks',
          },
          component: lazy(
            () => import('@/pages/library/managebooks/updateTitle/index'),
          ),
        },
        {
          path: 'viewDetails',
          meta: {
            title: 'View Details',
            selectLeftMenu: '/library/managebooks',
          },
          component: lazy(
            () => import('@/pages/library/managebooks/viewDetails/index'),
          ),
        },
        {
          path: 'showBook',
          meta: {
            title: 'Show Book',
            selectLeftMenu: '/library/managebooks',
          },
          component: lazy(
            () => import('@/pages/library/managebooks/showBook/index'),
          ),
        },
      ],
    },
  ],
};
export default routeLibrary;

import { lazy } from 'react';
import { IRouter } from '@/@types/router.d';

const naacssr: IRouter = {
  path: '/NAAC/ssr/Criteria5',
  meta: {
    icon: 'detail',
    title: 'NAAC SSR',
    roles: ['NAAC SSR'],
  },

  children: [
    {
      path: '5.1',
      meta: {
        title: '5.1',
      },
      children: [
        {
          path: 'Government',
          redirect: '/NAAC/ssr/Criteria5/5.1/Government/list',
          meta: {
            title: '5.1.1',
          },
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
                selectLeftMenu: '/NAAC/ssr/Criteria5/5.1/Government',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria5/criteria5_1_1/list')),
            },
            {
              path: 'edit',
              meta: {
                title: 'Edit',
                selectLeftMenu: '/NAAC/ssr/Criteria5/5.1/Government',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria5/criteria5_1_1/form/edit')),
            }, {
              path: 'studentsList',
              meta: {
                title: 'Students List',
                selectLeftMenu: '/NAAC/ssr/Criteria5/5.1/Government',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria5/criteria5_1_1/form/studentsList')),
            }]
        },
        {
          path: 'NonGovernment',
          redirect: '/NAAC/ssr/Criteria5/5.1/NonGovernment/list',
          meta: {
            title: '5.1.2',
          },
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
                selectLeftMenu: '/NAAC/ssr/Criteria5/5.1/NonGovernment',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria5/criteria5_1_2/list')),
            },
            {
              path: 'edit',
              meta: {
                title: 'Edit',
                selectLeftMenu: '/NAAC/ssr/Criteria5/5.1/NonGovernment',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria5/criteria5_1_2/form/edit')),
            }, {
              path: 'studentsList',
              meta: {
                title: 'Students List',
                selectLeftMenu: '/NAAC/ssr/Criteria5/5.1/NonGovernment',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria5/criteria5_1_2/form/studentsList')),
            }
          ]
        },
      ],
    }
  ],
};
export default naacssr;

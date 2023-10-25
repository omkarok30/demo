import React from 'react';
import { IRouter } from '@/@types/router.d';

const routestudentcenter: IRouter = {
  path: '/studentcenter',
  meta: {
    icon: 'money',
    title: ' Student center',
    roles: ['studentcenter'],
  },
  children: [
    {
      redirect: '/studentcenter/student_profile/list',
      path: 'student_profile',
      meta: {
        icon: '',
        title: 'Student Profile',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/studentcenter/student_profile',
          },
          component: React.lazy(() => import('@/pages/studentcenter/studentprofile/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            // tabNavType: 'querypath',
            selectLeftMenu: '/studentcenter/student_profile',
          },
          component: React.lazy(() => import('@/pages/studentcenter/studentprofile')),
        },
        

      ],

    },
  ],
};

export default routestudentcenter;

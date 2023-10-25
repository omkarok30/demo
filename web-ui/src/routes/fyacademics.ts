import React from 'react';
import { IRouter } from '@/@types/router.d';

const routeFyAcademics: IRouter = {
  path: '/fyacademics',
  meta: {
    icon: 'detail',
    title: 'FY Academics',
  },
  children: [
    {

      redirect: '/fyacademics/dashboard/list',
      path: 'dashboard',
      meta: {
        icon: '',
        title: 'Dashboard',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/fyacademics/dashboard',
          },
          component: React.lazy(() => import('@/pages/fyacademics/Dashboard')),
        },

      ],
    },

    {
      redirect: '/fyacademics/course_management/divisions/list',
      path: 'course_management',
      meta: {

        title: 'Course Management',
      },
      children: [
        {
          redirect: '/fyacademics/course_management/divisions/list',
          path: 'divisions',
          meta: {
            icon: '',
            title: 'Divisions & Batches',
          },
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
                selectLeftMenu: '/fyacademics/course_management/divisions',
              },
              component: React.lazy(() => import('@/pages/fyacademics/courseManagement/Divisions/list')),
            },
            {
              path: 'edit/:id/:academicYear',
              meta: {
                title: 'Update',
                selectLeftMenu: '/fyacademics/course_management/divisions',
              },
              component: React.lazy(() => import('@/pages/fyacademics/courseManagement/Divisions/form/edit')),
            },
            {
              path: 'edit_batch/:id/:academicYear/:semester/:division',
              meta: {
                title: 'Update',
                selectLeftMenu: '/fyacademics/divisions',
              },
              component: React.lazy(() => import('@/pages/fyacademics/courseManagement/Batches/form/edit')),
            },
          ],
        },
        {
          redirect: '/fyacademics/course_management/class_coordinator/list',
          path: 'class_coordinator',
          meta: {
            icon: '',
            title: 'Class Coordinator',
          },
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
                selectLeftMenu: '/fyacademics/course_management/class_coordinator',
              },
              component: React.lazy(() => import('@/pages/fyacademics/courseManagement/classCoordinator/list')),
            },
            {
              path: 'edit/:id/:academicYear/:semester/:division',
              meta: {
                title: 'Update',
                selectLeftMenu: '/fyacademics/course_management/class_coordinator',
              },
              component: React.lazy(() => import('@/pages/fyacademics/courseManagement/classCoordinator/form/edit')),
            },
            {
              path: 'back_class_cordinator/:academicYear',
              meta: {
                title: 'Update',
                selectLeftMenu: '/fyacademics/course_management/divisions',
              },
              component: React.lazy(() => import('@/pages/fyacademics/courseManagement/classCoordinator/list')),
            },

          ],
        },

        {
          redirect: '/fyacademics/course_management/managecoureses/list',
          path: 'managecoureses',
          meta: {
            icon: '',
            title: 'Manage Courses',
          },
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
                selectLeftMenu: '/fyacademics/course_management/managecoureses',
              },
              component: React.lazy(() => import('@/pages/fyacademics/courseManagement/Managecourses/list')),
            },
            {
              path: 'edit/:id',
              meta: {
                title: 'Update',
                selectLeftMenu: '/fyacademics/course_management/managecoureses',
              },
              component: React.lazy(() => import('@/pages/fyacademics/courseManagement/Managecourses/form/edit')),
            },

          ],
        },
      ],
    },
  ],
};

export default routeFyAcademics;

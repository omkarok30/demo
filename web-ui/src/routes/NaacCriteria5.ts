import { lazy } from 'react';
import { IRouter } from '@/@types/router.d';

const routeNaacCriteria5: IRouter = {
  path: '/NAAC/criteria5',
  meta: {
    icon: 'detail',
    title: 'NAAC criteria 5',
  },
  children: [
    {
      path: '5.1',
      redirect: '/NAAC/criteria5/5.1/5.1.1',
      meta: {
        icon: '',
        title: '5.1',
      },
      children: [
        {
          path: '5.1.1',
          meta: {
            icon: '',
            title: '5.1.1',
          },
          component: lazy(() => import('@/pages/NAAC/Criteria5/criteria5_1_1')),
        },
        {
          path: '5.1.2',
          meta: {
            icon: '',
            title: '5.1.2',
          },
          component: lazy(() => import('@/pages/NAAC/Criteria5/criteria5_1_2')),
        },
        {
          path: '5.1.3',
          meta: {
            title: '5.1.3',
          },
          redirect: '/NAAC/Criteria5/5.1/5.1.3/list',
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
              },
              component: lazy(() => import('@/pages/NAAC/Criteria5/criteria5_1_3')),
            },
            {
              path: `edit/NewAnswer/`,
              redirect: '/NAAC/Criteria5/criteria5_1_3/skillsEnhancement/form/edit',
              meta: {
                title: 'Edit NewAnswer',
              },
              component: lazy(() => import('@/pages/NAAC/Criteria5/criteria5_1_3/skillsEnhancement/form/edit')),
            },
            {
              path: `edit/ChoiceBasedSystem/`,
              redirect: '/NAAC/Criteria5/criteria5_1_3/capacityBuilding',
              meta: {
                title: 'Edit ChoiceBasedSystem',
              },
              component: lazy(() => import('@/pages/NAAC/Criteria5/criteria5_1_3/capacityBuilding')),
            },
          ],
        },
        {
          path: '5.1.4',
          meta: {
            title: '5.1.4',
          },
          redirect: '/NAAC/Criteria5/5.1/5.1.4/list',
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
              },
              component: lazy(() => import('@/pages/NAAC/Criteria5/criteria5_1_4/list')),
            },
            {
              path: `CompitativeExam/editSystem`,
              redirect: '/NAAC/Criteria5/5.1/5.1.4/CompitativeExam/editSystem',
              meta: {
                title: 'Edit System',
              },
              component: lazy(() => import('@/pages/NAAC/Criteria5/criteria5_1_4/form/editSystem')),
              childrenHidden: true,
            },
            {
              path: `CompitativeExam/editSystem/StudentInfo`,
              redirect: '/NAAC/Criteria5/5.1/5.1.4/CompitativeExam/editSystem/StudentInfo',
              meta: {
                title: 'Student Information',
              },
              component: lazy(() => import('@/pages/NAAC/Criteria5/criteria5_1_4/form/StudentsInfomation')),
            },
            {
              path: `CompitativeExam/editIndividually/`,
              redirect: '/NAAC/Criteria5/5.1/5.1.4/CompitativeExam/editIndividually/',
              meta: {
                title: 'Edit System Indivisual',
              },
              component: lazy(() => import('@/pages/NAAC/Criteria5/criteria5_1_4/form/editIndividually')),
            },
          ],
        },
        {
          path: '5.1.5',
          meta: {
            title: '5.1.5',
          },
          redirect: '/NAAC/Criteria5/5.1/5.1.5/StudentGrievances',
          childrenHidden: true,
          children: [
            {
              path: 'StudentGrievances',
              meta: {
                title: 'StudentGrievances',
              },
              component: lazy(() => import('@/pages/NAAC/Criteria5/criteria5_1_5')),
            },
            {
              path: `edit/NewAnswer/`,
              redirect: '/NAAC/Criteria5/criteria5_1_5/StudentGrievances/form/edit',
              meta: {
                title: 'Edit NewAnswer',
              },
              component: lazy(() => import('@/pages/NAAC/Criteria5/criteria5_1_5/StudentGrievances/form/edit')),
            },
          ],
        },
      ],
    },
  ],
};
export default routeNaacCriteria5;

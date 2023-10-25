import { lazy } from 'react';
import { IRouter } from '@/@types/router.d';
import routeDeveloper from '@/routes/developer';
import routeRoles from '@/routes/roles';
import routeSettings from '@/routes/settings';
import routeEmployee from '@/routes/employee';
import routeFyAcademics from '@/routes/fyacademics';
import routeFees from '@/routes/fees';
import routeAdmissions from '@/routes/admissions';
import routeAcademics from '@/routes/academics';
import routestudentcenter from '@/routes/studentcenter';
import routeDocument from '@/routes/document';
import naacAQAR from '@/routes/NaacAQAR';
import naacssr from '@/routes/NaacSSR';
import routeLibrary from '@/routes/library';
const standardLayoutRoutes: IRouter[] = [
  {
    path: '/home',
    meta: {
      icon: 'home',
      title: 'Home',
    },
    component: lazy(() => import('@/pages/Home')),
  },
  {
    path: '/home/switch',
    meta: {
      icon: 'home',
      title: 'Switch Role',
      hidden: true,
      sidebar: false,
    },
    component: lazy(() => import('@/pages/Home/Switch')),
    // component: lazy(() => import('@/pages/TODO')),
  },
  // routeRoles,

  routeFees,
  routeAdmissions,
  routeEmployee,
  routestudentcenter,
  routeAcademics,
  routeFyAcademics,
  routeSettings,
  routeDeveloper,
  routeDocument,
  naacAQAR,
  naacssr,
  routeLibrary,
];

export default standardLayoutRoutes;

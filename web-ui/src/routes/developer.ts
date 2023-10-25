import { lazy } from 'react';
import { IRouter } from '@/@types/router.d';

const routeComponent: IRouter = {
  path: '/developer',
  redirect: '/developer/iconsvg',
  meta: {
    icon: 'components',
    title: 'Developer',
  },
  children: [
    {
      path: 'icon',
      redirect: '/developer/iconsvg',
      meta: {
        icon: 'icon',
        title: 'IconSvg',
      },
      component: lazy(() => import('@/pages/developer/iconsvg')),
    },
  ],
};
export default routeComponent;

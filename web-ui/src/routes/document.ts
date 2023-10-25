import React, { lazy } from 'react';
import { IRouter } from '@/@types/router.d';

const routeDocument: IRouter = {
  path: '/document',
  meta: {
    icon: 'money',
    title: 'Document Issuance',
    roles: ['Document'],
  },
  children: [
    {
      
      redirect: '/document/transference_certificate/list',
      path: 'transference_certificate',
      meta: {
        icon: '',
        title: 'Transference Certificate',
      },
      childrenHidden:true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/document/transference_certificate',
          },
          component: lazy(() => import('@/pages/documentIssuance/index')),
        },
        {
          path: 'edit/:type/:id/:migration_status/:program',
          meta: {
            title: 'Issue Transference Certificate',
            selectLeftMenu: '/document/transference_certificate',
          },
          component: lazy(() => import('@/pages/documentIssuance/transferenceCertificate/form/edit')),
        },
        {
          path: 'cancelled_admission/edit/:type/:id/:migration_status',
          meta: {
            title: 'Cancel Admission',
            selectLeftMenu: '/document/transference_certificate',
          },
          component: lazy(() => import('@/pages/documentIssuance/cancelledAdmission/form/edit')),
        },
      ],

    },
  ],
};
export default routeDocument;

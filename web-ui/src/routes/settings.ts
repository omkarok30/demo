import React from 'react';
import { IRouter } from '@/@types/router.d';

const routeSettings: IRouter = {
  path: '/settings',
  redirect: '/roles/all',
  meta: {
    icon: 'set',
    title: 'Settings',
    roles: ['settings'],
  },
  children: [
    {
      path: 'all',
      meta: {
        icon: 'set',
        title: 'Global Settings',
      },
      component: React.lazy(() => import('@/pages/settings/Settings/list')),
    },

    {
      redirect: '/settings/institute/list',
      path: 'institute',
      meta: {
        icon: 'detail',
        title: 'Institute Details',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/settings/institute',
          },
          component: React.lazy(() => import('@/pages/settings/Institute/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            // tabNavType: 'querypath',
            selectLeftMenu: '/settings/institute',
          },
          component: React.lazy(() => import('@/pages/settings/Institute/form/edit')),
        },
      ],
    },

    {
      redirect: '/settings/academic_year/list',
      path: 'academic_year',
      meta: {
        icon: 'detail',
        title: 'Academic Year',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/settings/academic_year',
          },
          component: React.lazy(() => import('@/pages/settings/AcademicYear/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/settings/academic_year',
          },
          component: React.lazy(() => import('@/pages/settings/AcademicYear/form/edit')),
        },
      ],
    },
    {
      redirect: '/settings/nonacademic_dept/list',
      path: 'nonacademic_dept',
      meta: {
        icon: 'detail',
        title: 'Non-Academic Departments',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/settings/nonacademic_dept',
          },
          component: React.lazy(() => import('@/pages/settings/NonAcademicDept/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/settings/nonacademic_dept',
          },
          component: React.lazy(() => import('@/pages/settings/NonAcademicDept/form/edit')),
        },
      ],
    },

    {
      redirect: '/settings/academic_dept/list',
      path: 'academic_dept',
      meta: {
        icon: 'detail',
        title: 'Academic Departments',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/settings/academic_dept',
          },
          component: React.lazy(() => import('@/pages/settings/AcademicDept/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            // tabNavType: 'querypath',
            selectLeftMenu: '/settings/academic_dept',
          },
          component: React.lazy(() => import('@/pages/settings/AcademicDept/form/edit')),
        },
      ],
    },
    {
      redirect: '/settings/programs/list',
      path: 'programs',
      meta: {
        icon: 'detail',
        title: 'Programs',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/settings/programs',
          },
          component: React.lazy(() => import('@/pages/settings/ProgramDetails/list')),
        },
        {
          path: 'edit/:id/:programType',
          meta: {
            title: 'Update',
            selectLeftMenu: '/settings/programs',
          },
          component: React.lazy(() => import('@/pages/settings/ProgramDetails/form/edit')),
        },
      ],
    },
    {
      redirect: '/settings/admins/list',
      path: 'admins',
      meta: {
        icon: '',
        title: 'Admin(s)',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/settings/admins',
          },
          component: React.lazy(() => import('@/pages/settings/Admins/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/settings/admins',
          },
          component: React.lazy(() => import('@/pages/settings/Admins/form/edit')),
        },
      ],
    },
    {
      redirect: '/settings/blunode_coordinator/list',
      path: 'blunode_coordinator',
      meta: {
        icon: '',
        title: 'BluNode Coordinators',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/settings/blunode_coordinator',
          },
          component: React.lazy(() => import('@/pages/settings/BluNodeCoordinator/list')),
        },
        {
          path: 'edit/:category/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/settings/blunode_coordinator',
          },
          component: React.lazy(() => import('@/pages/settings/BluNodeCoordinator/form/edit')),
        },
      ],
    },

    {
      redirect: '/settings/fy_academics_type/list',
      path: 'fy_academics_type',
      meta: {
        icon: 'detail',
        title: 'FY Academics Type',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/settings/fy_academics_type',
          },
          component: React.lazy(() => import('@/pages/settings/AcademicYear/list/academicTypes')),
        },
      ],
    },

    {
      redirect: '/settings/bank_details/list',
      path: 'bank_details',
      meta: {
        icon: 'detail',
        title: 'Bank Details',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/settings/bank_details',
          },
          component: React.lazy(() => import('@/pages/settings/BankDetails/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/settings/bank_details',
          },
          component: React.lazy(() => import('@/pages/settings/BankDetails/form/edit')),
        },
      ],
    },
    {
      redirect: '/settings/lookups/list',
      path: 'lookups',
      meta: {
        icon: 'detail',
        title: 'System Profiles',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/settings/lookups',
          },
          component: React.lazy(() => import('@/pages/settings/Lookups/list')),
        },
        // {
        //   path: 'edit/:id',
        //   meta: {
        //     title: 'Update',
        //     selectLeftMenu: '/settings/lookups',
        //   },
        //   component: React.lazy(() => import('@/pages/settings/BankDetails/form/edit')),
        // },
      ],
    },

  ],
};
export default routeSettings;

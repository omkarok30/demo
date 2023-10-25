import { lazy } from 'react';
import { IRouter } from '@/@types/router.d';
import React from 'react';

const routeFees: IRouter = {
  path: '/fees',
  redirect: '/fees/all',
  meta: {
    icon: 'money',
    title: 'Fees',
    roles: ['fees'],
  },
  children: [
    {
      path: 'all',
      meta: {
        icon: 'detail',
        title: 'All Fees',
      },
      component: lazy(() => import('@/pages/TODO')),
    },
    {
      path: 'add',
      meta: {
        icon: 'detail',
        title: 'Add Fee',
      },
      component: lazy(() => import('@/pages/TODO')),
    },


    {
      redirect: '/settings/college_fee_head/list',
      path: 'college_fee_head',
      meta: {
        icon: 'detail',
        title: 'College Fee Head',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/settings/college_fee_head',
          },
          component: React.lazy(() => import('@/pages/settings/CollegeFeeHead/list')),
        },
        {
          path: 'edit/*',
          meta: {
            title: 'Update',
            selectLeftMenu: '/settings/college_fee_head',
          },
          component: React.lazy(() => import('@/pages/settings/CollegeFeeHead/form/edit')),
        },
      ],
    },

    {
      redirect: '/settings/college_fee_structure/list',
      path: 'college_fee_structure',
      meta: {
        icon: 'detail',
        title: 'College Fee Structure',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/settings/college_fee_structure',
          },
          component: React.lazy(() => import('@/pages/settings/CollegeFeeStructure/list')),
        },
        {
          path: 'edit/*',
          meta: {
            title: 'Update',
            selectLeftMenu: '/settings/college_fee_structure',
          },
          component: React.lazy(() => import('@/pages/settings/CollegeFeeStructure/form/edit')),
        },
      ],
    },

    {
      redirect: '/settings/deposit/list',
      path: 'deposit',
      meta: {
        icon: 'detail',
        title: 'Deposit Details',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/settings/deposit',
          },
          component: React.lazy(() => import('@/pages/settings/Deposit/list')),
        },
        {
          path: 'edit/*',
          meta: {
            title: 'Update',
            selectLeftMenu: '/settings/deposit',
          },
          component: React.lazy(() => import('@/pages/settings/Deposit/form/edit')),
        },
      ],
    },

    {
      redirect: '/settings/misccharges/list',
      path: 'misccharges',
      meta: {
        icon: 'detail',
        title: 'Miscellaneous Charges',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/settings/misccharges',
          },
          component: React.lazy(() => import('@/pages/settings/MiscCharges/list')),
        },
        {
          path: 'edit/*',
          meta: {
            title: 'Update',
            selectLeftMenu: '/settings/misccharges',
          },
          component: React.lazy(() => import('@/pages/settings/MiscCharges/form/edit')),
        },
      ],
    },

    {
      redirect: '/settings/student_insurance/list',
      path: 'student_insurance',
      meta: {
        icon: 'detail',
        title: 'Student Insurance',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/settings/student_insurance',
          },
          component: React.lazy(() => import('@/pages/settings/StudentInsurance/list')),
        },
        {
          path: 'edit/*',
          meta: {
            title: 'Update',
            selectLeftMenu: '/settings/student_insurance',
          },
          component: React.lazy(() => import('@/pages/settings/StudentInsurance/form/edit')),
        },
      ],
    },

    {
      redirect: '/settings/student_insurance_structure/list',
      path: 'student_insurance_structure',
      meta: {
        icon: 'detail',
        title: 'Student Insurance Structure',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/settings/student_insurance_structure',
          },
          component: React.lazy(() => import('@/pages/settings/StudentInsuranceStructure/list')),
        },
        {
          path: 'edit/*',
          meta: {
            title: 'Update',
            selectLeftMenu: '/settings/student_insurance_structure',
          },
          component: React.lazy(() => import('@/pages/settings/StudentInsuranceStructure/form/edit')),
        },
      ],
    },
    {
      redirect: '/settings/uni_stud_insurance/list',
      path: 'uni_stud_insurance',
      meta: {
        icon: 'detail',
        title: 'University Fee and Student Insurance Assignment',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/settings/uni_stud_insurance',
          },
          component: React.lazy(() => import('@/pages/settings/UniStudInsurance/list')),
        },
      ],
    },

    {
      redirect: '/settings/university_fee/list',
      path: 'university_fee',
      meta: {
        icon: 'detail',
        title: 'University Fees',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/settings/university_fee',
          },
          component: React.lazy(() => import('@/pages/settings/UniversityFee/list')),
        },
        {
          path: 'edit/*',
          meta: {
            title: 'Update',
            selectLeftMenu: '/settings/university_fee',
          },
          component: React.lazy(() => import('@/pages/settings/UniversityFee/form/edit')),
        },
      ],
    },

    {
      redirect: '/settings/university_fee_structure/list',
      path: 'university_fee_structure',
      meta: {
        icon: 'detail',
        title: 'University Fee Structure',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/settings/university_fee_structure',
          },
          component: React.lazy(() => import('@/pages/settings/UniversityFeeStructure/list')),
        },
        {
          path: 'edit/*',
          meta: {
            title: 'Update',
            selectLeftMenu: '/settings/university_fee_structure',
          },
          component: React.lazy(() => import('@/pages/settings/UniversityFeeStructure/form/edit')),
        },
      ],
    },
  ],
};
export default routeFees;

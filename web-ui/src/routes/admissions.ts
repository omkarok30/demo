import React from 'react';
import { IRouter } from '@/@types/router.d';

const routeAdmissions: IRouter = {
  path: '/admissions',
  redirect: '/roles/all',
  meta: {
    icon: 'set',
    title: 'Admissions',
    roles: ['admissions'],
  },
  children: [
    {
      redirect: '/admissions/admissiondashboard/list',
      path: 'admissiondashboard',
      meta: {
        icon: '',
        title: 'Admission Dashboard',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'Admissions Dashboard',
            selectLeftMenu: '/admissions/admissiondashboard',
          },
          component: React.lazy(() => import('@/pages/AdmissionDashboard/list')),
        },
      ],
    },
    {
      redirect: '/admissions/admit-students/edit',
      path: 'admit-students',
      meta: {
        icon: '',
        title: 'Admit Students',
      },
      childrenHidden: true,
      children: [
        {
          path: 'edit/*',
          meta: {
            title: 'Add',
            selectLeftMenu: '/admissions/admit-students',
          },
          component: React.lazy(() => import('@/pages/admissions/AdmitStudents/form')),
        },
      ],
    },
    {
      redirect: 'list',
      path: 'branch-transfer',
      meta: {
        icon: 'detail',
        title: 'Branch Transfer',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/admissions/branch-transfer',
          },
          component: React.lazy(() => import('@/pages/admissions/BranchTransfer/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/branch-transfer',
          },
          component: React.lazy(() => import('@/pages/admissions/BranchTransfer/form')),
        },
      ],
    },
    {
      redirect: '/admissions/student_record/list',
      path: 'student_record',
      meta: {
        icon: '',
        title: 'Student Record',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/admissions/student_record',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/SearchStudents/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            // tabNavType: 'querypath',
            selectLeftMenu: '/admissions/student_record',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord')),
        },
        {
          path: 'education-details/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/student_record',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/EducationDetails/form')),
        },
        {
          path: 'banking-details/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/student_record',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/BankingDetails/form')),
        },
        {
          path: 'contact-details/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/student_record',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/ContactDetails/form')),
        },
        {
          path: 'address-details/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/student_record',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/AddressDetails/form')),
        },
        {
          path: 'student_document/:id/:studentId',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/student_record',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/StudentDocuments/form')),
        },
        {
          path: 'issued_documents/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/student_record',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/IssuedDocuments/list')),
        },
        {
          path: 'co-curricular/technical_details/:id/:studentId',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/co-curricular/technical_details',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/CoCurricularActivity/TechnicalDetails/form')),
        },
        {
          path: 'co-curricular/publication_details/:id/:studentId',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/co-curricular/technical_details',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/CoCurricularActivity/PublicationDetails/form')),
        },
        {
          path: 'co-curricular/addoncertificate_details/:id/:studentId',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/co-curricular/addoncertificate_details',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/CoCurricularActivity/AddOnCertificateDetails/form')),
        },
        {
          path: 'co-curricular/workshop_details/:id/:studentId',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/co-curricular/workshop_details',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/CoCurricularActivity/WorkshopDetails/form')),
        },
        {
          path: 'co-curricular/industrial_training_details/:id/:studentId',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/co-curricular/industrial_training_details',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/CoCurricularActivity/IndustrialTrainingDetails/form')),
        },
        {
          path: 'extra-curricular/sport/:id/:studentId',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/extra-curricular/sport',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/ExtraCurricularActivity/SportEvent/form')),
        },
        {
          path: 'extra-curricular/cultural/:id/:studentId',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/extra-curricular/cultural',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/ExtraCurricularActivity/CulturalEvent/form')),
        },
        {
          path: 'extra-curricular/extended-social-activity/:id/:studentId',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/extra-curricular/extended-social-activity',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/ExtraCurricularActivity/ExtendedSocialActivity/form')),
        },
        {
          path: 'extra-curricular/extension-activity/:id/:studentId',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/extra-curricular/extension-activity',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/ExtraCurricularActivity/ExtensionActivity/form')),
        },
        {
          path: 'beneficiary_details/scholarship_details/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/beneficiary_details/scholarship_details',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/BeneficiaryDetails/ScholerShipDetails/form')),
        },
        {
          path: 'beneficiary_details/following_classes/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/beneficiary_details/following_classes',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/BeneficiaryDetails/FollowingClasses/form')),
        },
        {
          path: 'overall-result/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/student_record',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/OverallResult/form')),
        },
        {
          path: 'identity-docs/adhaar/:id/:studentId',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/identity-docs/adhaar',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/IdentityDocs/AdhaarDetails/form')),
        },
        {
          path: 'identity-docs/passport/:id/:studentId',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/identity-docs/passport',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/IdentityDocs/PassportDetails/form')),
        },
        {
          path: 'identity-docs/voterid/:id/:studentId',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/identity-docs/voterid',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/IdentityDocs/VoterIdDetails/form')),
        },
        {
          path: 'identity-docs/license/:id/:studentId',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/identity-docs/license',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/IdentityDocs/LicenseDetails/form')),
        },
        {
          path: 'identity-docs/pancard/:id/:studentId',
          meta: {
            title: 'Update',
            selectLeftMenu: '/admissions/identity-docs/pancard',
          },
          component: React.lazy(() => import('@/pages/admissions/StudentRecord/IdentityDocs/PanCardDetails/form')),
        },
      ],
    },

  ],
};
export default routeAdmissions;

import React, { lazy } from 'react';
import { IRouter } from '@/@types/router.d';

const routeEmployee: IRouter = {
  path: '/employee',
  meta: {
    icon: 'money',
    title: 'Employee',
    roles: ['employee'],
  },
  children: [
    {
      redirect: '/employee/dashboard/list',
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
            selectLeftMenu: '/employee/dashboard',
          },
          component: React.lazy(() => import('@/pages/Employee/EmployeeDashboard/index')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/employee/dashboard',
          },
          component: lazy(() => import('@/pages/Employee/EmployeeDashboard/form/edit')),
        },
      ],
    },
    {
      redirect: '/employee/employee_details/list',
      path: 'employee_details',
      meta: {
        icon: '',
        title: 'Employee Records',
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/employee/employee_details',
          },
          component: lazy(() => import('@/pages/Employee/EmployeeDetails/list')),

        },
        {
          // redirect:history,
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/employee/employee_details',
          },
          component: lazy(() => import('@/pages/Employee/EmployeeDetails/form/edit')),
        },
        {
          path: 'create',
          meta: {
            icon: 'detail',
            title: 'Create Employee',
          },
          component: lazy(() => import('@/pages/Employee/form/createEmployee')),
        },
      ],
    },
    {
      redirect: '/Employee/employee_position/list',
      path: 'employee_position',

      meta: {
        icon: 'detail',
        title: 'Employee Position',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_position',
          },
          component: lazy(() => import('@/pages/Employee/EmployeePositions/list/index')),
        },
        {
          path: 'edit/:id/:empId',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_position',
          },
          component: lazy(() => import('@/pages/Employee/EmployeePositions/form/edit')),
        },
      ],
    },
    {
      redirect: '/employee/employee_details/list',
      path: 'employee_job_history',

      meta: {
        icon: 'detail',
        title: 'Employee Job History',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_job_history',
          },
          component: lazy(() => import('@/pages/Employee/EmployeeJobHistory/list/index')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_job_history',
          },
          component: lazy(() => import('@/pages/Employee/EmployeeJobHistory/form/edit')),
        },
      ],
    },
    {
      redirect: '/Employee/employee_qualification/list',
      path: 'employee_qualification',
      meta: {
        icon: 'detail',
        title: 'Employee Qualification',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_qualification',
          },
          component: lazy(() => import('@/pages/Employee/QualificationDetails/list')),
        },
        {
          path: 'edit/:empId/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_qualification',
          },
          component: lazy(() => import('@/pages/Employee/QualificationDetails/form/edit')),
        },
      ],
    },
    {
      redirect: '/Employee/employee_technical_skills/list',
      path: 'employee_technical_skills',
      meta: {
        icon: 'detail',
        title: 'Technical Skills',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_technical_skills',
          },
          component: lazy(() => import('@/pages/Employee/TechnicalSkils/list')),
        },
        {
          path: 'edit/:empId/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_technical_skills',
          },
          component: lazy(() => import('@/pages/Employee/TechnicalSkils/form/edit')),
        },
      ],
    },
    {
      redirect: '/Employee/employee_achievement/list',
      path: 'employee_achievement',
      meta: {
        icon: 'detail',
        title: 'Employee Achievement',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_achievement',
          },
          component: lazy(() => import('@/pages/Employee/EmployeeAchievement/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_achievement',
          },
          component: lazy(() => import('@/pages/Employee/EmployeeAchievement/form/edit')),
        },
      ],
    },
    {
      redirect: '/Employee/employee_experience/list',
      path: 'employee_experience',
      meta: {
        icon: 'detail',
        title: 'Employee Experience',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_experience',
          },
          component: lazy(() => import('@/pages/Employee/EmployeeExperience/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_experience',
          },
          component: lazy(() => import('@/pages/Employee/EmployeeExperience/form/edit')),
        },
      ],
    },
    {
      redirect: '/Employee/employee_publication_details/list',
      path: 'employee_publication_details',
      meta: {
        icon: 'detail',
        title: 'Publication Details',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_publication_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/PublicationDetails/list')),
        },
        {
          path: 'edit/:empId/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_publication_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/PublicationDetails/form/edit')),
        },
      ],
    },
    {
      redirect: '/employee/employee_sttp/list',
      path: 'employee_sttp',
      meta: {
        icon: 'detail',
        title: 'Employee STTP Details',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_sttp',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/SttpDetails/list')),
        },
        {
          path: 'edit/:empId/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_sttp',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/SttpDetails/form/edit')),
        },
      ],
    },
    {
      redirect: '/employee/employee_patent_details/list',
      path: 'employee_patent_details',
      meta: {
        icon: 'detail',
        title: 'Employee Patent Details',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_patent_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/PatentDetails/list')),
        },
        {
          path: 'edit/:empId/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_patent_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/PatentDetails/form/edit')),
        },
      ],
    },
    {
      redirect: '/employee/employee_book_details/list',
      path: 'employee_book_details',
      meta: {
        icon: 'detail',
        title: 'Employee Book Details',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_book_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/BookDetails/list')),
        },
        {
          path: 'edit/:empId/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_book_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/BookDetails/form/edit')),
        },
      ],
    },
    {
      redirect: '/Employee/employee_sponsored_research_details/list',
      path: 'employee_sponsored_research_details',
      meta: {
        icon: 'detail',
        title: 'Sponsored Research Details',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_sponsored_research_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/SponsoredResearchDetails/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_sponsored_research_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/SponsoredResearchDetails/form/edit')),
        },
      ],
    },
    {
      redirect: '/Employee/employee_consultancy_industry_details/list',
      path: 'employee_consultancy_industry_details',
      meta: {
        icon: 'detail',
        title: 'Consultancy Industry Details',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_consultancy_industry_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/ConsultancyIndustryDetails/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_consultancy_industry_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/ConsultancyIndustryDetails/form/edit')),
        },
      ],
    },
    {
      redirect: '/Employee/employee_corporate_training_details/list',
      path: 'employee_corporate_training_details',
      meta: {
        icon: 'detail',
        title: 'Corporate Training Details',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_corporate_training_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/CorporateTrainingDetails/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_corporate_training_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/CorporateTrainingDetails/form/edit')),
        },
      ],
    },
    {
      redirect: '/Employee/employee_guided_student_details/list',
      path: 'employee_guided_student_details',
      meta: {
        icon: 'detail',
        title: 'Guided Student Details',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_guided_student_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/GuidedStudentDetails/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_guided_student_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/GuidedStudentDetails/form/edit')),
        },
      ],
    },
    {
      redirect: '/Employee/employee_guest_lecturer_details/list',
      path: 'employee_guest_lecturer_details',
      meta: {
        icon: 'detail',
        title: 'Guest Lecturer Details',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_guest_lecturer_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/GuestLecturerDetails/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_guest_lecturer_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/GuestLecturerDetails/form/edit')),
        },
      ],
    },
    {
      redirect: '/Employee/employee_innovation_in_teaching_learning/list',
      path: 'employee_innovation_in_teaching_learning',
      meta: {
        icon: 'detail',
        title: 'Innovation In Teaching and Learning',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_innovation_in_teaching_learning',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/InnovationInTeachingLearning/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_innovation_in_teaching_learning',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/InnovationInTeachingLearning/form/edit')),
        },
      ],
    },
    {
      redirect: '/Employee/employee_member_academic_council_details/list',
      path: 'employee_member_academic_council_details',
      meta: {
        icon: 'detail',
        title: 'Member Of Academic Council/BOS Of Affiliating Board/University Details',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_member_academic_council_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/MemberAcademicCouncil/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_member_academic_council_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/MemberAcademicCouncil/form/edit')),
        },
      ],
    },
    {
      redirect: '/Employee/employee_semester_end_question_papers_details/list',
      path: 'employee_semester_end_question_papers_details',
      meta: {
        icon: 'detail',
        title: 'Setting Of Semester End Question Papers Details',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_semester_end_question_papers_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/SemesterEndQuestionPapersDetails/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_semester_end_question_papers_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/SemesterEndQuestionPapersDetails/form/edit')),
        },
      ],
    },
    {
      redirect: '/Employee/employee_extention_activity_details/list',
      path: 'employee_extention_activity_details',
      meta: {
        icon: 'detail',
        title: 'Extention Activity Details',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_extention_activity_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/ExtentionActivityDetails/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_extention_activity_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/ExtentionActivityDetails/form/edit')),
        },
      ],
    },
    {
      redirect: '/Employee/employee_development_activity_details/list',
      path: 'employee_development_activity_details',
      meta: {
        icon: 'detail',
        title: 'Development Activity Details',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_development_activity_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/DevelopmentActivityDetails/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_development_activity_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/DevelopmentActivityDetails/form/edit')),
        },
      ],
    },
    {
      redirect: '/Employee/employee_online_courses_details/list',
      path: 'employee_online_courses_details',
      meta: {
        icon: 'detail',
        title: 'Online Courses Details',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_online_courses_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/OnlineCoursesDetails/list/index')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_online_courses_details',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/OnlineCoursesDetails/form/edit')),
        },
      ],
    },
    {
      redirect: '/Employee/employee_assessment_evaluation_moderation/list',
      path: 'employee_assessment_evaluation_moderation',
      meta: {
        icon: 'detail',
        title: 'Assessment/Evaluation/Moderation Details',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_assessment_evaluation_moderation',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/EmployeeAssessmentEvaluation/list/index')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_assessment_evaluation_moderation',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/EmployeeAssessmentEvaluation/form/edit')),
        },
      ],
    },
    {
      redirect: '/Employee/employee_design_development/list',
      path: 'employee_design_development',
      meta: {
        icon: 'detail',
        title: 'Design And Development Of Curriculum Details',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_design_development',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/DesignAndDevelopment/list/index')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_design_development',
          },
          component: lazy(() => import('@/pages/Employee/DetailsOfActivity/DesignAndDevelopment/form/edit')),
        },
      ],
    },
    {
      redirect: '/Employee/employee_deputation/list',
      path: 'employee_deputation',
      meta: {
        icon: 'detail',
        title: 'Deputation',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_deputation',
          },
          component: lazy(() => import('@/pages/Employee/Deputation/list/index')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_deputation',
          },
          component: lazy(() => import('@/pages/Employee/Deputation/form/edit')),
        },
      ],
    },
    {
      redirect: '/Employee/employee_relieving_details/list',
      path: 'employee_relieving_details',
      meta: {
        icon: 'detail',
        title: 'Relieving Details',
        hidden: true,
      },
      childrenHidden: true,
      children: [
        {
          path: 'list',
          meta: {
            title: 'List',
            selectLeftMenu: '/Employee/employee_relieving_details',
          },
          component: lazy(() => import('@/pages/Employee/EmployeeRelievingDetails/list')),
        },
        {
          path: 'edit/:id',
          meta: {
            title: 'Update',
            selectLeftMenu: '/Employee/employee_relieving_details',
          },
          component: lazy(() => import('@/pages/Employee/EmployeeRelievingDetails/form/edit')),
        },

        {
          redirect: '/Employee/employee_document/list',
          path: 'employee_document',
          meta: {
            icon: 'detail',
            title: 'Employee Document',
            hidden: true,
          },
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
                selectLeftMenu: '/Employee/employee_document',
              },
              component: lazy(() => import('@/pages/Employee/EmployeeDocument/list')),
            },
            {
              path: 'edit/:id',
              meta: {
                title: 'Update',
                selectLeftMenu: '/Employee/employee_document',
              },
              component: lazy(() => import('@/pages/Employee/EmployeeDocument/form/edit')),
            },
          ],
        },

      ],
    },
  ],
};

export default routeEmployee;

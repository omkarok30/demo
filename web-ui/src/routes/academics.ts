import React, { lazy } from 'react';
import { IRouter } from '@/@types/router.d';

const routeAcademics: IRouter = {
  path: '/academics',
  meta: {
    icon: 'money',
    title: 'Academics',
    roles: ['Academics'],
  },
  children: [
    {
      path: 'timeTable',
      meta: {
        icon: '',
        title: 'Timetable & Attendance',
      },
      children: [
        {
          redirect: '/academics/timeTable/day_format/list',
          path: 'day_format',
          meta: {
            title: 'Day Format',
            selectLeftMenu: '/academics/timeTable/day_format',
          },
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
                selectLeftMenu: '/academics/timeTable/day_format',
              },
              component: lazy(() => import('@/pages/Academics/timeTable/dayFormat/list')),
            },
            {
              path: 'edit/*',
              meta: {
                title: 'Update',
                selectLeftMenu: '/academics/timeTable/day_format',
              },
              component: lazy(() => import('@/pages/Academics/timeTable/dayFormat/form/edit')),
            },
          ],
        },
        {
          redirect: '/academics/timeTable/generalSessions/list',
          path: 'generalSessions',
          meta: {
            title: 'General Sessions',
            selectLeftMenu: '/academics/timeTable/generalSessions',
          },
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
                selectLeftMenu: '/academics/timeTable/generalSessions',
              },
              component: lazy(
                () =>
                  import('@/pages/Academics/timeTable/generalSessions/list'),
              ),
            },
            {
              path: 'edit/:id',
              meta: {
                title: 'Update',
                selectLeftMenu: '/academics/timeTable/generalSessions',
              },
              component: lazy(
                () =>
                  import(
                    '@/pages/Academics/timeTable/generalSessions/form/edit'
                  ),
              ),
            },
          ],
        },
        {
          redirect: '/Academics/timetable/holidaylist/list',
          path: 'holidaylist',
          meta: {
            title: 'Holiday list',
            selectLeftMenu: '/Academics/timetable/holidaylist',
          },
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
                selectLeftMenu: '/Academics/timetable/holidaylist',
              },
              component: lazy(
                () =>
                  import('@/pages/Academics/timeTable/holidaylist/list'),
              ),
            },
            {
              path: 'edit/:id',
              meta: {
                title: 'Update',
                selectLeftMenu: '/Academics/timetable/holidaylist',
              },
              component: lazy(
                () =>
                  import('@/pages/Academics/timeTable/holidaylist/form/edit'),
              ),
            },
          ],
        },
      ],
    },
    {
      redirect: '/academics/vision_mission/employee_institute_level/list',
      path: 'vision_mission',
      meta: {
        icon: '',
        title: 'Vision & Mission',
      },

      children: [
        {
          redirect: '/Academics/vision_mission/employee_institute_level/list',
          path: 'employee_institute_level',
          meta: {
            title: 'Institute Level',
            selectLeftMenu: '/academics/employee_institute_level',
          },
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
                selectLeftMenu: '/academics/employee_institute_level',
              },
              component: lazy(
                () =>
                  import(
                    '@/pages/Academics/VisionAndMission/InstituteLevel/list'
                  ),
              ),
            },
            {
              path: 'edit/:id',
              meta: {
                title: 'Update',
                selectLeftMenu: '/academics/employee_institute_level',
              },
              component: lazy(
                () =>
                  import(
                    '@/pages/Academics/VisionAndMission/InstituteLevel/form/edit'
                  ),
              ),
            },
          ],
        },
        {
          redirect: '/Academics/vision_mission/employee_department_level/list',
          path: 'employee_department_level',
          meta: {
            title: 'Department Level',
            selectLeftMenu: '/academics/employee_department_level',
          },
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
                selectLeftMenu: '/academics/employee_department_level',
              },
              component: lazy(
                () =>
                  import(
                    '@/pages/Academics/VisionAndMission/DepartmentLevel/list'
                  ),
              ),
            },
            {
              path: 'edit/:id',
              meta: {
                title: 'Update',
                selectLeftMenu: '/academics/employee_department_level',
              },
              component: lazy(
                () =>
                  import(
                    '@/pages/Academics/VisionAndMission/DepartmentLevel/form/edit'
                  ),
              ),
            },
          ],
        },
      ],
    },
    {
      path: 'program_management',
      meta: {
        icon: '',
        title: 'Program Management',
      },
      children: [
        {
          redirect: '/academics/program_management/term_duration/list',
          path: 'term_duration',
          meta: {
            icon: '',
            title: 'Term Duration',
          },
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
                selectLeftMenu: '/academics/program_management/term_duration',
              },
              component: React.lazy(
                () =>
                  import(
                    '@/pages/Academics/programManagement/termDuration/list'
                  ),
              ),
            },
            {
              path: 'edit/:id/:className/:pattern/:year/:program',
              meta: {
                title: 'Update',
                selectLeftMenu: '/academics/program_management/term_duration',
              },
              component: React.lazy(
                () =>
                  import(
                    '@/pages/Academics/programManagement/termDuration/form'
                  ),
              ),
            },
          ],
        },
        {
          redirect: '/academics/program_management/manage_ppp/list',
          path: 'manage_ppp',
          meta: {
            icon: '',
            title: 'PEO, PO & PSO',
          },
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
                selectLeftMenu: '/academics/program_management/manage_ppp',
              },
              component: React.lazy(() => import('@/pages/Academics/programManagement/Peo_Po_Pso/list')),
            },
            {
              path: 'edit/:type/:id',
              meta: {
                title: 'update',
                selectLeftMenu: '/academics/program_management/manage_ppp',
              },
              component: React.lazy(() => import('@/pages/Academics/programManagement/Peo_Po_Pso/form/edit')),
            },
            {
              path: 'add/:year/:program/:batch',
              meta: {
                title: 'Create',
                selectLeftMenu: '/academics/program_management/manage_ppp',
              },
              component: React.lazy(() => import('@/pages/Academics/programManagement/Peo_Po_Pso/form/cloneAdd')),
            },
          ],
        },
      ],
    },
    {
      path: 'course_evaluation_tools',
      meta: {
        // icon: 'detail',
        title: 'Course Evaluation Tools',
      },
      children: [
        {
          redirect: '/academics/course_evaluation_tools/create_tools/list',
          path: 'create_tools',
          meta: {
            //   icon: 'detail',
            title: 'Evaluation Tools',
          },
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
                selectLeftMenu:
                  '/academics/course_evaluation_tools/create_tools',
              },
              component: React.lazy(
                () =>
                  import(
                    '@/pages/Academics/courseEvaluationTools/createTools/list'
                  ),
              ),
            },
            {
              path: 'edit/:id',
              meta: {
                title: 'Update',
                selectLeftMenu:
                  '/academics/course_evaluation_tools/create_tools',
              },
              component: React.lazy(
                () =>
                  import(
                    '@/pages/Academics/courseEvaluationTools/createTools/form/edit'
                  ),
              ),
            },
          ],
        },
        {
          redirect:
            '/academics/course_evaluation_tools/tool-attainment-level/list',
          path: 'tool-attainment-level',
          meta: {
            title: 'Tool Attainment Level',
            selectLeftMenu:
              '/academics/course_evaluation_tools/tool-attainment-level',
          },
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
                selectLeftMenu:
                  '/academics/course_evaluation_tools/tool-attainment-level',
              },
              component: React.lazy(
                () =>
                  import(
                    '@/pages/Academics/courseEvaluationTools/toolAttainment/list'
                  ),
              ),
            },
            {
              path: 'edit/:id',
              meta: {
                title: 'Update',
                selectLeftMenu:
                  '/academics/course_evaluation_tools/tool-attainment-level',
              },
              component: React.lazy(
                () =>
                  import(
                    '@/pages/Academics/courseEvaluationTools/toolAttainment/form/edit'
                  ),
              ),
            },
            {
              path: 'add',
              meta: {
                title: 'Add',
                selectLeftMenu:
                  '/academics/course_evaluation_tools/tool-attainment-level',
              },
              component: React.lazy(
                () =>
                  import(
                    '@/pages/Academics/courseEvaluationTools/toolAttainment/form/add'
                  ),
              ),
            },
          ],
        },
      ],
    },

    {
      path: 'course_management',
      meta: {
        icon: '',
        title: 'Course Management',
      },
      children: [
        {
          redirect: '/academics/course_management/divisions/list',
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
                selectLeftMenu: '/academics/course_management/divisions',
              },
              component: React.lazy(
                () =>
                  import('@/pages/Academics/courseManagement/Divisions/list'),
              ),
            },
            {
              path: 'edit/:id/:academicYear/:departmentId/:programId/:className',
              meta: {
                title: 'Update',
                selectLeftMenu: '/academics/course_management/divisions',
              },
              component: React.lazy(
                () =>
                  import(
                    '@/pages/Academics/courseManagement/Divisions/form/edit'
                  ),
              ),
            },
            {
              path: 'edit_batch/:id/:academicYear/:semester/:division/:departmentId/:programId/:className',
              meta: {
                title: 'Update',
                selectLeftMenu: '/academics/course_management/divisions',
              },
              component: React.lazy(
                () =>
                  import(
                    '@/pages/Academics/courseManagement/Batches/form/edit'
                  ),
              ),
            },
          ],
        },
        {
          redirect: '/academics/course_management/manage_courses/list',
          path: 'manage_courses',
          meta: {
            title: 'Manage Courses',
          },
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
                selectLeftMenu: '/academics/course_management/manage_courses',
              },
              component: React.lazy(
                () => import('@/pages/Academics/courseManagement/index'),
              ),
            },
            {
              path: 'edit/:id',
              meta: {
                title: 'Update',
                selectLeftMenu: '/academics/course_management/edit_courses',
              },
              component: React.lazy(
                () =>
                  import(
                    '@/pages/Academics/courseManagement/manageCourses/form/edit'
                  ),
              ),
            },
          ],
        },
        {
          redirect: '/academics/course_management/co_targets/list',
          path: 'co_targets',
          meta: {
            icon: '',
            title: 'CO Targets',
          },
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
                selectLeftMenu: '/academics/course_management/co_targets/',
              },
              component: React.lazy(
                () =>
                  import('@/pages/Academics/courseManagement/coTargets/list'),
              ),
            },
            {
              path: 'view/:year/:program/:className/:semester/:division/:courseId/:id',
              meta: {
                title: 'View',
                selectLeftMenu: '/academics/course_management/co_targets/',
              },
              component: React.lazy(
                () =>
                  import('@/pages/Academics/courseManagement/coTargets/form'),
              ),
            },
            {
              path: 'edit/:year/:program/:className/:semester/:division/:courseId/:id',
              meta: {
                title: 'Update',
                selectLeftMenu: '/academics/course_management/co_targets/',
              },
              component: React.lazy(
                () =>
                  import(
                    '@/pages/Academics/courseManagement/coTargets/form/edit'
                  ),
              ),
            },
          ],
        },
        {
          redirect: '/academics/course_management/course_faculty_linking/list',
          path: 'course_faculty_linking',
          meta: {
            title: 'Course - Faculty Linking',
          },
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
                selectLeftMenu:
                      '/academics/course_management/course_faculty_linking',
              },
              component: React.lazy(
                () =>
                  import(
                    '@/pages/Academics/courseManagement/courseFacultyLinking/list'
                  ),
              ),
            },
            {
              path: 'edit/:id',
              meta: {
                title: 'Update',
                selectLeftMenu:
                      '/academics/course_management/course_faculty_linking',
              },
              component: React.lazy(
                () =>
                  import(
                    '@/pages/Academics/courseManagement/courseFacultyLinking/form/update'
                  ),
              ),
            },
            {
              path: 'add/:ay/:pi/:cl/:sem/:div',
              meta: { 
                title: 'Update',
                selectLeftMenu:
                      '/academics/course_management/course_faculty_linking',
              },
              component: React.lazy(
                () =>
                  import(
                    '@/pages/Academics/courseManagement/courseFacultyLinking/form/add'
                  ),
              ),
            },
            {
              path: 'add/:id',
              meta: { 
                title: 'Update',
                selectLeftMenu:
                      '/academics/course_management/course_faculty_linking',
              },
              component: React.lazy(
                () =>
                  import(
                    '@/pages/Academics/courseManagement/courseFacultyLinking/form/edit'
                  ),
              ),
            },
          
          ],
        },
      ],
    },
    {
      path: 'student_enrollment',
      meta: {
        icon: '',
        title: 'Student Enrollment',
      },

      children: [
        {
          redirect: 'list',
          path: 'studentCourseEnrollment',
          meta: {
            icon: '',
            title: 'Student Course Enrollment',
          },
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
                selectLeftMenu:
                  '/academics/student_enrollment/studentCourseEnrollment',
              },
              component: React.lazy(
                () =>
                  import(
                    '@/pages/Academics/studentEnrollment/studentCourseEnrollment/list'
                  ),
              ),
            },
            // {
            //   path: 'assignStudentToCourse',
            //   meta: {
            //     title: 'List',
            //     selectLeftMenu:
            //       '/academics/student_enrollment/studentCourseEnrollment',
            //   },
            //   component: React.lazy(
            //     () =>
            //       import(
            //         '@/pages/Academics/studentEnrollment/studentCourseEnrollment/assignStudentToCourse/list'
            //       ),
            //   ),
            // },

            {
              path: 'assignStudentToCourse',
              meta: {
                title: 'List',
                selectLeftMenu:
                  '/academics/student_enrollment/studentCourseEnrollment',
              },
              component: React.lazy(
                () =>
                  import(
                    '@/pages/Academics/studentEnrollment/studentCourseEnrollment/assignStudentToCourse/list'
                  ),
              ),
            },

            // {
            //   path: 'reorder',
            //   meta: {
            //     title: 'List',
            //     selectLeftMenu:
            //       '/academics/student_enrollment/studentDivisionEnrollment',
            //   },
            //   component: React.lazy(
            //     () =>
            //       import(
            //         '@/pages/Academics/studentEnrollment/studentDivisionEnrollment/reorder/list'
            //       ),
            //   ),
            // },
          ],
        },
        {
          redirect: 'list',
          path: 'sudentDivisionEnrollment',
          meta: {
            icon: '',
            title: 'Student Division Enrollment',
          },
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
                selectLeftMenu:
                  '/academics/student_enrollment/studentDivisionEnrollment',
              },
              component: React.lazy(
                () =>
                  import(
                    '@/pages/Academics/studentEnrollment/studentDivisionEnrollment'
                  ),
              ),
            },

            {
              path: 'assignStudentDivisionEnrollment',
              meta: {
                title: 'List',
                selectLeftMenu:
                  '/academics/student_enrollment/studentDivisionEnrollment',
              },
              component: React.lazy(
                () =>
                  import(
                    '@/pages/Academics/studentEnrollment/studentDivisionEnrollment/assignStudentDivisionEnrollment/list'
                  ),
              ),
            },

            {
              path: 'reorder',
              meta: {
                title: 'List',
                selectLeftMenu:
                  '/academics/student_enrollment/studentDivisionEnrollment',
              },
              component: React.lazy(
                () =>
                  import(
                    '@/pages/Academics/studentEnrollment/studentDivisionEnrollment/reorder/list'
                  ),
              ),
            },
          ],
        },
      ],
    },
    {
      path: 'evaluation',
      meta: {
        icon: '',
        title: 'Evaluation',
      },

      children: [
        {
          redirect: 'list',
          path: 'toolCoBlPiLinking',
          meta: {
            icon: '',
            title: 'Tool - CO & BL Linking',
          },
          childrenHidden: true,
          children: [
            {
              path: 'list',
              meta: {
                title: 'List',
                selectLeftMenu: '/academics/evaluation/toolCoBlPiLinking',
              },
              component: React.lazy(
                () =>
                  import('@/pages/Academics/evaluation/toolCoBlPiLinking/list'),
              ),
            },
          ],
        },
      ],
    },
  ],
};
export default routeAcademics;

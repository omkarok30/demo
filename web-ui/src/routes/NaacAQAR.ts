import { lazy } from 'react';
import { IRouter } from '@/@types/router.d';

const naacAQAR: IRouter = {
  path: '/NAAC/aqar',
  meta: {
    icon: 'detail',
    title: 'NAAC AQAR',
    roles: ['NAAC AQAR'],
  },

  children: [
    {
      path: 'extendedFile',
      meta: {
        icon: '',
        title: 'Extended Profile',
        selectLeftMenu: '/extendedFile',
      },
      children: [
        {
          path: 'program',
          meta: {
            title: 'Program',
          },
          children: [
            {
              path: 'NameOfCourses',
              redirect: '/NAAC/aqar/extendedFile/program/NameOfCourses/list',
              meta: {
                title: '1.1',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'list',
                    selectLeftMenu: '/NAAC/aqar/extendedFile/program/NameOfCourses',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/ExtendedProfile/program1/list')),
                },
                {
                  path: 'editCourse',
                  meta: {
                    title: 'editCourse',
                    selectLeftMenu: '/NAAC/aqar/extendedFile/program/NameOfCourses',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/ExtendedProfile/program1/form/edit')),
                },
              ],
            },
            {
              path: 'NumberOfProgram',
              redirect: '/NAAC/aqar/extendedFile/program/NumberOfProgram/list',
              meta: {
                title: '1.2',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'list',
                    selectLeftMenu: '/NAAC/aqar/extendedFile/program/NumberOfProgram',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/ExtendedProfile/program12/list')),
                },
              ],
            },
          ],
        },
        {
          path: 'student',
          meta: {
            title: 'Student',
          },
          children: [
            {
              path: 'ExtendedStud',
              redirect: '/NAAC/aqar/extendedFile/student/ExtendedStud/list',
              meta: {
                title: '2.1',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'list',
                    selectLeftMenu: '/NAAC/aqar/extendedFile/student/ExtendedStud',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/ExtendedProfile/students/students_2_1/list')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'edit',
                    selectLeftMenu: '/NAAC/aqar/extendedFile/student/ExtendedStud',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/ExtendedProfile/students/students_2_1/form/edit')),
                },
              ],
            },
            {
              path: 'NumberOfSeat',
              redirect: '/NAAC/aqar/extendedFile/student/NumberOfSeat/list',
              meta: {
                title: '2.2',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'list',
                    selectLeftMenu: '/NAAC/aqar/extendedFile/student/NumberOfSeat',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/ExtendedProfile/students/students_2_2/list')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'edit',
                    selectLeftMenu: '/NAAC/aqar/extendedFile/student/NumberOfSeat',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/ExtendedProfile/students/students_2_2/form/edit')),
                },
              ],
            },
            {
              path: 'FinalYearStudents',
              redirect: '/NAAC/aqar/extendedFile/student/FinalYearStudents/list',
              meta: {
                title: '2.3',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'list',
                    selectLeftMenu: '/NAAC/aqar/extendedFile/student/FinalYearStudents',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/ExtendedProfile/students/students_2_3/list')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'edit',
                    selectLeftMenu: '/NAAC/aqar/extendedFile/student/FinalYearStudents',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/ExtendedProfile/students/students_2_3/form/edit')),
                },
              ],
            },
          ],
        },
        {
          path: 'Academic',
          meta: {
            title: 'Academic',
          },
          children: [
            {
              path: 'FullTimeTeachers',
              redirect: '/NAAC/aqar/extendedFile/Academic/FullTimeTeachers/list',
              meta: {
                title: '3.1',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'list',
                    selectLeftMenu: '/NAAC/aqar/extendedFile/Academic/FullTimeTeachers',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/ExtendedProfile/academic/academic3_1/list')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'edit',
                    selectLeftMenu: '/NAAC/aqar/extendedFile/Academic/FullTimeTeachers',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/ExtendedProfile/academic/academic3_1/form/edit')),
                },
              ],
            },
            {
              path: 'NumberOfpost',
              redirect: '/NAAC/aqar/extendedFile/Academic/NumberOfpost/list',
              meta: {
                title: '3.2',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'list',
                    selectLeftMenu: '/NAAC/aqar/extendedFile/Academic/NumberOfpost',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/ExtendedProfile/academic/academic3_2/list')),
                },
              ],
            },
          ],
        },
        {
          path: 'InstitutionController',
          redirect: '/NAAC/aqar/extendedFile/InstitutionController/list',
          meta: {
            title: 'Institution',
            selectLeftMenu: '/NAAC/aqar/extendedFile/InstitutionController',
          },
          component: lazy(() => import('@/pages/NAAC/AQAR/ExtendedProfile/institution/list')),
        },
      ],
    },
    {
      path: 'criteria1',
      meta: {
        icon: '',
        title: 'Criteria 1',
      },
      children: [
        {
          path: '1.1',
          redirect: '/NAAC/aqar/criteria1/1.1/1.1.1',
          meta: {
            icon: '',
            title: '1.1',
          },
          children: [
            {
              path: '1.1.1',
              meta: {
                icon: 'set',
                title: '1.1.1',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria1/criteria1.1.1')),
            },
            {
              path: '1.1.2',
              meta: {
                icon: 'set',
                title: '1.1.2',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria1/criteria1.1.2')),
            },
          ],
        },
        {
          path: '1.2',
          meta: {
            icon: '',
            title: '1.2',
          },
          children: [
            {
              path: '1.2.1',
              redirect: '/NAAC/aqar/criteria1/1.2/1.2.1/yearWiseData',
              meta: {
                icon: 'set',
                title: '1.2.1',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'yearWiseData',
                  meta: {
                    icon: 'set',
                    title: '1.2.1',
                    selectLeftMenu: '/NAAC/aqar/criteria1/1.2/1.2.1',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria1/criteria1.2.1/yearWiseData')),
                },
                {
                  path: 'programDetails',
                  meta: {
                    title: '1.2.1',
                    selectLeftMenu: '/NAAC/aqar/criteria1/1.2/1.2.1',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria1/criteria1.2.1/programDetails')),
                },
              ],
            },
          ],
        },
        {
          path: '1.3',
          redirect: '/NAAC/aqar/criteria1/1.3/1.3.1',
          meta: {
            icon: '',
            title: '1.3',
          },
          children: [
            {
              path: '1.3.1',
              meta: {
                icon: 'set',
                title: '1.3.1',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria1/criteria1.3.1')),
            },
          ],
        },
      ],
    },
    {
      path: 'criteria2',
      meta: {
        icon: '',
        title: 'Criteria 2',
      },
      children: [
        {
          path: '2.2',
          redirect: '/NAAC/aqar/criteria2/2.2/2.2.1',
          meta: {
            icon: '',
            title: '2.2',
          },
          children: [
            {
              path: '2.2.1',
              meta: {
                icon: 'set',
                title: '2.2.1',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria2/criteria2.2.1')),
            },
          ],
        },
        {
          path: '2.3',
          redirect: '/NAAC/aqar/criteria2/2.3/2.3.1',
          meta: {
            icon: '',
            title: '2.3',
          },
          children: [
            {
              path: '2.3.1',
              meta: {
                icon: 'set',
                title: '2.3.1',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria2/criteria2.3.1')),
            },
            {
              path: '2.3.2',
              meta: {
                icon: 'set',
                title: '2.3.2',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria2/criteria2.3.2')),
            },
          ],
        },
        {
          path: '2.5',
          redirect: '/NAAC/aqar/criteria2/2.5/2.3.1',
          meta: {
            icon: '',
            title: '2.5',
          },
          children: [
            {
              path: '2.5.1',
              meta: {
                icon: 'set',
                title: '2.5.1',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria2/criteria2.5.1')),
            },
            {
              path: '2.5.2',
              meta: {
                icon: 'set',
                title: '2.5.2',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria2/criteria2.5.2')),
            },
          ],
        },
        {
          path: '2.6',
          redirect: '/NAAC/aqar/criteria2/2.6/2.6.1',
          meta: {
            icon: '',
            title: '2.6',
          },
          children: [
            {
              path: '2.6.1',
              meta: {
                icon: 'set',
                title: '2.6.1',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria2/criteria2.6.1')),
            },
            {
              path: '2.6.2',
              meta: {
                icon: 'set',
                title: '2.6.2',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria2/criteria2.6.2')),
            },
          ],
        },
        {
          path: '2.7',
          redirect: '/NAAC/aqar/criteria2/2.7/2.7.1',
          meta: {
            icon: '',
            title: '2.7',
          },
          children: [
            {
              path: '2.7.1',
              meta: {
                icon: 'set',
                title: '2.7.1',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria2/criteria2.7.1')),
            },
          ],
        },
      ],
    },
    {
      path: 'criteria3',
      meta: {
        icon: '',
        title: 'Criteria 3',
      },
      children: [
        {
          path: '3.2',
          redirect: '/NAAC/aqar/criteria1/3.2/3.2.1',
          meta: {
            icon: '',
            title: '3.2',
          },
          children: [
            {
              path: '3.2.1',
              meta: {
                icon: 'set',
                title: '3.2.1',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria3/criteria3.2.1')),
            },
          ],
        },
        {
          path: '3.4',
          redirect: '/NAAC/aqar/criteria1/3.4/3.4.1',
          meta: {
            icon: '',
            title: '3.4',
          },
          children: [
            {
              path: '3.4.1',
              meta: {
                icon: 'set',
                title: '3.4.1',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria3/criteria3.4.1')),
            },
          ],

        },
      ],
    },
    {
      path: 'criteria4',
      meta: {
        icon: '',
        title: 'Criteria 4',
      },
      children: [
        {
          path: '4.1',
          redirect: '/NAAC/aqar/criteria1/1.1/4.1.1',
          meta: {
            icon: '',
            title: '4.1',
          },
          children: [
            {
              path: '4.1.1',
              meta: {
                icon: 'set',
                title: '4.1.1',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria4/criteria4.1.1')),
            },
            {
              path: '4.1.2',
              meta: {
                icon: 'set',
                title: '4.1.2',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria4/criteria4.1.2')),
            },

          ],
        },
        {
          path: '4.2',
          redirect: '/NAAC/aqar/criteria4/4.2/4.2.1',
          meta: {
            icon: '',
            title: '4.2',
          },
          children: [
            {
              path: '4.2.1',
              meta: {
                icon: 'set',
                title: '4.2.1',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria4/criteria4.2.1')),
            },
          ],
        },
        {
          path: '4.3',
          redirect: '/NAAC/aqar/criteria4/4.3/4.3.1',
          meta: {
            icon: '',
            title: '4.3',
          },
          children: [
            {
              path: '4.3.1',
              meta: {
                icon: 'set',
                title: '4.3.1',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria4/criteria4.3.1')),
            },
          ],
        },
        {
          path: '4.4',
          redirect: '/NAAC/aqar/criteria4/4.3/4.4.2',
          meta: {
            icon: '',
            title: '4.4',
          },
          children: [
            {
              path: '4.4.2',
              meta: {
                icon: 'set',
                title: '4.4.2',
              },
              component: lazy(() => import('@/pages/NAAC/AQAR/criteria4/criteria4.4.2')),
            },
          ],
        },
      ],
    },

    {
      path: 'criteria5',
      meta: {
        icon: '',
        title: 'Criteria 5',
      },
      children: [
        {
          path: '5.1',
          meta: {
            title: '5.1',
          },
          children: [
            {
              path: 'Government',
              redirect: '/NAAC/aqar/criteria5/5.1/Government/list',
              meta: {
                title: '5.1.1',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'List',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.1/Government',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5/criteria5_1_1/list')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'Edit',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.1/Government',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5/criteria5_1_1/form/edit')),
                }, {
                  path: 'studentsList',
                  meta: {
                    title: 'Students List',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.1/Government',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5/criteria5_1_1/form/studentsList')),
                },
              ],
            },
            {
              path: 'NonGovernment',
              redirect: '/NAAC/aqar/criteria5/5.1/NonGovernment/list',
              meta: {
                title: '5.1.2',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'List',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.1/NonGovernment',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5/criteria5_1_2/list')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'Edit',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.1/NonGovernment',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5/criteria5_1_2/form/edit')),
                }, {
                  path: 'studentsList',
                  meta: {
                    title: 'Students List',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.1/NonGovernment',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5/criteria5_1_2/form/studentsList')),
                },
              ],
            },
            {
              path: 'CapacityBuilding',
              meta: {
                title: '5.1.3',
              },
              redirect: '/NAAC/aqar/criteria5/5.1/CapacityBuilding/list',
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'List',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.1/CapacityBuilding',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5/criteria5_1_3')),
                },
                {
                  path: 'edit/ChoiceBasedSystem/',
                  redirect: '/NAAC/aqar/criteria5/5.1/capacityBuilding',
                  meta: {
                    title: 'Edit ChoiceBased System',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.1/CapacityBuilding',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5/criteria5_1_3/capacityBuilding')),
                },
                {
                  path: 'edit/NewAnswer/',
                  redirect: '/NAAC/aqar/criteria5/5.1/skillsEnhancement/form/edit',
                  meta: {
                    title: 'Edit NewAnswer',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.1/CapacityBuilding',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5/criteria5_1_3/skillsEnhancement/form/edit')),
                },
              ],
            },
            {
              path: 'CompitativeExaminations',
              meta: {
                title: '5.1.4',
              },
              redirect: '/NAAC/aqar/criteria5/5.1/CompitativeExaminations/list',
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'List',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.1/CompitativeExaminations',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5/criteria5_1_4/list')),
                },
                {
                  path: 'edit',
                  redirect: '/NAAC/aqar/criteria5/5.1/CompitativeExam/editSystem',
                  meta: {
                    title: 'Edit System',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.1/CompitativeExaminations',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5/criteria5_1_4/form/editSystem')),
                  childrenHidden: true,
                },
                {
                  path: 'StudentInfo',
                  redirect: '/NAAC/aqar/criteria5/5.1/CompitativeExam/StudentInfo',
                  meta: {
                    title: 'Student Information',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.1/CompitativeExaminations',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5/criteria5_1_4/form/StudentsInfomation')),
                },
                {
                  path: 'CompitativeExam/editIndividually/',
                  redirect: '/NAAC/aqar/criteria5/CompitativeExam/editIndividually/',
                  meta: {
                    title: 'Edit System Indivisual',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.1/CompitativeExaminations',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5/criteria5_1_4/form/editIndividually')),
                },
              ],
            },
            {
              path: 'StudentGrievances',
              meta: {
                title: '5.1.5',
              },
              redirect: '/NAAC/aqar/criteria5/5.1/StudentGrievances/list',
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'list',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.1/StudentGrievances',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5/criteria5_1_5')),
                },
                {
                  path: 'edit',
                  redirect: '/NAAC/aqar/criteria5/5.1/StudentGrievances',
                  meta: {
                    title: 'Edit NewAnswer',
                    selectLeftMenu: '/NAAC/aqar/criteria5/StudentGrievances',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5/criteria5_1_5/StudentGrievances/form/edit')),
                },
              ],
            },
          ],
        },
        {
          path: '5.2',
          meta: {
            title: '5.2',
          },
          children: [
            {
              path: 'Placement',
              redirect: '/NAAC/aqar/criteria5/5.2/Placement/list',
              meta: {
                title: '5.2.1',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'List',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.2/Placement',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5_2/criteria5_2_1/list')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'Edit',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.2/Placement',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5_2/criteria5_2_1/form/edit')),
                },
                {
                  path: 'editIndividual',
                  meta: {
                    title: 'Edit Individual',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.2/Placement',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5_2/criteria5_2_1/form/studentsList')),
                },
                {
                  path: 'addRecord',
                  meta: {
                    title: 'Add CBCS RECORD',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.2/Placement',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5_2/criteria5_2_1/form/addCBCSRecord')),
                },
              ],
            },
            {
              path: 'Progression',
              redirect: '/NAAC/aqar/criteria5/5.2/Progression/list',
              meta: {
                title: '5.2.2',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'List',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.2/Progression',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5_2/criteria5_2_2/list')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'Edit',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.2/Progression',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5_2/criteria5_2_2/form/edit')),
                },
                {
                  path: 'editIndividual',
                  meta: {
                    title: 'Edit Individual',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.2/Progression',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5_2/criteria5_2_2/form/studentsList')),
                },
                {
                  path: 'addRecord',
                  meta: {
                    title: 'Add CBCS RECORD',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.2/Progression',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5_2/criteria5_2_2/form/addCBCSRecord')),
                },
              ],
            },
            {
              path: 'NationalInternationalExam',
              redirect: '/NAAC/aqar/criteria5/5.2/NationalInternationalExam/list',
              meta: {
                title: '5.2.3',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'List',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.2/NationalInternationalExam',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5_2/criteria5_2_3/list')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'Edit',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.2/NationalInternationalExam',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5_2/criteria5_2_3/form/edit')),
                },
                {
                  path: 'editIndividual',
                  meta: {
                    title: 'Edit Individual',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.2/NationalInternationalExam',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5_2/criteria5_2_3/form/studentsList')),
                },
                {
                  path: 'addRecord',
                  meta: {
                    title: 'Add CBCS RECORD',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.2/NationalInternationalExam',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5_2/criteria5_2_3/form/addCBCSRecord')),
                },
              ],
            },
          ],
        },
        {
          path: '5.3',
          meta: {
            title: '5.3',
          },
          children: [
            {
              path: 'AwardsMedals',
              redirect: '/NAAC/aqar/criteria5/5.3/AwardsMedals/list',
              meta: {
                title: '5.3.1',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'List',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.3/AwardsMedals',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5_3/criteria5_3_1/list')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'Edit',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.3/AwardsMedals',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5_3/criteria5_3_1/form/edit')),
                },
              ],
            },
            {
              path: 'StudentRepresentation',
              redirect: '/NAAC/aqar/criteria5/5.3/StudentRepresentation/list',
              meta: {
                title: '5.3.2',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'List',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.3/StudentRepresentation',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5_3/criteria5_3_2')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'Edit',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.3/StudentRepresentation',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5_2/criteria5_2_1/form/edit')),
                },
              ],
            },
            {
              path: 'AverageSC',
              redirect: '/NAAC/aqar/criteria5/5.3/AverageSC/list',
              meta: {
                title: '5.3.3',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'List',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.3/AverageSC',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5_3/criteria5_3_3/list')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'Edit',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.3/AverageSC',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5_3/criteria5_3_3/form/edit')),
                },
              ],
            },
          ],
        },
        {
          path: '5.4',
          meta: {
            title: '5.4',
          },
          children: [
            {
              path: 'AlumniAssociation',
              redirect: '/NAAC/aqar/criteria5/5.4/AlumniAssociation/list',
              meta: {
                title: '5.4.1',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'List',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.4/AlumniAssociation',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5_4/criteria5_4_1')),
                },
              ],
            },
            {
              path: 'AlumniContribution',
              redirect: '/NAAC/aqar/criteria5/5.4/AlumniContribution/list',
              meta: {
                title: '5.4.2',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'List',
                    selectLeftMenu: '/NAAC/aqar/criteria5/5.4/AlumniContribution',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria5_4/criteria5_4_2/list')),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: 'criteria6',
      meta: {
        icon: '',
        title: 'Criteria 6',
      },
      children: [
        {
          path: '6.1',
          meta: {
            title: '6.1',
          },
          children: [
            {
              path: 'InstVM',
              redirect: '/NAAC/aqar/criteria6/6.1/InstVM/addInstVM',
              meta: {
                title: '6.1.1',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'addInstVM',
                  meta: {
                    title: 'addInstVM',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.1/InstVM',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_1/criteria6_1_1')),
                },
              ],
            },
            {
              path: 'EffectiveLeader',
              redirect: '/NAAC/aqar/criteria6/6.1/EffectiveLeader/addEffectiveLeader',
              meta: {
                title: '6.1.2',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'addEffectiveLeader',
                  meta: {
                    title: 'addEffectiveLeader',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.1/EffectiveLeader',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_1/criteria6_1_2')),
                },
              ],
            },
          ],
        },
        {
          path: '6.2',
          meta: {
            title: '6.2',
          },
          children: [
            {
              path: 'Plan',
              redirect: '/NAAC/aqar/criteria6/6.2/Plan/addPlan',
              meta: {
                title: '6.2.1',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'addPlan',
                  meta: {
                    title: 'addPlan',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.2/Plan',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_2/criteria6_2_1')),
                },
              ],
            },
            {
              path: 'Functioning',
              redirect: '/NAAC/aqar/criteria6/6.2/Functioning/addFunctioning',
              meta: {
                title: '6.2.2',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'addFunctioning',
                  meta: {
                    title: 'addFunctioning',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.2/Functioning',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_2/criteria6_2_2')),
                },
              ],
            },
            {
              path: 'Egovernance',
              redirect: '/NAAC/aqar/criteria6/6.2/Egovernance/list',
              meta: {
                title: '6.2.3',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'list',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.2/Egovernance',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_2/criteria6_2_3/list')),
                },
                {
                  path: 'editArea',
                  meta: {
                    title: 'editArea',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.2/Egovernance',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_2/criteria6_2_3/form/edit')),
                },
                {
                  path: 'newYearWisePage',
                  meta: {
                    title: 'newYearWisePage',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.2/Egovernance',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_2/criteria6_2_3/form/areaEgovernance')),
                },
                {
                  path: 'editdetails',
                  meta: {
                    title: 'editdetails',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.2/Egovernance',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_2/criteria6_2_3/form/editAreaGovernance')),
                },
              ],
            },
          ],
        },
        {
          path: '6.3',
          meta: {
            title: '6.3',
          },
          children: [
            {
              path: 'WelfareMeasures',
              redirect: '/NAAC/aqar/criteria6/6.3/WelfareMeasures/addfile',
              meta: {
                title: '6.3.1',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'addfile',
                  meta: {
                    title: 'addfile',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.3/WelfareMeasures',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_3/criteria6_3_1')),
                },
              ],
            },
            {
              path: 'FInancialReport',
              redirect: '/NAAC/aqar/criteria6/6.3/FInancialReport/list',
              meta: {
                title: '6.3.2',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'list',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.3/FInancialReport',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_3/criteria6_3_2/list')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'Edit',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.3/FInancialReport',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_3/criteria6_3_2/form/edit')),
                },
              ],
            },
            {
              path: 'Professional',
              redirect: '/NAAC/aqar/criteria6/6.3/Professional/list',
              meta: {
                title: '6.3.3',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'list',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.3/Professional',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_3/criteria6_3_3/list')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'Edit',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.3/Professional',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_3/criteria6_3_3/form/edit')),
                },
                {
                  path: 'editIndividual',
                  meta: {
                    title: 'Edit Individual',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.3/Professional',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_3/criteria6_3_3/form/editStaffList')),
                },
                {
                  path: 'addRecord',
                  meta: {
                    title: 'Add CBCS RECORD',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.3/Professional',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_3/criteria6_3_3/form/addCBCSRecord')),
                },
              ],
            },
            {
              path: 'AveragePercentageOfTeacher',
              redirect: '/NAAC/aqar/criteria6/6.3/AveragePercentageOfTeacher/list',
              meta: {
                title: '6.3.4',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'list',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.3/AveragePercentageOfTeacher',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_3/criteria6_3_4/list')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'Edit',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.3/AveragePercentageOfTeacher',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_3/criteria6_3_4/form/edit')),
                },
              ],
            },
            {
              path: 'AppraisalSystem',
              redirect: '/NAAC/aqar/criteria6/6.3/AppraisalSystem/addAppraisalSystem',
              meta: {
                title: '6.3.5',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'addAppraisalSystem',
                  meta: {
                    title: 'addAppraisalSystem',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.3/AppraisalSystem',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_3/criteria6_3_5')),
                },
              ],
            },
          ],
        },
        {
          path: '6.4',
          meta: {
            title: '6.4',
          },
          children: [
            {
              path: 'FinancialAudit',
              redirect: '/NAAC/aqar/criteria6/6.4/FinancialAudit/addFinancialAudit',
              meta: {
                title: '6.4.1',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'addFinancialAudit',
                  meta: {
                    title: 'addFinancialAudit',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.4/FinancialAudit',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_4/criteria6_4_1')),
                },
              ],
            },
            {
              path: 'FundsGrants',
              redirect: '/NAAC/aqar/criteria6/6.4/FundsGrants/list',
              meta: {
                title: '6.4.2',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'list',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.4/FundsGrants',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_4/criteria6_4_2/list')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'Edit',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.4/FundsGrants',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_4/criteria6_4_2/form/edit')),
                },
                {
                  path: 'editIndividual',
                  meta: {
                    title: 'Edit Individual',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.4/FundsGrants',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_4/criteria6_4_2/form/editFundsList')),
                },
                {
                  path: 'addRecord',
                  meta: {
                    title: 'Add CBCS RECORD',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.4/FundsGrants',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_4/criteria6_4_2/form/addCBCSRecord')),
                },
              ],
            },
            {
              path: 'InstitutionalStrategies',
              redirect: '/NAAC/aqar/criteria6/6.4/InstitutionalStrategies/addInstitutionalStrategies',
              meta: {
                title: '6.4.3',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'addInstitutionalStrategies',
                  meta: {
                    title: 'addInstitutionalStrategies',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.4/InstitutionalStrategies',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_4/criteria6_4_3')),
                },
              ],
            },
          ],
        },
        {
          path: '6.5',
          meta: {
            title: '6.5',
          },
          children: [
            {
              path: 'IQAC',
              redirect: '/NAAC/aqar/criteria6/6.5/IQAC/addIQAC',
              meta: {
                title: '6.5.1',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'addIQAC',
                  meta: {
                    title: 'addIQAC',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.5/IQAC',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_5/criteria6_5_1')),
                },
              ],
            },
            {
              path: 'InstitutionReviewsIQAC',
              redirect: '/NAAC/aqar/criteria6/6.5/InstitutionReviewsIQAC/addInstitutionReviewsIQAC',
              meta: {
                title: '6.5.2',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'addInstitutionReviewsIQAC',
                  meta: {
                    title: 'addInstitutionReviewsIQAC',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.5/InstitutionReviewsIQAC',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_5/criteria6_5_2')),
                },
              ],
            },
            {
              path: 'Quality',
              redirect: '/NAAC/aqar/criteria6/6.5/Quality/list',
              meta: {
                title: '6.5.3',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'list',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.5/Quality',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_5/criteria6_5_3/list')),
                },
                {
                  path: 'editQuality',
                  meta: {
                    title: 'editQuality',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.5/Quality',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_5/criteria6_5_3/form/edit')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'edit',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.5/Quality',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_5/criteria6_5_3/form/editInternalQuality')),
                },
                {
                  path: 'editIndividually',
                  meta: {
                    title: 'editIndividually',
                    selectLeftMenu: '/NAAC/aqar/criteria6/6.5/Quality',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria6/criteria6_5/criteria6_5_3/form/editIndividually')),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: 'criteria7',
      meta: {
        icon: '',
        title: 'Criteria 7',
      },
      children: [
        {
          path: '7.1',
          meta: {
            title: '7.1',
          },
          children: [
            {
              path: 'MeasuresInitiated',
              redirect: '/NAAC/aqar/criteria7/7.1/MeasuresInitiated/addMeasuresInitiated',
              meta: {
                title: '7.1.1',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'addMeasuresInitiated',
                  meta: {
                    title: 'addMeasuresInitiated',
                    selectLeftMenu: '/NAAC/aqar/criteria7/7.1/MeasuresInitiated',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria7/criteria7_1/criteria7_1_1')),
                },
              ],
            },
            {
              path: 'InstitutionFacilities',
              redirect: '/NAAC/aqar/criteria7/7.1/InstitutionFacilities/list',
              meta: {
                title: '7.1.2',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'list',
                    selectLeftMenu: '/NAAC/aqar/criteria7/7.1/InstitutionFacilities',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria7/criteria7_1/criteria7_1_2')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'edit',
                    selectLeftMenu: '/NAAC/aqar/criteria7/7.1/InstitutionFacilities',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria7/criteria7_1/criteria7_1_2/InstitutionFacilities/form/edit')),
                },
              ],
            },
            {
              path: 'Facilities',
              redirect: '/NAAC/aqar/criteria7/7.1/Facilities/addFacilities',
              meta: {
                title: '7.1.3',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'addFacilities',
                  meta: {
                    title: 'addFacilities',
                    selectLeftMenu: '/NAAC/aqar/criteria7/7.1/Facilities',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria7/criteria7_1/criteria7_1_3')),
                },
              ],
            },
            {
              path: 'Waterconservation',
              redirect: '/NAAC/aqar/criteria7/7.1/Waterconservation/list',
              meta: {
                title: '7.1.4',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'list',
                    selectLeftMenu: '/NAAC/aqar/criteria7/7.1/Waterconservation',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria7/criteria7_1/criteria7_1_4/list')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'edit',
                    selectLeftMenu: '/NAAC/aqar/criteria7/7.1/Waterconservation',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria7/criteria7_1/criteria7_1_4/form/edit')),
                },
              ],
            },
            {
              path: 'Campus',
              redirect: '/NAAC/aqar/criteria7/7.1/Campus/list',
              meta: {
                title: '7.1.5',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'list',
                    selectLeftMenu: '/NAAC/aqar/criteria7/7.1/Campus',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria7/criteria7_1/criteria7_1_5/list')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'edit',
                    selectLeftMenu: '/NAAC/aqar/criteria7/7.1/Campus',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria7/criteria7_1/criteria7_1_5/form/edit')),
                },
              ],
            },
            {
              path: 'Friendly',
              redirect: '/NAAC/aqar/criteria7/7.1/Friendly/list',
              meta: {
                title: '7.1.6',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'list',
                    selectLeftMenu: '/NAAC/aqar/criteria7/7.1/Friendly',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria7/criteria7_1/criteria7_1_6/list')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'edit',
                    selectLeftMenu: '/NAAC/aqar/criteria7/7.1/Friendly',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria7/criteria7_1/criteria7_1_6/form/edit')),
                },
              ],
            },
            {
              path: 'Energy',
              redirect: '/NAAC/aqar/criteria7/7.1/Energy/list',
              meta: {
                title: '7.1.7',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'list',
                    selectLeftMenu: '/NAAC/aqar/criteria7/7.1/Energy',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria7/criteria7_1/criteria7_1_7/list')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'edit',
                    selectLeftMenu: '/NAAC/aqar/criteria7/7.1/Energy',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria7/criteria7_1/criteria7_1_7/form/edit')),
                },
              ],
            },
            {
              path: 'Environment',
              redirect: '/NAAC/aqar/criteria7/7.1/Environment/addEnvironment',
              meta: {
                title: '7.1.8',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'addEnvironment',
                  meta: {
                    title: 'addEnvironment',
                    selectLeftMenu: '/NAAC/aqar/criteria7/7.1/Environment',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria7/criteria7_1/criteria7_1_8')),
                },
              ],
            },
            {
              path: 'Sensitization',
              redirect: '/NAAC/aqar/criteria7/7.1/Sensitization/addSensitization',
              meta: {
                title: '7.1.9',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'addSensitization',
                  meta: {
                    title: 'addSensitization',
                    selectLeftMenu: '/NAAC/aqar/criteria7/7.1/Sensitization',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria7/criteria7_1/criteria7_1_9')),
                },
              ],
            },
            {
              path: 'Codeofconduct',
              redirect: '/NAAC/aqar/criteria7/7.1/Codeofconduct/list',
              meta: {
                title: '7.1.10',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'list',
                  meta: {
                    title: 'list',
                    selectLeftMenu: '/NAAC/aqar/criteria7/7.1/Codeofconduct',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria7/criteria7_1/criteria7_1_10/list')),
                },
                {
                  path: 'edit',
                  meta: {
                    title: 'edit',
                    selectLeftMenu: '/NAAC/aqar/criteria7/7.1/Codeofconduct',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria7/criteria7_1/criteria7_1_10/form/edit')),
                },
              ],
            },
            {
              path: 'Days',
              redirect: '/NAAC/aqar/criteria7/7.1/Days/addDays',
              meta: {
                title: '7.1.11',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'addDays',
                  meta: {
                    title: 'addDays',
                    selectLeftMenu: '/NAAC/aqar/criteria7/7.1/Days',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria7/criteria7_1/criteria7_1_11')),
                },
              ],
            },
          ],
        },
        {
          path: '7.2',
          meta: {
            title: '7.2',
          },
          children: [
            {
              path: 'NAACFormat',
              redirect: '/NAAC/aqar/criteria7/7.2/NAACFormat/addNAACFormat',
              meta: {
                title: '7.2.1',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'addNAACFormat',
                  meta: {
                    title: 'addNAACFormat',
                    selectLeftMenu: '/NAAC/aqar/criteria7/7.2/NAACFormat',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria7/criteria7_2/criteria7_2_1')),
                },
              ],
            },
          ],
        },
        {
          path: '7.3',
          meta: {
            title: '7.3',
          },
          children: [
            {
              path: 'Portray',
              redirect: '/NAAC/aqar/criteria7/7.3/Portray/addPortray',
              meta: {
                title: '7.3.1',
              },
              childrenHidden: true,
              children: [
                {
                  path: 'addPortray',
                  meta: {
                    title: 'addPortray',
                    selectLeftMenu: '/NAAC/aqar/criteria7/7.3/Portray',
                  },
                  component: lazy(() => import('@/pages/NAAC/AQAR/criteria7/criteria7_3/criteria7_3_1')),
                },
              ],
            },
          ],
        },
      ],
    },

  ],

};
export default naacAQAR;

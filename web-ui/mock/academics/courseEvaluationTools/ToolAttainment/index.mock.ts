import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';

const data = [
  {
    id: "1",
    toolId: "1",
    academicYear: 2021,
    programId: "1",
    targetPer1: "20",
    targetPer2: "03",
    targetPer3: "40",
    tools_repository$toolName: 'ESE',
    tools_repository$toolType: 'external',
    tools_repository$toolAssessment: 'direct',
    tools_repository$toolDependency: 'independent',
    tools_repository$dependentToolIds:'',
  },
  {
    id: "2",
    toolId: "2",
    academicYear: 2020,
    programId: "1",
    targetPer1: "20",
    targetPer2: "30",
    targetPer3: "60",
    tools_repository$toolName: 'ISE-1',
    tools_repository$toolType: 'internal',
    tools_repository$toolAssessment: 'question-wise',
    tools_repository$toolDependency: 'independent',
    tools_repository$dependentToolIds:'',



  },
  {
    id: "3",
    toolId: "3",
    academicYear: 2022,
    programId: "2",
    targetPer1: "30",
    targetPer2: "40",
    targetPer3: "20",
    tools_repository$toolName: 'ISE',
    tools_repository$toolType: 'internal',
    tools_repository$toolAssessment: 'question-wise',
    tools_repository$toolDependency: 'dependent',
    tools_repository$dependentToolIds:[1],


  },
  {
    id: "4",
    toolId: "2",
    academicYear: 2022,
    programId: "4",
    targetPer1: "40",
    targetPer2: "50",
    targetPer3: "60",
    tools_repository$toolName: 'ISE-2',
    tools_repository$toolType: 'internal',
    tools_repository$toolAssessment: 'question-wise',
    tools_repository$toolDependency: 'dependent',
    tools_repository$dependentToolIds:[1,2]

  },
];

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/academics/course_evaluation_tools/tool_attainment_level/list',
    method: 'GET',
    body() {
      return {
        code: 200,
        data: {
          total: data.length,
          records: data,
        }
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/academics/course_evaluation_tools/tool_attainment_level/get/:id?',
    method: 'GET',
    body({ params }) {
      const rec = _.find(data, { id: params.id });
      return {
        code: 200,
        data: {
          total: size(rec),
          records: rec,
        },
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);

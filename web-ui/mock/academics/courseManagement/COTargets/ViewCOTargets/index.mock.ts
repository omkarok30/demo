import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';


const responseData=[
    {
      id: 2,
      coTargetId: 1,
      coCode: "C011-18.1",
      toolId: "1",
      coValue: 2,
      tools_repository$toolName: "ISE-2",
      tools_repository$toolType: "internal",
    },
    {
      id: 2,
      coTargetId: 1,
      coCode: "C011-18.2",
      toolId: "1",
      coValue: 1,
      tools_repository$toolName: "ISE-2",
      tools_repository$toolType: "internal",
    },
    {
      id: 2,
      coTargetId: 1,
      coCode: "C011-18.1",
      toolId: "2",
      coValue: 2,
      tools_repository$toolName: "ISE-3",
      tools_repository$toolType: "internal",
    },
    {
      id: 2,
      coTargetId: 1,
      coCode: "C011-18.2",
      toolId: "2",
      coValue: 1,
      tools_repository$toolName: "ISE-3",
      tools_repository$toolType: "internal",
    },
    {
      id: 2,
      coTargetId: 1,
      coCode: "C011-18.3",
      toolId: "1",
      coValue: 2,
      tools_repository$toolName: "ISE-2",
      tools_repository$toolType: "external",
    },
    {
      id: 2,
      coTargetId: 1,
      coCode: "C011-18.4",
      toolId: "1",
      coValue: 3,
      tools_repository$toolName: "ISE-2",
      tools_repository$toolType: "external",
    },
  ];

  const mockMethods = [
    {
        url: '/:api?/:tenant?/v1/academics/course_management/co_targets/view',
        method: 'GET',
        body() {
            return {
                code: 200,
                data: {
                    total: responseData.length,
                    records: responseData,
                }
            };
        },
    },
     {
        url: '/:api?/:tenant?/v1/academics/course_management/co_targets/view',
        method: 'GET',
        body({params}) {
            return {
                code: 200,
                data: {
                    total: responseData.length,
                    records: responseData,
                }
            };
        },
    },
]as MockOptions;

export default defineMock(mockMethods);
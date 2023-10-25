import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';

const responseData =[{
"id":"1",
"courseId":1,
"degreeLevel":"ug",
"departmentId":2,
"academicYear":2020,
"className":"second",
"division":1,
"programmeId":2,
"semester":1,
"courses$name":"ABC",
"courses$code":"THIS IS THE COURSE",
"coTargetInValue":  [{tool_id: "2", co_id: "C011-18.1" , value: 2 }, {tool_id: "2", co_id: "C011-18.2" , value: 3 },{tool_id: "4", co_id: "C011-18.1" , value: 1 }, {tool_id: "4", co_id: "C011-18.2" , value: 2 }],
"coTargetExValue": '',
"coTargetInAverage": [{co_id: "C011-18.1" , value: 2 },{co_id: "C011-18.2" , value: 3 }],
"coTargetExAverage": '',
"coTargetInWeight":"100",
"coTargetExWeight":'',

}]

const mockMethods = [
    {
        url: '/:api?/:tenant?/v1/academics/course_management/co_targets/list',
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
        url: '/:api?/:tenant?/v1/academics/course_management/co_targets/list',
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
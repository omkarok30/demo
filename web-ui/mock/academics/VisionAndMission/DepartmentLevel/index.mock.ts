import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';

const responseData = [
    {
        "id": 1,
        "departmentId": "2",
        "vision": "helloTO BE NATIONALLY RECOGNIZED FOR EXCELLENCE IN PHARMACY EDUCATION",
        "approveVision": "BOG",
        "mision": "TO IMPART VALUE BASED PHARMACY EDUCATION AND NURTURE RESEARCH ACTIVITIES BY INCULCATING PERSONAL TOUCH AND MUTUAL RESPECT AMONGST THE STAKEHOLDERS",
        "approveMision": "BOG",
        "isToYear": true,
        "fromYear": 2020,
        "toYear": 2021,
        "isFreezed": "true",
        "momDocument": "",
    },
    {
        "id": 2,
        "departmentId": "2",
        "vision": "TO BE NATIONALLY RECOGNIZED FOR EXCELLENCE IN PHARMACY EDUCATION",
        "approveVision": "BOG",
        "mision": "TO IMPART VALUE BASED PHARMACY EDUCATION AND NURTURE RESEARCH ACTIVITIES BY INCULCATING PERSONAL TOUCH AND MUTUAL RESPECT AMONGST THE STAKEHOLDERS",
        "approveMision": "BOG",
        "isToYear": false,
        "fromYear": 2020,
        "toYear": 2021,
        "isFreezed": "false",
        "momDocument": "",
    },
];

const mockMethods = [
    {
        url: '/:api?/:tenant?/v1/settings/employee_department_level/list',
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
        url: '/:api?/:tenant?/v1/settings/employee_department_level/get/:id?',
        method: 'GET',
        body({ params }) {
            const rec = _.find(responseData, { id: params.id });
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
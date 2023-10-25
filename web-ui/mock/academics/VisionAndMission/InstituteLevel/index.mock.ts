import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';

const responseData = [
    {
        "id": 1,
        "vision": "TO BE NATIONALLY RECOGNIZED FOR EXCELLENCE IN PHARMACY EDUCATION",
        "approveVision": "BOG",
        "mision": "TO IMPART VALUE BASED PHARMACY EDUCATION AND NURTURE RESEARCH ACTIVITIES BY INCULCATING PERSONAL TOUCH AND MUTUAL RESPECT AMONGST THE STAKEHOLDERS",
        "approveMision": "BOG",
        "isToYear": true,
        "fromYear": "2010-11",
        "toYear": "2011-12",
        "isFreezed": "true",
        "momDocument": "",
        "isMissionComponent": "yes"
    },
    {
        "id": 2,
        "vision": "TO BE NATIONALLY RECOGNIZED FOR EXCELLENCE IN PHARMACY EDUCATION",
        "approveVision": "BOG",
        "mision": "TO IMPART VALUE BASED PHARMACY EDUCATION AND NURTURE RESEARCH ACTIVITIES BY INCULCATING PERSONAL TOUCH AND MUTUAL RESPECT AMONGST THE STAKEHOLDERS",
        "approveMision": "BOG",
        "isToYear": false,
        "fromYear": 2020 - 21,
        "toYear": '',
        "isFreezed": "false",
        "momDocument": "",
        "isMissionComponent": "yes"
    },
];

const mockMethods = [
    {
        url: '/:api?/:tenant?/v1/settings/employee_institute_level/list',
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
        url: '/:api?/:tenant?/v1/settings/employee_institute_level/get/:id?',
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
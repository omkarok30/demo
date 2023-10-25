import { MockOptions, defineMock } from 'vite-plugin-mock-dev-server';

const data =
    [
        {
            "id": 1,
            "academicYear": "2023-24",
            'yearAt': '2023',
            "degree_programme$cbcs$count": 3,
            "degree_programme$count": 53
        },
        {
            "id": 2,
            "academicYear": "2022-23",
            'yearAt': '2022',
            "degree_programme$cbcs$count": 3,
            "degree_programme$count": 53
        },
        {
            "id": 3,
            "academicYear": "2021-22",
            'yearAt': '2021',
            "degree_programme$cbcs$count": 3,
            "degree_programme$count": 53
        },
        {
            "id": 4,
            "academicYear": "2020-21",
            'yearAt': '2020',
            "degree_programme$cbcs$count": 3,
            "degree_programme$count": 52
        },
        {
            "id": 5,
            'yearAt': '2019',
            "academicYear": "2019-20",
            "degree_programme$cbcs$count": 3,
            "degree_programme$count": 50
        },
    ]

// const programDeatailsData = [
//     {
//         "id": "1",
//         "programCode": "CE2",
//         "programmeName": "Diploma in Civil Engineering",
//         "implOfCbcs": "yes",
//         "yearOfImpl": "2020",
//         "startYear": "2021",
//         "degreeName": "Bachelor of Engineering",
//         "facultyOfStudy": "Engineering",
//         "affiliationType": "TIER II",
//         "programDuration": "3",
//         "linkToDocument": "www.rwork.tech"
//     },
//     {
//         "id": "2",
//         "levelOfEducation": "Diploma",
//         "programType": "department",
//         "departmentId": "3",
//         "programmeName": "Diploma in Computer Engineering",
//         "degreeName": "Diploma  Engineering",
//         "facultyOfStudy": "Engineering",
//         "affiliationType": "TEIR II",
//         "programCode": "CE1",
//         "programDuration": "3",
//         "examinationPattern": "semester",
//         "startYear": "2009",
//         "closeYear": "",
//         "implOfCbcs": "yes",
//         "yearOfImpl": "2020",
//         "linkToDocument": "www.rwork.tech"
//     },
//     {
//         "id": "3",
//         "levelOfEducation": "UG",
//         "programType": "department",
//         "departmentId": "3",
//         "programmeName": "ug in computer Engineering",
//         "degreeName": "Bachelor of Engineering",
//         "facultyOfStudy": "Engineering",
//         "affiliationType": "TEIR II",
//         "programCode": "EE1",
//         "programDuration": "4",
//         "examinationPattern": "semester",
//         "startYear": "2021",
//         "closeYear": "",
//         "implOfCbcs": "no",
//         "yearOfImpl": null,
//         "linkToDocument": "www.rwork.tech"
//     },
//     {
//         "id": "4",
//         "levelOfEducation": "Diploma",
//         "departmentId": null,
//         "programType": "institute",
//         "programmeName": "Diploma in Pharmacy",
//         "degreeName": "D. Pharm",
//         "facultyOfStudy": "Pharmacy",
//         "affiliationType": "TEIR II",
//         "programCode": "PH1",
//         "programDuration": "2",
//         "examinationPattern": "annual",
//         "startYear": "2020",
//         "closeYear": "",
//         "implOfCbcs": "no",
//         "yearOfImpl": null,
//         "linkToDocument": null
//     }
// ]

const mockMethods = [
    {
        url: '/:api?/:tenant?/v1/NAAC/criteria1/1.2.1/yearWiseData/list',
        method: 'GET',
        body() {
            return {
                code: 200,
                data: {
                    total: data.length,
                    records: data,
                },
            };
        },
    },
    {
        url: '/:api?/:tenant?/v1/NAAC/criteria1/1.2.1/programDetails/:year',
        method: 'GET',
        body({ params }) {
            const result = data.filter((list: any) => list.yearAt == params.year);
            return {
                code: 200,
                data: {
                    total: result.length,
                    records: result,
                },
            };
        },
    }
] as MockOptions;
export default defineMock(mockMethods);
import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import _ from 'lodash';
import { size } from 'lodash';

const data = [
    {
      id: "1",
      name: "Repulic day",
      description: "It is one of the importantant day for our nation",
      academicYear: 2022,
      date: "2022-01-13",
    },
    {
      id: "2",
      name: "Independence Day",
      description: "It is one of the importantant day for our nation",
      academicYear: 2021,
      date: "2021-08-15",
    },
    {
      id: "3",
      name: "Holi",
      description: "It is festival of colours",
      academicYear: 2020,
      date: "2020-03-13",
    },
    {
      id: "4",
      name: "Republic Day",
      description: "It is one of the importantant day for our nation",
      academicYear: 2021,
      date: "2021-01-26",
    },
  ];
const mockMethods = [
    {
      url: '/:api?/:tenant?/v1/academics/timetable/holidaylist/list',
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
      url: '/:api?/:tenant?/v1/academics/timetable/holidaylist/get/:id?',
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
  

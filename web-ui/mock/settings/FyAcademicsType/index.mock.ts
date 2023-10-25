import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/settings/fy_academics_type/list',
    method: 'GET',
    body({ body }) {
      return {
        code: 200,
        data: [
          {
            "key": 1,
            "id": 1,
            "aYear": "2011-12",
            "aytype": "Type A"
          },
          {
            "key": 2,
            "id": 2,
            "aYear": "2012-13",
            "aytype": "Type A"
          },
          {
            "key": 3,
            "id": 3,
            "aYear": "2013-14",
            "aytype": "Type A"
          },
          {
            "key": 4,
            "id": 4,
            "aYear": "2014-15",
            "aytype": "Type B"
          },
          {
            "key": 5,
            "id": 5,
            "aYear": "2015-16",
            "aytype": "Type B"
          },
          {
            "key": 6,
            "id": 6,
            "aYear": "2020-21",
            "aytype": "Type B"
          },
          {
            "key": 6,
            "id": 6,
            "aYear": "2021-22",
            "aytype": "Type B"
          }
        ],
      };
    },
  },
] as MockOptions;

export default defineMock(mockMethods);

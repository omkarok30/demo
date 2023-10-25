import mockjs from "mockjs";
import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';
import { authHeaderTokenKey, parsedJWT, tenant } from './constants';

const mockMethods = [
  {
    url: '/:api?/v1/user/register',
    method: 'POST',
    body() {
      return {
        code: 200,
        data: '',
        msg: '',
      };
    },
  },
  {
    url: '/:api?/:tenant?/user/message',
    method: 'GET',
    body() {
      return {
        code: 200,
        data: mockjs.mock('@integer(0,99)'),
      };
    },
  },
  {
    url: '/:api?/:tenant?/v1/user/info',
    method: 'GET',
    // statusCode: 401,
    body({ headers }) {
      const token = headers[authHeaderTokenKey] || '';
      let email = '';
      try {
        let jwt = headers[authHeaderTokenKey].split(' ');
        jwt = parsedJWT(jwt[1]);
        email = jwt.email;
      } catch (e) {
        email = token.split(' ')[1] || token;
      }
      if (email === 'admin@me.localhost') {
        return {
          code: 200,
          data: {
            id: 1,
            name: 'Admins',
            avatar: '',
            roles: ['super', 'admin'],
            tenant,
          },
        };
      } else if (email === 'user@me.localhost') {
        return {
          code: 200,
          data: {
            id: 2,
            name: 'Users',
            avatar: '',
            roles: ['settings'],
            tenant,
          },
        };
      } else if (email === 'test@me.localhost') {
        return {
          code: 200,
          data: {
            id: 3,
            name: 'Tests',
            avatar: '',
            roles: ['test'],
            tenant,
          },
        };
      } else {
        return {
          code: 10002,
          data: {},
          msg: 'not logged in',
        };
      }
    },
  },
] as MockOptions;
export default defineMock(mockMethods);

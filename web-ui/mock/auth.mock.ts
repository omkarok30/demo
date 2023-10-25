import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';

const mockMethods = [
  {
    url: '/:api?/:tenant?/v1/auth/login',
    method: 'POST',
    body({ body }) {
      const { password, email } = body;
      const send = { code: 200, data: {}, msg: '' };
      if (email === 'admin@me.localhost' && password === 'password') {
        send['data'] = {
          accessToken: 'admin@me.localhost',
        };
      } else if (email === 'user@me.localhost' && password === 'password') {
        send['data'] = {
          accessToken: 'user@me.localhost',
        };
      } else if (email === 'test@me.localhost' && password === 'password') {
        send['data'] = {
          accessToken: 'test@me.localhost',
        };
      } else {
        send['code'] = 201;
        send['msg'] = 'Wrong username or password';
      }
      return send;
    },
  },
] as MockOptions;

export default defineMock(mockMethods);

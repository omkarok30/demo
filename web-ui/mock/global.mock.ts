import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';

const mockMethods = [{
  url: '/api/500',
  method: 'GET',
  // statusCode: 401,
  body() {
    return {
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/500',
    };
  },
}] as MockOptions;

export default defineMock(mockMethods);

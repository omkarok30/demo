import { defineMock, MockOptions } from 'vite-plugin-mock-dev-server';

const data = [
  {
    "subdomain": "sveri",
    "name": "SVERI",
    "logo": "sveri.png",
    "roles": [{
      "name": "Admin",
      "text": "Admin Role role information",
    }]
  },
  {
    "subdomain": "puneuni",
    "name": "Pune University",
    "logo": "pune_uni.png",
    "roles": [{
      "name": "Super Admin",
      "text": "Super admin role information",
    }, {
      "name": "Alumni",
      "text": "",
    }, {
      "name": "Faculty",
      "text": "Faculty role information",
    }]
  },
  {
    "subdomain": "pict",
    "name": "PICT",
    "logo": "pict.png",
    "roles": [{
      "name": "Student",
      "text": "Student role information",
    }]
  },
];

const mockMethods = [{
  url: "/api/user_roles",
  method: "GET",
  body() {
    return {
      code: 200,
      data
    };
  },
}] as MockOptions;

export default defineMock(mockMethods);

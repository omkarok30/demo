import request from '@/utils/request';

export const getRecords = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/employee/employeedashboard/administrativedept/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const getEmployeeDashboardAdministrative = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/employee/employeedashboard/administrativedept/get/${id}`,
    });

    const data = resp?.data?.records;
    return data;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};

export const add = async (data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: '/employeeemployeedashboard/administrativedept/add',
      data,
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const update = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/employee/employeedashboard/administrativedept/edit/${id}`,
      data,
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

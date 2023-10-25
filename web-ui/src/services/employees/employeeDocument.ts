import request from '@/utils/request';

export const getAllEmployeeDocument = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/EmployeeRecord/SearchEmployee/EmployeeDocument/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getEmployeeDocument = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/EmployeeRecord/SearchEmployee/EmployeeDocument/get/${id}`,
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
      url: '/EmployeeRecord/SearchEmployee/EmployeeDocument/add',
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
      url: `/EmployeeRecord/SearchEmployee/EmployeeDocument/edit/${id}`,
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

export const deleteRecord = async (id: string) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/EmployeeRecord/SearchEmployee/EmployeeDocument/delete/${id}`,
      data,
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};

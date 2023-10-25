import request from '@/utils/request';

export const getEmployeeBookdetails = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/employee/employee_book_details/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const getEmployeeBookdetail = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/employee/employee_book_details/get/${id}`,
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
      url: '/employee/employee_book_details/add',
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
      url: `/employee/employee_book_details/edit/${id}`,
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

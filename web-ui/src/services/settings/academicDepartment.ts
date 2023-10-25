import request from '@/utils/request';

export const getAllAcademicDepartments = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/departments/list/academic',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getAcademicDepartment = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/settings/departments/get/${id}`,
    });
    const data = resp?.data;
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
      url: '/settings/departments/add',
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
      url: `/settings/departments/edit/${id}`,
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

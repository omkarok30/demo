import request from '@/utils/request';

export const getAllUsers = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/users/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getAdminsList = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/admins/list',
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
      url: '/settings/admins/add',
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
      url: `/settings/admins/edit/${id}`,
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

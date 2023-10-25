import request from '@/utils/request';

export const getInstitutes = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/institute/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getInstitute = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/settings/institute/get/${id}`,
    });
    const data = resp?.data;
    return data;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};

export const update = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/settings/institute/edit/${id}`,
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

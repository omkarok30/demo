import request from '@/utils/request';

export const getBankDetails = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/bank_details/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const getBankDetail = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/settings/bank_details/get/${id}`,
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
      url: '/settings/bank_details/add',
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
      url: `/settings/bank_details/edit/${id}`,
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

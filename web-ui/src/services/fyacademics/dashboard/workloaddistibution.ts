import request from '@/utils/request';

export const getRecords = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/fyacademics/workloaddisrtibutionwise/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const getfyacademicsdashboard = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/fyacademics/workloaddisrtibutionwise/get/${id}`,
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
      url: '/fyacademics/workloaddisrtibutionwise/add',
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
      url: `/fyacademics/workloaddisrtibutionwise/edit/${id}`,
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
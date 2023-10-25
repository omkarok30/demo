import request from '@/utils/request';

export const getAllGeneralSessions = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/academics/timeTable/generalSessions/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const getGeneralSessions = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/academics/timeTable/generalSessions/get/${id}`,
    });
    console.log(id);
    const data = resp?.data?.records;
    return data;
  }
  catch (err) {
    console.error(err);
  }
};

export const add = async (data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: '/academics/timeTable/generalSessions/add',
      data,
    });
    return resp.data;
  }
  catch (err) {
    console.error(err);
    return err;
  }
};

export const update = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/academics/timeTable/generalSessions/edit/${id}`,
      data,
    });
    
    return resp.data;
  }
  catch (err) {
    console.error(err);
    return err;
  }
};

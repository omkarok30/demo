import request from '@/utils/request';

export const getAllFyDivisions = async (year: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/fyacademics/divisions/list',
    });
    const data = resp.data?.records?.filter((divisions: any) => divisions.academicYear === year);
    return data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getDivision = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/fyacademics/divisions/get/${id}`,
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
      url: '/fyacademics/divisions/add',
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
      url: `/fyacademics/divisions/edit/${id}`,
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

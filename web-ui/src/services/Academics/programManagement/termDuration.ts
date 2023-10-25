import request from '@/utils/request';
import _ from 'lodash';

export const getAllTermDurations = async (year: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/academics/program-management/term-duration/list',
    });

    const data = resp.data?.records?.filter((termduration: any) => termduration.year === year);
    return data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getTermDuration = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/academics/program-management/term-duration/get/${id}`,
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
      url: '/academics/program-management/term-duration/add',
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
      url: `/academics/program-management/term-duration/${id}`,
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

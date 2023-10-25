import _ from 'lodash';
import request from '@/utils/request';

export const getRecords = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/employee/main_program/list',
    });

    return resp?.data?.records;
  }
  catch (err) {
    console.error(err);
    return err;
  }
};

export const getmain_program = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/employee/main_program/get/${id}`,
    });
    const data = resp?.data?.records;
    return data;
}
  catch (err) {
    console.error(err);
    return err;
  }
};

export const add = async (data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: '/employee/main_program/list/add',
      data,
    });
    return resp.data?.records;
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
      url: `/employee/main_program/edit/${id}`,
      data,
    });
    return resp.data?.records;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};
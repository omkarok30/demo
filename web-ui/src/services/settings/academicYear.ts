import _ from 'lodash';
import request from '@/utils/request';

export const getAcademicYearDetails = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/academic_year/list',
    });
    return resp.data;
  }
  catch (err) {
    console.error(err);
    return err;
  }
};

export const getAcademicYearDetail = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/settings/academic_year/get/${id}`,
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
      url: `/settings/academic_year/edit/${id}`,
      data,
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};

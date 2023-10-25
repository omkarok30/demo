import _ from 'lodash';
import request from '@/utils/request';

export const getGovtScholarDataByYear = async (year: string | number) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria5/5.1.1/government/list/${year}`,
    });

    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getAllScholarDataByYear = async (year: string | number) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria5/5.1.1/Government/scholar/get/${year}`,
    });

    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getStudentsRecordByYear = async (year: string | number) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria5/5.1.1/Government/students/get/${year}`,
    });

    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

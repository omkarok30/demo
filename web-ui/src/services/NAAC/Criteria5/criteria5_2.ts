import _ from 'lodash';
import request from '@/utils/request';

export const getNonGovtScholarDataByYear = async (year: string | number) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria5/5.1.2/nongovernment/list/${year}`,
    });

    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getAllInstituteDataByYear = async (year: string | number) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria5/5.1.2/nongovernment/institute/get/${year}`,
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
      url: `/NAAC/criteria5/5.1.2/nongovernment/students/get/${year}`,
    });

    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

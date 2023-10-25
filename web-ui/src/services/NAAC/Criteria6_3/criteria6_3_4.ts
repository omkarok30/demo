import request from '@/utils/request';

export const getAllFacultyByYear = async (year: number) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria6/6.3.4/faculty/list/${year}`,
    });

    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getFacultyDataByYear = async (year: number) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria6/6.3.4/faculty/get/${year}`,
    });

    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getFacultyStaffRecord = async (year: number) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria6/6.3.4/faculty/get/${year}`,
    });

    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

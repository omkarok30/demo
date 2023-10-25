import request from '@/utils/request';

export const getAllPlacementsByYear = async (year: number) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria5/5.2.1/placement/list/${year}`,
    });

    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getPlacementDataByYear = async (year: number) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria5/5.2.1/placement/get/${year}`,
    });

    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getPlacementStudentsRecord = async (year: number) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria5/5.2.1/placement/students/get/${year}`,
    });

    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

import request from '@/utils/request';

export const getAllAwardsByYear = async (year: number) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria5/5.3.1/award/list/${year}`,
    });

    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getAwardsStudentsRecord = async (year: number) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria5/5.3.1/award/students/get/${year}`,
    });

    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

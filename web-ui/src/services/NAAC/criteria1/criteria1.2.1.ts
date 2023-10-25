import _ from 'lodash';
import request from '@/utils/request';

export const getYearWiseData = async () => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria1/1.2.1/yearWiseData/list`,
    });
    return resp?.data
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getSingleRecord = async (year) => {
    try {
      const resp = await request({
        method: 'GET',
        url: `/NAAC/criteria1/1.2.1/programDetails/${year}`,
      });
      return resp?.data
    }
    catch (err) {
      // Handle Error Here
      console.error(err);
      throw err;
    }
  };

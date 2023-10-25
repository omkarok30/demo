import _ from 'lodash';
import request from '@/utils/request';

export const getAllGrievances = async () => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria5/5.1.5/list`,
    });
    return resp?.data
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getGrievancesByYear = async (year) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria5/5.1.5/get/${year}`,
    });
    const data = resp?.data
    return data
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const updateGrievancesByYear = async (year, option) => {
  try {
    const resp = await request({
      method: 'POST',
      url: `/NAAC/criteria5/5.1.5/edit/${year}`,
      data: option,
    });
    const data = resp?.data
    return data
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
}

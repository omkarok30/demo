import request from '@/utils/request';

export const getAllQualityList = async () => {
  try {
    const resp = await request({
      method: 'GET',
      url: '/NAAC/criteria6/6.5.3/list',
    });
    return resp?.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getQualityByYear = async (year) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria6/6.5.3/get/${year}`,
    });
    const data = resp?.data;
    return data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const updateQualityByYear = async (year, option) => {
  try {
    const resp = await request({
      method: 'POST',
      url: `/NAAC/criteria6/6.5.3/edit/${year}`,
      data: option,
    });
    const data = resp?.data;
    return data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getAreaGovernanceByYear = async (year) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria6/6.5.3/getArea/${year}`,
    });
    const data = resp?.data;
    return data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

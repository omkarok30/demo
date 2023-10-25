import request from '@/utils/request';

export const getAllSkillsOptionList = async () => {
  try {
    const resp = await request({
      method: 'GET',
      url: '/NAAC/radiaButton/list',
    });
    return resp?.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getSkillsOptionByYear = async (year) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/radiaButton/get/${year}`,
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

export const updateSkillOptionByYear = async (year, option) => {
  try {
    const resp = await request({
      method: 'POST',
      url: `/NAAC/radiaButton/edit/${year}`,
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

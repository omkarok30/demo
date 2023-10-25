import request from '@/utils/request';

export const add = async (data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: '/naac/qlmCriteria/add',
      data,
    });

    return resp.data;
  }
  catch (err) {
    console.error(err);
  }
};
export const getDescriptionByYear = async (year) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/QLMCriteria/${year}`,
    });
    return resp?.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

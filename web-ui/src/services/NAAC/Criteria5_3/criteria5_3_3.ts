import request from '@/utils/request';

export const getAllEventsByYear = async (year: number) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria5/5.3.3/culturalEvent/list/${year}`,
    });

    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getEventStudentsRecord = async (year: number) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria5/5.3.3/culturalEvent/students/get/${year}`,
    });

    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

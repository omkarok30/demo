import request from '@/utils/request';

export const getApplicableDegreeLevels = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/uni-stud-insurance/degreelevels',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const getunistudInsuranceData = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/uni-stud-insurance/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const getacademicyear = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/uni-stud-insurance/academicyear',
    });
    return resp.data;
  }
  catch (err) {
    console.error(err);
  }
};

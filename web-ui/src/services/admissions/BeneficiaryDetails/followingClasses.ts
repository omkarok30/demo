import request from '@/utils/request';

export const getRecord = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `admissions/student_record/beneficiary_details/following_classes/get/${id}`,
    });
    const data = resp?.data;
    return data;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllRecords = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: 'admissions/student_record/beneficiary_details/following_classes/list',
    });
    return resp.data;
  }
  catch (err) {
    console.error(err);
    return err;
  }
};

export const updateDetails = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/admissions/admit-students/beneficiary_details/following_classes/${id}`,
      data,
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};

export const addDetails = async (data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: '/admissions/admit-students/beneficiary_details/following_classes/add',
      data,
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

import _ from 'lodash';
import request from '@/utils/request';

export const getAdmissionDetails = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/admissions/admission_details/list',
    });
    const data = resp?.data?.records?.filter((student: any) => student.studentId === id);
    return _.get(data, [0], {});
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const updateDetails = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/admissions/admission_details/edit_admission_details/${id}`,
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

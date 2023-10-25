import request from '@/utils/request';
import _ from 'lodash';

export const getStudents = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/admissions/student_record/list',
    });
    return resp.data?.records;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const getStudent = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/admissions/student_record/get/${id}`,
    });
    
    const data:any = resp?.data;
console.log('resp',data);

    return data.records;
  }
  catch (err) {
    console.error(err);
    return err;
  }
};
export const updateBasicDetails = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/admissions/student_record/edit_basic_details/${id}`,
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

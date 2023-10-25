import _ from 'lodash';
import request from '@/utils/request';

export const getDetails = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/admissions/student_record/co-curricular/publication_details/list',
    });
    const data = resp?.data?.records?.filter((student: any) => student.studId === id);
    return data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const getRecord = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `admissions/student_record/co-curricular/publication_details/get/${id}`,
    });
    const data = resp?.data?.records;
    return data;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};

export const add = async (data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: '/admissions/student_record/co-curricular/publication_details/add',
      data,
    });
    return resp.data?.records;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const update = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/admissions/student_record/co-curricular/publication_details/edit/${id}`,
      data,
    });
    return resp.data?.records;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};
export const deleteRecord = async (id: string) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/admissions/student_record/co-curricular/publication_details/delete/${id}`,
      data,
    });
    return resp.data?.records;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};


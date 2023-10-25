import _ from 'lodash';
import request from '@/utils/request';

export const getDetails = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/admissions/student_record/student_document/list',
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
      url: `admissions/student_record/student_document/get/${id}`,
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
      url: '/admissions/admit-students/student_document/add',
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

export const update = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/admissions/admit-students/student_document/${id}`,
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
export const deleteRecord = async (id: string) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/admissions/admit-students/student_document/delete/${id}`,
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


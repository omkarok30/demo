import _ from 'lodash';
import request from '@/utils/request';

export const getCounselDataByYear = async (year: string | number) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria5/5.1.4/CompitativeExam/list/${year}`,
    }); 
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getCounselByYear = async (year) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria5/5.1.4/get/${year}`,
    });
    const data = resp?.data
    return data
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getActivityByYear = async (year) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria5/5.1.4/get/${year}`,
    });
    const data = resp?.data
    return data
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const updateCampusPlacement = async (year, value) => {
  try {
    const resp = await request({
      method: 'PUT',
      url: `/NAAC/criteria5/5.1.5/edit/${year}`,
      data: value
    });
    const data = resp?.data
    return data
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
}

export const uploadActivityDocs = async (id, activityId, value) => {
  try {
    const resp = await request({
      method: 'PUT',
      url: `/NAAC/criteria5/5.1.5/upload/${id}/${activityId}`,
      data: value
    });
    const data = resp?.data
    return data
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
}


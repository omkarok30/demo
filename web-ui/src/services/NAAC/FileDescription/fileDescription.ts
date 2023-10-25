import request from '@/utils/request';

export const getAllFileDescriptions = async (criteria: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/naac/aqar/fileDescription/list/${criteria}`,
    });
    return resp.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const getRecord = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/naac/aqar/fileDescription/get/${id}`,
    });

    return resp?.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const deleteRecord = async (id: string) => {
  try {
    const resp = await request({
      method: 'POST',
      url: `/naac/aqar/fileDescription/delete/${id}`,
    });

    return resp?.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteLink = async (id: string) => {
  try {
    const resp = await request({
      method: 'POST',
      url: `/naac/aqar/fileDescription/link/delete/${id}`,
    });

    return resp?.data;
  } catch (error) {
    console.error(error);
  }
};

export const update = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/naac/aqar/fileDescription/update/${id}`,
      data,
    });

    return resp.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const add = async (data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: '/naac/aqar/fileDescription/add',
      data,
    });

    return resp.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

import request from '@/utils/request';

export const getReview = async (criteria: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/naac/aqar/review/list/${criteria}`,
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
      url: `/naac/aqar/review/get/${id}`,
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
      method: 'get',
      url: `/naac/aqar/review/delete/${id}`,
    });
    return resp?.data;
  } catch (error) {
    console.error(error);
  }
};

export const saveDraft = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/naac/aqar/review/saveDraft/${id}`,
      data,
    });

    return resp.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const submit = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: '/naac/aqar/review/submit',
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
      url: '/naac/aqar/review/add',
      data,
    });

    return resp.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

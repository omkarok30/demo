import request from '@/utils/request';

export const getAllTransferenceCertificate = async (year: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/document/transferenceCertificate/list',
    });
    // const data = resp.data?.records?.filter((record: any) => record.dateOfLeave === year);
    const data = resp.data?.records
    return data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getTransferenceCertificate= async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/document/transferenceCertificate/get/${id}`,
    });
    const data:any = resp?.data;

    return data.records;
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
      url: '/document/transferenceCertificate/add',
      data,
    });
    return resp.data;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};

export const update = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/document/transferenceCertificate/edit/${id}`,
      data,
    });

    return resp.data;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};
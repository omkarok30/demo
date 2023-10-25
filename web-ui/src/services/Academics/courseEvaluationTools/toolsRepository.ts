import request from '@/utils/request';

export const getAllAcademicTools = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/academics/courseEvaluationTools/createTools/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getAcademicTools = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/academics/courseEvaluationTools/createTools/get/${id}`,
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
      url: '/academics/courseEvaluationTools/createTools/add',
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
      url: `/academics/courseEvaluationTools/createTools/edit/${id}`,
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
export const inActivateTool = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/academics/courseEvaluationTools/createTools/edit/${id}`,
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

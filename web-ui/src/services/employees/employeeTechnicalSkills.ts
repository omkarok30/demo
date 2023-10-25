import request from '@/utils/request';

export const getEmployeeTechnicalSkills = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/employee/employee_technical_skills/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const getEmployeeTechnicalSkill = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/employee/employee_technical_skills/get/${id}`,
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
      url: '/employee/employee_technical_skills/add',
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
      url: `/employee/employee_technical_skills/edit/${id}`,
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

export const deleteRecord = async (id: string) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/employee/employee_technical_skills/delete/${id}`,
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};


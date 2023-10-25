import request from '@/utils/request';

export const getAllPso = async (year: string, program: string) => {
  try {
    const resp:any = await request({
      method: 'get',
      url: '/academics/program-management/pso/list',
    });
    const data = resp.data?.records?.filter((divisions: any) => divisions.academicYear === year && divisions.programId === program);
    return data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getPso = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/academics/program-management/pso/get/${id}`,
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
      url: '/academics/divisions/add',
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
      url: `/academics/divisions/edit/${id}`,
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
export const updateNfurtherchange = async (year: string, program:string, className:string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/academics/divisions/edit/${year}/${program}/${className}}`,
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
export const getDivisionsAsPerClass = async (year: string, program: string, className: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/academics/divisions/listClassWise/${year}/${program}/${className}`,
    });
    //const data = resp.data?.records?.filter((divisions: any) => divisions.academicYear === year && divisions.programId === program && divisions.className === className);
    const data = resp.data?.records;
     return data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

import request from '@/utils/request';

export const getAllPeo = async (year: string, program: string) => {
  try {
    const resp:any= await request({
      method: 'get',
      url: '/academics/program-management/peo/list',
    });
    const data = resp.data?.records?.filter((divisions: any) => divisions.academicYear === year && divisions.programId === program);
    console.log('data',data,resp);
    
    return data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getPeo = async (id: string) => {
  console.log('getPeo',id);
  
  try {
    const resp = await request({
      method: 'get',
      url: `/academics/program-management/peo/get/${id}`,
    });
    console.log('getPeo',resp);

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

import request from '@/utils/request';

export const getAllClassCoordinator = async (year: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/FYAcademics/CourseManage/ClassCoordinate/list',
    });
    const data = resp.data?.records?.filter((record: any) => record.academicYear === year);
    console.log(data);
    return data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getClassCoordinator = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/FYAcademics/CourseManage/ClassCoordinate/get/${id}`,
    });
    const data = resp?.data;
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
      url: '/FYAcademics/CourseManage/ClassCoordinator/add',
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
      url: `/FYAcademics/CourseManage/ClassCoordinator/edit/${id}`,
      data,
    });

    return resp.data;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};
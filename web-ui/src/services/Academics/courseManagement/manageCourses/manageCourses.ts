import request from '@/utils/request';

export const getAllManageCourses = async (levelOfEducation: string, program: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/academics/courseManagement/manageCourses/list',
    });
    if (levelOfEducation) {
      return resp?.data?.records?.filter((record: any) => record.levelOfEducation === levelOfEducation);
    } else if (program) {
      return resp?.data?.records?.filter((record: any) => record.programId === program);
    } else {
      return resp?.data?.records;
    }
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getManageCourses = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/academics/courseManagement/manageCourses/get/${id}`,
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
      url: '/academics/courseManagement/manageCourses/add',
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

// export const update = async (id: string, data: any) => {
//   try {
//     const resp = await request({
//       method: 'post',
//       url: `/academics/courseEvaluationTools/createTools/edit/${id}`,
//       data,
//     });
//     return resp.data;
//   }
//   catch (err) {
//     // Handle Error Here
//     console.error(err);
//     throw err;
//   }
// };
export const inActivateCourse = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/academics/courseManagement/manageCourses/edit/${id}`,
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

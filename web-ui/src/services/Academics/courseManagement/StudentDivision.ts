import request from '@/utils/request';

export const getAssignRecords = async (
  year: string,
  className: string,
  programmeId: string,
  division: number,
  semester: string,
) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/academics/student_enrollment/student_division_enrollment/assignStudentEnrollment/list',
    });
    const data = resp?.data;
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const add = async (data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: '/academics/student_enrollment/student_division_enrollment/assignStudentEnrollment/add/',
      data,
    });
    return resp.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

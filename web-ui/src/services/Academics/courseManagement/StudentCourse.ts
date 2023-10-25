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
      url: '/academics/student_enrollment/student_course_enrollment/list',
    });
    const data = resp?.data;
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

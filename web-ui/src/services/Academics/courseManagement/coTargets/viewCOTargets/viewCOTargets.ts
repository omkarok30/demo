import request from '@/utils/request';

export const getRecords = async (year:string,className:string,programmeId:string, courseId:number, division:number,semester:number) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/academics/course_management/co_targets/list',
    });
    const data = resp?.data;
    return data;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};

export const getCourseCo = async (courseId: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/academics/courseManagement/courseOutcomes/get/${courseId}`,
    });
    const data = resp?.data?.records;
    return data;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};
export const getCourseTool = async (courseId: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/academics/course_evaluation_tools/tool_attainment_level/list',
    });
    const data = resp?.data?.records;
    return data;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};


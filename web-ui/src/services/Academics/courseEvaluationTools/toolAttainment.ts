import request from '@/utils/request';

export const getRecords = async (year: string, programId: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/academics/course_evaluation_tools/tool_attainment_level/list',
    });
    const data = resp?.data?.records?.filter((Attainment: any) => Attainment.academicYear === year && Attainment.programId === programId);
    return data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const getToolAttainment = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/academics/course_evaluation_tools/tool_attainment_level/list',
    });
    const data = resp?.data?.records?.filter((Attainment: any) => Attainment.id === id);
    return data[0];
  }
  catch (err) {
    console.error(err);
  }
};

export const update = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/academics/course_evaluation_tools/tool_attainment_level/edit/${id}`,
      data,
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};
export const updateCommonAttainment = async (year: string, programId: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/academics/course_evaluation_tools/tool_attainment_level/editcommonAttainment/${year}/${programId}`,
      data,
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};


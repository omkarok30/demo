import request from '@/utils/request';

export const getStudInsStructureDetails = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/student_insurance_structure/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
export const getStudInsStructureDetail = async (id: number) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/student_insurance_structure/list',
    });
    const data = resp?.data?.filter((object: any) => object.id === id);
    return data[0];
  }
  catch (err) {
    console.error(err);
  }
};

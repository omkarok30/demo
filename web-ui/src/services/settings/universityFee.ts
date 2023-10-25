import request from '@/utils/request';

export const getuniversityfeeheads = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/university_fee/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
export const getuniversityfeehead = async (id: number) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/university_fee/list',
    });
    const data = resp?.data?.filter((universityfeehead: any) => universityfeehead.id == id);
    return data[0];
  }
  catch (err) {
    console.error(err);
  }
};

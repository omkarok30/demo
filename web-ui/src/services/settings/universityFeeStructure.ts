import request from '@/utils/request';

export const getuniversityfeestructures = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/university_fee_structure/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
export const getuniversityfeestructure = async (id: number) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/university_fee_structure/list',
    });
    const data = resp?.data?.filter((universityfeestructure: any) => universityfeestructure.id === id);
    return data[0];
  }
  catch (err) {
    console.error(err);
  }
};

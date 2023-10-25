import request from '@/utils/request';

export const getfeestructuresdata = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/college_fee_structure/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
export const getfeestructure = async (id: number) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/college_fee_structure/list',
    });
    const data = resp?.data?.filter((feestructure: any) => feestructure.id == id);

    return data[0];
  }
  catch (err) {
    console.error(err);
  }
};

import request from '@/utils/request';

export const getDepositDetails = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/deposit/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const getDepositDetail = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/deposit/list',
    });
    const data = resp?.data?.filter((deposit: any) => deposit.id === id);
    return data[0];
  }
  catch (err) {
    console.error(err);
  }
};

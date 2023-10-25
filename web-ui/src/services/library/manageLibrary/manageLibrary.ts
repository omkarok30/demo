import request from '@/utils/request';

export const getAllBooks = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/library/manageBooks/list',
    });
    return resp.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getBook = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/library/manageBooks/get/${id}`,
    });
    const data = resp?.data?.records;
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

import request from '@/utils/request';

export const getAllLookups = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/lookups/list',
    });
    return resp.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const getLookupValue = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/settings/lookups/get/${id}`,
    });
    const data = resp?.data;
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addLookupItem = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/settings/lookups/add-item/${id}`,
      data,
    });
    return resp.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};
export const updateLookupItem = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/settings/lookups/update-item/${id}`,
      data,
    });
    return resp.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};
export const removeLookupItem = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/settings/lookups/remove-item/${id}`,
      data,
    });
    return resp.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

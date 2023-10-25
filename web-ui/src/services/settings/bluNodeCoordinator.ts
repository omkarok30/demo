import request from '@/utils/request';

export const getAllCoordinators = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/blunode_coordinator/list',
    });
    const data = resp.data?.records?.filter(
      (record: any) => record.category !== 'overall_coordinator',
    );
    return data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};
export const getOverallCoordinators = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: `/settings/blunode_coordinator/listoverallcoordinator/${'overall_coordinator'}`,
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getCoordinator = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/settings/blunode_coordinator/get/${id}`,
    });
    const data = resp?.data;
    return data;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};

export const add = async (data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: '/settings/blunode_coordinator/add',
      data,
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const update = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/settings/blunode_coordinator/edit/${id}`,
      data,
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

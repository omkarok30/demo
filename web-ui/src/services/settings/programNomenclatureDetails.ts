import request from '@/utils/request';

export const getProgramNomenclatureDetails = async (programId: any) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/settings/degree-programme/${programId}/nomenclature/list`,
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const getProgramNomenclature = async (programId: string, id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/settings/degree-programme/${programId}/nomenclature/get/${id}`,
    });
    const data = resp?.data;
    return data;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};

export const add = async (programId: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/settings/degree-programme/${programId}/nomenclature/add`,
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

export const update = async (programId: string, id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/settings/degree-programme/${programId}/nomenclature/edit/${id}`,
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

import request from '@/utils/request';

export const getAllDayFormat = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/academics/TimeTable/DayFormat/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getSessions = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/academics/TimeTable/SessionTime/list',
    });
    const data = resp.data?.records?.filter((sessions: any) => sessions.sessionid === id);
    return data;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};

export const getDayFormat = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/academics/TimeTable/DayFormat/get/${id}`,
    });
    const data = resp?.data?.records;
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
      url: '/academics/TimeTable/DayFormat/add',
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
      url: `/academics/TimeTable/DayFormat/edit/${id}`,
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

export const inActivateSessions = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/academics/TimeTable/DayFormat/edit/${id}`,
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

import _ from 'lodash';
import request from '@/utils/request';

export const getRecords = async (year: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/academics/timetable/holidaylist/list',
    });
    const data = resp.data?.records?.filter(
      (holiday: any) => holiday.academicYear === year,
    );
    return data;
  }
  catch (err) {
    console.error(err);
    return err;
  }
};

export const getHolidayList = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/academics/timetable/holidaylist/list',
    });
    const data = resp?.data?.records?.filter(
      (holiday: any) => holiday.id === id,
    );
    return _.get(data, [0], {});
  }
  catch (err) {
    console.error(err);
    return err;
  }
};

export const update = async (id: string, data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/academics/timetable/holidaylist/edit/${id}`,
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

export const deleteRecord = async (id: string) => {
  try {
    const resp = await request({
      method: 'post',
      url: `/academics/timetable/holidaylist/delete/${id}`,
      data,
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};

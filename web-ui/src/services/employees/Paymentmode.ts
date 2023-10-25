import _ from 'lodash';
import request from '@/utils/request';

export const getRecords = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/employee/paymentmode/list',
    });

    return resp?.data?.records;
  }
  catch (err) {
    console.error(err);
    return err;
  }
};

export const getpaymentmode = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: `/employee/paymentmode/get/${id}`,
    });
    const data = resp?.data?.records?.filter(
      (paymentmode: any) => paymentmode.empId === id,
    );
    return _.get(data, [0], {});
  }
  catch (err) {
    console.error(err);
    return err;
  }
};

export const add = async (data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: '/employee/paymentmode/list/add',
      data,
    });
    return resp.data?.records;
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
      url: `/employee/paymentmode/edit/${id}`,
      data,
    });
    return resp.data?.records;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};
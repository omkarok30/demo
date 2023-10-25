import _ from 'lodash';
import request from '@/utils/request';

export const getRecords = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/employeerecord/searchemp/emeregency/list',
    });

    return resp.data?.records;
  }
  catch (err) {
    console.error(err);
    return err;
  }
};

export const getEmergencydetails = async (id: any) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/employeerecord/searchemp/emeregency/list',
    });
    const data = resp?.data?.records?.filter(
      (emergency: any) => emergency.id === '1',
    );
    return _.get(data, [0], {});
    // return data;
  }
  catch (err) {
    console.error(err);
    return err;
  }
};


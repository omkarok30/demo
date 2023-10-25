import moment from 'moment';
import request from '@/utils/request';
export const gettermdurations = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/term_duration/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const gettermduration = async (id: number) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/term_duration/list',
    });
    const data = resp?.data?.filter((termduration: any) => termduration.id === id);
    const fromdate = moment(data[0].fromdate);
    const todate = moment(data[0].todate);
    const newdata
      = {
        key: data[0].key,
        id: data[0].id,
        degreelevel: data[0].degreelevel,
        year: data[0].year,
        pattern: data[0].pattern,
        fromdate,
        todate,
        reexam: data[0].reexam,
      };
    return newdata;
  }
  catch (err) {
    console.error(err);
  }
};

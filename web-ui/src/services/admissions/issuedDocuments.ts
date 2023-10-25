import _ from 'lodash';
import request from '@/utils/request';

export const getRecords = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/admissions/student_record/issued_documents/list',
    });
    const data = resp.data?.records;
    return data;
  }
  catch (err) {
    console.error(err);
    return err;
  }
};

export const getIssuedDocuments = async (id: string) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/admissions/student_record/issued_documents/list',
    });
    const data = resp?.data?.records?.filter(
      (document: any) => document.id === id,
    );
    return _.get(data, [0], {});
  }
  catch (err) {
    console.error(err);
    return err;
  }
};

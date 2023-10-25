import request from '@/utils/request';

export const getAllExamByYear = async (year: number) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria5/5.2.3/NationalInternationalExam/list/${year}`,
    });

    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getNationalIntExamDataByYear = async (year: number) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria5/5.2.3/NationalInternationalExam/get/${year}`,
    });

    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

export const getNationalIntStudentsRecord = async (year: number) => {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria5/5.2.3/NationalInternationalExam/students/get/${year}`,
    });

    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};

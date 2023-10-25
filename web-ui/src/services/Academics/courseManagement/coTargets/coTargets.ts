import request from '@/utils/request';

export const getRecords = async (year: string, programId: string, className: string, semester:string,  divisionId:string ) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/academics/course_management/co_targets/list',
    });
    const data = resp?.data;
    //const data = resp?.data?.records?.filter((cotarget: any) => cotarget.academicYear === year && cotarget.programmeId === programId && cotarget.className === className && cotarget.semester === semester && cotarget.division === divisionId);

    console.log(data);
    return data;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};
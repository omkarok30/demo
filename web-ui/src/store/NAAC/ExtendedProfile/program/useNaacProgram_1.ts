import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import * as service from '@/services/NAAC/ExtendedProfile/program/program_1';

export const store = (set: any, _get: any) => ({
  current: {},
  courseRecordsCounts: [],
  courseData: [],

  getAllCourseRecords: async (year: number) => {
    try {
      const res = await service.getAllCourseByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['courseFacultyLinking$academicYear'], ['desc']);
      const currDataByYear = sortData?.find((item: any) => item.courseFacultyLinking$academicYear === Number(year));
      set({ courseRecordsCounts: sortData, current: currDataByYear });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getCourseRecord: async (year: number) => {
    try {
      const res = await service.getCourseRecordByYear(year);

      const data: any = res;
      set({ courseData: data?.records });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },
});

const devstore = devtools(store);
export const useNaacProgram1 = create(devstore);

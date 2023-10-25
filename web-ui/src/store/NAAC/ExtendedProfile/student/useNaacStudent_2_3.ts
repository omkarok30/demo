import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import * as service from '@/services/NAAC/ExtendedProfile/student/student_2_3';

export const store = (set: any, _get: any) => ({
  current: {},
  studRecordsCounts: [],
  studentsData: [],

  getAllStudentsRecords: async (year: number) => {
    try {
      const res = await service.getAllStudentsByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['studentPromotionMap$academicYear'], ['desc']);
      const currDataByYear = sortData?.find((item: any) => item.studentPromotionMap$academicYear === Number(year));
      set({ studRecordsCounts: sortData, current: currDataByYear });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getStudentsRecord: async (year: number) => {
    try {
      const res = await service.getStudentsRecordByYear(year);

      const data: any = res;
      set({ studentsData: data?.records });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },
});

const devstore = devtools(store);
export const useNaacStudent23 = create(devstore);

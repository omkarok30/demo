import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import * as service from '@/services/NAAC/ExtendedProfile/academic/academic_3_2';

export const store = (set: any, _get: any) => ({
  current: {},
  PostCounts: [],

  getAllPostRecords: async (year: number) => {
    try {
      const res = await service.getAllPostByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['academicYear'], ['desc']);
      const currDataByYear = sortData?.find((item: any) => item.academicYear === Number(year));
      set({ PostCounts: sortData, current: currDataByYear });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getTeacherRecord: async (year: number) => {
    try {
      const res = await service.getTeacherRecordByYear(year);

      const data: any = res;
      set({ teachersData: data?.records });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },
});

const devstore = devtools(store);
export const useNaacAcademic32 = create(devstore);

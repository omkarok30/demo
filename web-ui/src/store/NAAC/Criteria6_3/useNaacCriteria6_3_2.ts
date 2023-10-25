import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import * as service from '@/services/NAAC/Criteria6_3/criteria6_3_2';

export const store = (set: any, _get: any) => ({
  current: {},
  FInancialRecord: [],
  currFInancial: [],
  staffData: [],

  getAllFInancialReport: async (year: number) => {
    try {
      const res = await service.getAllFInancialReportByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['academicYear'], ['desc']);
      const currDataByYear = sortData?.find((item: any) => item.academicYear === year);
      set({ FInancialRecord: sortData, current: currDataByYear });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getFInancialReportData: async (year: number) => {
    try {
      const res = await service.getFInancialReportDataByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['academicYear'], ['desc']);
      set({ currFInancial: sortData });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },
});

const devstore = devtools(store);
export const useNaacCriteria632 = create(devstore);

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import * as service from '@/services/NAAC/Criteria5/criteria5_1';
import _ from 'lodash';

export const store = (set: any, get: any) => ({
  current: {},
  scholarsData: [],
  studentsData: [],
  comboByName: [],

  getGovtScholarRecords: async (year: string | number) => {
    try {
      const res = await service.getGovtScholarDataByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['yearAt'], ['desc']);
      const currDataByYear = sortData?.find((item: any) => item.yearAt === year)
      set({ scholarsData: sortData, current: currDataByYear });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getAllScholarshipData: async (year: string | number) => {
    try {
      const res = await service.getAllScholarDataByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['yearAt'], ['desc']);
      set({ scholarsData: sortData });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getStudentsRecords: async (year: string | number) => {
    try {
      const res = await service.getStudentsRecordByYear(year);
      const data: any = res;
      set({ studentsData: data.records });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },
});

const devstore = devtools(store);
export const useNaacCriteria511 = create(devstore);

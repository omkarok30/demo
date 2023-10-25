import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import * as service from '@/services/NAAC/Criteria5/criteria5_2';
import _ from 'lodash';

export const store = (set: any, get: any) => ({
  current: {},
  instituteData: [],
  studentsData: [],
  comboByName: [],

  getNonGovtScholarRecords: async (year: string | number) => {
    try {
      const res = await service.getNonGovtScholarDataByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['yearAt'], ['desc']);
      const currDataByYear = sortData?.find((item: any) => item.yearAt === year)
      set({ instituteData: sortData, current: currDataByYear });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getAllInstituteData: async (year: string | number) => {
    try {
      const res = await service.getAllInstituteDataByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['yearAt'], ['desc']);
      set({ instituteData: sortData });
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
export const useNaacCriteria512 = create(devstore);

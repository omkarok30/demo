import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import * as service from '@/services/NAAC/Criteria5_4/criteria5_4_2';

export const store = (set: any, _get: any) => ({
  current: {},
  contributionRecord: [],
  studentsData: [],

  getAllContributionRecords: async (year: number) => {
    try {
      const res = await service.getAllContributionByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['academicYear'], ['desc']);
      const currDataByYear = sortData?.find((item: any) => item.academicYear === year);
      set({ contributionRecord: sortData, current: currDataByYear });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getAwardsStudents: async (year: number) => {
    try {
      const res = await service.getAwardsStudentsRecord(year);

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
export const useNaacCriteria542 = create(devstore);

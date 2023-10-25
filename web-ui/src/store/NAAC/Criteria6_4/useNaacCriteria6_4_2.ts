import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import * as service from '@/services/NAAC/Criteria6_4/criteria6_4_2';

export const store = (set: any, _get: any) => ({
  current: {},
  FundsGrantRecord: [],
  currFundsGrant: [],
  FundsGrantData: [],

  getAllFundsGrantRecords: async (year: number) => {
    try {
      const res = await service.getAllFundsGrantByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['academicYear'], ['desc']);
      const currDataByYear = sortData?.find((item: any) => item.academicYear === year);
      set({ FundsGrantRecord: sortData, current: currDataByYear });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getFundsGrantData: async (year: number) => {
    try {
      const res = await service.getFundsGrantDataByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['academicYear'], ['desc']);
      set({ currFundsGrant: sortData });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getFundsGrantById: async (year: number, id: string[]) => {
    const staffIds = id.map(ids => Number(ids));
    try {
      const res = await service.getFundsGrantRecord(year);

      const data: any = res;
      const filterData = data?.records?.filter((list: any) => {
        return staffIds ? staffIds.includes(list.id) : list;
      });
      set({ currFundsGrant: filterData });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },
});

const devstore = devtools(store);
export const useNaacCriteria642 = create(devstore);

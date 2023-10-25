import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import * as service from '@/services/NAAC/Criteria5/criteria5_1_4';
import _ from 'lodash';

export const store = (set: any, get: any) => ({
  current: {},
  currentActivity: {},
  counsellingRecords: [],

  getCounsellingRecords: async (year: string | number) => {
    try {
      const res = await service.getCounselDataByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['yearAt'], ['desc']);
      const currDataByYear = sortData?.find((item: any) => item.yearAt === year)
      set({ counsellingRecords: sortData, current: currDataByYear });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getCounselCurrYear: async (year) => {
    try {
      const res = await service.getCounselByYear(year);
      const data: any = res;
      set({ current: data.records });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getCurrActivityByYear: async (year) => {
    try {
      const res = await service.getActivityByYear(year);
      const data: any = res;
      set({ current: data.records });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  updatePlacements: async (year, value) => {
    try {
      const res = await service.updateCampusPlacement(year, value);
      const data: any = res;
      set({ current: data.records });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  uploadDocument: async (id, activityId, value) => {
    try {
      const res = await service.uploadActivityDocs(id, activityId, value);
      const data: any = res;
      set({ current: data.records });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },
});

const devstore = devtools(store);
export const useNaacCriteria514 = create(devstore);

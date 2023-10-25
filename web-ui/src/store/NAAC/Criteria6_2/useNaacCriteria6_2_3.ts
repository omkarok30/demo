import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import * as service from '@/services/NAAC/Criteria6_2/criteria6_2_3';

export function store(set: any, _get: any) {
  return {
    currentSelected: {},
    egovernanceOption: [],
    areaRecords: [],

    getEgovernanceList: async (year) => {
      try {
        const res = await service.getAllEgovernance();
        const data: any = res;
        const currData: any = data?.records?.find((item: any) => item.academicYear === year);
        set({ skillsOption: data.records, currentSelected: currData });
      } catch (e) {
      // eslint-disable-next-line no-console
        console.log(e);
      }
    },

    getEgovernanceCurrYear: async (year) => {
      try {
        const res = await service.getEgovernanceByYear(year);
        const data: any = res;
        set({ currentSelected: data.records });
      } catch (e) {
      // eslint-disable-next-line no-console
        console.log(e);
      }
    },

    updateEgovernanceOption: async (year, option) => {
      try {
        const res = await service.updateEgovernanceByYear(year, option);
        const data: any = res;
        set({ skillsOption: data.records });
      } catch (e) {
      // eslint-disable-next-line no-console
        console.log(e);
      }
    },

    getAllAreaGovernance: async (year) => {
      try {
        const res = await service.getAreaGovernanceByYear(year);
        const data: any = res;
        set({ areaRecords: data.records });
      } catch (e) {
      // eslint-disable-next-line no-console
        console.log(e);
      }
    },
  };
}

const devstore = devtools(store);
export const useNaacCriteria623 = create(devstore);

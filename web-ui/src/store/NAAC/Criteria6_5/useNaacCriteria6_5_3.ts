import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import * as service from '@/services/NAAC/Criteria6_5/criteria6_5_3';

export const store = (set: any, _get: any) => ({
  currentSelected: {},
  qualityOption: [],
  initiativeRecords: [],
  qualityAssurance: [],

  getQualityList: async (year) => {
    try {
      const res = await service.getAllQualityList();
      const data: any = res;
      const currData: any = data?.records?.find((item: any) => item.academicYear === year);
      set({ qualityAssurance: data.records, currentSelected: currData });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getQualityCurrYear: async (year) => {
    try {
      const res = await service.getQualityByYear(year);
      const data: any = res;
      set({ currentSelected: data.records });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  updateQualityOption: async (year, option) => {
    try {
      const res = await service.updateQualityByYear(year, option);
      const data: any = res;
      set({ qualityAssurance: data.records });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getAllQuality: async (year) => {
    try {
      const res = await service.getAreaGovernanceByYear(year);
      const data: any = res;
      set({ initiativeRecords: data.records });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },
});

const devstore = devtools(store);
export const useNaacCriteria653 = create(devstore);

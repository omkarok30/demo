import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import * as service from '@/services/NAAC/Criteria5/criteria5_1_5';

export const store = (set: any, get: any) => ({
  currentSelected: {},
  mechanismsOption: [],

  getGrievancesList: async (year) => {
    try {
      const res = await service.getAllGrievances();
      const data: any = res
      const currData: any = data?.records?.find((item: any) => item.academicYear === year.toString());
      set({ skillsOption: data.records, currentSelected: currData });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getGrievancesCurrYear: async (year) => {
    try {
      const res = await service.getGrievancesByYear(year);
      const data: any = res;
      set({ currentSelected: data.records });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  updateGrievancesOption: async (year, option) => {
    try {
      const res = await service.updateGrievancesByYear(year, option);
      const data: any = res;
      set({ skillsOption: data.records });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },
});

const devstore = devtools(store);
export const useNaacCriteria515 = create(devstore);

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import * as service from '@/services/NAAC/RadioButton/radioButtonService';

export const store = (set: any, _get: any) => ({
  currentSelected: {},
  skillsOption: [],

  getSkillsOptionList: async (year: number, criteriaNum: string) => {
    try {
      const res = await service.getAllSkillsOptionList();
      const data: any = res;
      const currData: any = data?.records?.find((item: any) => item.academicYear === year && item.criteriaNumber === criteriaNum);
      set({ skillsOption: data.records, currentSelected: currData });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getSkillsByYear: async (year: number, criteriaNum: string) => {
    try {
      const res = await service.getSkillsOptionByYear(year);
      const data: any = res;
      const currData: any = data?.records?.find((item: any) => item.criteriaNumber === criteriaNum);
      set({ currentSelected: currData });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  updateSkillOption: async (year, option) => {
    try {
      const res = await service.updateSkillOptionByYear(year, option);
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
export const useNaacRadioButton = create(devstore);

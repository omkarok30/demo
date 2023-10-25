import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  getApplicableDegreeLevels,
  getacademicyear,
  getunistudInsuranceData,
} from '@/services/settings/uniStudInsurance';

export const useUniStudInsurance = create(
  devtools((set: any) => ({
    unistudinsuranceColumns: [],
    unistudinsurancedata: [],
    applicabledegreelevel: [],
    academicyear: [],
    layout: 'vertical',
    getApplicableDegreeLevels: async () => {
      const res = await getApplicableDegreeLevels();
      set({ applicabledegreelevel: await res });
    },
    getunistudInsuranceData: async () => {
      const res = await getunistudInsuranceData();
      set({ unistudinsurancedata: await res });
    },

    getacademicyear: async () => {
      const res = await getacademicyear();
      set({ academicyear: await res });
    },

    unistudInsuranceYearwise: async (id: any) => {
      const res = await getunistudInsuranceData();
      set({ unistudinsurancedata: await res });
      set((state: any) => ({
        unistudinsurancedata: state.unistudinsurancedata.filter(
          (insurancedetails: any) => insurancedetails.year === id,
        ),
      }));
    },
    deleteunistudinsurances: (id: any) => {
      set((state: any) => ({
        unistudinsurancedata: state.unistudinsurancedata.filter(
          (insurancedetails: any) => insurancedetails.id !== id,
        ),
      }));
    },

    clearunistudinsurance: async () => {
      set({ unistudinsurancedata: '' });
    },
  })),
);

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getInsuranceDetail, getInsuranceDetails } from '@/services/settings/studentInsurance';

export const useStudentInsurance = create(
  devtools((set: any, get: any) => ({
    insuranceDetail: '',
    insuranceDetails: [],
    insuranceDetailsColumns: [],
    layout: 'vertical',
    getInsuranceDetails: async () => {
      const res = await getInsuranceDetails();
      set({ insuranceDetails: await res });
    },

    clearInsuranceDetail: async () => {
      set({ insuranceDetail: '' });
    },

    getInsuranceDetail: async (id = 0) => {
      const res = await getInsuranceDetail(id);
      set({ insuranceDetail: await res });
    },

    addinsuranceDetails: (object: any) => {
      set({ insuranceDetails: [...get().insuranceDetails, object] });
    },

    updateInsuranceDetail: (selectedInsurance: any) => {
      set((state: any) => ({
        insuranceDetails: state.insuranceDetails.map((insurance: any) => {
          if (insurance.id === selectedInsurance?.id) {
            return selectedInsurance;
          }
          else {
            return insurance;
          }
        }),
      }));
    },

    deleteInsuranceDetails: (id: any) => {
      set((state: any) => ({ insuranceDetails: state.insuranceDetails.filter((institute: any) => institute.id !== id) }));
    },
  })),
);

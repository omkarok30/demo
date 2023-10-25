import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getStudInsStructureDetail, getStudInsStructureDetails } from '@/services/settings/studentInsuranceStructure';

export const useStudentInsuranceStructure = create(
  devtools((set: any, get: any) => ({
    studInsStruDetail: '',
    studInsStruDetails: [],
    studInsStruDetailsColumns: [],
    layout: 'vertical',
    getStudInsStructureDetails: async () => {
      const res = await getStudInsStructureDetails();
      set({ studInsStruDetails: await res });
    },

    clearstudInsStruDetail: async () => {
      set({ studInsStruDetail: '' });
    },

    getStudInsStructureDetail: async (id: any) => {
      const res = await getStudInsStructureDetail(id);
      set({ studInsStruDetail: await res });
    },

    addstudInsStruDetails: (institute: any) => {
      set({ studInsStruDetails: [...get().studInsStruDetails, institute] });
    },

    updatestudInsStruDetail: (selectedInsurance: any) => {
      set((state: any) => ({
        studInsStruDetails: state.studInsStruDetails.map((insurance: any) => {
          if (insurance.id === selectedInsurance?.id) {
            return selectedInsurance;
          }
          else {
            return insurance;
          }
        }),
      }));
    },

    deletestudInsStruDetails: (id: any) => {
      set((state: any) => ({ studInsStruDetails: state.studInsStruDetails.filter((institute: any) => institute.id !== id) }));
    },

  })),
);

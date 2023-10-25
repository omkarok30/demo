import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getfeestructure, getfeestructuresdata } from '@/services/settings/collegeFeeStructure';

export const useCollegeFeeStructure = create(
  devtools((set: any, get: any) => ({
    termduration: '',
    tdColumns: [],
    termdurationsdata: [],
    layout: 'vertical',
    getfeestructuresdata: async () => {
      const res = await getfeestructuresdata();
      set({ feestructuredata: await res });
    },
    getfeestructure: async (id = 0) => {
      const res = await getfeestructure(id);
      set({ feestructure: await res });
    },
    updatefeestructure: (selectedfeestructure: any) => {
      set((state: any) => ({
        feestructures: state.feestructure.map((feestructure: any) => {
          if (feestructure.id === selectedfeestructure?.id) {
            return selectedfeestructure;
          }
          else {
            return feestructure;
          }
        }),
      }));
    },
    addfeestructure: (institute: any) => {
      set({ feestructuredata: [...get().feestructuredata, institute] });
    },

    clearfeestructure: async () => {
      set({ feestructure: '' });
    },

    deletefeestructure: (id: any) => {
      set((state: any) => ({ feestructuredata: state.feestructuredata.filter((institute: any) => institute.id !== id) }));
    },
  })),
);

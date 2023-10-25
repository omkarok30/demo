import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getfeehead, getfeeheads } from '@/services/settings/collegeFeeHead';

export const useCollegeFeeHead = create(
  devtools((set: any, get: any) => ({
    termduration: '',
    tdColumns: [],
    termdurationsdata: [],
    layout: 'vertical',
    getfeeheads: async () => {
      const res = await getfeeheads();
      set({ feeheaddata: await res });
    },
    getfeehead: async (id = 0) => {
      const res = await getfeehead(id);
      set({ feehead: await res });
    },

    updatefeehead: (selectedfeehead: any) => {
      set((state: any) => ({
        feeheads: state.feehead.map((feehead: any) => {
          if (feehead.id === selectedfeehead?.id) {
            return selectedfeehead;
          }
          else {
            return feehead;
          }
        }),
      }));
    },
    addfeehead: (institute: any) => {
      set({ feeheaddata: [...get().feeheaddata, institute] });
    },

    clearfeehead: async () => {
      set({ feehead: '' });
    },

    deletefeehead: (id: any) => {
      set((state: any) => ({ feeheaddata: state.feeheaddata.filter((institute: any) => institute.id !== id) }));
    },
  })),
);

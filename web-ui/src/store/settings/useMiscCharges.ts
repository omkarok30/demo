import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getmisccharge, getmisccharges } from '@/services/settings/miscCharges';

export const useMiscCharges = create(
  devtools((set: any, get: any) => ({
    termduration: '',
    tdColumns: [],
    termdurationsdata: [],
    layout: 'vertical',
    getmisccharges: async () => {
      const res = await getmisccharges();
      set({ miscchargedata: await res });
    },
    getmisccharge: async (id = 0) => {
      const res = await getmisccharge(id);
      set({ misccharge: await res });
    },
    updatemisccharge: (selectedmisccharge: any) => {
      set((state: any) => ({
        misccharges: state.misccharge.map((misccharge: any) => {
          if (misccharge.id === selectedmisccharge?.id) {
            return selectedmisccharge;
          }
          else {
            return misccharge;
          }
        }),
      }));
    },
    addmisccharge: (object: any) => {
      set({ miscchargedata: [...get().miscchargedata, object] });
    },

    clearmisccharge: async () => {
      set({ misccharge: '' });
    },

    deletemisccharge: (id: any) => {
      set((state: any) => ({ miscchargedata: state.miscchargedata.filter((institute: any) => institute.id !== id) }));
    },
  })),
);

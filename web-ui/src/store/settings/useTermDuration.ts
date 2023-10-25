import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { gettermduration, gettermdurations } from '@/services/settings/termDuration';

export const useTermDuration = create(
  devtools((set: any, get: any) => ({

    termduration: '',
    tdColumns: [],
    termdurationsdata: [],
    layout: 'vertical',
    gettermdurations: async () => {
      const res = await gettermdurations();
      set({ termdurationsdata: await res });
    },
    gettermduration: async (id: any) => {
      const res = await gettermduration(id);
      set({ termduration: await res });
    },

    updatetermduration: (selectedtermduration: any) => {
      set((state: any) => ({
        termdurations: state.termdurations.map((termduration: any) => {
          if (termduration.id === selectedtermduration?.id) {
            return selectedtermduration;
          }
          else {
            return termduration;
          }
        }),
      }));
    },
    addtermduration: (institute: any) => {
      set({ termdurationsdata: [...get().termdurationsdata, institute] });
    },

    cleartermduration: async () => {
      set({ termduration: '' });
    },

    deletetermdurationdetails: (id: any) => {
      set((state: any) => ({ termdurationsdata: state.termdurationsdata.filter((institute: any) => institute.id !== id) }));
    },
  })),
);

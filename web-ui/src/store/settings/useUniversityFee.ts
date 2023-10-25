import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getuniversityfeehead, getuniversityfeeheads } from '@/services/settings/universityFee';

export const useUniversityFee = create(
  devtools((set: any, get: any) => ({

    termduration: '',
    tdColumns: [],
    termdurationsdata: [],
    layout: 'vertical',
    getuniversityfeeheads: async () => {
      const res = await getuniversityfeeheads();
      set({ universityfeeheaddata: await res });
    },
    getuniversityfeehead: async (id: any) => {
      const res = await getuniversityfeehead(id);
      set({ universityfeehead: await res });
    },

    updateuniversityfeehead: (selecteduniversityfeehead: any) => {
      set((state: any) => ({
        universityfeeheads: state.universityfeehead.map((universityfeehead: any) => {
          if (universityfeehead.id === selecteduniversityfeehead?.id) {
            return selecteduniversityfeehead;
          }
          else {
            return universityfeehead;
          }
        }),
      }));
    },
    adduniversityfeehead: (object: any) => {
      set({ universityfeeheaddata: [...get().universityfeeheaddata, object] });
    },

    clearuniversityfeehead: async () => {
      set({ universityfeehead: '' });
    },

    deleteuniversityfeehead: (id: any) => {
      set((state: any) => ({ universityfeeheaddata: state.universityfeeheaddata.filter((object: any) => object.id !== id) }));
    },
  })),
);

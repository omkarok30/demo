import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getuniversityfeestructure, getuniversityfeestructures } from '@/services/settings/universityFeeStructure';

export const useUniversityFeeStructure = create(
  devtools((set: any, get: any) => ({
    termduration: '',
    tdColumns: [],
    termdurationsdata: [],
    layout: 'vertical',
    getuniversityfeestructures: async () => {
      const res = await getuniversityfeestructures();
      set({ universityfeestructuredata: await res });
    },
    getuniversityfeestructure: async (id: any) => {
      const res = await getuniversityfeestructure(id);
      set({ universityfeestructure: await res });
    },

    updateuniversityfeestructure: (selecteduniversityfeestructure: any) => {
      set((state: any) => ({
        universityfeestructures: state.universityfeestructure.map((universityfeestructure: any) => {
          if (universityfeestructure.id === selecteduniversityfeestructure?.id) {
            return selecteduniversityfeestructure;
          }
          else {
            return universityfeestructure;
          }
        }),
      }));
    },
    adduniversityfeestructure: (institute: any) => {
      set({
        universityfeestructuredata: [...get().universityfeestructuredata, institute],
      });
    },

    clearuniversityfeestructure: async () => {
      set({ universityfeestructure: '' });
    },

    deleteuniversityfeestructure: (id: any) => {
      set((state: any) => ({ universityfeestructuredata: state.universityfeestructuredata.filter((institute: any) => institute.id !== id) }));
    },

  })),
);

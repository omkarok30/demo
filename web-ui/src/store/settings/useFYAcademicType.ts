import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getFYAcademicsYears } from '@/services/settings/fyAcademicsType';

export const useFYAcademicType = create(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  devtools((set: any, get: any) => ({
    fytypeyears: '',
    fytypeColumns: [],
    fytypeyearsdata: [],
    layout: 'vertical',
    getFYAcademicsYears: async () => {
      const res = await getFYAcademicsYears();
      set({ fytypeyearsdata: await res });
    },

    clearfyacademicstype: async () => {
      set({ fytypeyearsdata: '' });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateFYtype: (id: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      set((state: any) => ({
        /* fytypeyearsdata: state.fytypeyearsdata.map((typesdata: any) => {
                if (typesdata.id === id) {
                if(typesdata.aytype==="Type A"){
                        typesdata.aytype="Type B"
                    }else if(typesdata.aytype==="Type B"){
                        typesdata.aytype="Type A"
                    }

                }else{
                    typesdata=typesdata;
                }
            }) */
      }));
    },
  })),
);

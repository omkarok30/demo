import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import * as service from '@/services/admissions/admissionDetails';
import * as modelAdmissionDetails from '@/models/admissions/studentRecords/AdmissionDetails';
import { convertValues } from '@/utils/cast';

export const useAdmissionDetails = create(
  devtools((set: any, get: any) => ({
    current: {},
    allRecords: [],

    getRecords: async (id: any) => {
      try {
        const res = await service.getAdmissionDetails(id);
        const data = convertValues(res, modelAdmissionDetails.allColumns);
        set({ current: data });
      }
      catch (e) {
        console.log(e);
      }
    },
    updateRecord: async (id: string, values: any) => {
      try {
        const data = modelAdmissionDetails.submitJSON(values);
        const resp = await service.updateDetails(id, data);
        set({ current: resp });
      }
      catch (e) { }
    },

    clearRecord: async () => {
      set({ current: {} });
    },
  })),
);

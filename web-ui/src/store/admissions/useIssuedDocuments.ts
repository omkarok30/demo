import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '../global';
import * as service from '@/services/admissions/issuedDocuments';
import * as modalIssuedDocuments from '@/models/admissions/studentRecords/issuedDocuments';
import { convertForDisplay, convertValues } from '@/utils/cast';

export const useIssuedDocument = create(
  devtools((set: any, get: any) => ({
    current: {},
    allRecords: [],

    getRecords: async () => {
      try {
        const global = useGlobalState.getState().default;
        const res = await service.getRecords();
        const records: any = [];
        _.each(res, (item) => {
          const record = convertForDisplay(
            item,
            modalIssuedDocuments.allColumns,
            global,
          );
          records.push(record);
        });
        set({ allRecords: records });
      }
      catch (e) {}
    },

    getRecord: async (id = 'new') => {
      if (id === 'new') {
        set({ current: {} });
        return;
      }
      const res = await service.getIssuedDocuments(id);
      const data = convertValues(res, modalIssuedDocuments.allColumns);
      set({ current: data });
    },

    clearRecord: async () => {
      set({ current: {} });
    },

    addRecord: async (values: any) => {
      const data = modalIssuedDocuments.submitJSON(values);
      await service.add(data);
      set({ allRecords: [...get().allRecords, values] });
    },

    updateRecord: async (id: string, values: any) => {
      try {
        const data = modalIssuedDocuments.submitJSON(values);
        const resp = await service.update(id, data);
        set({ current: resp });
      }
      catch (e) {}
    },
  })),
);

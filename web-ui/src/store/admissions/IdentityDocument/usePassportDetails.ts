import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '../../global';
import * as service from '@/services/admissions/IdentityDocs/passportDetails';
import * as modal from '@/models/admissions/studentRecords/IdentityDocs/passportDetails';
import { convertForDisplay, convertValues } from '@/utils/cast';

export const usePassportDocuments = create(
  devtools((set: any, get: any) => ({
    current: {},
    allRecords: [],

    getRecords: async () => {
      try {
        const global = useGlobalState.getState().default;
        const res = await service.getAllDetails();
        const records: any = [];
        _.each(res, (item) => {
          const record = convertForDisplay(item, modal.allColumns, global);
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
      const res = await service.getRecord(id);
      const data = convertValues(res, modal.allColumns);
      set({ current: data });
    },

    clearRecord: async () => {
      set({ current: {} });
    },

    addRecord: async (values: any) => {
      const data = modal.submitJSON(values);
      await service.add(data);
      set({ allRecords: [...get().allRecords, values] });
    },

    updateRecord: async (id: string, values: any) => {
      try {
        const data = modal.submitJSON(values);
        const resp = await service.update(id, data);
        set({ current: resp });
      }
      catch (e) {}
    },

    asOptions: () => {
      const options = _.map(get().allRecords, record => ({
        value: record.yearAt,
        label: record.year,
      }));
      return options;
    },
  })),
);

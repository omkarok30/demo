import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '../global';
import * as service from '@/services/admissions/bankingDetails';
import * as modalBankingDetails from '@/models/admissions/studentRecords/bankingDetails';
import { convertForDisplay, convertValues } from '@/utils/cast';

export const useBankingDetails = create(
  devtools((set: any, get: any) => ({
    current: {},
    allRecords: [],

    getRecords: async () => {
      try {
        const global = useGlobalState.getState().default;
        const res = await service.getAllDetails();
        const records: any = [];
        _.each(res, (item) => {
          const record = convertForDisplay(
            item,
            modalBankingDetails.allColumns,
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
      const res = await service.getRecord(id);
      const data = convertValues(res, modalBankingDetails.allColumns);
      set({ current: data });
    },

    clearRecord: async () => {
      set({ current: {} });
    },

    addRecord: async (values: any) => {
      const data = modalBankingDetails.submitJSON(values);
      await service.add(data);
      set({ allRecords: [...get().allRecords, values] });
    },

    updateRecord: async (id: string, values: any) => {
      try {
        const data = modalBankingDetails.submitJSON(values);
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

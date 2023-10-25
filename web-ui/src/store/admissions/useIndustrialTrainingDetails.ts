import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '../global';
import * as service from '@/services/admissions/industrialTrainingDetails';
import * as modelIndustraialTrainingDetails from '@/models/admissions/studentRecords/IndustrialTrainingDetails';
import { convertForDisplay, convertValues } from '@/utils/cast';

export const useIndustrialTrainingDetails = create(
  devtools((set: any, get: any) => ({
    current: {},
    allRecords: [],

    getRecords: async (id: any) => {
      try {
        const global = useGlobalState.getState().default;
        const res = await service.getDetails(id);
        const records: any = [];
        _.each(res, (item) => {
          const record = convertForDisplay(
            item,
            modelIndustraialTrainingDetails.allColumns,
            global,
          );
          records.push(record);
        });
console.log(records);
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
      const data = convertValues(res, modelIndustraialTrainingDetails.allColumns);
      set({ current: data });
    },

    clearRecord: async () => {
      set({ current: {} });
    },

    addRecord: async (values: any) => {
      const data = modelIndustraialTrainingDetails.submitJSON(values);
      await service.add(data);
      set({ allRecords: [...get().allRecords, values] });
    },

    updateRecord: async (id: string, values: any) => {
      try {
        const data = modelIndustraialTrainingDetails.submitJSON(values);
        const resp = await service.update(id, data);
        set({ current: resp });
      }
      catch (e) {}
    },
    deleteRecord: async (id: string) => {
      await service.deleteRecord(id);
      set({ allRecords: [...get().allRecords] });
    },
  })),
);

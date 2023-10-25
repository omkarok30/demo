import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '../global';
import * as service from '@/services/admissions/studentDocuments';
import * as modalStudentDocuments from '@/models/admissions/studentRecords/StudentDocuments';
import { convertForDisplay, convertValues } from '@/utils/cast';

export const useStudentDocuments = create(
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
            modalStudentDocuments.allColumns,
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
      const data = convertValues(res, modalStudentDocuments.allColumns);
      set({ current: data });
    },

    clearRecord: async () => {
      set({ current: {} });
    },

    addRecord: async (values: any) => {
      const data = modalStudentDocuments.submitJSON(values);
      await service.add(data);
      set({ allRecords: [...get().allRecords, values] });
    },

    updateRecord: async (id: string, values: any) => {
      try {
        const data = modalStudentDocuments.submitJSON(values);
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

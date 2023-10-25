import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '../global';
import * as service from '@/services/admissions/studentInfo';
import * as modelStudentInfo from '@/models/admissions/studentRecords/StudentInfo';
import { convertForDisplay, convertValues } from '@/utils/cast';

export const useBasicDetails = create(
  devtools((set: any, get: any) => ({
    current: {},
    allRecords: [],

    getRecords: async (id: any) => {
      try {
        const res = await service.getStudent(id);
        const data = convertValues(res, modelStudentInfo.allColumns);
        set({ current: data });
      }
      catch (e) {
        console.log(e);
      }
    },
    updateRecord: async (id: string, values: any) => {
      try {
        const data = modelStudentInfo.submitJSON(values);
        const resp = await service.updateBasicDetails(id, data);
        set({ current: resp });
      }
      catch (e) { }
    },

    clearRecord: async () => {
      set({ current: {} });
    },
  })),
);

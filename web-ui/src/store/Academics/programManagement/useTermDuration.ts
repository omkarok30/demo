import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '@/store/global';
import * as service from '@/services/Academics/programManagement/termDuration';
import * as modelTermDuration from '@/models/Academics/programManagement/termDuration';
import { convertForDisplay, convertValues } from '@/utils/cast';

const departmentType = 'academic';

export const store = (set: any, get: any) => ({
  current: {},
  annualallRecords: [],
  semsterallRecords: [],
  trimesterallRecords: [],


  getRecords: async (year: string) => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllTermDurations(year);
      const data: any = res;
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(
          item,
          modelTermDuration.allColumns,
          global,
        );
        records.push(record);
      });
      const annualallRecords = _.filter(records, record => record.term === 'annual');
      const semsterallRecords = _.filter(records, record => record.term === 'semester');
      const trimesterallRecords = _.filter(records, record => record.term === 'trimester');
      set({ annualallRecords, semsterallRecords, trimesterallRecords });
    }
    catch (e) {
      console.log(e);
    }
  },

  clearRecord: async () => {
    set({ current: {} });
  },

  getRecord: async (id = 'new') => {
    if (id === 'new') {
      set({ current: {} });
      return;
    }
    const res = await service.getTermDuration(id);
    const data = convertValues(res, modelTermDuration.allColumns);
    set({ current: data });
  },

  addRecord: async (values: any) => {
    try {
      values.id = 'new';
      values.type = departmentType;
      const data = modelTermDuration.submitJSON(values);
      const res = await service.add(data);
      set({ allRecords: [] });
      return res;
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },

  updateRecord: async (id: string, values: any) => {
    try {
      values.id = id;
      values.type = departmentType;
      const data = modelTermDuration.submitJSON(values);
      const res = await service.update(id, data);
      set({ allRecords: [] });
      return res;
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },
});

const devstore = devtools(store);
export const useTermDuration = create(devstore);

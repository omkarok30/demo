import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '@/store/global';
import * as service from '@/services/fyacademics/courseManagement/batches';
import * as modelBatches from '@/models/fyacademics/courseManagement/Batches';
import { convertForDisplay, convertValues } from '@/utils/cast';

export const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],

  getRecords: async (year: string) => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllFybatches(year);
      let data: any = res;
      data = _.orderBy(data, ['Batch'], ['asc']);
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelBatches.allColumns, global);
        records.push(record);
      });
      set({ allRecords: records });
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
    const res = await service.getBatches(id);
    const data = convertValues(res, modelBatches.allColumns);
    set({ current: data });
  },

  addRecord: async (values: any) => {
    try {
      values.id = 'new';
      const data = modelBatches.submitJSON(values);
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
      const data = modelBatches.submitJSON(values);
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
export const useBatches = create(devstore);

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';

import * as service from '@/services/Academics/programManagement/po';
import * as modelPo from '@/models/Academics/programManagement/po';
import { convertForDisplay, convertValues } from '@/utils/cast';
import { useGlobalState } from '@/store/global';

const store = (set: any, get: any) => ({
  current: {},
  allPoRecords: [],

  getRecords: async (year: string, program: string) => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllPo(year,program);
      const data: any = res;
      console.log('po',res);
      
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelPo.allColumns, global);
        records.push(record);
      });
      set({ allPoRecords: records });
    }
    catch (e) { }
  },

  getRecord: async (id = 'new') => {
    if (id === 'new') {
      set({ current: {} });
      return;
    }
    const res = await service.getPo(id);
    const data = convertValues(res, modelPo.allColumns);
    set({ current: data });
  },

  addRecord: async (values: any) => {
    try {
      values.id = 'new';
      const data = modelPo.submitJSON(values);
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
      const data = modelPo.submitJSON(values);
      const res = await service.update(id, data);
      // set({ current: resp });
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
export const usePo = create(devstore);

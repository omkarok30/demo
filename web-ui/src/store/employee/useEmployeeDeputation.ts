import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';

import { useGlobalState } from '../global';
import * as service from '@/services/employees/employeeDeputation';
import * as modelEmployeeDeputation from '@/models/Employee/EmployeeDeputation';
import { convertForDisplay, convertValues } from '@/utils/cast';

const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],

  getRecords: async () => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getEmployeeDeputations();
      const data: any = res?.records;
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelEmployeeDeputation.allColumns, global);
        records.push(record);
      });
      set({ allRecords: records });
    }
    catch (e) { }
  },

  getRecord: async (id = 'new') => {
    if (id === 'new') {
      set({ current: {} });
      return;
    }
    const res = await service.getEmployeeDeputation(id);
    const data = convertValues(res, modelEmployeeDeputation.allColumns);
    set({ current: data });
  },

  addRecord: async (values: any) => {
    try {
      values.id = 'new';
      const data = modelEmployeeDeputation.submitJSON(values);
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
      const data = modelEmployeeDeputation.submitJSON(values);
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
export const useEmployeeDeputation = create(devstore);

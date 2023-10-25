import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';

import { useGlobalState } from '../global';
import * as service from '@/services/employees/employeeDashboard';
import * as modelEmployeeDashboard from '@/models/Employee/EmployeeDashboard';
import { convertForDisplay, convertValues } from '@/utils/cast';

const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],
  activeRecord:[],
  AcademicsRecord:[],

  getRecords: async () => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getRecords();
      const data: any = res?.records;
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelEmployeeDashboard.allColumns, global);
        records.push(record);
      });
      const activestaff = _.filter(records, record => record.inactive === false);
      const inactivestaff = _.filter(records, record => record.inactive === true);
      set({ allRecords: records ,activeRecord: activestaff, AcademicsRecord: inactivestaff });
    }
    catch (e) { }
  },

  getRecord: async (id = 'new') => {
    if (id === 'new') {
      set({ current: {} });
      return;
    }
    const res = await service.getEmployeeDashboard(id);
    const data = convertValues(res, modelEmployeeDashboard.allColumns);
    set({ current: data });
  },

  addRecord: async (values: any) => {
    try {
      values.id = 'new';
      const data = modelEmployeeDashboard.submitJSON(values);
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
      const data = modelEmployeeDashboard.submitJSON(values);
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
export const useEmployeeDashboard = create(devstore);

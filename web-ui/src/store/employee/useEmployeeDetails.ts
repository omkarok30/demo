import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';

import { useGlobalState } from '../global';
import * as service from '@/services/employees/employeeDetails';
import * as modelEmployeeDetails from '@/models/Employee/EmployeeDetails';
import { convertForDisplay, convertValues } from '@/utils/cast';

const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],

  getRecords: async () => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getEmployeeDetails();
      const data: any = res?.records;
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelEmployeeDetails.allColumns, global);
        records.push(record);
      });
      const optionsstudents = _.map(records, record => ({ value: record.id, label: record.firstName + record.middleName + record.lastName }));

      const optionsEmployee = _.map(records, record => ({ value: record.id, label: `${record.firstName}  ${record.middleName}  ${record.lastName}` }));

      set({ allRecords: records, optionsstudents, optionsEmployee });
    }
    catch (e) { }
  },

  getRecord: async (id = 'new') => {
    if (id === 'new') {
      set({ current: {} });
      return;
    }
    const res = await service.getEmployeeDetail(id);
    const data = convertValues(res, modelEmployeeDetails.allColumns);
    set({ current: data });
  },

  addRecord: async (values: any) => {
    try {
      values.id = 'new';
      const data = modelEmployeeDetails.submitJSON(values);
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
      const data = modelEmployeeDetails.submitJSON(values);
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
export const useEmployeeDetails = create(devstore);

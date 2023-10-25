import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';

import * as service from '@/services/employees/empolyeeBookDetails';
import * as modelEmployeeBookDetails from '@/models/Employee/DetailsOfActivity/BookDetails/BookDetails';
import { convertForDisplay, convertValues } from '@/utils/cast';
import { useGlobalState } from '@/store/global';

const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],

  getRecords: async () => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getEmployeeBookdetails();
      const data: any = res?.records;
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelEmployeeBookDetails.allColumns, global);
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
    const res = await service.getEmployeeBookdetail(id);
    const data = convertValues(res, modelEmployeeBookDetails.allColumns);
    set({ current: data });
  },

  addRecord: async (values: any) => {
    try {
      values.id = 'new';
      const data = modelEmployeeBookDetails.submitJSON(values);
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
      const data = modelEmployeeBookDetails.submitJSON(values);
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
export const useEmployeeBookDetails = create(devstore);

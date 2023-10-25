import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '@/store/global';
import * as service from '@/services/employees/employeeDocument';
import * as modelEmployeeDocument from '@/models/Employee/Employeedocument';
import { convertForDisplay, convertValues } from '@/utils/cast';


export const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],
  comboByName: [],
  allRecordsByName: [],

  getRecords: async () => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllEmployeeDocument();
      let data: any = res?.records;
      data = _.orderBy(data, ['nameofdocument'], ['asc']);
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelEmployeeDocument.allColumns, global);
        records.push(record);
      });
      const options = _.map(records, record => ({ value: record.id, label: record.toolName }));

      set({ allRecords: records, comboByName: options });
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
    const res = await service.getEmployeeDocument(id);
    const data = convertValues(res, modelEmployeeDocument.allColumns);
    set({ current: data });
  },

  addRecord: async (values: any) => {
    try {
      values.id = 'new';
      const data = modelEmployeeDocument.submitJSON(values);
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
      const data = modelEmployeeDocument.submitJSON(values);
      const res = await service.update(id, data);
      set({ allRecords: [] });
      return res;
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },

  deleteRecord: async (id: string) => {
    await service.deleteRecord(id);
    set({ allRecords: [...get().allRecords] });
  },
  
});

const devstore = devtools(store);
export const useEmployeeDocument = create(devstore);
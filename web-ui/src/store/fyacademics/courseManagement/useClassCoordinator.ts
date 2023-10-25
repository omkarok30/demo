import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '@/store/global';
import * as service from '@/services/fyacademics/courseManagement/classCoordinator';
import * as modelClassCoordinator from '@/models/fyacademics/courseManagement/ClassCoordinator';
import { convertForDisplay, convertValues } from '@/utils/cast';

const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],
  optionsClassCoordinator: [],

  getRecords: async (year: string) => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllClassCoordinator(year);

      const data: any = res;
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelClassCoordinator.allColumns, global);
        if (item.semester === '1') {
          record.semester1ccid = item.userId;
          record.semester1ccName = `${item.employee_info$firstName} ${item.employee_info$middleName} ${item.employee_info$lastName}`;
        }
        else {
          record.semester2ccid = item.userId;
          record.semester2ccName = `${item.employee_info$firstName} ${item.employee_info$middleName} ${item.employee_info$lastName}`;
        }
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
    const res = await service.getClassCoordinator(id);
    const data = convertValues(res, modelClassCoordinator.allColumns);
    set({ current: data });
  },

  addRecord: async (values: any) => {
    try {
      values.id = 'new';
      const data = modelClassCoordinator.submitJSON(values);
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
      const data = modelClassCoordinator.submitJSON(values);
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
export const useClassCoordinator = create(devstore);

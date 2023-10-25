import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '@/store/global';
import * as service from '@/services/fyacademics/courseManagement/divisions';
import * as modelDivisions from '@/models/fyacademics/courseManagement/Divisions';
import { convertForDisplay, convertValues } from '@/utils/cast';

const departmentType = 'academic';

export const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],

  getRecords: async (year: string) => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllFyDivisions(year);
      let data: any = res;
      data = _.orderBy(data, ['division'], ['asc']);
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelDivisions.allColumns, global);
        records.push(record);
      });

      const optionsDivision = _.map(records, record => ({ value: record.id, label: `${record.division} ` }));

      set({ allRecords: records, optionsDivision });
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
    const res = await service.getDivision(id);
    const data = convertValues(res, modelDivisions.allColumns);
    set({ current: data });
  },

  addRecord: async (values: any) => {
    try {
      values.id = 'new';
      const data = modelDivisions.submitJSON(values);
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
      const data = modelDivisions.submitJSON(values);
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
export const useDivisions = create(devstore);

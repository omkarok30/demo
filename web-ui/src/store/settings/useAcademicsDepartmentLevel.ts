import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '../global';
import * as service from '@/services/settings/departmentLevel';
import * as modelDepartmentLevel from '@/models/Academics/VisionAndMission/DepartmentLevel';
import { convertForDisplay, convertValues } from '@/utils/cast';

const departmentType = 'academic';

export const store = (set: any, get: any) => ({
  allRecords: [],
  current: {},

  getDepartmentLevels: async () => {
    const res = await service.getDepartmentLevels();
    //set({ instituteLevels: await res });
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getDepartmentLevels();
      const data: any = res?.records;
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelDepartmentLevel.allColumns, global);
        records.push(record);
      });
      set({ allRecords: records, current: _.first(records) });
    }
    catch (e) { }
  },

  getDepartmentLevel: async (id: any) => {
    const res = await service.getDepartmentLevel(id);
    const data = convertValues(res, modelDepartmentLevel.allColumns);
    set({ current: data });
  },

  updateRecord: async (id: string, values: any) => {
    try {
      values.id = id;
      const data = modelDepartmentLevel.submitJSON(values);
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
export const useDepartmentLevel = create(devstore);

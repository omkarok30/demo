import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '../global';
import * as service from '@/services/settings/instituteLevel';
import * as modelInstituteLevel from '@/models/Academics/VisionAndMission/InstituteLevel';
import { convertForDisplay, convertValues } from '@/utils/cast';

const departmentType = 'academic';

export const store = (set: any, get: any) => ({
  allRecords: [],
  current: {},

  getInstituteLevels: async () => {
    const res = await service.getInstituteLevels();
    //set({ instituteLevels: await res });
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getInstituteLevels();
      const data: any = res?.records;
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelInstituteLevel.allColumns, global);
        records.push(record);
      });
      set({ allRecords: records, current: _.first(records) });
    }
    catch (e) { }
  },

  getInstituteLevel: async (id: any) => {
    const res = await service.getInstituteLevel(id);
    const data = convertValues(res, modelInstituteLevel.allColumns);
    set({ current: data });
  },

  updateRecord: async (id: string, values: any) => {
    try {
      values.id = id;
      const data = modelInstituteLevel.submitJSON(values);
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
export const useInstituteLevel = create(devstore);

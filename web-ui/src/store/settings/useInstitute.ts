import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';

import { useGlobalState } from '../global';
import * as service from '@/services/settings/institute';
import * as modelInstitute from '@/models/settings/Institute';
import { convertForDisplay, convertValues } from '@/utils/cast';

const store = (set: any, _get: any) => ({
  allRecords: [],
  current: {},

  getInstitutes: async () => {
    const res = await service.getInstitutes();
    set({ institutes: await res });
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getInstitutes();
      const data: any = res?.records;
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelInstitute.allColumns, global);
        records.push(record);
      });
      set({ allRecords: records, current: _.first(records) });
    }
    catch (e) { }
  },

  getInstitute: async (id: any) => {
    const res = await service.getInstitute(id);
    const data = convertValues(res, modelInstitute.allColumns);
    set({ current: data });
  },

  updateRecord: async (id: string, values: any) => {
    try {
      values.id = id;
      const data = modelInstitute.submitJSON(values);
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
export const useInstitute = create(devstore);

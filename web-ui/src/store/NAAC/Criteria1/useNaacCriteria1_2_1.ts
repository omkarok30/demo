import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '@/store/global';
import * as service from '@/services/NAAC/criteria1/criteria1.2.1';
import * as modelCriteria121 from '@/models/NAAC/criteria1/criteria1_2_1';
import { convertForDisplay, convertValues } from '@/utils/cast';

const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],

  getRecords: async () => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getYearWiseData();
      
      let data: any = res?.records;
      const records: any = [];
      _.each(data, (item) => {
        records.push(item);
      });

      set({ allRecords: records });
    }
    catch (e) {
      console.log(e);
    }
  },

  getRecord: async (year) => {
    try {
      const res = await service.getSingleRecord(year);
      console.log(res);
      let data: any = res?.records[0];
      console.log(data);
      
     

      set({ current: data });
    }
    catch (e) {
      console.log(e);
    }
  },

  clearRecord: async () => {
    set({ current: {} });
  },

 
});

const devstore = devtools(store);
export const useNaacCriteria121 = create(devstore);
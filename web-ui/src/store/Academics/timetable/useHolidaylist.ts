import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '@/store/global';
import * as service from '@/services/Academics/timeTable/holidayList';
import * as modelHolidayList from '@/models/Academics/Timetableandattendance/HolidayList';
import { convertForDisplay, convertValues } from '@/utils/cast';


export const useHolidayList = create(
  devtools((set: any, get: any) => ({
    current: {},
    allRecords: [],

    getRecords: async (year: string) => {
      try {
        const global = useGlobalState.getState().default;
        const res = await service.getRecords(year);

        const data: any = res;

        const records: any = [];
        _.each(data, (item) => {
          const record = convertForDisplay(
            item,
            modelHolidayList.allColumns,
            global,
          );

          records.push(record);
        });
        set({ allRecords: records });
      }
      catch (e) {
      }
    },

    clearHolidayList: async () => {
      set({ current: {} });
    },

    getRecord: async (id = 'new') => {
      if (id === 'new') {
        set({ current: {} });
        return;
      }
      const res = await service.getHolidayList(id);
      const data = convertValues(res, modelHolidayList.allColumns);
      set({ current: data });
    },

    addRecord: (object: any) => {
      set({ allRecords: [...get().allRecords, object] });
    },

    updateRecord: async (id: string, values: any) => {
      try {
        const data = modelHolidayList.submitJSON(values);

        const resp = await service.update(id, data);

        set({ current: resp });
      }
      catch (e) {}
    },
    deleteRecord: async (id: string) => {
      await service.deleteRecord(id);
      set({ allRecords: [...get().allRecords] });
    },
  })),
);

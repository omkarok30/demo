import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '@/store/global';
import * as service from '@/services/employees/employeeMainProgram';
import * as modalEmployeeMainProgram from '@/models/Employee/EmployeeMainProgram';
import { convertForDisplay, convertValues } from '@/utils/cast';
import { isEmptyValue } from '@/utils/object';

export const useEmployeeMainProgram = create(
  devtools((set: any, get: any) => ({
    current: {},
    allRecords: [],

    getRecords: async () => {
      try {
        const global = useGlobalState.getState().default;
        const res = await service.getRecords();
        let data: any = res;
        data = _.orderBy(data, ['fromYear'], ['desc']);

        const records: any = [];
        _.each(data, (item) => {
          const record = convertForDisplay(
            item,
            modalEmployeeMainProgram.allColumns,
            global,
          );

          records.push(record);
        });
        const last = _.first(records);
        const value = _.get(last, ['toYear'], '');
        const allowNew = !!((isEmptyValue(records) || isEmptyValue(value)));
        set({ allRecords: records, allowNew });
      }
      catch (e) {}
    },

    getRecord: async (id = 'new') => {
      if (id === 'new') {
        set({ current: {} });
        return;
      }
      const res = await service.getmain_program(id);
      const data = convertValues(res, modalEmployeeMainProgram.allColumns);
      set({ current: data });
    },

    clearRecord: async () => {
      set({ current: {} });
    },
    addRecord: async (values: any) => {
      try {
        values.id = 'new';
        const data = modalEmployeeMainProgram.submitJSON(values);
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
        const data = modalEmployeeMainProgram.submitJSON(values);
        const res = await service.update(id, data);
        set({ allRecords: [] });
        return res;
      }
      catch (e) {
        console.log(e);
        throw e;
      }
    },
  })),
);

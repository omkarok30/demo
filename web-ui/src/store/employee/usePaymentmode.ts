import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '@/store/global';
import * as service from '@/services/employees/Paymentmode';
import * as modalpaymentmode from '@/models/Employee/PaymentMode';
import { convertForDisplay, convertValues } from '@/utils/cast';

const departmentType = 'academic';
export const usePaymentRecord = create(
  devtools((set: any, get: any) => ({
    current: {},
    allRecords: [],

    getRecords: async () => {
      try {
        const global = useGlobalState.getState().default;
        const res = await service.getRecords();
        const records: any = [];
        _.each(res, (item) => {
          const record = convertForDisplay(
            item,
            modalpaymentmode.allColumns,
            global,
          );

          records.push(record);
        });
        const options = _.map(records, record => ({
          value: record.id,
          label: record.paymentMode,
        }));
        const accounttype = _.map(records, record => ({
          value: record.id,
          label: record.accountType,
        }));

        set({ allRecords: records, options, accounttype });
      }
      catch (e) {}
    },

    getRecord: async (id = 'new') => {
      if (id === 'new') {
        set({ current: {} });
        return;
      }
      const res = await service.getpaymentmode(id);
      const data = convertValues(res, modalpaymentmode.allColumns);
      set({ current: data });
    },

    clearRecord: async () => {
      set({ current: {} });
    },
    addRecord: async (values: any) => {
      try {
        values.id = 'new';
        values.type = departmentType;
        const data = modalpaymentmode.submitJSON(values);
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
        values.type = departmentType;
        const data = modalpaymentmode.submitJSON(values);
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

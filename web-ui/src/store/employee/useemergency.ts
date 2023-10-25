import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '@/store/global';
import * as service from '@/services/employees/emergency';
import * as modelemergency from '@/models/Employee/Emergency';
import { convertForDisplay, convertValues } from '@/utils/cast';

export const useEmergencyDetails = create(
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
            modelemergency.allColumns,
            global,
          );

          records.push(record);
        });

        const options = _.map(records, record => ({
          value: record.id,
          label: record.bloodGroup,
        }));

        set({ allRecords: records, options });
      }
      catch (e) {}
    },

    getRecord: async (id = 'new') => {
      if (id === 'new') {
        set({ current: {} });
        return;
      }
      const res = await service.getEmergencydetails(id);
      const data = convertValues(res, modelemergency.allColumns);
      console.log('51', res);
      set({ current: data });
      console.log('50', data);
    },

    clearRecord: async () => {
      set({ current: {} });
    },
    addRecord: async (values: any) => {
      try {
        values.id = 'new';
        const data = modelemergency.submitJSON(values);
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

        const data = modelemergency.submitJSON(values);
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

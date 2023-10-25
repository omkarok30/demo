import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '../global';
import * as service from '@/services/settings/admin';
import * as modelUsers from '@/models/Users/userProfile';
import { convertForDisplay } from '@/utils/cast';

export const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],
  overallCoordinatorsRecord: [],

  getRecords: async () => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAdminsList();
      const data: any = res?.records;

      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(
          item,
          modelUsers.allColumns,
          global,
        );
        records.push(record);
      });
      set({ allRecords: records });
    }
    catch (e) {
      console.log(e);
    }
  },
  getUsers: async () => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllUsers();
      const data: any = res?.records;

      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(
          item,
          modelUsers.allColumns,
          global,
        );
        records.push(record);
      });
      const optionsUsers = _.map(records, record => ({ value: record.id, label: `${record.firstName}  ${record.middleName}  ${record.lastName}` }));

      set({ allUsers: records, optionsUsers });
    }
    catch (e) {
      console.log(e);
    }
  },

  clearRecord: async () => {
    set({ current: {} });
  },
  addRecord: async (values: any) => {
    try {
      values.id = 'new';
      const data = modelUsers.submitJSON(values);
      const res = await service.add(data);
      set({ allRecords: [] });
      return res;
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },

  updateRecord: async (id: string) => {
    try {
      const res = await service.update(id, 'true');
      set({ allRecords: [] });
      return res;
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },
  deleteRecord: async (id: string, values: any) => {
    try {
      values.id = id;
      values.is_admin_inactive = 'true';
      values.is_admin = 'false';
      const data = modelUsers.submitJSON(values);
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
export const useAdmin = create(devstore);

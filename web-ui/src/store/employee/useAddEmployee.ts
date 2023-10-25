import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '../global';
import * as service from '@/services/employees/addEmployee';
import * as modalEmployeeRecord from '@/models/Employee/EmployeeDetails';
import { convertForDisplay } from '@/utils/cast';

export const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],

  clearRecord: async () => {
    set({ current: {} });
  },

  addRecord: async (values: any) => {
    const data = modalEmployeeRecord.submitJSON(values);
    await service.add(data);
    set({ allRecords: [...get().allRecords, values] });
  },
});

const devstore = devtools(store);
export const useAddEmployee = create(devstore);



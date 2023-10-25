import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '../global';
import * as service from '@/services/settings/nonAcademicDepartment';
import * as modelNonAcademicDept from '@/models/settings/NonAcademicDept';
import { convertForDisplay, convertValues } from '@/utils/cast';

const departmentType = 'administrative';

const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],

  getRecords: async () => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllNonAcademicDepartments();
      const records: any = [];
      _.each(res?.records, (item) => {
        const record = convertForDisplay(item, modelNonAcademicDept.allColumns, global);
        records.push(record);
      });
      set({ allRecords: records });
    }
    catch (e) {
      console.log(e);
    }
  },

  clearRecord: async () => {
    set({ current: {} });
  },

  getRecord: async (id = 'new') => {
    if (id === 'new') {
      set({ current: {} });
      return;
    }
    const res = await service.getNonAcademicDepartment(id);
    const data = convertValues(res, modelNonAcademicDept.allColumns);
    set({ current: data });
  },

  addRecord: async (values: any) => {
    try {
      values.id = 'new';
      values.type = departmentType;
      const data = modelNonAcademicDept.submitJSON(values);
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
      const data = modelNonAcademicDept.submitJSON(values);
      const res = await service.update(id, data);
      set({ allRecords: [] });
      return res;
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },
  asDepartmentOptions: async () => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllNonAcademicDepartments();
      let data: any = res?.records;
      data = _.orderBy(data, ['degreeName'], ['asc']);
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelNonAcademicDept.allColumns, global);
        records.push(record);
      });

      const comboByName = _.map(records, record => ({ value: record.id, label: record.degreeName }));

      set({ allRecordsByName: records, comboByName });
    }
    catch (e) {
      console.log(e);
    }
  },
});

const devstore = devtools(store);
export const useNonAcademicDepartment = create(devstore);

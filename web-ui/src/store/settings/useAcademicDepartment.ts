import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '../global';
import * as service from '@/services/settings/academicDepartment';
import * as modelAcademicDept from '@/models/settings/AcademicDept';
import { convertForDisplay, convertValues } from '@/utils/cast';

const departmentType = 'academic';

export const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],
  comboByName: [],
  allRecordsByName: [],

  getRecords: async () => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllAcademicDepartments();
      let data: any = res?.records;
      data = _.orderBy(data, ['startYear'], ['asc']);
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelAcademicDept.allColumns, global);
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
    const res = await service.getAcademicDepartment(id);
    const data = convertValues(res, modelAcademicDept.allColumns);
    set({ current: data });
  },

  addRecord: async (values: any) => {
    try {
      values.id = 'new';
      values.type = departmentType;
      const data = modelAcademicDept.submitJSON(values);
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
      const data = modelAcademicDept.submitJSON(values);
      const res = await service.update(id, data);
      set({ allRecords: [] });
      return res;
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },

  asDepartmentOptions: async (reload = false) => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllAcademicDepartments();
      let data: any = res?.records;
      data = _.orderBy(data, ['degreeName'], ['asc']);
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelAcademicDept.allColumns, global);
        records.push(record);
      });

      const options = _.map(records, record => ({ value: record.id, label: record.degreeName }));
      const comboByName = options?.filter((department: any) => department.value !== '1');

      set({ allRecordsByName: records, comboByName, allAcademicDepartments: options });
    }
    catch (e) {
      console.log(e);
    }
  },
});

const devstore = devtools(store);
export const useAcademicDepartment = create(devstore);

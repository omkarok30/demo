import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '@/store/global';
import * as service from '@/services/Academics/courseEvaluationTools/toolsRepository';
import * as modelToolsRepository from '@/models/Academics/courseEvaluationTools/ToolsRepository';
import { convertForDisplay, convertValues } from '@/utils/cast';

const departmentType = 'academic';

export const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],
  comboByName: [],
  allRecordsByName: [],
  activeToolsRecord: [],
  inactiveToolsRecord: [],

  getRecords: async () => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllAcademicTools();
      let data: any = res?.records;
      data = _.orderBy(data, ['startYear'], ['asc']);
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelToolsRepository.allColumns, global);
        records.push(record);
      });
      const options = _.map(records, record => ({ value: record.id, label: record.toolName }));
      const activeTools = _.filter(records, record => record.inactive === false);
      const inactiveTools = _.filter(records, record => record.inactive === true);

      set({ allRecords: records, comboByName: options, activeToolsRecord: activeTools, inactiveToolsRecord: inactiveTools });
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
    const res = await service.getAcademicTools(id);
    const data = convertValues(res, modelToolsRepository.allColumns);
    set({ current: data });
  },

  addRecord: async (values: any) => {
    try {
      values.id = 'new';
      values.type = departmentType;
      const data = modelToolsRepository.submitJSON(values);
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
      const data = modelToolsRepository.submitJSON(values);
      const res = await service.update(id, data);
      set({ allRecords: [] });
      return res;
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },
  inActivateTool: async (id: string, data: any) => {
    await service.inActivateTool(id, data);
  },
});

const devstore = devtools(store);
export const useToolsRepository = create(devstore);

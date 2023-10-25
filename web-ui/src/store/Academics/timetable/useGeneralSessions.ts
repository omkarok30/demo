import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '@/store/global';
import * as service from '@/services/Academics/timeTable/generalSessions/GeneralSessions';
import * as modelGeneralSessions from '@/models/Academics/timeTable/generalSessions/GeneralSessions';
import { convertForDisplay, convertValues } from '@/utils/cast';

const GeneralSessionsType = 'academic';

const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],
  optionsGeneralSessions: [],

  getRecords: async () => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllGeneralSessions();
      let data: any = res?.records;
      data = _.orderBy(data, ['name'], ['asc']);
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelGeneralSessions.allColumns, global);
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
    const res = await service.getGeneralSessions(id);
    console.log(id);
    const data = convertValues(res, modelGeneralSessions.allColumns);
    console.log(res);
    set({ current: data });
  },

  addRecord: async (values: any) => {
    try {
      values.id = 'new';
      values.type = GeneralSessionsType;
      const data = modelGeneralSessions.submitJSON(values);
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
      values.type = GeneralSessionsType;
      const data = modelGeneralSessions.submitJSON(values);
      const res = await service.update(id, data);
      set({ allRecords: [] });
      return res;
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },

  asGeneralSessionsOptions: async (reload = false) => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllGeneralSessions();
      let data: any = res?.records;
      data = _.orderBy(data, ['name'], ['asc']);
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelGeneralSessions.allColumns, global);
        records.push(record);
      });

      const options = _.map(records, record => ({ value: record.id, label: record.name }));
      const comboByName = options?.filter((GeneralSessions: any) => GeneralSessions.value !== '1');

      set({ allRecordsByName: records, comboByName });
    }
    catch (e) {
      console.log(e);
    }
  },
});

const devstore = devtools(store);
export const useGeneralSessions = create(devstore);

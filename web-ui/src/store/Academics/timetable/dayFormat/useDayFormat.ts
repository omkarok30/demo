/* eslint-disable no-console */
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '@/store/global';
import * as service from '@/services/Academics/timeTable/dayFormat/dayFormat';
import * as modelDayFormat from '@/models/Academics/timeTable/dayFormat/DayFormat';
import * as modelSession from '@/models/Academics/timeTable/dayFormat/SessionTime';

import { convertForDisplay, convertValues } from '@/utils/cast';

const DayFormatType = 'academics';

export const store = (set: any, _get: any) => ({
  current: {},
  allRecords: [],
  comboByName: [],
  allRecordsByName: [],
  comboByNameactive: [],
  comboByNameinactive: [],
  activeSessionsRecord: [],
  inactiveSessionsRecord: [],
  sessionsallRecords: [],

  getRecords: async () => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllDayFormat();
      let data: any = res?.records;
      data = _.orderBy(data, ['startYear'], ['asc']);
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelDayFormat.allColumns, global);
        records.push(record);
      });
      const optionsnameofFormat = _.map(records, record => ({ value: record.id, label: record.nameofFormat }));
      const activeSessions = _.filter(records, record => record.isactive === false);
      const inactiveSessions = _.filter(records, record => record.isactive === true);
      const optionsactive = _.map(activeSessions, activeSessions => ({ value: activeSessions.id, label: activeSessions.nameofFormat }));
      const optionsinactive = _.map(inactiveSessions, inactiveSessions => ({ value: inactiveSessions.id, label: inactiveSessions.nameofFormat }));

      set({ allRecords: records, comboByName: optionsnameofFormat, comboByNameactive: optionsactive, comboByNameinactive: optionsinactive, activeSessionsRecord: activeSessions, inactiveSessionsRecord: inactiveSessions });
    }
    catch (e) {
      console.log(e);
    }
  },

  getSessionsRecords: async (id: string) => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getSessions(id);
      let data: any = res;
     
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelSession.allColumns, global);
        records.push(record);
      });
      set({ sessionsallRecords: records });
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
    const res = await service.getDayFormat(id);
    const data = convertValues(res, modelDayFormat.allColumns);
    set({ current: data });
  },

  addRecord: async (values: any) => {
    try {
      values.id = 'new';
      values.type = DayFormatType;
      const data = modelDayFormat.submitJSON(values);
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
      values.type = DayFormatType;
      const data = modelDayFormat.submitJSON(values);
      const res = await service.update(id, data);
      set({ allRecords: [] });
      return res;
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },

  asDayFormatOptions: async (reload = false) => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllDayFormat();
      let data: any = res?.records;
      data = _.orderBy(data, ['nameofFormat'], ['asc']);
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelDayFormat.allColumns, global);
        records.push(record);
      });

      set({ allRecordsByName: records });
    }
    catch (e) {
      console.log(e);
    }
  },

  inActivateSessions: async (id: string, data: any) => {
    await service.inActivateSessions(id, data);
  },

});

const devstore = devtools(store);
export const useDayFormat = create(devstore);

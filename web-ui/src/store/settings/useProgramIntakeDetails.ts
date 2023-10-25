import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '../global';
import * as service from '@/services/settings/programIntakeDetails';
import * as modelProgramIntake from '@/models/settings/ProgramIntakeDetails';
import { convertForDisplay, convertValues } from '@/utils/cast';
import { isEmptyValue } from '@/utils/object';

const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],
  allInstRecords: [],
  allowNew: false,

  getRecords: async (programId: any) => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getProgramIntakeDetails(programId);
      let data: any = res?.records;
      data = _.orderBy(data, ['batchFromYear'], ['desc']);
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelProgramIntake.allColumns, global);
        records.push(record);
      });
      const last = _.first(records);
      const value = _.get(last, ['batchToYear'], '');
      const allowNew = !!((isEmptyValue(records) || isEmptyValue(value)));
      set({ allRecords: records, allowNew });
    }
    catch (e) {
      console.log(e);
    }
  },

  getRecord: async (programId: string, id = 'new') => {
    if (id === 'new') {
      set({ current: {} });
      return;
    }
    if (isEmptyValue(programId) || isEmptyValue(id)) {
      set({ current: {} });
      throw new Error('Parameters missing');
    }
    const res = await service.getProgramIntake(programId, id);
    const data = convertValues(res, modelProgramIntake.allColumns);
    set({ current: data });
  },

  addRecord: async (programId: string, values: any) => {
    try {
      values.id = 'new';
      const data = modelProgramIntake.submitJSON(values);
      const resp = await service.add(programId, data);
      set({ allRecords: [], current: resp });
      return resp;
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },

  updateRecord: async (programId: string, id: string, values: any) => {
    try {
      values.id = id;
      const data = modelProgramIntake.submitJSON(values);
      const resp = await service.update(programId, id, data);
      set({ current: resp });
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },
});

const devstore = devtools(store);
export const useProgramIntakeDetails = create(devstore);

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '../global';
import * as service from '@/services/settings/programNomenclatureDetails';
import * as modelProgramNomenclature from '@/models/settings/ProgramNomenclatureDetails';
import { convertForDisplay, convertValues } from '@/utils/cast';
import { isEmptyValue } from '@/utils/object';

const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],
  allowNew: false,
  nomenclatureData: [],

  getRecords: async (programId: any) => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getProgramNomenclatureDetails(programId);
      let data: any = res?.records;
      data = _.orderBy(data, ['fromYear'], ['desc']);
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelProgramNomenclature.allColumns, global);
        records.push(record);
      });
      const last = _.first(records);
      const value = _.get(last, ['toYear'], '');
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
    const res = await service.getProgramNomenclature(programId, id);
    const data = convertValues(res, modelProgramNomenclature.allColumns);
    set({ current: data });
  },

  addRecord: async (programId: string, values: any) => {
    try {
      values.id = 'new';
      const data = modelProgramNomenclature.submitJSON(values);
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
      const data = modelProgramNomenclature.submitJSON(values);
      const resp = await service.update(programId, id, data);
      set({ current: resp });
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },

  getNomenclature: async (programId: any, year: any) => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getProgramNomenclatureDetails(programId);
      let data: any = res?.records;  
      data = _.orderBy(data, ['fromYear'], ['desc']);
      const records: any = [];
      _.each(data, (item) => {
        if (year >= item.fromYear && year < item.toYear) {
          records.push(item);
        }
        else if (year >= item.fromYear && item.toYear === '') {
          records.push(item);
        }
      });
      set({ nomenclatureData: records });
    }
    catch (e) {
      console.log(e);
    }
  },
});

const devstore = devtools(store);
export const useProgramNomenclatureDetails = create(devstore);

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '../global';
import * as service from '@/services/settings/lookups';
import * as modelLookups from '@/models/settings/Lookups';
import { convertForDisplay, convertValues } from '@/utils/cast';
import { isEmptyValue } from '@/utils/object';
import { modelLookupsItem } from '@/models/settings/lookup';

const store = (set: any, get: any) => ({
  lookupsList: [],
  lookupValues: {},
  lookupSelected: null,

  setSelected: (lookupSelected) => {
    set({ lookupSelected });
  },

  getRecords: async () => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllLookups();
      const data: any = res?.records;
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelLookups.allColumns, global);
        records.push(record);
      });
      set({ lookupsList: records });
    } catch (e) { }
  },

  getRecord: async (id) => {
    if (isEmptyValue(id)) {
      return;
    }
    const res = await service.getLookupValue(id);
    const data = convertValues(res, modelLookups.allColumns);
    const lookupValues = get().lookupValues;
    lookupValues[data.type] = data.value;
    set({ lookupValues });
  },

  getLookupValue: (type) => {
    const lookupValues = get().lookupValues;
    const value = _.get(lookupValues, [type]);
    return isEmptyValue(value) ? [] : value;
  },

  updateRecord: async (action: string, lookup: any, oldValues: any, newValues: any) => {
    try {
      if (isEmptyValue(newValues)) {
        return;
      }
      const modelItem = modelLookupsItem(lookup.type);
      const keys = _.keys(modelItem.model);
      let found: any;
      // let oldData = oldValues;
      let values = {
        // action,
        singleColumn: false,
        id: '',
        o: null,
        n: null,
      };
      if (keys.length === 1) {
        const key = _.first(keys);
        if (isEmptyValue(key)) {
          return;
        }
        found = _.find(lookup.value, v => _.isEqual(v, newValues[key]));
        // oldData = valueObjectToString(oldValues);
        values.singleColumn = true;
      } else {
        found = _.find(lookup.value, newValues);
        values.singleColumn = false;
      }
      // console.log(found);
      if (found) {
        throw new Error('Duplicate record');
      }
      // values.id = 'new';
      // data = _.pick(lookup, ['id', 'value']);
      values = Object.assign({}, values, { id: lookup.id, o: oldValues, n: newValues });
      const data = modelLookups.submitJSON(values, false);
      // console.log(data);
      if (action === 'add') {
        const res = await service.addLookupItem(lookup.id, data);
      }
      if (action === 'update') {
        const res = await service.updateLookupItem(lookup.id, data);
      }
      if (action === 'remove') {
        const res = await service.removeLookupItem(lookup.id, data);
      }
      set({ allRecords: [] });
      get().getRecord(lookup.id);
      // return res;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
});

const devstore = devtools(store);
export const useLookups = create(devstore);

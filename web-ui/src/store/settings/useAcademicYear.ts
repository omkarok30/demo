import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '../global';
import * as service from '@/services/settings/academicYear';
import * as modelAcademicYear from '@/models/settings/AcademicYear';
import { convertForDisplay, convertValues } from '@/utils/cast';
import { isEmptyValue } from '@/utils/object';
import { debouncePromise } from '@/utils/debouncePromise';

const getAcademicYearRecords = async () => {
  const global = useGlobalState.getState().default;
  const res = await service.getAcademicYearDetails();
  let data: any = res?.records;
  data = _.orderBy(data, ['yearAt'], ['desc']);
  const records: any = [];
  _.each(data, (item) => {
    const record = convertForDisplay(item, modelAcademicYear.allColumns, global);
    records.push(record);
  });
  return records;
};

const debounceGetAcademicYearRecords = debouncePromise(getAcademicYearRecords, 2000, true, () => ([]));

const comboYearAtYear = (allRecords: any) => {
  const options = _.map(allRecords, record => ({ value: record.yearAt, label: record.year }));
  return options;
};

const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],
  comboByName: [],

  getAcademicYearDetails: async () => {
    try {
      const records = await getAcademicYearRecords();
      set({ allRecords: records, comboByName: comboYearAtYear(records) });
    }
    catch (e) { }
  },

  getAcademicYearDetail: async (id = 'new') => {
    if (id === 'new') {
      set({ current: {} });
      return;
    }
    const res = await service.getAcademicYearDetail(id);
    const data = convertValues(res, modelAcademicYear.allColumns);
    set({ current: data });
  },

  addAcademicYearDetails: (object: any) => {
    set({ allRecords: [...get().allRecords, object] });
  },

  updateRecord: async (id: string, values: any) => {
    try {
      const data = modelAcademicYear.submitJSON(values);
      const resp = await service.update(id, data);
      set({ current: resp });
    }
    catch (e) { }
  },

  asOptions: async () => {
    let options: any[] = get().comboByName;
    if (!isEmptyValue(options)) {
      return options;
    }
    try {
      // const records = await getAcademicYearRecords();
      const records = await debounceGetAcademicYearRecords();
      options = comboYearAtYear(records);
      set({ comboByName: options });
    }
    catch (e) { }
    return options;
  },
});

const devstore = devtools(store);
export const useAcademicYear = create(devstore);

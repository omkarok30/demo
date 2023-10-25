import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '../global';
import * as service from '@/services/admissions/studentInfo';
import * as modelStudentInfo from '@/models/admissions/studentRecords/StudentInfo';
import { convertForDisplay, convertValues } from '@/utils/cast';

export const useStudentInfo = create(
  devtools((set: any, get: any) => ({
    current: {},
    allRecords: [],

    getRecords: async () => {
      try {
        const global = useGlobalState.getState().default;
        const res = await service.getStudents();
        let data: any = res;
        data = _.orderBy(data, ['scholarNumber'], ['asc']);
        const records: any = [];
        _.each(data, (item) => {
          const record = convertForDisplay(item, modelStudentInfo.allColumns, global);
          records.push(record);
        });
        const optionsstudents = _.map(records, record => ({ value: record.id, label: record.firstName + record.middleName + record.lastName }));

        set({ allRecords: records, optionsstudents });
      }
      catch (e) {
        console.log(e);
      }
    },
    getRecord: async (id = 'new') => {
      if (id === 'new') {
        set({ current: {} });
        return;
      }
      const res = await service.getStudent(id);
      console.log('getStudent',res);
      
      const data = convertValues(res, modelStudentInfo.allColumns);
      set({ current: data });
    },
    clearRecord: async () => {
      set({ current: {} });
    },
    addRecord: async (values: any) => {
      // const data = modelStudentInfo.submitJSON(values);
      // set({ allRecords: [...get().allRecords, values] });
    },
  })),
);

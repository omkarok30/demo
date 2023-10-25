import create from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';

import { useGlobalState } from '@/store/global';
import * as service from '@/services/fyacademics/courseManagement/managecourse';
import * as modelManageCoursesDetails from '@/models/fyacademics/courseManagement/Managecourse';
import { convertForDisplay, convertValues } from '@/utils/cast';

const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],
  activeCourseRecord: [],
  inactiveCourseRecord: [],
  getRecords: async (levelOfEducation: string, program: string) => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllManageCourses(levelOfEducation, program);

      const data: any = res;
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelManageCoursesDetails.allColumns, global);
        records.push(record);
      });
      const activeTools = _.filter(records, record => record.isactive === true);
      const inactiveTools = _.filter(records, record => record.isactive === false);

      set({ allRecords: records, activeCourseRecord: activeTools, inactiveCourseRecord: inactiveTools });
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
    const res = await service.getManageCourses(id);
    const data = convertValues(res, modelManageCoursesDetails.allColumns);
    set({ current: data });
  },

  addRecord: async (values: any) => {
    try {
      values.id = 'new';
      const data = modelManageCoursesDetails.submitJSON(values);
      const res = await service.add(data);
      set({ allRecords: [] });
      return res;
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },

  // updateRecord: async (id: string, values: any) => {
  //     try {
  //         values.id = id;
  //         const data = modelManageCoursesDetails.submitJSON(values);
  //         const res = await service.update(id, data);
  //         // set({ current: resp });
  //         set({ allRecords: [] });
  //         return res;
  //     }
  //     catch (e) {
  //         console.log(e);
  //         throw e;
  //     }
  // },
  inActivateCourse: async (id: string, data: any) => {
    await service.inActivateCourse(id, data);
  },
});

const devstore = devtools(store);
export const useManageCoursesDetails = create(devstore);

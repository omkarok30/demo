import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '../global';
import * as service from '@/services/settings/programDetails';
import * as modelprogramdetails from '@/models/settings/ProgramDetails';
import * as modelManageCourses from '@/models/Academics/courseManagement/manageCourses/ManageCourses';
import { convertForDisplay, convertValues } from '@/utils/cast';

const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],
  allInstituteRecords: [],
  allDepartmentRecords: [],
  optionsInstitutePrograms: [],
  optionsDepartmentPrograms: [],
  optionsAllPrograms: [],

  getRecords: async () => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllProgramDetails();
      let data: any = res?.records;

      data = _.orderBy(data, ['programCode'], ['asc']);
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelprogramdetails.allColumns, global);
        records.push(record);
      });

      const allInstituteRecords = _.filter(records, record => record.programType === 'institute');

      const optionsInstitutePrograms = _.map(allInstituteRecords, record => ({ value: record.id, label: `${record.programmeName} (${record.programCode})` }));
      const optionsAllPrograms = _.map(records, record => ({ value: record.id, label: `${record.programmeName} (${record.programCode})` }));
      const allAnnualPatternPrograms = _.filter(records, record => record.examinationPattern === 'annual');
      const allSemesterPatternPrograms = _.filter(records, record => record.examinationPattern === 'semester');
      const allTrimesterPatternPrograms = _.filter(records, record => record.examinationPattern === 'trimester');

      set({ allRecords: records, allInstituteRecords, optionsInstitutePrograms, optionsAllPrograms, allAnnualPatternPrograms, allSemesterPatternPrograms, allTrimesterPatternPrograms });
    }
    catch (e) {
      console.log(e);
    }
  },

  getDepartmentRecords: async (departmentId: any) => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllProgramDetails();
      let data: any = res;
      data = _.orderBy(data, ['programCode'], ['asc']);
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(item, modelprogramdetails.allColumns, global);
        records.push(record);
      });

      const allDepartmentRecords = _.filter(records, record => record.departmentId === departmentId);

      const optionsDepartmentPrograms = _.map(allDepartmentRecords, record => ({ value: record.id, label: `${record.programmeName} (${record.programCode})` }));

      set({ allDepartmentRecords, optionsDepartmentPrograms });
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
    const res = await service.getProgramDetail(id);
    const data = convertValues(res, modelprogramdetails.allColumns);
    set({ current: data });
  },

  addRecord: async (values: any) => {
    try {
      values.id = 'new';
      const data = modelprogramdetails.submitJSON(values);
      const resp = await service.add(data);
      set({ allRecords: [], current: resp });
      return resp;
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },

  updateRecord: async (id: string, values: any) => {
    try {
      values.id = id;
      const data = modelprogramdetails.submitJSON(values);
      const resp = await service.update(id, data);
      set({ current: resp });
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },
});

const devstore = devtools(store);
export const useProgramDetails = create(devstore);

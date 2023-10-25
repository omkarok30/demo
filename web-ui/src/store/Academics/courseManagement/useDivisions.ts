
/* eslint-disable no-console */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _, { upperCase } from 'lodash';
import { useGlobalState } from '@/store/global';
import * as service from '@/services/Academics/courseManagement/divisions';
import * as modelDivisions from '@/models/fyacademics/courseManagement/Divisions';
import { convertForDisplay, convertValues } from '@/utils/cast';


export const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],
  allOptionsRecords: [],
  optionsDivision: [],

  getRecords: async (year: string, program: string) => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllDivisions(year, program);

      let data: any = res;
      data = _.orderBy(data, ["division"], ["asc"]);
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(
          item,
          modelDivisions.allColumns,
          global
        );
        records.push(record);
      });

      const optionsDivision = _.map(records, (record) => ({
        value: record.id,
        label: `${record.division} `
      }));

      set({ allRecords: records, optionsDivision, allOptionsRecords: res });
    }  catch (e) {
      console.log('This is the error:', e);
    }
  },

  clearRecord: async () => {
    set({ current: {} });
  },

  getRecord: async (id = "new") => {
    if (id === "new") {
      set({ current: {} });
      return;
    }
    const res = await service.getDivision(id);    
    const data = convertValues(res, modelDivisions.allColumns);

    set({ current: data });
  },

  addRecord: async (values: any) => {
    try {
      values.id = "new";
      const data = modelDivisions.submitJSON(values);
      const res = await service.add(data);
      set({ allRecords: [] });
      return res;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  updateRecord: async (id: string, values: any) => {
    try {
      values.id = id;
      const data = modelDivisions.submitJSON(values);
      const res = await service.update(id, data);
      set({ allRecords: [] });
      return res;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  nofurtherChange: async (
    year: string,
    program: string,
    values: any,

    className: any

  ) => {
    try {
      values.noFurtherChanges = "true";
      const data = modelDivisions.submitJSON(values);
      const res = await service.updateNfurtherchange(
        year,
        program,
        className,
        values,
      );
      set({ allRecords: [] });
      return res;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  getRecordClassWise: async (
    year: any,
    program: any,
    className: any
 
  ) => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getDivisionsAsPerClass(
        year,
        program,
        className,
      );

      const result = res.filter(
        (divisions: any) => divisions.className === className, // &&
        // divisions.className === className
      );
      let data: any = result;
      data = _.orderBy(data, ['division'], ['asc']);


      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(
          item,
          modelDivisions.allColumns,
          global
        );
        records.push(record);
      });

      const optionsDivision = _.map(data, (record) => ({
        value: record.id,
        label: `${upperCase(record.division)}`,
      }));

      set({ allRecordsClassWise: records, optionsDivision });
    } catch (e) {
      console.log(e);
    }
  },

  getDivisionRecords: async (
    year: string,
    program: string,
    className: string,
  ) => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getDivisionsAsPerClass(
        year,
        program,
        className,
      );
      let data: any = res;
      data = _.orderBy(data, ['division'], ['asc']);
      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(
          item,
          modelDivisions.allColumns,
          global,
        );
        records.push(record);
      });

      const optionsDivision = _.map(records, (record) => ({
        value: record.id,
        label: `${record.division} `,
      }));

      set({ optionsDivision });
    } catch (e) {
      console.log(e);
    }
  },

});

const devstore = devtools(store);
export const useDivisions = create(devstore);

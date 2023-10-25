import create from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';

import { useGlobalState } from '@/store/global';
import * as modelCOTargets from '@/models/Academics/coTargets/coTarget';
import * as service from '@/services/Academics/courseManagement/coTargets/coTargets';
import * as viewService from '@/services/Academics/courseManagement/coTargets/viewCOTargets';
import { convertForDisplay } from '@/utils/cast';
import { isEmptyValue } from '@/utils/object';


export const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],
  programId: 0,
  className: '',
  semester: '',
  divisionId: '',
  year: '',
  degreeLevel: '',
  courseName: '',
  department: '',
  courseCode: '',
  internalColumns: [],
  internalData: [],
  externalData: [],
  courseID: 0,
  coursecos: '',
  overallTarget: [],

  getRecords: async (
    year: string,
    programId: string,
    className: string,
    semester: string,
    divisionId: string,
  ) => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getRecords(
        year,
        programId,
        className,
        semester,
        divisionId,
      );
      const data: any = res;
      const records: any = [];

      const actualData = data.records;

      _.each(actualData, (item) => {
        const record = convertForDisplay(
          item,
          modelCOTargets.allColumns,
          global,
        );
        records.push(record);
      });
      set({ allRecords: records });
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },

  getInternalRecords: async (
    year: string,
    className: string,
    programmeId: string,
    courseId: number,
    division: number,
    semester: number,
  ) => {
    try {
      const global = useGlobalState.getState().default;
      const res = await viewService.getRecords(
        year,
        className,
        programmeId,
        courseId,
        division,
        semester,
      );
      const data: any = res?.records;
      const records: any = [];

      const coursecos = await viewService.getCourseCo('1');
      const coursetools = await viewService.getCourseTool('1');

     
    

      let srno = 0;
      let srno1 = 0;
      const recordsofcotarget = [];
      const recordsofcotargeexternal = [];
      const internalvalues = data[0].coTargetInValue;
      const externalvalues = data[0].coTargetExValue;
      const internalAverage = data[0].coTargetInAverage;
      const externalAverage = data[0].coTargetExAverage;
      const internalWeight = data[0].coTargetInWeight;
      const externalWeight = data[0].coTargetExWeight;
      coursetools.map((item) => {
        if (item.tools_repository$toolType === 'internal') {
          srno++;

          const record = {};
          record.id = srno;
          record.tools_repository$toolName = item.tools_repository$toolName;
          coursecos.map((itemco) => {
            const coursecode = itemco.coCode;
            let value = 'NA';
            if (!isEmptyValue(internalvalues)) {
              internalvalues.map((itemdata) => {
                if (itemdata.tool_id === item.toolId && itemco.coCode === itemdata.co_id) {
                  value = itemdata.value;
                }
              });
            }

            record[coursecode] = value;
          });
          recordsofcotarget.push(record);
        }
        else if (item.tools_repository$toolType === 'external') {
          srno1++;

          const recordexternal = {};
          recordexternal.id = srno1;
          recordexternal.tools_repository$toolName = item.tools_repository$toolName;

          coursecos.map((itemco) => {
            const coursecode = itemco.coCode;
            let value = 'NA';
            if (!isEmptyValue(externalvalues)) {
              externalvalues.map((itemdata) => {
                if (itemdata.tool_id === item.toolId && itemco.coCode === itemdata.co_id) {
                  value = itemdata.value;
                }
              });
            }

            recordexternal[coursecode] = value;
          });
          recordsofcotargeexternal.push(recordexternal);
        }
      });
      const recordofoverallaverage = [];

      const averageInternal = {};
      const averageExternal = {};
      averageInternal.tools_repository$toolName ="Average Co Target";

      averageExternal.tools_repository$toolName ="Average Co Target";
      const overallrecord = {};
      overallrecord.toolType = 'Internal';
      coursecos.map((itemco) => {
        const coursecode = itemco.coCode;
        let value = 'NA';
        if (!isEmptyValue(internalAverage)) {
          internalAverage.map((itemdata) => {
            if (itemco.coCode === itemdata.co_id) {
              value = itemdata.value;
            }
          });
        }

        overallrecord[coursecode] = value;
        averageInternal[coursecode]=value;
      });
      recordofoverallaverage.push(overallrecord);
      recordsofcotarget.push(averageInternal);
      const overallrecordext = {};

      overallrecordext.toolType = 'External';
      coursecos.map((itemco) => {
        const coursecode = itemco.coCode;
        let value = 'NA';
        if (!isEmptyValue(externalAverage)) {
          externalAverage.map((itemdata) => {
            if (itemco.coCode === itemdata.co_id) {
              value = itemdata.value;
            }
          });
        }

        overallrecordext[coursecode] = value;
        averageExternal[coursecode]=value;
      });
      recordofoverallaverage.push(overallrecordext);
      recordsofcotargeexternal.push(averageExternal);

      const overalltargetatt = {};

      overalltargetatt.toolType = 'Overall Target';
      coursecos.map((itemco) => {
        const coursecode = itemco.coCode;
        let value;
        let internalvalue = 0;
        let externalvalue = 0;
        if (!isEmptyValue(internalAverage)) {
          internalAverage.map((itemdata) => {
            if (itemco.coCode === itemdata.co_id) {
              internalvalue = itemdata.value;
            }
          });
        }
        if (!isEmptyValue(externalAverage)) {
          externalAverage.map((itemdata) => {
            if (itemco.coCode === itemdata.co_id) {
              externalvalue = itemdata.value;
            }
          });
        }
        value = parseFloat((internalvalue * internalWeight) / 100) + ((externalvalue * externalWeight) / 100);

        overalltargetatt[coursecode] = value;
      });
      recordofoverallaverage.push(overalltargetatt);
      // _.each(internalData, (item) => {
      //   const record = convertForDisplay(item, internalCols, global);
      //   records.push(record);
      // });
      set({
        internalData: recordsofcotarget,
        externalData: recordsofcotargeexternal,
        overallTarget: recordofoverallaverage,
        internalWeight,
        externalWeight,
      });
    }
    catch (e) {
      console.log('THis is error!!!', e);
      throw e;
    }
  },
  getCORecord: async (courseId) => {
    const res = await viewService.getCourseCo(courseId);
    set({ coursecos: res });
  },

  setProgram: async (programId: string) => {
    set({ programId });
  },
  setYear: async (year: string) => {
    set({ year });
  },

  setClassName: async (className: string) => {
    set({ className });
  },
  setSemester: async (semester: string) => {
    set({ semester });
  },
  setDivisionId: async (divisionId: string) => {
    set({ divisionId });
  },
  setDegreeLevel: async (degreeLevel: string) => {
    set({ degreeLevel });
  },
  setCourseName: async (courseName: string) => {
    set({ courseName });
  },
  setDepartment: async (department: string) => {
    set({ department });
  },
  setCourseCode: async (courseCode: string) => {
    set({ courseCode });
  },
  setCourseID: async (courserID: number) => {
    set({ courserID });
  },
});

const devstore = devtools(store);
export const useCOTargets = create(devstore);

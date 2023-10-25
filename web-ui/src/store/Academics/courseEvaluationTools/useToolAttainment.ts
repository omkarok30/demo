import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useToolsRepository } from './useToolsRepository';
import { useGlobalState } from '@/store/global';
import * as service from '@/services/Academics/courseEvaluationTools/toolAttainment';
import * as toolsservice from '@/services/Academics/courseEvaluationTools/toolsRepository';

import * as modelToolAttainment from '@/models/Academics/courseEvaluationTools/ToolAttainment';
import { convertForDisplay, convertValues } from '@/utils/cast';

export const useToolAttainment = create(
  devtools((set: any, get: any) => ({

    current: {},
    allRecords: [],
    getRecords: async (year: string, programId: string) => {
      try {
        const global = useGlobalState.getState().default;
        const res = await service.getRecords(year, programId);

        const data: any = res;
        const records: any = [];
        _.each(data, (item) => {
          const record = convertForDisplay(
            item,
            modelToolAttainment.allColumns,
            global,
          );
          const toolsres = toolsservice.getAcademicTools(item.toolId);
          const newRecord = record;
          const toolsrecordid = [{}];
          // getRecordAsPerId(item.toolId);

          /* toolsres.then((response: any) => {
            const toolsrecord = convertForDisplay(
              response,
              modelAcademicTools.allColumns,
              global,
            );
            // newRecord.toolName = toolsrecord.toolName;
            newRecord.toolType = toolsrecord.toolType;

            newRecord.toolDependency = toolsrecord.toolDependency;

            newRecord.toolAssesment = toolsrecord.toolAssessment;
          }); */
          //  newRecord.toolName = 'trupti';

          records.push(record);
        });
        set({ allRecords: records });
      }
      catch (e) {
        console.log(e);
      }
    },

    clearToolAttainment: async () => {
      set({ current: {} });
    },

    getRecord: async (id = 'new') => {
      if (id === 'new') {
        set({ current: {} });
        return;
      }
      const res = await service.getToolAttainment(id);
      const data = convertValues(res, modelToolAttainment.allColumns);
      set({ current: data });
    },

    addRecord: (object: any) => {
      set({ allRecords: [...get().allRecords, object] });
    },

    updateRecord: async (id: string, values: any) => {
      try {
        const data = modelToolAttainment.submitJSON(values);

        const resp = await service.update(id, data);
        set({ current: resp });
      }
      catch (e) {}
    },
    updateCommonAttainment: async (year: string, programId: string, values: any) => {
      try {
        const data = modelToolAttainment.submitJSON(values);

        const resp = await service.updateCommonAttainment(year, programId, data);
        set({ current: resp });
      }
      catch (e) {}
    },
  })),
);

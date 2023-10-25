import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';

import { useGlobalState } from '../global';
import * as service from '@/services/employees/employeeTechnicalSkills';
import * as modelEmployeeTechnicalSkills from '@/models/Employee/EmployeeTechnicalSkills';
import { convertForDisplay, convertValues } from '@/utils/cast';

const store = (set: any, get: any) => ({
    current: {},
    allRecords: [],

    getRecords: async () => {
        try {
            const global = useGlobalState.getState().default;
            const res = await service.getEmployeeTechnicalSkills();
            const data: any = res?.records;
            const records: any = [];
            _.each(data, (item) => {
                const record = convertForDisplay(item, modelEmployeeTechnicalSkills.allColumns, global);
                records.push(record);
            });
            set({ allRecords: records });
        }
        catch (e) { }
    },

    getRecord: async (id = 'new') => {
        if (id === 'new') {
            set({ current: {} });
            return;
        }
        const res = await service.getEmployeeTechnicalSkill(id);
        const data = convertValues(res, modelEmployeeTechnicalSkills.allColumns);
        set({ current: data });
    },

    addRecord: async (values: any) => {
        try {
            values.id = 'new';
            const data = modelEmployeeTechnicalSkills.submitJSON(values);
            const res = await service.add(data);
            set({ allRecords: [] });
            return res;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    },

    updateRecord: async (id: string, values: any) => {
        try {
            values.id = id;
            const data = modelEmployeeTechnicalSkills.submitJSON(values);
            const res = await service.update(id, data);
            // set({ current: resp });
            set({ allRecords: [] });
            return res;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    },

    deleteRecord: async (id: string) => {
        await service.deleteRecord(id);
        set({ allRecords: [...get().allRecords] });
      },
      
});

const devstore = devtools(store);
export const useEmployeeTechnicalSkills = create(devstore);

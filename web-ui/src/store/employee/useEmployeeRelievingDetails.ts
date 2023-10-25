import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';

import { useGlobalState } from '../global';
import * as service from '@/services/employees/employeeRelievingDetails';
import * as modelEmployeeRelievingDetails from '@/models/Employee/EmployeeRelievingDetails';
import { convertForDisplay, convertValues } from '@/utils/cast';

const store = (set: any, get: any) => ({
    current: {},
    allRecords: [],

    getRecords: async () => {
        try {
            const global = useGlobalState.getState().default;
            const res = await service.getEmployeeRelievingDetails();
            const data: any = res?.records;
            const records: any = [];
            _.each(data, (item) => {
                const record = convertForDisplay(item, modelEmployeeRelievingDetails.allColumns, global);
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
        const res = await service.getEmployeeRelievingDetail(id);
        const data = convertValues(res, modelEmployeeRelievingDetails.allColumns);
        set({ current: data });
    },

    addRecord: async (values: any) => {
        try {
            values.id = 'new';
            const data = modelEmployeeRelievingDetails.submitJSON(values);
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
            const data = modelEmployeeRelievingDetails.submitJSON(values);
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
});

const devstore = devtools(store);
export const useEmployeeRelievingDetails = create(devstore);

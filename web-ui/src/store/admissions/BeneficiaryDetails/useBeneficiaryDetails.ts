import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import * as service from '@/services/admissions/BeneficiaryDetails/beneficiaryDetails';
import * as modelBeneficiaryDetails from '@/models/admissions/studentRecords/BeneficiaryDetails/BeneficiaryDetails';
import { convertValues } from '@/utils/cast';

export const useBeneficiaryDetails = create(
  devtools((set: any, get: any) => ({
    current: {},
    allRecords: [],

    updateRecord: async (id: string, values: any) => {
      try {
        const data = modelBeneficiaryDetails.submitJSON(values);
        const resp = await service.updateDetails(id, data);
        set({ current: resp });
      }
      catch (e) { }
    },

    getRecord: async (id = 'new') => {
      if (id === 'new') {
        set({ current: {} });
        return;
      }

      const res = await service.getRecord(id);
      const data = convertValues(res, modelBeneficiaryDetails.allColumns);
      set({ current: data });
    },

    clearRecord: async () => {
      set({ current: {} });
    },

    addRecord: async (values: any) => {
      const data = modelBeneficiaryDetails.submitJSON(values);
      await service.addDetails(data);
      set({ allRecords: [...get().allRecords, values] });
    },

    asOptions: () => {
      const options = _.map(get().allRecords, record => ({
        value: record.yearAt,
        label: record.year,
      }));
      return options;
    },
  })),
);

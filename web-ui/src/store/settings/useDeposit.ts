import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getDepositDetail, getDepositDetails } from '@/services/settings/deposit';

export const useDeposit = create(
  devtools((set: any, get: any) => ({
    depositDetail: '',
    depositDetails: [],
    depositDetailsColumns: [],
    layout: 'vertical',

    getDepositDetails: async () => {
      const res = await getDepositDetails();
      set({ depositDetails: await res });
    },

    clearDepositDetail: async () => {
      set({ depositDetail: '' });
    },

    getDepositDetail: async (id: string) => {
      const res = await getDepositDetail(id);
      set({ depositDetail: await res });
    },

    adddepositDetails: (institute: any) => {
      set({ depositDetails: [...get().depositDetails, institute] });
    },

    updateDepositDetail: (selectedDeposit: any) => {
      set((state: any) => ({
        depositDetails: state.depositDetails.map((deposit: any) => {
          if (deposit.id === selectedDeposit?.id) {
            return selectedDeposit;
          }
          else {
            return deposit;
          }
        }),
      }));
    },

    deleteDepositDetails: (id: any) => {
      set((state: any) => ({ depositDetails: state.depositDetails.filter((institute: any) => institute.id !== id) }));
    },
  })),
);

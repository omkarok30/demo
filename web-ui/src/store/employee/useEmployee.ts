import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getEmployeeDetails } from '@/services/settings/employee';

export const useEmployee = create(
    devtools((set: any, get: any) => ({
        employeeDetails: [],
        getEmployeeDetails: async () => {
            const res = await getEmployeeDetails();
            set({ employeeDetails: await res });
        },

        serachEmployeeDetails: async(searchKey: string) => {
            if (searchKey !== "") {
                set((state: any) => ({
                    employeeDetails: state.employeeDetails.filter((employeeDetail: any) => (
                        employeeDetail.first_name === searchKey
                    )),
                }));
            }
            else{
                const res = await getEmployeeDetails();
                set({ employeeDetails: await res });
            }
        }
    })),
)
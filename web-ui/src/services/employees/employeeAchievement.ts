import request from '@/utils/request';

export const getEmployeeAchievements = async () => {
    try {
        const resp = await request({
            method: 'get',
            url: '/employee/employee_achievement/list',
        });
        return resp.data;
    }
    catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

export const getEmployeeAchievement = async (id: string) => {
    try {
        const resp = await request({
            method: 'get',
            url: `/employee/employee_achievement/get/${id}`,
        });
        const data = resp?.data?.records;
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};

export const add = async (data: any) => {
    try {
        const resp = await request({
            method: 'post',
            url: '/employee/employee_achievement/add',
            data,
        });
        return resp.data;
    }
    catch (err) {
        // Handle Error Here
        console.error(err);
        throw err;
    }
};

export const update = async (id: string, data: any) => {
    try {
        const resp = await request({
            method: 'post',
            url: `/employee/employee_achievement/edit/${id}`,
            data,
        });
        return resp.data;
    }
    catch (err) {
        // Handle Error Here
        console.error(err);
        throw err;
    }
};

import request from '@/utils/request';

export const getEmployeeExperiences = async () => {
    try {
        const resp = await request({
            method: 'get',
            url: '/employee/employee_experience/list',
        });
        return resp.data;
    }
    catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

export const getEmployeeExperience = async (id: string) => {
    try {
        const resp = await request({
            method: 'get',
            url: `/employee/employee_experience/get/${id}`,
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
            url: '/employee/employee_experience/add',
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
            url: `/employee/employee_experience/edit/${id}`,
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

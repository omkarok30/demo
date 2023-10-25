import request from '@/utils/request';

export const getInstituteLevels = async () => {
    try {
        const resp = await request({
            method: 'get',
            url: '/settings/employee_institute_level/list',
        });
        return resp.data;
    }
    catch (err) {
        // Handle Error Here
        console.error(err);
        throw err;
    }
};

export const getInstituteLevel = async (id: string) => {
    try {
        const resp = await request({
            method: 'get',
            url: `/settings/employee_institute_level/${id}`,
        });
        const data = resp?.data;
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};

export const update = async (id: string, data: any) => {
    try {
        const resp = await request({
            method: 'post',
            url: `/settings/employee_institute_level/${id}`,
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

import request from '@/utils/request';

export const getAllCourseFacultyLinking = async () => {
    try {
        const resp = await request({
            method: 'get',
            url: '/academics/course_management/course_faculty_linking/list',
        });

        return resp?.data?.records;
    }
    catch (err) {
        // Handle Error Here
        console.error(err);
        throw err;
    }
};
export const getAllCourseFacultyLinkingTools = async (courseFacultyLinkingId:any) => {
    try {
        const resp = await request({
            method: 'get',
            url: '/academics/course_management/course_faculty_linking/tools/list',
        });
        let data=resp?.data?.records.filter(e=>e.courseFacultyLinkingId==courseFacultyLinkingId)
        return data;
    }
    catch (err) {
        // Handle Error Here
        console.error(err);
        throw err;
    }
};
export const getAllCourseFacultyLinkingTutorial= async (courseFacultyLinkingId:any) => {
    try {
        const resp = await request({
            method: 'get',
            url: '/academics/course_management/course_faculty_linking/tutorial/list',
        });
        let data=resp?.data?.records.filter(e=>e.courseFacultyLinkingId==courseFacultyLinkingId)
        return data;
    }
    catch (err) {
        // Handle Error Here
        console.error(err);
        throw err;
    }
};
export const getAllCourseFacultyLinkingProject= async (courseFacultyLinkingId:any) => {
    try {
        const resp = await request({
            method: 'get',
            url: '/academics/course_management/course_faculty_linking/project/list',
        });
        let data=resp?.data?.records.filter(e=>e.courseFacultyLinkingId==courseFacultyLinkingId)
        return data;
    }
    catch (err) {
        // Handle Error Here
        console.error(err);
        throw err;
    }
};
export const getAllCourseFacultyLinkingPractical= async (courseFacultyLinkingId:any) => {
    try {
        const resp = await request({
            method: 'get',
            url: '/academics/course_management/course_faculty_linking/practical/list',
        });
        let data=resp?.data?.records.filter(e=>e.courseFacultyLinkingId==courseFacultyLinkingId)
        return data;
    }
    catch (err) {
        // Handle Error Here
        console.error(err);
        throw err;
    }
};
export const getAllCourseFacultyLinkingTheory= async (courseFacultyLinkingId:any) => {
    try {
        const resp = await request({
            method: 'get',
            url: '/academics/course_management/course_faculty_linking/theory/list',
        });
        let data=resp?.data?.records.filter(e=>e.courseFacultyLinkingId==courseFacultyLinkingId)
        return data;
    }
    catch (err) {
        // Handle Error Here
        console.error(err);
        throw err;
    }
};
export const getCourseFacultyLinking = async (id: any) => {
    try {
        const resp = await request({
            method: 'get',
            url: `/academics/course_management/course_faculty_linking/get/${id}`,
        });        
        return resp?.data?.records;
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
            url: '/academics/course_management/course_faculty_linking/add',
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

// export const update = async (id: string, data: any) => {
//   try {
//     const resp = await request({
//       method: 'post',
//       url: `/academics/courseEvaluationTools/createTools/edit/${id}`,
//       data,
//     });
//     return resp.data;
//   }
//   catch (err) {
//     // Handle Error Here
//     console.error(err);
//     throw err;
//   }
// };

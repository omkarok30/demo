import create from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';

import { useGlobalState } from '../../../global';
import * as service from '@/services/Academics/courseManagement/courseFacultyLinking/courseFacultyLinking';
import * as modelCourseFacultyLinking from '@/models/Academics/courseManagement/courseFacultyLinking/CourseFacultyLinking';
import { convertForDisplay, convertValues } from '@/utils/cast';

const store = (set: any, get: any) => ({
    current: {},
    allRecords: [],
    toolsRecords:[],
    practical:[],
    project:[],
    theory:[],
    tutorial:[],

    getRecords: async (
        selectAcademicYear: any,
        selectProgramDetails: any,
        selectClassNames: any,
        selectSemisterDetails: any,
        selectDivisionDetails: any,) => {
        try {
            const global = useGlobalState.getState().default;
            const res = await service.getAllCourseFacultyLinking();
            console.log('getRecords',
                selectAcademicYear,
                selectProgramDetails,
                selectClassNames,
                selectSemisterDetails,
                selectDivisionDetails,
            );

            let data: any = res;
            console.log('getRecords resp',res
            
        );
            const records: any = [];
            _.each(data, (item) => {
                const record = convertForDisplay(item, modelCourseFacultyLinking.allColumns, global);
                records.push(record);
            });
            const filterAcademicYear = _.filter(records, record => record.academicYear === selectAcademicYear.toString());            
            const filterProgramDetails = _.filter(filterAcademicYear, record => record.programId === selectProgramDetails.toString());
            const filterClassNames = _.filter(filterProgramDetails, record => record.className === selectClassNames);
            const filterSemisterDetails = _.filter(filterClassNames, record => record.semester === selectSemisterDetails);
            const filterDivisionDetails = _.filter(filterSemisterDetails, record => record.division === selectDivisionDetails.toString());
            console.log('filterProgramDetails',filterDivisionDetails);

            const finalRecords = filterDivisionDetails;
            set({ allRecords: finalRecords });
        }
        catch (e) {
            console.log(e);
        }
    },
    getRecord: async (id = 'new') => {

        if (id === 'new') {
            set({ current: {} });
            return;
        }
        const res = await service.getCourseFacultyLinking(id);
        
        const data = convertValues(res, modelCourseFacultyLinking.allColumns);
        set({ current: data });
    },
    addRecord: async (values: any) => {
        try {
            values.id = 'new';
            const data = modelCourseFacultyLinking.submitJSON(values);
            const res = await service.add(data);
            set({ allRecords: [] });
            return res;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    },
    getToolsRecord: async (courseFacultyLinkingId :any) => {
        const res = await service.getAllCourseFacultyLinkingTools(courseFacultyLinkingId);
        const data = convertValues(res, modelCourseFacultyLinking.alltoolsColumns);
        set({ toolsRecords: data });
    },
    getPracticalRecord: async (courseFacultyLinkingId :any) => {
        const res = await service.getAllCourseFacultyLinkingPractical(courseFacultyLinkingId);
        const data = convertValues(res, modelCourseFacultyLinking.allpracticalColumns);
        set({ practicalRecords: data });
    },
    getProjectRecord: async (courseFacultyLinkingId :any) => {
        const res = await service.getAllCourseFacultyLinkingProject(courseFacultyLinkingId);
        const data = convertValues(res, modelCourseFacultyLinking.allprojectColumns);
        set({ projectRecords: data });
    },
    getTheoryRecord: async (courseFacultyLinkingId :any) => {
        const res = await service.getAllCourseFacultyLinkingTheory(courseFacultyLinkingId);
        const data = convertValues(res, modelCourseFacultyLinking.alltheoryColumns);
        set({ theoryRecords: data });
    },
    getTutorialRecord: async (courseFacultyLinkingId :any) => {
        const res = await service.getAllCourseFacultyLinkingTutorial(courseFacultyLinkingId);
        const data = convertValues(res, modelCourseFacultyLinking.alltutorialColumns);
        set({ tutorialRecords: data });
    },
    // updateRecord: async (id: string, values: any) => {
    //     try {
    //         values.id = id;
    //         const data = modelCourseFacultyLinking.submitJSON(values);
    //         const res = await service.update(id, data);
    //         // set({ current: resp });
    //         set({ allRecords: [] });
    //         return res;
    //     }
    //     catch (e) {
    //         console.log(e);
    //         throw e;
    //     }
    // },
});

const devstore = devtools(store);
export const useCourseFacultyLinking = create(devstore);

import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';

import * as degree_program from '@/models/settings/ProgramDetails';
export const allColumns = {
    id: { type: 'string', db: 'id' },
    version: { type: 'integer', db: 'version' },
    createdAt: { type: 'date', db: 'created_at' },
    createdBy: { type: 'string', db: 'created_by' },
    updatedAt: { type: 'date', db: 'updated_at' },
    updatedBy: { type: 'string', db: 'updated_by' },
    deletedAt: { type: 'date', db: 'deleted_at' },
    deletedBy: { type: 'string', db: 'deleted_by' },
    props: { type: 'json', db: 'props' },

    academicYear: { type: 'integer', db: '' },
    [`${degree_program.tableName}.$cbcs$count`]: { type: 'integer', db: '' },
    [`${degree_program.tableName}.$count`]: { type: 'integer', db: '' },
};

export const columns = () => {
    const cols: ColumnsType<any> = [
        { dataIndex: 'academicYear', title: 'Year' },
        { dataIndex: 'degree_programme$cbcs$count', title: 'Number of Programs with CBCS / Elective Course System' },
        { dataIndex: 'degree_programme$count', title: 'Total Number of Programs' }
    ];
    return cols;
};

export const programDetailsColumns = () => {
    const cols: ColumnsType<any> = [
        { dataIndex: 'id', title: 'Sr. No.' },
        { dataIndex: 'programCode', title: 'Program Code' },
        { dataIndex: 'programmeName', title: 'Program Name' },
        { dataIndex: 'startYear', title: 'Year of Introduction' },
        { dataIndex: 'implOfCbcs', title: 'Status of implementation of CBSC/elective courses system(Yes/No)' },
        { dataIndex: 'yearOfImpl', title: 'Year of implementation of CBCS / elective course system' },
        { dataIndex: 'linkToDocument', title: 'Link to the Relevant Document' },
    ];
    return cols;
};
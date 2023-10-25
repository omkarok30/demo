import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';

import { convertForSubmit } from '@/utils/cast';

export const tableName = 'book_accession';

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

  accessionNo: { type: 'string', db: 'accession_no' },
  bookType: { type: 'string', db: 'book_type' },
  bookAccessionID: { type: 'string', db: 'book_accession_id' },
  title: { type: 'string', db: 'title' },
  author: { type: 'string', db: 'author' },
  edition: { type: 'string', db: 'edition' },
  volume: { type: 'string', db: 'volume' },
  namePublication: { type: 'string', db: 'name_publication' },
  placePublication: { type: 'string', db: 'place_publication' },
  yearPublication: { type: 'integer', db: 'year_publication' },
  series: { type: 'string', db: 'series' },
  actualPrice: { type: 'integer', db: 'actual_price' },
  discount: { type: 'integer', db: 'discount' },
  discountPrice: { type: 'integer', db: 'discount_price' },
  subject: { type: 'string', db: 'subject' },
  vendor: { type: 'string', db: 'vendor' },
  receivedDate: { type: 'date', db: 'received_date' },
  receivedCode: { type: 'string', db: 'received_code' },
  billNo: { type: 'string', db: 'bill_no' },
  billDate: { type: 'date', db: 'bill_date' },
  accessionDate: { type: 'date', db: 'accession_date' },
  pages: { type: 'integer', db: 'pages' },
  classNo: { type: 'string', db: 'class_no' },
  bookNo: { type: 'string', db: 'book_no' },
  remarks: { type: 'string', db: 'remarks' },
  materialStatus: { type: 'string', db: 'material_status' },
  langCode: { type: 'string', db: 'lang_code' },
  materialName: { type: 'string', db: 'material_name' },
  location: { type: 'string', db: 'location' },
  cupboard: { type: 'string', db: 'cupboard' },
  selfNumber: { type: 'string', db: 'self_number' },
  isDiploma: { type: 'string', db: 'is_diploma' },
  department: { type: 'string', db: 'department' },
  otherLangTitle: { type: 'string', db: 'other_lang_title' },
  source: { type: 'string', db: 'source' },
  organisation: { type: 'string', db: 'organisation' },
  collegeName: { type: 'string', db: 'college_name' },
};

export const submitJSON = (values: any, modelOnly = true) => {
  let data = {};
  _.each(values, (value, key) => {
    if (modelOnly && _.has(allColumns, key)) {
      _.set(data, [key], value);
    }
  });
  data = convertForSubmit(data, allColumns);
  return JSON.stringify({ dayFormat: { ...data } });
};

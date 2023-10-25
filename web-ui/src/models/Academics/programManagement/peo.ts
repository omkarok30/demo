import _ from "lodash";
import { convertForSubmit } from "@/utils/cast";
import { ColumnsType } from "antd/lib/table";
import * as yup from "yup";

export const allColumns = {
  id: { type: "integer", db: "id" },
  version: { type: "integer", db: "version" },
  createdAt: { type: "date", db: "created_at" },
  createdBy: { type: "string", db: "created_by" },
  updatedAt: { type: "date", db: "updated_at" },
  updatedBy: { type: "string", db: "updated_by" },
  deletedAt: { type: "date", db: "deleted_at" },
  deletedBy: { type: "string", db: "deleted_by" },
  props: { type: "json", db: "props" },

  programId: { type: "string", db: "programe_id" },
  academicYear: { type: "integer", db: "academic_year" },
  peoNumber: { type: "string", db: "peo_number" },
  peoStatement: { type: "string", db: "peo_statement" },
  approvePeo: { type: "string", db: "approve_peo" }
};

export const schemaRules = yup.object().shape({
  peoStatement: yup.string().required('required'),
  peoNumber:yup.string().required('required')
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: "id", title: "Sr. No." },
    { dataIndex: "peoNumber", title: "PEO No." },
    { dataIndex: "peoStatement", title: "PEO Statements" },
    { dataIndex: "approvePeo", title: "Approved In" }
  ];
  return cols;
};
export const submitJSON = (values: any, modelOnly = true) => {
  let data = {};
  _.each(values, (value, key) => {
    if (modelOnly && _.has(allColumns, key)) {
      _.set(data, [key], value);
    }
  });
  data = convertForSubmit(data, allColumns);
  return JSON.stringify({ peo: { ...data } });
};

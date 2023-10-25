export const columns = {
  columns: [
    {
      title: 'Degree Level',
      dataIndex: 'degreelevel',
      sorting: {
        isSort: true,
      },
      filtering: {
        isFilter: true,
      },
    },
    {
      title: 'Academic Year',
      dataIndex: 'year',
    },
    {
      title: 'Active Pattern',
      dataIndex: 'pattern',
    },
    {
      title: 'From Date',
      dataIndex: 'fromdate',
    },
    {
      title: 'To Date',
      dataIndex: 'todate',
    },
    {
      title: 'Re-Exam Applicable',
      dataIndex: 'reexam',
    },
    {
      buttons: ['Edit', 'Delete'],
      dataIndex: 'action',
      key: 'action',
      primaryKey: 'id',
      tableName: 'institutes',
      title: 'Action',
    },
  ],
};

export const formInputs = [
  {
    id: 'degreelevel',
    label: 'Degree Level',
    type: 'text',
    readOnly: 'true',
    validationType: 'string',
    validations: [
      {
        type: 'required',
        params: ['Degree Level is required'],
      },

    ],
  },
  {
    id: 'year',
    label: 'Academic Year',
    readonly: 'true',
    type: 'text',
    validationType: 'string',
    validations: [
      {
        type: 'required',
        params: ['Year is required'],
      },
    ],
  },
  {
    id: 'pattern',

    label: 'Active Pattern',
    readonly: 'true',
    type: 'text',
    validationType: 'string',
    validations: [
      {
        type: 'required',
        params: ['Pattern is required'],
      },
    ],
  },
  {
    id: 'fromdate',
    label: 'From',
    placeholder: 'Enter From Date',
    type: 'DatePicker',

  },
  {
    id: 'todate',
    label: 'To',
    placeholder: 'Enter To Date',
    type: 'DatePicker',
  },
  {
    id: 'reexam',
    label: 'Does this sem have Re-Exam?',
    placeholder: 'Select Option',
    type: 'select',
    options: [
      {
        value: 'YES',
        label: 'YES',
      },
      {
        value: 'NO',
        label: 'NO',
      },
    ],
    validationType: 'string',
    validations: [
      {
        type: 'required',
        params: ['Reexam option is is required'],
      },
    ],
  },
];

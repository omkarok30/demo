export const columns = {
  columns: [
    {
      dataIndex: 'levelOfEducation',
      key: 'levelOfEducation',
      title: 'Level of Education',
      sorting: {
        isSort: true,
      },
      filtering: {
        isFilter: true,
      },
    },
    {
      dataIndex: 'program',
      key: 'program',
      title: 'Program',
      sorting: {
        isSort: true,
      },
      filtering: {
        isFilter: true,
      },
    },
    {
      dataIndex: 'facultyOfProgram',
      key: 'facultyOfProgram',
      title: 'Faculty Of Program',
      sorting: {
        isSort: true,
      },
      filtering: {
        isFilter: true,
      },
    },
    {
      dataIndex: 'affiliationType',
      key: 'affiliationType',
      title: 'Affiliation Type',
    },
    {
      dataIndex: 'programCode',
      key: 'programCode',
      title: 'Program Code',
    },
    {
      dataIndex: 'programDuration',
      key: 'programDuration',
      title: 'Program Duration',
    }, {
      dataIndex: 'currentIntake',
      key: 'currentIntake',
      title: 'Current Intake',
    }, {
      dataIndex: 'commencementYear',
      key: 'commencementYear',
      title: 'Commencement Year',
    }, {
      dataIndex: 'closureYear',
      key: 'closureYear',
      title: 'Closure Year',
    }, {
      dataIndex: 'resultPattern',
      key: 'resultPattern',
      title: 'Result Pattern',
    },
    {
      dataIndex: 'examPattern',
      key: 'examPattern',
      title: 'Examination Pattern',
    },

    {
      buttons: ['Edit', 'Delete'],
      dataIndex: 'action',
      key: 'action',
      primaryKey: 'id',
      tableName: 'programDetails',
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

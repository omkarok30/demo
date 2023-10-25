export const columns = {
  columns: [
    {
      title: 'Student Insurance Structure',
      dataIndex: 'studInsStructure',
      sorting: {
        isSort: true,
      },
      filtering: {
        isFilter: true,
      },
    },
    {
      title: 'Student Insurance Head',
      dataIndex: 'studInsHead',
    },
    {
      title: 'Fee Amount',
      dataIndex: 'feeAmount',
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

const feeheadary = [{ value: '', label: '' }];

const resp = {
  data: [
    {
      key: 1,
      id: 1,
      student_insurance: 'Health Insurance',
    },
    {
      key: 2,
      id: 2,
      student_insurance: 'Disability Insurance',
    },
  ],
};

resp.data.map((item: any) => {
  const feeheadname = {
    value: item.id,
    label: item.student_insurance,
  };
  feeheadary.push(feeheadname);
});

feeheadary.splice(0, 1);
export const formInputs = [
  {
    id: 'studInsStructure',
    label: 'Student Insurance Structure',
    type: 'text',
    validationType: 'string',
    validations: [
      {
        type: 'required',
        params: ['Student Insurance Structure Name is required'],
      },
    ],
  },
  {
    id: 'studInsHead',
    label: 'Student Insurance Head',
    placeholder: 'Select Option',
    type: 'select',
    mode: 'multiple',
    options: feeheadary,
    /* {
      value: "1",
      label: "Income"
    },
    {
      value: "2",
      label: "Miscellaneous income"
    } */
    // ],

  },
  {
    id: 'feeAmount',
    label: 'Fee Amount',
    placeholder: 'Enter Fee Amount',
    type: 'text',
    validationType: 'number',
  },
  {
    id: 'message',
    label: 'Important: Once the record is added it can not be deleted.',
    type: 'message',
    label1: 'User Must ',
    label2: ' the checkbox to activate the submit button to create a head in the records. ',
  },
  {
    id: 'confirm',
    label: 'I confirm to add the above record.',
    type: 'Checkbox',
    validationType: 'string',
    validations: [
      {
        type: 'required',
        params: ['Fee Head is required'],
      },
    ],
  },
];

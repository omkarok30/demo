export const columns = {
  columns: [
    {
      title: 'University Fee Structure',
      dataIndex: 'universityStructure',
      sorting: {
        isSort: true,
      },
      filtering: {
        isFilter: true,
      },
    },
    {
      title: 'University Fee Head',
      dataIndex: 'universityfee',
      sorting: {
        isSort: true,
      },
      filtering: {
        isFilter: true,
      },
    },
    {
      title: 'Fee Amount (INR)',
      dataIndex: 'FeeAmount',
      sorting: {
        isSort: true,
      },
      filtering: {
        isFilter: true,
      },
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

const resp = {
  data: [
    {
      key: 1,
      id: 1,
      universityfeehead: 'sample 1',

    },
    {
      key: 2,
      id: 2,
      universityfeehead: 'Sample 2',
    },
  ],
};
const universityArray = [{ value: '', label: '' }];

resp.data.map((item: any) => {
  const fee = {
    value: item.id,
    label: item.universityfeehead,
  };
  universityArray.push(fee);
});
universityArray.splice(0, 1);

export const formInputs = [
  {
    id: 'universityStructure',
    label: 'University Fee Structure:',
    type: 'text',
    validationType: 'string',
    validations: [
      {
        type: 'required',

        params: ['University Fee Structure is required'],
      },

    ],
  },
  {
    id: 'universityfee',
    label: 'University Fee Head',
    placeholder: 'Select Option',
    type: 'select',
    mode: 'multiple',
    options: universityArray,
  },
  {
    id: 'FeeAmount',
    label: 'Fee Amount',
    type: 'text',
    validationType: 'string',
    validations: [
      {
        type: 'required',

        params: ['Fee Amount is required'],
      },

    ],
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

        params: ['Fee Structure is required'],
      },

    ],
  },
];

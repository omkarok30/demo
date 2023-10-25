export const columns = {
  columns: [
    {
      title: 'Fee Head',
      dataIndex: 'feehead',
      sorting: {
        isSort: true,
      },
      filtering: {
        isFilter: true,
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
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
    id: 'feehead',
    label: 'Fee Head',
    type: 'text',
    validationType: 'string',
    validations: [{
      type: 'required',
      params: ['Fee Head is required'],
    },
    ],
  },

  {
    id: 'type',
    label: 'Type',
    placeholder: 'Select Option',
    type: 'select',
    options: [
      {
        value: '1',
        label: 'Income',
      },
      {
        value: '2',
        label: 'Miscellaneous income',
      },
    ],
    validationType: 'string',
    validations: [
      {
        type: 'required',
        params: ['Type is is required'],
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
        params: ['Fee Head is required'],
      },
    ],
  },
];

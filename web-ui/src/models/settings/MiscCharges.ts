export const columns = {
  columns: [
    {
      title: 'Miscellaneous Fee Head',
      dataIndex: 'mischead',
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

export const formInputs = [
  {
    id: 'mischead',
    label: 'Miscellaneous Head',
    type: 'text',
    validationType: 'string',
    validations: [
      {
        type: 'required',
        params: ['Miscellaneous Head is required'],
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

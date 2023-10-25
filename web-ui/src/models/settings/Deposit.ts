export const columns = {
  columns: [{
    dataIndex: 'deposit_name',
    key: 'deposit_name',
    title: 'Deposit Name',
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
    id: 'deposit_name',
    label: 'Deposit Name',
    placeholder: 'Enter Deposit Name',
    type: 'text',
    validationType: 'string',
    validations: [
      {
        type: 'required',
        params: ['Deposit name is required'],
      },
      {
        type: 'min',
        params: [3, 'Deposit name cannot be less than 3 characters'],
      },
      {
        type: 'max',
        params: [50, 'Deposit name cannot be more than 50 characters'],
      },
    ],
  },
  {
    id: 'message',
    label: 'Important: Once the record is added it can not be deleted.',
    type: 'message',
    label1: 'User Must',
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
        params: ['Deposit name is required'],
      },
    ],
  },

];

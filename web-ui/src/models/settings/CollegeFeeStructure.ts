export const columns = {
  columns: [
    {
      title: 'Fee Structure Name',
      dataIndex: 'feename',
      sorting: {
        isSort: true,
      },
      filtering: {
        isFilter: true,
      },
    },
    {
      title: 'Fee Head',
      dataIndex: 'feehead',

    },
    {
      title: 'Fee Amount',
      dataIndex: 'amount',
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
const resp = [
  {
    key: 1,
    id: 1,
    feehead: 'Admission Fees',
    type: 'Income',

  },
  {
    key: 2,
    id: 2,
    feehead: 'Tution Fees',
    type: 'Miscellaneous income',
  },
];

// eslint-disable-next-line array-callback-return
resp.map((item: any) => {
  const feeheadname = {
    value: item.id,
    label: item.feehead,
  };
  feeheadary.push(feeheadname);
});
feeheadary.splice(0, 1);

export const formInputs = [
  {
    id: 'feename',
    label: 'Fee Structure Name',
    type: 'text',
    validationType: 'string',
    validations: [
      {
        type: 'required',
        params: ['Fee Structure Name is required'],
      },
    ],
  },
  {
    id: 'feehead',
    label: 'Fee Head',
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
    id: 'amount',
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

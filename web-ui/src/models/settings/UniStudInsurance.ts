export const columns = {
  columns: [
    {
      dataIndex: 'program',
      key: 'program',
      title: 'Programs',
      sorting: {
        isSort: true,
      },
      filtering: {
        isFilter: true,
      },
    },
    {
      title: 'University Fee Structure',
      dataIndex: 'unifee_structure',
    },
    {
      title: 'Student Insurance Structure',
      dataIndex: 'student_insurance',
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

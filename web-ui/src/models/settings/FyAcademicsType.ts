export const columns = {
  columns: [
    {
      dataIndex: 'aYear',
      key: 'aYear',
      title: 'Academic Year',
      sorting: {
        isSort: true,
      },
      filtering: {
        isFilter: true,
      },
    },
    {
      dataIndex: 'aytype',
      key: 'aytype',
      title: 'FY Academics Type',
      primaryKey: 'id',
      tableName: 'institutes',
      buttons: ['togglechange'],
    },
  ],
};

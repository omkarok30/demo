import React from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Input, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import * as modelStudentInfo from '@/models/admissions/studentRecords/StudentInfo';
import { useStudentInfo } from '@/store/admissions/useStudentInfo';
import { useSettings } from '@/store/settings/useSettings';
import { attachRenderer } from '@/utils/tableExtras';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import { ProgramAsText } from '@/pages/settings/ProgramDetails/renderers';

const renderers = {
  registrationYear: (value: string) => <YearAsText value={value} />,
  programId: (value: string) => <ProgramAsText value={value} />,

};
const StudentInfo = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeStudentInfo = useStudentInfo((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }),
  );

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`../edit/${record?.id}`, { state: { id: record?.id } });
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeStudentInfo.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelStudentInfo.searchColumns(settings);
    cols.unshift({
      title: 'Student Name',
      dataIndex: 'studentName',
      render: (_, record) => [<span>{record.lastName} {record.firstName} {record.middleName}</span>],
    });
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [<Button type="link" onClick={() => handleActionClick({ action: 'edit', record })}>View/Edit</Button>],
    });
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="Search Students d"
      >
           <Form layout="vertical">
            <Form.Item label=" Student Name/Code" required style={{ width: 400 }}>
            <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary">Search</Button>
            </Form.Item>
           </Form>
        <Table bordered columns={columns} dataSource={storeStudentInfo.allRecords} />
      </Card>
    </div>
  );
};

export default StudentInfo;

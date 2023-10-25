import React from 'react';
import { Button, Card, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import { useSettings } from '@/store/settings/useSettings';
import { useEmployeeDashboardAdministrative } from '@/store/employee/useemployeedashAdministrative';
import * as modelEmployeeDashboard from '@/models/Employee/EmployeeDashboard';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import { attachRenderer } from '@/utils/tableExtras';

const renderers = {
  startYear: (value: string) => <YearAsText value={value} />,
  endYear: (value: string) => <YearAsText value={value} />,
};

const AdministrativeList = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeEmployeeAdministrative = useEmployeeDashboardAdministrative(
    (state: any) => ({
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
    storeEmployeeAdministrative.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelEmployeeDashboard.Administrativecolumns(settings);
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <Button
          type="link"
          onClick={() => handleActionClick({ action: 'edit', record })}
        >
          View Staff
        </Button>,
      ],
    });
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <Card
        bordered={false}
        title="Administrative Departments
        "
      >
        <Table
          bordered
          columns={columns}
          dataSource={storeEmployeeAdministrative.allRecords}
        />
      </Card>
    </div>
  );
};

export default AdministrativeList;

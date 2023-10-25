import React, { useState } from 'react';
import { Button, Card, Col, Divider, Row, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { DownloadOutlined } from '@ant-design/icons';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { useSettings } from '@/store/settings/useSettings';
import { useAcademicDepartment } from '@/store/settings/useAcademicDepartment';
import * as modelAdmisiiondashboard from '@/models/AdmissionDashboard/addmisiiondashboard';

const AdmissionList = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeAcademicDepartment = useAcademicDepartment((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }),
  );
  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'

  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  React.useEffect(() => {
    fetchSettings();
    storeAcademicDepartment.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelAdmisiiondashboard.Admissioncategorywisecolumns(settings);
    return cols;
  }, [settings]);

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title=""
      >
        <Row justify="end">
        </Row>
        <Table bordered columns={columns} scroll={{ x: 300 }}/>
        <Divider />
        <Row justify={'center'}>
          <Col>
          <Button onClick={handleClick} style={{ backgroundColor: active ? 'green' : 'green' }} icon={<DownloadOutlined />} size={size}>
              Download
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AdmissionList;

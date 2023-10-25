import { DownloadOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import NaacDataTable from './NaacDataTable';

const StudentsRecordTable = ({ current, schemeName, columns, dataSource }) => {
  const navigate = useNavigate();
  return (
    <>
      <Row justify={'space-between'}>
        <Col span={12}>
          <p><b>Academic Year</b>: {current?.year}</p>
        </Col>
        {schemeName && <Col span={12}>
          <p><b>Scheme Name</b>: {schemeName}</p>
        </Col>}
      </Row>

      <Divider style={{ margin: '1rem 0' }} />

      <NaacDataTable columns={columns} dataSource={dataSource} downloadBtn />

      <Divider />

      <Row justify={'center'}>
        <Space>
          <Button type="primary" icon={<DownloadOutlined />}>Download Report</Button>,
          <Button onClick={() => navigate(-1)}>
            Back
          </Button>
        </Space>
      </Row></>
  )
}

export default StudentsRecordTable
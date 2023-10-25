import { useMemo } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Button, Card, Col, Divider, Row, Space } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { EditFilled } from '@ant-design/icons';
import { useCustomeInternalQualityHook } from '../renderers';
import { useSettings } from '@/store/settings/useSettings';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import * as modelCriteria653 from '@/models/NAAC/criteria6/criteria6_5_3';
import NaacDataTable from '@/components/Naac/NaacDataTable';

const EditQualityAssurance = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const yearId = searchParams.get('year');

  const { initiativeRecords } = useCustomeInternalQualityHook(yearId);

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelCriteria653.columns(settings);
    cols.push({
      title: 'Action',
      dataIndex: 'link',
      key: 'activity',
      render: (_, record) => {
        return <Button type='link' icon={<EditFilled />} onClick={() => navigate(`../editIndividually/?year=${yearId}&id=${record.id}`)} title='Edit' />;
      },
    });
    return cols;
  }, [settings]);

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
      >
        <h3 style={{ margin: 0 }}>6.5.3. Quality assurance initiatives of the institution include:</h3>
        <ol style={{ paddingLeft: '14px', fontWeight: 'bold' }}>
          <li>Regular meeting of Internal Quality Assurance Cell (IQAC); Feedback collected, analyzed and used for improvements</li>
          <li>Collaborative quality initiatives with other institution(s)</li>
          <li>Participation in NIRF</li>
          <li>any other quality audit recognized by state, national or international agencies (ISO Certification, NBA)</li>
        </ol>

        <Divider />

        <>
          <Row justify={'space-between'}>
            <Col span={12}>
              <div style={{ display: 'flex', marginBottom: 16 }}><b>Academic Year</b>: <YearAsText value={Number(yearId)} /></div>
            </Col>
          </Row>

          <NaacDataTable columns={columns} dataSource={initiativeRecords} downloadBtn />

          <Divider />

          <Row justify={'center'}>
            <Space>
              <Button type='primary'>
                Save
              </Button>
              <Button onClick={() => navigate(-1)}>
                Back
              </Button>
            </Space>
          </Row>
        </>
      </Card>
    </div >
  );
};

export default EditQualityAssurance;

import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Divider, Form, Space } from 'antd';
import { useMemo, useState } from 'react';
import Table, { ColumnsType } from 'antd/lib/table';
import { DownCircleFilled, DownloadOutlined } from '@ant-design/icons';
import { useCustomEventHook } from '../renderers';
import ModalUploadDocs from './modalUploadDocs';
import * as modelCriteria533 from '@/models/NAAC/criteria5_3/criteria5_3_3';
import { useSettings } from '@/store/settings/useSettings';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

function NaacCriteria533Edit() {
  const settings = useSettings((state: any) => state.byKeys);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const [selectedStud, setSelectedStud] = useState<any[]>([]);
  const [form] = Form.useForm();

  const { studentsData, current } = useCustomEventHook(yearId);
  const Criteria533Title = '5.3.3. Number of sports and cultural events/ competitions in which students of the Institution participated during the year (organized by the institution/ other institutions)';

  const handleUploadDocs = (record: any) => {
    const curData = [record];
    setSelectedStud(curData);
    setOpenModal(true);
  };

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelCriteria533.columnsEvents(settings);
    cols.push(
      {
        title: 'Document',
        dataIndex: 'document',
        key: 'document',
        render: (_, record) => record.document ? <Button icon={<DownCircleFilled />} /> : <Button type='primary' size='small' onClick={() => handleUploadDocs(record)}>Upload</Button>,
      });
    return cols;
  }, [settings]);

  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        // eslint-disable-next-line no-console
        console.log(values);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log('error', e);
      });
  };

  return (
    <div className='layout-main-content'>
      <Form
      >
        <Card
          bordered={false}
          actions={[
            <Button onClick={() => navigate('../list')}>
              Back
            </Button>,
          ]}
        >
          <h3 style={{ margin: 0 }}>{Criteria533Title}</h3>

          <Divider />

          <table style={{ border: '2px solid #f0f0f0' }}>
            <tbody className="ant-table-tbody">
              <tr>
                <td width={300}><b>{'Academic Year'}</b></td>
                <td><YearAsText value={current?.academicYear} /></td>
              </tr>
              <tr>
                <td width={300}><b>Number of students participated in sports and cultural events/competitions in which students of the Institution participated</b></td>
                <td>{current?.events$count}</td>
              </tr>
            </tbody>
          </table>

          <Divider style={{ margin: '1rem 0' }} />

          {
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem 0' }}>
              <Space>
                <Button type="primary" icon={<DownloadOutlined />} shape="round" title="Download Report">Download Report</Button>
              </Space>
            </div>
          }

          <Table bordered columns={columns} dataSource={studentsData} />
          {
            useMemo(() =>
              <ModalUploadDocs
                open={openModal}
                title="Upload Document for File Description"
                currStudent={selectedStud}
                onHide={() => setOpenModal(!openModal)}
                onModalSubmit={onFormSubmit}
                year={current?.academicYear}
              />,
            [openModal],
            )
          }

        </Card>
      </Form >
    </div >
  );
}

export default NaacCriteria533Edit;

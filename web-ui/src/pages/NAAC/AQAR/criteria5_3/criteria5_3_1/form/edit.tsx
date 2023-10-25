import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Divider, Form, Space } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import Table, { ColumnsType } from 'antd/lib/table';
import { DownCircleFilled, DownloadOutlined } from '@ant-design/icons';
import { useCustomAwardHook } from '../renderers';
import ModalUploadDocs from './modalUploadDocs';
import * as modelCriteria531 from '@/models/NAAC/criteria5_3/criteria5_3_1';
import { useSettings } from '@/store/settings/useSettings';
import { ProgramAsText } from '@/pages/settings/ProgramDetails/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const renderers = {
  studentInfo$programId: (value: string) => <ProgramAsText value={value} />,
  academicYear: (value: string) => <YearAsText value={value} />,
};

const NaacCriteria531Edit = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const [selectedStud, setSelectedStud] = useState<any[]>([]);
  const [form] = Form.useForm();

  const { studentsData, current } = useCustomAwardHook(yearId);
  const Criteria531Title = '5.3.1. Number of awards/medals for outstanding performance in sports/cultural activities at university/state/national / international level (award for a team event should be counted as one) during the year';

  const handleUploadDocs = (record: any) => {
    const curData = [record];
    setSelectedStud(curData);
    setOpenModal(true);
  };

  useEffect(() => {
    return () => {
      setSelectedStud([]);
    };
  }, []);

  const columns: ColumnsType<any> = useMemo(() => {
    let cols = modelCriteria531.columnsAward(settings);
    cols = attachRenderer(cols, renderers);
    cols.push(
      {
        title: 'Document',
        dataIndex: 'document',
        key: 'document',
        render: (_, record: { id: number; document: string }) => record.document ? <Button icon={<DownCircleFilled />} /> : <Button type='primary' size='small' onClick={() => handleUploadDocs(record)}>Upload</Button>,
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
          <h3 style={{ margin: 0 }}>{Criteria531Title}</h3>

          <Divider />

          <table style={{ border: '2px solid #f0f0f0' }}>
            <tbody className="ant-table-tbody">
              <tr>
                <td width={300}><b>{'Academic Year'}</b></td>
                <td><YearAsText value={current?.academicYear} /></td>
              </tr>
              <tr>
                <td width={300}><b>Number of awards/medals for outstanding performance in sports/cultural activities at university/state/national / international level</b></td>
                <td>{current?.award$count}</td>
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
            [openModal, selectedStud],
            )
          }

        </Card>
      </Form >
    </div >
  );
};

export default NaacCriteria531Edit;

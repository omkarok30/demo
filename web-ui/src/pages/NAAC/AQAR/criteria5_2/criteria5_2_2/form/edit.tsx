import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Divider, Form, Space } from 'antd';
import { useMemo, useRef, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { DeleteFilled, DownCircleFilled, EditFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { useCustomProgressHook } from '../renderers';
import TableDataWithSelection from '../../component/TableDataWithSelection';
import ModalUploadDocs from './modalUploadDocs';
import * as modelCriteria522 from '@/models/NAAC/criteria5_2/criteria5_2_2';
import { useSettings } from '@/store/settings/useSettings';
import TableTooltipIcon from '@/components/Naac/TableTooltipIcon';
import calcPercentage from '@/utils/calculatePercent';
import { ProgramAsText } from '@/pages/settings/ProgramDetails/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const renderers = {
  studentInfo$programId: (value: string) => <ProgramAsText value={value} />,
};

const NaacCriteria522Edit = () => {
  const navigate = useNavigate();
  const settings = useSettings((state: any) => state.byKeys);
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');
  const selectedStudentRef = useRef(null);
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const [form] = Form.useForm();

  const { currProgression, current, getProgressionData } = useCustomProgressHook(yearId);
  const Criteria522Title = '5.2.2. Number of students progressing to higher education during the year';

  const handleUploadDocs = (id: number) => {
    selectedStudentRef.current = currProgression.filter((list: any) => list.id === id);
    setOpenModal(true);
  };

  const columns: ColumnsType<any> = useMemo(() => {
    let cols = modelCriteria522.columnsProgression(settings);
    cols = attachRenderer(cols, renderers);
    cols.push(
      {
        title: 'Document',
        dataIndex: 'document',
        key: 'document',
        render: (_, record: { id: number; document: string }) => record.document ? <Button icon={<DownCircleFilled />} /> : <Button type='primary' size='small' onClick={() => handleUploadDocs(record.id)}>Upload</Button>,
      }, {
        title: 'Action',
        dataIndex: 'link',
        key: 'activity',
        render: (_, record) => {
          return <Space size={1}><Button type='link' icon={<EditFilled />} onClick={() => navigate(`../editIndividual/?year=${yearId}&id=${record.id}`)} title='Edit' /><Button type='link' icon={<DeleteFilled title='Delete' />} danger /></Space>;
        },
      });
    return cols;
  }, [settings, current]);

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
          <h3 style={{ margin: 0 }}>{Criteria522Title}</h3>

          <Divider />

          <table style={{ border: '2px solid #f0f0f0' }}>
            <tbody className="ant-table-tbody">
              <tr>
                <td width={300}><b>{'Academic Year'}</b></td>
                <td><YearAsText value={current?.academicYear} /></td>
              </tr>
              <tr>
                <td width={300}><b>Number of outgoing students placed</b></td>
                <td>{current?.progressing$count}</td>
              </tr>
              <tr>
                <td width={300}><b>Number of outgoing students</b></td>
                <td>{current?.studentPromotionMap$count}</td>
              </tr>
              <tr>
                <td width={300}><b>Percentage per Year</b></td>
                <td>
                  {
                    current?.progressing$count && calcPercentage(current?.progressing$count, current?.studentPromotionMap$count)
                  }
                  {
                    <TableTooltipIcon columnTitle={' '} textContent={'Percentage per year = (Number of outgoing students progressing to higher education)  / (Number of outgoing Students)*100'}><ExclamationCircleFilled /></TableTooltipIcon>
                  }
                </td>
              </tr>
            </tbody>
          </table>

          <Divider style={{ margin: '1rem 0' }} />

          <TableDataWithSelection columns={columns} currRecord={currProgression} getData={getProgressionData} />

          {
            useMemo(() =>
              <ModalUploadDocs
                open={openModal}
                title="Upload Document for File Description"
                currStudent={selectedStudentRef.current}
                onHide={() => setOpenModal(!openModal)}
                onModalSubmit={onFormSubmit}
              />,
            [openModal],
            )
          }

        </Card>
      </Form >
    </div >
  );
};

export default NaacCriteria522Edit;

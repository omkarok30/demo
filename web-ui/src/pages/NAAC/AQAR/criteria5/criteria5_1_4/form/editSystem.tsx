import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Divider, Form } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { DownloadOutlined, EditFilled } from '@ant-design/icons';
import { useCustomCounselHook } from '../renderer';
import ModalUpdatePlacement from './modalUpdatePlacement';
import * as modelCriteria514 from '@/models/NAAC/criteria5_1/criteria5_1_4';
import { useSettings } from '@/store/settings/useSettings';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import ModalUploadDocs from '@/components/Naac/modalUploadDocs';

const Criteria514Title = '5.1.4. Number of students benefitted by guidance for competitive examinations and career counseling offered by the Institution during the year';

const NaacCriteria514EditSystem = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');
  const settings = useSettings((state: any) => state.byKeys);
  const [openModal, setOpenModal] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [form] = Form.useForm();

  const { current, updatePlacements } = useCustomCounselHook(yearId);

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelCriteria514.activityColumns(settings);
    cols.push({
      title: 'Name of the Activity conducted by the HEI to offer guidance for competitive examinations offered by the institution during the last five years',
      children: [
        {
          title: 'Name of the Activity',
          dataIndex: 'name',
          key: 'name',
          width: 200,
        },
        {
          title: 'Number of students attended / participated',
          dataIndex: 'studentsParticiated',
          key: 'studentsParticiated',
          width: 200,
          render: (_, record) => {
            return record.studentsParticiated ? <Button type="link" onClick={() => navigate(`../StudentInfo/?activityId=${record.id}&year=${yearId}`)}>{record.studentsParticiated}</Button > : '-';
          },
        },
      ],
    }, {
      title: 'Documents',
      dataIndex: 'activity',
      key: 'activity',
      render: (_, record) => {
        return record.documents
          ? <Button type='primary' size={'small'} shape="round" icon={<DownloadOutlined />} title='Donload' />
          : <Button type='primary' size="small"
          onClick={() => {
            setOpenUploadModal(true);
            form.resetFields();
          }}
        >Upload</Button>;
      },
    }, {
      title: 'Link to the relevant document',
      key: 'link',
      render: (_, record) => record.link ? [<Button type="link">{record.link}</Button >] : 'N/A',
    }, {
      title: 'Action',
      key: 'activity',
      render: (_, record) => {
        return [<Button type="link" icon={<EditFilled />} onClick={() => navigate(`../CompitativeExam/editIndividually/?activityId=${record.id}&year=${yearId}`)}></Button >];
      },
    });
    return cols;
  }, [settings]);

  return (
    <div className='layout-main-content'>
      <Form form={form}
        labelWrap
        labelCol={{ flex: '250px' }}
        labelAlign="left"
      >
        <Card
          bordered={false}
          actions={[
            <Button onClick={() => navigate('../list')}>
              Back
            </Button>,
          ]}
        >
          <h3 style={{ margin: 0 }}>{Criteria514Title}</h3>

          <Divider />

          <table >
            <tbody className="ant-table-tbody">
              <tr>
                <td width={300}><b>{'Academic Year'}</b></td>
                <td>{current?.year}</td>
              </tr>
              <tr>
                <td width={300}><b>Number of students benefited by guidance for competitive examinations and career counselling offered by the Institution</b></td>
                <td>{current?.studentBeneiciaryDetails$count}</td>
              </tr>
              <tr>
                <td width={300}><b>Total number of students</b></td>
                <td>{current?.studentPromotionMap$count}</td>
              </tr>
              <tr>
                <td width={300}><b>Number of students placed through campus placement</b></td>
                <td>{current?.placements} <Button type='text'
                  onClick={() => {
                    setOpenModal(true);
                    form.resetFields();
                  }}
                ><EditFilled style={{ fontSize: '1rem' }} role={'button'} /></Button></td>
              </tr>
            </tbody>
          </table>

          <Divider style={{ margin: '1rem 0' }} />

          {current?.activity && <NaacDataTable downloadBtn columns={columns} dataSource={current?.activity} />}
        </Card>

        {
          useMemo(() =>
            <ModalUpdatePlacement
              onHide={() => setOpenModal(false)}
              openModal={openModal}
              count={current?.placements}
            />,
          [openModal],
          )
        }

        {
          useMemo(() =>
            <ModalUploadDocs
              open={openUploadModal}
              title="Upload Document for File Description"
              onHide={() => setOpenUploadModal(!openUploadModal)}
              year={current?.year}
            />,
          [openUploadModal],
          )
        }
      </Form >
    </div >
  );
};

export default NaacCriteria514EditSystem;

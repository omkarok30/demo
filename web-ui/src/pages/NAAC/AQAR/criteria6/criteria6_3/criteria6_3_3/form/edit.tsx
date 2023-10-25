import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Divider, Space } from 'antd';
import { useMemo, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { DeleteFilled, DownCircleFilled, EditFilled } from '@ant-design/icons';
import { useCustomProfessionalHook } from '../renderers';
import TableDataWithSelection from '../../component/TableDataWithSelection';
import ModalUploadXls from '../../component/modalUploadXls';
import ModalUploadDocs from './modalUploadDocs';
import * as modelCriteria633 from '@/models/NAAC/criteria6/criteria6_3_3';
import { useSettings } from '@/store/settings/useSettings';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const NaacCriteria633Edit = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');
  const [selectedProf, SetSelectedProf] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const [openModalDocs, setOpenModalDocs] = useState<Boolean>(false);

  const { current, currProfessional, getProfessionalData } = useCustomProfessionalHook(yearId);

  const Criteria633Title = '6.3.3. Number of professional development/ administrative training programs organized by the institution for teaching and non-teaching staff during the year';

  const handleUploadDocs = (record: any) => {
    const profData = [record];
    SetSelectedProf(profData);
    setOpenModalDocs(true);
  };

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelCriteria633.columnsProfessional(settings);
    cols.push(
      {
        title: 'Document',
        dataIndex: 'document',
        key: 'document',
        render: (_, record: { id: number; document: string }) => record.document ? <Button icon={<DownCircleFilled />} /> : <Button type='primary' size='small' onClick={() => handleUploadDocs(record)}>Upload</Button>,
      }, {
        title: 'Action',
        key: 'action',
        render: (_, record) => [
        <Space>
          <Button
            type='link'
            onClick={() =>
              navigate(`../editIndividual/?year=${record.academicYear}&id=${record.id}`)
            }
            title="Edit"
            icon={<EditFilled />}
          />
          <Button
            type='link'
            icon={<DeleteFilled />}
            danger
          />
        </Space>,
        ],
      });
    return cols;
  }, [settings]);

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        actions={[
          <Button onClick={() => navigate('../list')}>
            Back
          </Button>,
        ]}
      >
        <h3 style={{ margin: 0 }}>{Criteria633Title}</h3>

        <Divider />

        <table style={{ border: '2px solid #f0f0f0' }}>
          <tbody className="ant-table-tbody">
            <tr>
              <td width={300}><b>{'Academic Year'}</b></td>
              <td><YearAsText value={current?.academicYear} /></td>
            </tr>
            <tr>
              <td width={300}><b>Number of professional development /administrative training programs organized by the institution for teaching and non teaching staff</b></td>
              <td>{current?.professional_details$count || 0}</td>
            </tr>
          </tbody>
        </table>

        <Divider style={{ margin: '1rem 0' }} />

        <TableDataWithSelection
          columns={columns}
          currRecord={currProfessional}
          getData={getProfessionalData}
          modal={() => setOpenModal(true)}
        />
      </Card>

      {
        useMemo(() =>
          <ModalUploadDocs
            open={openModalDocs}
            title="Upload Document for File Description"
            currProfessional={selectedProf}
            onHide={() => setOpenModalDocs(!openModalDocs)}
          />,
        [openModalDocs, selectedProf],
        )
      }
      {
        useMemo(() =>
          <ModalUploadXls
            open={openModal}
            title="You can import details in bulk using the excel file import here."
            onHide={() => setOpenModal(!openModal)}
            year={current?.academicYear}
          />,
        [openModal])
      }
    </div >
  );
};

export default NaacCriteria633Edit;

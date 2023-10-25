import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Divider, Space } from 'antd';
import { useMemo, useRef, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { useCustomFundsHook } from '../renderers';
import TableDataWithSelection from '../../component/TableDataWithSelection';
import ModalUploadXls from '../../component/modalUploadXls';
import ModalUploadDocs from './modalUploadDocs';
import * as modelCriteria642 from '@/models/NAAC/criteria6/criteria6_4_2';
import { useSettings } from '@/store/settings/useSettings';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

function NaacCriteria642Edit() {
  const settings = useSettings((state: any) => state.byKeys);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');
  const selectedProfRef = useRef(null);
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const [openModalDocs, setOpenModalDocs] = useState<Boolean>(false);

  const { current, currFundsGrant, getFundsGrantData } = useCustomFundsHook(yearId);

  const Criteria642Title = '6.4.2. Funds/ Grants received from non-government bodies, individuals, philanthropers during the year (not covered in Criterion III)';

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelCriteria642.columnsFunds(settings);
    cols.push(
      {
        title: 'Link to Audited Statement of Accounts reflecting the receipts',
        dataIndex: 'link',
        key: 'link',
        render: (_, record: { id: number; link: string }) => record.link ? <Button type='link' target='_blank' href={`http://${record.link}`}>{record.link}</Button> : '',
      },
      {
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
        <h3 style={{ margin: 0 }}>{Criteria642Title}</h3>

        <Divider />

        <table style={{ border: '2px solid #f0f0f0' }}>
          <tbody className="ant-table-tbody">
            <tr>
              <td width={300}><b>{'Academic Year'}</b></td>
              <td><YearAsText value={current?.academicYear} /></td>
            </tr>
            <tr>
              <td width={300}><b>Total funds / Grants received from non-government bodies, individuals, philanthropers (INR In Lakhs)</b></td>
              <td>{current?.funds_details$count || 0}</td>
            </tr>
          </tbody>
        </table>

        <Divider style={{ margin: '1rem 0' }} />

        <TableDataWithSelection
          columns={columns}
          currRecord={currFundsGrant}
          getData={getFundsGrantData}
          modal={() => setOpenModal(true)}
        />
      </Card>

      {
        useMemo(() =>
          <ModalUploadDocs
            open={openModalDocs}
            title="Upload Document for File Description"
            currFundsGrant={selectedProfRef.current}
            onHide={() => setOpenModalDocs(!openModalDocs)}
          />,
        [openModalDocs],
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
}

export default NaacCriteria642Edit;

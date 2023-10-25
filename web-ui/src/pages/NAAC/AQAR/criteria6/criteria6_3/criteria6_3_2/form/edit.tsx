import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Divider, Space } from 'antd';
import { useMemo, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { DeleteFilled, DownCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { useCustomFInancialHook } from '../renderers';
import ModalUploadDocs from './modalUploadDocs';
import * as modelCriteria632 from '@/models/NAAC/criteria6/criteria6_3_2';
import { useSettings } from '@/store/settings/useSettings';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import TableTooltipIcon from '@/components/Naac/TableTooltipIcon';
import calcPercentage from '@/utils/calculatePercent';

const NaacCriteria632Edit = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const [selectedFInancial, setSelectedFInancial] = useState<any[]>([]);

  const { current, currFInancial } = useCustomFInancialHook(yearId);

  const Criteria632Title = '6.3.2. Number of teachers provided with financial support to attend conferences/ workshops and towards membership fee of professional bodies during the year';

  const handleUploadDocs = (record: any) => {
    const selFinanceId = [record];
    setSelectedFInancial(selFinanceId);
    setOpenModal(true);
  };

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelCriteria632.columnsFInancialReport(settings);
    cols.push(
      {
        title: 'Document',
        dataIndex: 'document',
        key: 'document',
        render: (_, record: { id: number; document: string }) => record.document ? [<Space><Button icon={<DownCircleFilled />} /><Button type="link" title="delete" icon={<DeleteFilled />} danger /></Space>] : <Button type='primary' size='small' onClick={() => handleUploadDocs(record)}>Upload</Button>,
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
        <h3 style={{ margin: 0 }}>{Criteria632Title}</h3>

        <Divider />

        <table style={{ border: '2px solid #f0f0f0' }}>
          <tbody className="ant-table-tbody">
            <tr>
              <td width={300}><b>{'Academic Year'}</b></td>
              <td><YearAsText value={current?.academicYear} /></td>
            </tr>
            <tr>
              <td width={300}><b>Number of Teachers provided with financial support to attend conferences/workshops and towards membership fee of professional bodies</b></td>
              <td>{current?.professional_details$count || 0}</td>
            </tr>
            <tr>
              <td width={300}><b>Number of Full time Teachers</b></td>
              <td>{current?.faculty_fulltime$count || 0}</td>
            </tr>
            <tr>
              <td width={300}><b>Percentage per Year</b></td>
              <td>
                {
                  current?.professional_details$count && calcPercentage(current?.professional_details$count, current?.faculty_fulltime$count)
                }
                {
                  <TableTooltipIcon columnTitle={''} textContent={'Percentage per Year = (Number of teachers provided with financial support to attend conferences/workshopsand towards membership fee of professional bodies) / (Number of Full time Teachers)*100'}><ExclamationCircleFilled /></TableTooltipIcon>
                }
              </td>
            </tr>
          </tbody>
        </table>

        <Divider style={{ margin: '1rem 0' }} />

        <NaacDataTable columns={columns}
          dataSource={currFInancial} downloadBtn />

      </Card>
      {
        useMemo(() =>
          <ModalUploadDocs
            open={openModal}
            title="Upload Document for File Description"
            currData={selectedFInancial}
            onHide={() => setOpenModal(!openModal)}
          />,
        [openModal],
        )
      }
    </div >
  );
};

export default NaacCriteria632Edit;

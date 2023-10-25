import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Divider, Space } from 'antd';
import { useMemo, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { DeleteFilled, DownCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { useCustomFacultyHook } from '../renderers';
import ModalUploadDocs from './modalUploadDocs';
import * as modelCriteria634 from '@/models/NAAC/criteria6/criteria6_3_4';
import { useSettings } from '@/store/settings/useSettings';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import TableTooltipIcon from '@/components/Naac/TableTooltipIcon';
import calcPercentage from '@/utils/calculatePercent';

function NaacCriteria634Edit() {
  const settings = useSettings((state: any) => state.byKeys);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');
  const [selectedFalculty, setSelectedFalculty] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState<Boolean>(false);

  const { current, currFaculty } = useCustomFacultyHook(yearId);

  const Criteria633Title = '6.3.4.Number of teachers undergoing online/ face-to-face Faculty development Programmes (FDP) during the year(Professional Development Programmes, Orientation/ Induction Programmes, Refresher Course, Short Term Course etc.)';

  const handleUploadDocs = (record: any) => {
    const selFalcultyId = [record];
    setSelectedFalculty(selFalcultyId);
    setOpenModal(true);
  };

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelCriteria634.columnsFaculty(settings);
    cols.push(
      {
        title: 'Document',
        dataIndex: 'document',
        key: 'document',
        render: (_, record) => record.document ? [<Space><Button icon={<DownCircleFilled />} /><Button type="link" title="delete" icon={<DeleteFilled />} danger /></Space>] : <Button type='primary' size='small' onClick={() => handleUploadDocs(record)}>Upload</Button>,
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
              <td width={300}><b>Total number of teachers undergoing online/ face-to-face Faculty Development Programmes (FDP)</b></td>
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
                  <TableTooltipIcon columnTitle={''} textContent={'Percentage per Year = (Total number ofteachers attending such programs) / (Number of Full time Tearchers)*100'}><ExclamationCircleFilled /></TableTooltipIcon>
                }
              </td>
            </tr>
          </tbody>
        </table>

        <Divider style={{ margin: '1rem 0' }} />

        <NaacDataTable columns={columns}
          dataSource={currFaculty} downloadBtn />

      </Card>
      {
        useMemo(() =>
          <ModalUploadDocs
            open={openModal}
            title="Upload Document for File Description"
            currData={selectedFalculty}
            onHide={() => setOpenModal(!openModal)}
          />,
        [openModal],
        )
      }
    </div >
  );
}

export default NaacCriteria634Edit;

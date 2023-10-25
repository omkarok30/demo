import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Divider, Form, Input, Space } from 'antd';
import { useMemo, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { DeleteFilled, DownloadOutlined } from '@ant-design/icons';
import { useStudentSeatsHook } from '../renderers';
import UpdateReservedSeats from './UpdateReservedSeats';
import ModalUpdateDocs from './ModalUpdateDocs';
import * as modelNaacStudent22 from '@/models/NAAC/extendedProfile/student/student_2_2';
import { useSettings } from '@/store/settings/useSettings';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import NaacDataTable from '@/components/Naac/NaacDataTable';

const NaacStudent22Edit = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');
  const [updateData, setUpdateData] = useState<Boolean>(false);
  const [openModal, setOpenModal] = useState<Boolean>(false);

  const { current, seatsRecord, seatsLinkRecord } = useStudentSeatsHook(yearId);
  const programTitle = '2.2. Number of seats earmarked for reserved category as per GOI/ State Govt rule year wise during the year';

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelNaacStudent22.columnsStudent(settings);

    return cols;
  }, [settings, current]);

  const totalNoOfSeats = useMemo(() => {
    return seatsRecord?.filter((seat: any) => seat.academicYear === current?.academicYear).reduce((curr, acc) => {
      return acc.numberOfSeats += curr;
    }, 0);
  }, [seatsRecord]);

  return (
    <div className='layout-main-content'>
      <Form>
        <Card bordered={false}>
          <h3 style={{ margin: 0 }}>{programTitle}</h3>

          <Divider />

          <table style={{ border: '2px solid #f0f0f0' }}>
            <tbody className="ant-table-tbody">
              <tr>
                <td width={300}><b>{'Academic Year'}</b></td>
                <td><YearAsText value={current?.academicYear} /></td>
              </tr>
              <tr>
                <td width={300}><b>Number of seats earmarked for reserved category as per GOI/State Govt rule</b></td>
                <td>{totalNoOfSeats}</td>
              </tr>
              <tr>
                <td width={300}><b>Link for supporting document</b></td>
                {
                  updateData
                    ? <td><Form.Item style={{ marginBottom: 0 }} name="link"
                      initialValue={seatsLinkRecord?.link || ''}
                      required><Input /></Form.Item></td>
                    : <td>{seatsLinkRecord?.link ? <Link target='_blank' to={`/${seatsLinkRecord?.link}`}>{seatsLinkRecord?.link}</Link> : ''}</td>
                }
              </tr>
              <tr>
                <td width={300}><b>Upload Supporting Document</b></td>
                <td>{seatsLinkRecord?.document ? [<Button type='link' title='Download' icon={<DownloadOutlined />} />, <Button type='link' title='Delete' danger icon={<DeleteFilled />} />] : <Button type='primary' onClick={() => setOpenModal(true)} title='Upload'>Upload</Button>}</td>
              </tr>
            </tbody>
          </table>

          <Divider />

          {
            updateData
              ? [<UpdateReservedSeats currData={seatsRecord?.filter((seat: any) => seat.academicYear === current?.academicYear)} onCancel={() => setUpdateData(false)} />]
              : [<NaacDataTable columns={columns} dataSource={seatsRecord?.filter((seat: any) => seat.academicYear === current?.academicYear)} downloadBtn={false} />, <Space style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type='primary' onClick={() => setUpdateData(true)}>
                  Update
                </Button>
                <Button onClick={() => navigate(-1)}>
                  Back
                </Button>
              </Space>]
          }

        </Card>
      </Form >

      {
        useMemo(() => <ModalUpdateDocs open={openModal} onHide={() => setOpenModal(false)} currData={seatsLinkRecord} totalSeats={totalNoOfSeats} />, [openModal])
      }
    </div >
  );
};

export default NaacStudent22Edit;

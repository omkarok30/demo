import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Divider, Form, Space, Typography } from 'antd';
import { useMemo, useRef, useState } from 'react';
import Table, { ColumnsType } from 'antd/lib/table';
import { DeleteFilled, DownCircleFilled, DownloadOutlined, EditFilled, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { useCustomProgressHook } from '../renderers';
import ModalUpdatePlacement from '../../../criteria5/criteria5_1_4/form/modalUpdatePlacement';
import ModalUploadDocs from './modalUploadDocs';
import * as modelCriteria523 from '@/models/NAAC/criteria5_2/criteria5_2_3';
import { useSettings } from '@/store/settings/useSettings';
import { ProgramAsText } from '@/pages/settings/ProgramDetails/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const renderers = {
  studentInfo$programId: (value: string) => <ProgramAsText value={value} />,
};

const NaacCriteria523Edit = () => {
  const navigate = useNavigate();
  const settings = useSettings((state: any) => state.byKeys);
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');
  const selectedStudentRef = useRef(null);
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const [openExamModal, setOpenExamModal] = useState<Boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [form] = Form.useForm();

  const { currExamData, current, getNationalIntExamData } = useCustomProgressHook(yearId);
  const Criteria523Title = '5.2.3. Number of students qualifying in state/ national/ international level examinations during the year (eg: JAM/ CLAT/ GATE/ GMAT/ CAT/ GRE/ TOEFL/ Civil Services/ State government examinations)';

  const handleUploadDocs = (id: number) => {
    selectedStudentRef.current = currExamData.filter((list: any) => list.id === id);
    setOpenModal(true);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const startRefresh = () => {
    getNationalIntExamData(yearId);
  };

  const hasSelected = useMemo(() => {
    return selectedRowKeys.length > 0;
  }, [selectedRowKeys]);

  const columns: ColumnsType<any> = useMemo(() => {
    let cols = modelCriteria523.columnsExamination(settings);
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
          <h3 style={{ margin: 0 }}>{Criteria523Title}</h3>

          <Divider />

          <table style={{ border: '2px solid #f0f0f0' }}>
            <tbody className="ant-table-tbody">
              <tr>
                <td width={300}><b>{'Academic Year'}</b></td>
                <td><YearAsText value={current?.year} /></td>
              </tr>
              <tr>
                <td width={300}><b>Number of students qualifying in state/ national/ international level examination</b></td>
                <td>{current?.national_international_exam$count}</td>
              </tr>
              <tr>
                <td width={300}><b>Number of students appearing in state/ national/ international level examination</b></td>
                <td>{current?.student_appearing_exam$count} <Button type='link'
                  onClick={() => {
                    setOpenExamModal(true);
                    form.resetFields();
                  }}
                ><EditFilled style={{ fontSize: '1rem' }} role={'button'} /></Button></td>
              </tr>
            </tbody>
          </table>

          <Divider style={{ margin: '1rem 0' }} />

          <>
            {
              <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem 0' }}>
                <Space>
                  <Button type="primary" icon={<DownloadOutlined />} shape="round" title="Download Report">Download Report</Button>
                  <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => navigate(`../addRecord/?year=${yearId}`)} shape="round" title="Add Record">Add Record</Button>
                </Space>
              </div>
            }

            <div style={{ marginBottom: 16 }}>
              <Space>
                <Button type="primary" icon={<ReloadOutlined />} onClick={startRefresh} title='reload' />

                <Button type="primary" title='Edit' onClick={() => navigate(`../editIndividual/?year=${yearId}&id=${selectedRowKeys}`)} icon={<EditFilled />} disabled={!hasSelected} />
                <Button danger title='Delete' icon={<DeleteFilled />} disabled={!hasSelected} />

              </Space>
            </div>
            <Table
              bordered
              rowSelection={rowSelection}
              rowKey={record => record.id}
              columns={columns}
              dataSource={currExamData}
              scroll={{ x: 1500, y: 300 }}
              summary={(examData) => {
                let totalnet = 0;
                let totalslet = 0;
                let totalgate = 0;
                let totalgmat = 0;
                let totalcat = 0;
                let totalgre = 0;
                let totaljam = 0;
                let totalielts = 0;
                let totaltoefl = 0;
                let totalcivilservices = 0;
                let totalstategovexam = 0;
                let totalother = 0;

                examData.forEach((list) => {
                  list.examDetails.forEach((exam) => {
                    totalnet += isNaN(parseInt(exam.net)) ? 0 : parseInt(exam.net);
                    totalslet += isNaN(parseInt(exam.slet)) ? 0 : parseInt(exam.slet);
                    totalgate += isNaN(parseInt(exam.gate)) ? 0 : parseInt(exam.gate);
                    totalgmat += isNaN(parseInt(exam.gmat)) ? 0 : parseInt(exam.gmat);
                    totalcat += isNaN(parseInt(exam.cat)) ? 0 : parseInt(exam.cat);
                    totalgre += isNaN(parseInt(exam.gre)) ? 0 : parseInt(exam.gre);
                    totaljam += isNaN(parseInt(exam.jam)) ? 0 : parseInt(exam.jam);
                    totalielts += isNaN(parseInt(exam.ielts)) ? 0 : parseInt(exam.ielts);
                    totaltoefl += isNaN(parseInt(exam.toefl)) ? 0 : parseInt(exam.toefl);
                    totalcivilservices += isNaN(parseInt(exam.civilservices)) ? 0 : parseInt(exam.civilservices);
                    totalstategovexam += isNaN(parseInt(exam.stategovexam)) ? 0 : parseInt(exam.stategovexam);
                    totalother += isNaN(parseInt(exam.other)) ? 0 : parseInt(exam.other);
                  });
                });

                return (
                  <>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={4}>Total</Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        <Typography.Text>{totalnet}</Typography.Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2}>
                        <Typography.Text>{totalslet}</Typography.Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={3}>
                        <Typography.Text>{totalgate}</Typography.Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={4}>
                        <Typography.Text>{totalgmat}</Typography.Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={5}>
                        <Typography.Text>{totalcat}</Typography.Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={6}>
                        <Typography.Text>{totalgre}</Typography.Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={7}>
                        <Typography.Text>{totaljam}</Typography.Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={8}>
                        <Typography.Text>{totalielts}</Typography.Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={9}>
                        <Typography.Text>{totaltoefl}</Typography.Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={10}>
                        <Typography.Text>{totalcivilservices}</Typography.Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={11}>
                        <Typography.Text>{totalstategovexam}</Typography.Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={12}>
                        <Typography.Text>{totalother}</Typography.Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={13}>
                        <Typography.Text>{''}</Typography.Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={14}>
                        <Typography.Text>{''}</Typography.Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={4}>Grand Total</Table.Summary.Cell>
                      <Table.Summary.Cell index={1} colSpan={14}>
                        <Typography.Text><b>{currExamData.length}</b></Typography.Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                );
              }}
            />
          </>

          {
            useMemo(() =>
              <ModalUpdatePlacement
                onHide={() => setOpenExamModal(false)}
                openModal={openExamModal}
                count={current?.student_appearing_exam$count}
              />,
            [openExamModal],
            )
          }

          {
            useMemo(() =>
              <ModalUploadDocs
                open={openModal}
                title="Upload Document for File Description"
                currStudent={selectedStudentRef.current}
                onHide={() => setOpenModal(!openModal)}
                onModalSubmit={onFormSubmit}
                year={yearId}
              />,
            [openModal],
            )
          }

        </Card>
      </Form >
    </div >
  );
};

export default NaacCriteria523Edit;

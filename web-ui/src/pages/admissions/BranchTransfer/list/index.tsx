import { useEffect, useMemo, useState } from 'react';
import { Button, Card, Collapse, Form, Select, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { useBranchTransfer } from '@/store/admissions/BranchTransfer/useBranchTransfer';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import * as modelBranchTransfer from '@/models/admissions/BranchTransfer';
import { isEmptyValue } from '@/utils/object';
const { Panel } = Collapse;

const BranchTransferList = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [currentStudentId, setCurrentStudentId] = useState();

  const storeBranchTransferDetails = useBranchTransfer((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    getStudents: state.getStudents,
    students: state.students,
  }));
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const getBranchTransferedList = (academicYear: any) => {
    storeBranchTransferDetails.getRecords(academicYear);
    storeBranchTransferDetails.getStudents();
  };

  const getStudentList = (value: any) => {
    storeBranchTransferDetails.getStudents(value);
    setCurrentStudentId(undefined);
  };
  const [selectedYear, setselectedYear] = useState();
  const [listselectedYear, setlistselectedYear] = useState();

  const optionsAcademicYear = storeAcademicYear.comboByName;

  useEffect(() => {
    if (isEmptyValue(selectedYear)) {
      const first = _.first(optionsAcademicYear);
      const value = _.get(first, ['value'], '');
      setselectedYear(value);
      setlistselectedYear(value);
    }
  }, [optionsAcademicYear]);
  useEffect(() => {
    storeAcademicYear.getAcademicYearDetails();
    storeBranchTransferDetails.getRecords(selectedYear);
    storeBranchTransferDetails.getStudents(selectedYear);
  }, [selectedYear]);
  useEffect(() => {
    storeBranchTransferDetails.getRecords(listselectedYear);
  }, [listselectedYear]);

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`../edit/${record?.studentId}`, {
        state: {
          id: record?.studentId,
          isNewTransfer: record?.isNewTransfer,
        },
      });
    }
  };

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelBranchTransfer.columns();

    cols.unshift({
      title:'Student Name',
      dataIndex: 'studentName',
      render: (_, record) => [
        <span>{record.student_info$firstName} { record.student_info$middleName} {record.student_info$lastName}</span>,
      ],
    })
    cols.push({
      title: 'Approved Application',
      dataIndex: 'document',
      render: (_, record) =>
        isEmptyValue(record.document)
          ? [
              <span>
                <Button
                  type='link'
                  onClick={() => {
                    alert('Not provided');
                  }}
                >
                  NA
                </Button>
              </span>,
            ]
          : [
              <span>
                <a href={record.document}>
                  <DownloadOutlined />
                </a>
              </span>,
            ],
    });
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <Button
          type="link"
          onClick={() => handleActionClick({ action: 'edit', record })}
        >
          Edit
        </Button>,
      ],
    });
    return cols;
  }, []);

  const getStudentDetails = (value) => {
    setCurrentStudentId(value);
  };
  return (
    <div className="layout-main-content">
      <Collapse
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <PlusOutlined rotate={isActive ? 45 : 0} />
        )}
      >
        <Panel header="Apply for branch transfer" key="1">
          <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
          >
            <Form.Item label="Registration Year" required>
              <Select
                style={{ width: 400 }}
                options={storeAcademicYear.comboByName}
                value={selectedYear}
                onChange={event => setselectedYear(event)}
              />
            </Form.Item>
            <Form.Item label="Select Student" required>
              <Select
                showSearch
                style={{ width: 400 }}
                value={currentStudentId}
                options={storeBranchTransferDetails?.students}
                onChange={event => setCurrentStudentId(event)}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                htmlType="submit"
                type="primary"
                disabled={!currentStudentId}
                onClick={() =>
                  handleActionClick({
                    action: 'edit',
                    record: {
                      studentId: currentStudentId,
                      isNewTransfer: true,
                    },
                  })
                }
              >
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
      <Card
        bordered={false}
        title={
          <>
            Registration Year:{' '}
            <Select
              style={{ width: 200 }}
              options={storeAcademicYear.comboByName}
              value={listselectedYear}
              onChange={event => setlistselectedYear(event)}
            />
          </>
        }
      >
        <Table
          bordered
          columns={columns}
          dataSource={storeBranchTransferDetails.allRecords}
        />
      </Card>
    </div>
  );
};

export default BranchTransferList;

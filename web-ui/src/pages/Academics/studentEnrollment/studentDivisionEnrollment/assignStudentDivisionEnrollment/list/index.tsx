import { Button, Card, Col, Row, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as modelStudentDivision from '@/models/Academics/studentEnrollment/StudentDivision';
import { useSettings } from '@/store/settings/useSettings';
import { useAssignStudentDivisionEnrollment } from '@/store/Academics/studentDivisionEnrollment/assignStudentDivisionEnrollment/useAssignStudentDivisionEnrollment';

const AssignStudentDivision = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[], rows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(rows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const navigate = useNavigate();

  const storeStudentDivisionEnrollmentAssign =
    useAssignStudentDivisionEnrollment((state: any) => ({
      getRecords: state.getRecords,
      allRecords: state.allRecords,
      setYear: state.setYear,
      setClassName: state.setClassName,
      setSemester: state.setSemester,
      setDivisionId: state.setDivisionId,
      setProgram: state.setProgram,
      getAssignRecords: state.getAssignRecords,
      year: state.year,
      programId: state.programId,
      className: state.className,
      divisionId: state.divisionId,
      semester: state.semester,
      addRecord: state.addRecord,
      programName: state.programName,
      semesterName: state.semesterName,
      divisionName: state.divisionName,
    }));

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelStudentDivision.columns(settings);
    cols.unshift({
      title: 'Student Name',
      dataIndex: 'studentName',
      render: (_, record) => [
        <span>
          {record.studentInfo$lastName} {record.studentInfo$firstName}{' '}
          {record.studentInfo$middleName}
        </span>,
      ],
    });
    return cols;
  }, [settings]);

  const goBack = () => {
    navigate('../');
  };

  const submitAssignStudentDivision = () => {
    storeStudentDivisionEnrollmentAssign.addRecord(
      storeStudentDivisionEnrollmentAssign.year,
      storeStudentDivisionEnrollmentAssign.className,
      storeStudentDivisionEnrollmentAssign.programId,
      storeStudentDivisionEnrollmentAssign.divisionId,
      storeStudentDivisionEnrollmentAssign.semester,
      selectedRows,
    );

    goBack();
  };

  return (
    <Card
      title="View/Update Division"
      key={2}>
      <Row style={{ marginBottom: 20 }}>
        <Col span={3}>
          Academic Year <Typography.Text type="danger">*</Typography.Text>
        </Col>
        <Col span={9}>{storeStudentDivisionEnrollmentAssign.year}</Col>

        <Col span={3}>
          Program <Typography.Text type="danger">*</Typography.Text>
        </Col>
        <Col span={9}>{storeStudentDivisionEnrollmentAssign.programName}</Col>
      </Row>
      <Row style={{ marginBottom: 20 }}>
        <Col span={3}>
          Class <Typography.Text type="danger">*</Typography.Text>
        </Col>
        <Col span={9}>{storeStudentDivisionEnrollmentAssign.className}</Col>

        <Col span={3}>
          Semester <Typography.Text type="danger">*</Typography.Text>
        </Col>
        <Col span={9}>{storeStudentDivisionEnrollmentAssign.semesterName}</Col>
      </Row>
      <Row style={{ marginBottom: 20 }}>
        <Col span={3}>
          Division <Typography.Text type="danger">*</Typography.Text>
        </Col>
        <Col span={9}>{storeStudentDivisionEnrollmentAssign.divisionName}</Col>
      </Row>

      <Row style={{ marginBottom: 20, justifyContent: 'center' }}>
        <Col span={3}>
          <Button
            title="Submit"
            type="primary"
            onClick={submitAssignStudentDivision}>
            Submit
          </Button>
        </Col>
        <Col span={3}>
          <Button
            title="Back"
            type="default"
            onClick={goBack}>
            Back
          </Button>
        </Col>
      </Row>

      <Table
        rowSelection={rowSelection}
        rowKey="key"
        dataSource={storeStudentDivisionEnrollmentAssign.allRecords}
        columns={columns}
      />
    </Card>
  );
};

export default AssignStudentDivision;

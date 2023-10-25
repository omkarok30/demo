import { Button, Card, Col, Row, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStudentCourseEnrollment } from '@/store/Academics/studentCourseEnrollment/useStudentCourseEnrollment';
import { useSettings } from '@/store/settings/useSettings';

const AssignCourse = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [dataSource, setDataSource] = useState([]);
  const [readOnly, setReadOnly] = useState(true);

  const onSelectChange = (newSelectedRowKeys: React.Key[], rows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(rows);
  };

  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      disabled: readOnly,
    }),
  };

  const navigate = useNavigate();

  const storeStudentCourseEnrollment = useStudentCourseEnrollment(
    (state: any) => ({
      getRecords: state.getRecords,
      allRecords: state.allRecords,

      year: state.year,
      programId: state.programId,
      classId: state.classId,
      className: state.className,
      divisionId: state.divisionId,
      divisionName: state.divisionName,
      semesterId: state.semesterId,
      setYear: state.setYear,
      setProgram: state.setProgram,
      setProgramName: state.setProgramName,
      setClassId: state.setClassId,
      setClassName: state.setClassName,
      setSemesterId: state.setSemesterId,
      setSemesterName: state.setSemesterName,
      setDivisionId: state.setDivisionId,
      setDivisionName: state.setDivisionName,
      semesterName: state.semesterName,
      programName: state.programName,
    }),
  );

  const columns: ColumnsType<any> = useMemo(() => {
    const cols: any = [];

    cols.unshift({
      title: 'SR no',
      dataIndex: 'id',
      render: (_, record) => [<span>{record.id}</span>],
    });

    cols.push({
      dataIndex: 'id',
      title: 'Roll NO',
    });
    cols.push({
      dataIndex: 'studentInfo$enrolmentNumber',
      title: 'PRN NO',
    });
    cols.push({
      title: 'Student Name',
      dataIndex: 'studentName',
      render: (_, record) => [
        <span>
          {record.studentInfo$lastName} {record.studentInfo$firstName}{' '}
          {record.studentInfo$middleName}
        </span>,
      ],
    });

    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <Button
          type="primary"
          onClick={() => handleActionClick(record)}>
          View Profile
        </Button>,
      ],
    });

    return cols;
  }, [settings]);

  const goBack = () => {
    navigate('../');
  };
  const handleActionClick = (record) => {
    navigate(`/admissions/student_record/edit/${record.studId}`);
  };

  const submitAssignStudentDivision = () => {
    setReadOnly((prev) => !prev);
    // goBack();
  };

  return (
    <Card
      title="View/Update Division"
      key={2}>
      <Row style={{ marginBottom: 20 }}>
        <Col span={3}>
          Academic Year <Typography.Text type="danger">*</Typography.Text>
        </Col>
        <Col span={9}>{storeStudentCourseEnrollment.year}</Col>

        <Col span={3}>
          Program <Typography.Text type="danger">*</Typography.Text>
        </Col>
        <Col span={9}>{storeStudentCourseEnrollment.programName}</Col>
      </Row>
      <Row style={{ marginBottom: 20 }}>
        <Col span={3}>
          Class <Typography.Text type="danger">*</Typography.Text>
        </Col>
        <Col span={9}>{storeStudentCourseEnrollment.className}</Col>

        <Col span={3}>
          Semester <Typography.Text type="danger">*</Typography.Text>
        </Col>
        <Col span={9}>{storeStudentCourseEnrollment.semesterName}</Col>
      </Row>
      <Row style={{ marginBottom: 20 }}>
        <Col span={3}>
          Division <Typography.Text type="danger">*</Typography.Text>
        </Col>
        <Col span={9}>{storeStudentCourseEnrollment.divisionName}</Col>
      </Row>

      <Table
        rowKey="key"
        dataSource={storeStudentCourseEnrollment.allRecords}
        columns={columns}
        rowSelection={rowSelection}
      />

      <Row style={{ marginBottom: 20, justifyContent: 'center' }}>
        <Col span={3}>
          {readOnly ? (
            <Button
              title="Submit"
              type="primary"
              onClick={submitAssignStudentDivision}>
              Update
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={goBack}>
              Submit
            </Button>
          )}
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
    </Card>
  );
};

export default AssignCourse;

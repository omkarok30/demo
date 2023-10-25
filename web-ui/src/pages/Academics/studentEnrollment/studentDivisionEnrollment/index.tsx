/* eslint-disable multiline-ternary */
/* eslint-disable no-case-declarations */
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  DatePickerProps,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'rc-table/lib/interface';

import { useSettings } from '@/store/settings/useSettings';

import { todoLookUps } from '@/store/todoLookUps';
import { useAssignStudentDivisionEnrollment } from '@/store/Academics/studentDivisionEnrollment/assignStudentDivisionEnrollment/useAssignStudentDivisionEnrollment';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useViewUpdateStudentDivisionEnrollment } from '@/store/Academics/studentDivisionEnrollment/viewUpdateStudentDisivisionEnrollment/useViewUpdateStudentDivisionEnrollment';
import { useDivisions } from '@/store/Academics/courseManagement/useDivisions';

const AssignDivision = () => {
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    getAcademicYearDetails: state.getAcademicYearDetails,
    comboByName: state.comboByName,
  }));

  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const storeProgramDetails = useProgramDetails((state: any) => ({
    optionsAllPrograms: state.optionsAllPrograms,
    getRecords: state.getRecords,
    allRecords: state.allRecords,
  }));

  const storeDivision = useDivisions((state: any) => ({
    getRecords: state.getRecords,
    allRecords: state.allRecords,
    getDivisionRecords: state.getDivisionRecords,

    optionsDivision: state.optionsDivision,
  }));

  const storeStudentDivisionEnrollmentAssign =
    useAssignStudentDivisionEnrollment((state: any) => ({
      getRecords: state.getRecords,
      allRecords: state.allRecords,
      getAssignRecords: state.getAssignRecords,
      year: state.year,
      programId: state.programId,
      classId: state.classId,
      className: state.className,
      divisionId: state.divisionId,
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
    }));
  const storeViewStudentDivistionEnrollment =
    useViewUpdateStudentDivisionEnrollment((state: any) => ({
      getRecords: state.getRecords,
      allRecords: state.allRecords,
      year: state.year,
      programId: state.programId,
      classId: state.classId,
      className: state.className,
      divisionId: state.divisionId,
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
    }));

  const optionsAcademicYear = storeAcademicYear.comboByName;
  const optionsAllPrograms = storeProgramDetails.optionsAllPrograms;
  const allRecords = storeProgramDetails.allRecords;
  const divisions = storeDivision.optionsDivision;
  const viewStudentDivisionRecords =
    storeViewStudentDivistionEnrollment.allRecords;

  const [semisters, setSemisters] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [shuffleLastName, setShuffleLastName] = useState(false);
  const [shuffleGender, setShuffleGender] = useState(false);
  const [shufflePRN, setShufflePRN] = useState(false);
  const [showAssignCard, setShowAssignCard] = useState(false);
  const [updateDivisionDate, setUpdateDivisionDate] = useState<moment.Moment>();
  const [updateDivisionDateString, setUpdateDivisionDateString] = useState('');
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDivisionValue, setSelectedDivisionValue] = useState(0);
  const [confirmCheckBox, setConfirmCheckBox] = useState(false);

  const [dataSource, setDataSource] = useState([]);

  const { semester, className } = todoLookUps.getState();

  useEffect(() => {
    storeAcademicYear.getAcademicYearDetails();
    storeProgramDetails.getRecords();
  }, []);

  useEffect(() => {
    storeStudentDivisionEnrollmentAssign.setYear(optionsAcademicYear[1]?.value);
    storeStudentDivisionEnrollmentAssign.setProgram(
      optionsAllPrograms[0]?.value,
    );
    storeStudentDivisionEnrollmentAssign.setProgramName(
      optionsAllPrograms[0]?.label,
    );
    storeViewStudentDivistionEnrollment.setYear(optionsAcademicYear[1]?.value);
    storeViewStudentDivistionEnrollment.setProgram(
      optionsAllPrograms[0]?.value,
    );
    storeViewStudentDivistionEnrollment.setProgramName(
      optionsAllPrograms[0]?.label,
    );
  }, [optionsAcademicYear, optionsAllPrograms]);

  useEffect(() => {
    storeDivision.getDivisionRecords(
      storeStudentDivisionEnrollmentAssign.year,
      storeStudentDivisionEnrollmentAssign.programId,
      storeStudentDivisionEnrollmentAssign.classId,
    );
  }, [
    storeStudentDivisionEnrollmentAssign.year,
    storeStudentDivisionEnrollmentAssign.programId,
    storeStudentDivisionEnrollmentAssign.classId,
  ]);
  useEffect(() => {
    storeDivision.getDivisionRecords(
      storeViewStudentDivistionEnrollment.year,
      storeViewStudentDivistionEnrollment.programId,
      storeViewStudentDivistionEnrollment.classId,
    );
  }, [
    storeViewStudentDivistionEnrollment.year,
    storeViewStudentDivistionEnrollment.programId,
    storeViewStudentDivistionEnrollment.classId,
  ]);

  useEffect(() => {
    const program = allRecords.filter((item) => {
      if (item.id === storeViewStudentDivistionEnrollment.programId) {
        return item;
      }
    })[0];
    resetClassesAndSemister(program, 'programId useffect');
  }, [storeViewStudentDivistionEnrollment.programId]);

  useEffect(() => {
    const program = allRecords.filter((item) => {
      if (item.id === storeStudentDivisionEnrollmentAssign.programId) {
        return item;
      }
    })[0];
    resetClassesAndSemister(program, 'programId useffect');
  }, [storeStudentDivisionEnrollmentAssign.programId]);

  useEffect(() => {
    if (divisions) {
      storeViewStudentDivistionEnrollment.setDivisionId(divisions[0]?.value);
      storeViewStudentDivistionEnrollment.setDivisionName(divisions[0]?.label);
      storeStudentDivisionEnrollmentAssign.setDivisionId(divisions[0]?.value);
      storeStudentDivisionEnrollmentAssign.setDivisionName(divisions[0]?.label);
    }
  }, [divisions]);
  const resetClassesAndSemister = (program: any, callee: string) => {
    const classes = [];
    for (
      let index = program?.isFyApplicable ? 0 : 1;
      index < program?.programDuration;
      index++
    ) {
      classes.push(className[index]);
    }
    setClasses(classes);
    setSemisters(semester);
  };

  useEffect(() => {
    if (classes.length > 0) {
      storeViewStudentDivistionEnrollment.setClassName(classes[0].label);
      storeViewStudentDivistionEnrollment.setClassId(classes[0].value);
      storeStudentDivisionEnrollmentAssign.setClassName(classes[0].label);
      storeStudentDivisionEnrollmentAssign.setClassId(classes[0].value);
    }
  }, [classes]);
  useEffect(() => {
    console.log(semester);
    if (semester.length > 0) {
      storeViewStudentDivistionEnrollment.setSemesterId(semester[0].value);
      storeViewStudentDivistionEnrollment.setSemesterName(semester[0].label);
      storeStudentDivisionEnrollmentAssign.setSemesterId(semester[0].value);
      storeStudentDivisionEnrollmentAssign.setSemesterName(semester[0].label);
    }
  }, [semester]);

  const columns: ColumnsType<any> = useMemo(() => {
    const cols: any = [];
    cols.push({
      dataIndex: 'id',
      title: 'Roll No',
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
      dataIndex: 'remark',
      title: 'Remarks',
    });

    return cols;
  }, [settings]);

  const modalColumns: ColumnsType<any> = useMemo(() => {
    const cols: any = [];
    cols.push({
      dataIndex: 'rollno',
      title: 'Roll No',
    });
    cols.push({
      dataIndex: 'name',
      title: 'Name of Student',
    });
    cols.push({
      dataIndex: 'currentDivision',
      title: 'Current Division',
    });
    cols.push({
      dataIndex: 'changeDivision',
      title: 'Change division to',
    });
    return cols;
  }, [settings]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[], rows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(rows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  useEffect(() => {
    if (storeViewStudentDivistionEnrollment.divisionId) {
      storeViewStudentDivistionEnrollment.getRecords(
        storeViewStudentDivistionEnrollment.year,
        storeViewStudentDivistionEnrollment.programId,
        storeViewStudentDivistionEnrollment.className,
        storeViewStudentDivistionEnrollment.semesterId,
        storeViewStudentDivistionEnrollment.divisionId,
      );
    }
  }, [storeViewStudentDivistionEnrollment.divisionId]);

  const handleOnChange = (value: any, id: string, label: any) => {
    switch (id) {
      case 'year':
        storeStudentDivisionEnrollmentAssign.setYear(value);

        break;
      case 'class':
        storeStudentDivisionEnrollmentAssign.setClassName(label);
        storeStudentDivisionEnrollmentAssign.setClassId(value);
        break;
      case 'semister':
        storeStudentDivisionEnrollmentAssign.setSemesterId(value);
        storeStudentDivisionEnrollmentAssign.setSemesterName(label);
        break;
      case 'division':
        storeStudentDivisionEnrollmentAssign.setDivisionId(value);
        storeStudentDivisionEnrollmentAssign.setDivisionName(label);

        break;

      case 'program':
        storeStudentDivisionEnrollmentAssign.setProgram(value);
        storeStudentDivisionEnrollmentAssign.setProgramName(label);

        break;

      default:
        break;
    }
  };
  const handleViewOnChange = (value: any, id: string, label: any) => {
    switch (id) {
      case 'year':
        storeViewStudentDivistionEnrollment.setYear(value);

        break;
      case 'class':
        storeViewStudentDivistionEnrollment.setClassName(label);
        storeViewStudentDivistionEnrollment.setClassId(value);
        break;
      case 'semister':
        storeViewStudentDivistionEnrollment.setSemesterId(value);
        storeViewStudentDivistionEnrollment.setSemesterName(label);
        break;
      case 'division':
        storeViewStudentDivistionEnrollment.setDivisionId(value);
        storeViewStudentDivistionEnrollment.setDivisionName(label);

        break;

      case 'program':
        storeViewStudentDivistionEnrollment.setProgram(value);
        storeViewStudentDivistionEnrollment.setProgramName(label);

        break;

      default:
        break;
    }
  };

  const navigate = useNavigate();

  const proceedToAssign = () => {
    storeStudentDivisionEnrollmentAssign.getAssignRecords(
      storeStudentDivisionEnrollmentAssign.year,
      storeStudentDivisionEnrollmentAssign.programId,
      storeStudentDivisionEnrollmentAssign.className,
      storeStudentDivisionEnrollmentAssign.semesterId,
      storeStudentDivisionEnrollmentAssign.divisionId,
    );
    navigate('../assignStudentDivisionEnrollment/');
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setUpdateDivisionDate(date);
    setUpdateDivisionDateString(dateString);
  };

  const reorderNavigation = () => {
    navigate('../reorder/');
  };

  const openSubmitModal = () => {
    if (selectedRows.length <= 0) {
      alert('Please select students');
    } else if (!selectedDivision) {
      alert('Please select division');
    } else {
      const finalArry: any = [];
      selectedRows.forEach((e) => {
        console.log(e);
        const record = {
          rollno: e.id,
          name: `${e.studentInfo$lastName} ${e.studentInfo$firstName} ${e.studentInfo$middleName}`,
          currentDivision: e.divisions$division,
          changeDivision: selectedDivisionValue,
        };
        finalArry.push(record);
      });

      setDataSource(finalArry);

      setShowConfirmationModal(true);
    }
  };

  return (
    <div>
      <Card
        title="Assign Students To Division"
        extra={
          <Button
            type="text"
            onClick={() => setShowAssignCard(!showAssignCard)}>
            {showAssignCard ? (
              <Typography.Text>Hide</Typography.Text>
            ) : (
              <Typography.Text>Show</Typography.Text>
            )}
          </Button>
        }>
        {showAssignCard ? (
          <>
            <Row style={{ marginBottom: 20, justifyContent: 'center' }}>
              <Col
                xs={12}
                xl={3}
                span={3}>
                Academic Year <Typography.Text type="danger">*</Typography.Text>
              </Col>
              <Col
                xs={12}
                xl={9}
                span={9}>
                <Select
                  allowClear
                  style={{ width: '100%' }}
                  options={optionsAcademicYear}
                  value={
                    storeStudentDivisionEnrollmentAssign.year
                      ? storeStudentDivisionEnrollmentAssign.year
                      : optionsAcademicYear[0]?.value
                  }
                  onChange={(value, option) => {
                    handleOnChange(option.value, 'year', option.label);
                  }}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: 20, justifyContent: 'center' }}>
              <Col
                xs={12}
                xl={3}
                span={3}>
                Program <Typography.Text type="danger">*</Typography.Text>
              </Col>
              <Col
                xs={12}
                xl={9}
                span={9}>
                <Select
                  style={{ width: '100%' }}
                  options={optionsAllPrograms}
                  value={
                    storeStudentDivisionEnrollmentAssign.programId
                      ? storeStudentDivisionEnrollmentAssign.programId
                      : optionsAllPrograms[0]?.value
                  }
                  onChange={(value, option) => {
                    handleOnChange(option.value, 'program', option.label);
                  }}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: 20, justifyContent: 'center' }}>
              <Col
                xs={12}
                xl={3}
                span={3}>
                Class <Typography.Text type="danger">*</Typography.Text>
              </Col>
              <Col
                xs={12}
                xl={9}
                span={9}>
                <Select
                  style={{ width: '100%' }}
                  options={classes}
                  value={
                    storeStudentDivisionEnrollmentAssign.className
                      ? storeStudentDivisionEnrollmentAssign.className
                      : classes[0]?.value
                  }
                  onChange={(value, option) => {
                    handleOnChange(option.value, 'class', option.label);
                  }}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: 20, justifyContent: 'center' }}>
              <Col
                xs={12}
                xl={3}
                span={3}>
                Semester <Typography.Text type="danger">*</Typography.Text>
              </Col>
              <Col
                xs={12}
                xl={9}
                span={9}>
                <Select
                  style={{ width: '100%' }}
                  options={semisters}
                  value={
                    storeStudentDivisionEnrollmentAssign.semester
                      ? storeStudentDivisionEnrollmentAssign.semester
                      : semisters[0]?.value
                  }
                  onChange={(value, option) => {
                    handleOnChange(option.value, 'semister', option.label);
                  }}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: 20, justifyContent: 'center' }}>
              <Col
                xs={12}
                xl={3}
                span={3}>
                Division <Typography.Text type="danger">*</Typography.Text>
              </Col>
              <Col
                xs={12}
                xl={9}
                span={9}>
                <Select
                  style={{ width: '100%' }}
                  options={divisions}
                  value={
                    storeStudentDivisionEnrollmentAssign.divisionId
                      ? storeStudentDivisionEnrollmentAssign.divisionId
                      : divisions[0]?.value
                  }
                  onChange={(value, option) => {
                    handleOnChange(option.value, 'division', option.label);
                  }}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: 20, justifyContent: 'center' }}>
              <Col
                xs={12}
                xl={3}
                span={3}>
                <Button
                  title="Proceed"
                  type="primary"
                  onClick={proceedToAssign}>
                  Proceed
                </Button>{' '}
              </Col>
            </Row>
          </>
        ) : (
          <></>
        )}
      </Card>
      <Card
        title="View/Update Division"
        key={2}>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
          style={{ marginBottom: 20 }}>
          <Col
            xs={12}
            xl={3}
            span={3}>
            Academic Year <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
            <Select
              allowClear
              style={{ width: '100%' }}
              options={optionsAcademicYear}
              value={storeViewStudentDivistionEnrollment.year}
              onChange={(value, option) => {
                handleViewOnChange(option.value, 'year', option.label);
              }}
            />
          </Col>

          <Col
            xs={12}
            xl={3}
            span={3}>
            Program <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
            <Select
              style={{ width: '100%' }}
              options={optionsAllPrograms}
              value={storeViewStudentDivistionEnrollment.programId}
              onChange={(value, option) => {
                handleViewOnChange(option.value, 'program', option.label);
              }}
            />
          </Col>
        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
          style={{ marginBottom: 20 }}>
          <Col
            xs={12}
            xl={3}
            span={3}>
            Class <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
            <Select
              style={{ width: '100%' }}
              options={classes}
              value={storeViewStudentDivistionEnrollment.className}
              onChange={(value, option) => {
                handleViewOnChange(option.value, 'class', option.label);
              }}
            />
          </Col>

          <Col
            xs={12}
            xl={3}
            span={3}>
            Semester <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
            <Select
              style={{ width: '100%' }}
              options={semisters}
              value={storeViewStudentDivistionEnrollment.semesterId}
              onChange={(value, option) => {
                handleViewOnChange(option.value, 'semister', option.label);
              }}
            />
          </Col>
        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
          style={{ marginBottom: 20 }}>
          <Col
            xs={12}
            xl={3}
            span={3}>
            Division <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
            <Select
              style={{ width: '100%' }}
              options={divisions}
              value={storeViewStudentDivistionEnrollment.divisionId}
              onChange={(value, option) => {
                handleViewOnChange(option.value, 'division', option.label);
              }}
            />
          </Col>

          <Col
            xs={12}
            xl={3}
            span={3}>
            <Button
              title="Reorder"
              type="primary"
              onClick={reorderNavigation}>
              Reorder
            </Button>
          </Col>
          <Col
            xs={12}
            xl={3}
            span={3}>
            <Button
              title="Reshuffle"
              type="primary"
              onClick={() => setShowModal(true)}>
              Reshuffle
            </Button>
          </Col>
        </Row>

        <Table
          rowSelection={rowSelection}
          dataSource={viewStudentDivisionRecords}
          columns={columns}
        />
        <Row style={{ marginBottom: 20, justifyContent: 'center' }}>
          <Col
            xs={12}
            xl={3}
            span={3}>
            <Button
              title="Submit"
              type="primary"
              style={{ backgroundColor: 'green' }}>
              Download Report
            </Button>
          </Col>
        </Row>

        <Row style={{ marginBottom: 20 }}>
          <Space>
            <Col span={24}>
              Select Division to Update{' '}
              <Typography.Text type="danger">*</Typography.Text>
            </Col>
            <Col
              xs={12}
              xl={9}
              span={9}>
              <Select
                style={{ width: 200 }}
                options={divisions}
                onChange={(value, option) => {
                  setSelectedDivision(value);
                  setSelectedDivisionValue(option.label);
                }}
              />
            </Col>
            <Col
              xs={12}
              xl={3}
              span={3}>
              <Button
                title="Update"
                type="primary"
                onClick={openSubmitModal}>
                Update
              </Button>
            </Col>
          </Space>
        </Row>
      </Card>
      <Modal
        width={1000}
        centered
        onCancel={() => setShowModal(false)}
        open={showModal}>
        <h1>Reshuffle students</h1>
        <Row style={{ marginBottom: 20 }}>
          <Col span={12}>Academic Year</Col>
          <Col span={12}>{storeStudentDivisionEnrollmentAssign.year}</Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col span={12}>Program</Col>
          <Col span={12}>{storeStudentDivisionEnrollmentAssign.programId}</Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col span={12}>Class</Col>
          <Col span={12}>{storeStudentDivisionEnrollmentAssign.className}</Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col span={12}>Semester</Col>
          <Col span={12}>
            {storeStudentDivisionEnrollmentAssign.semesterName}
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col span={12}>Division</Col>
          <Col span={12}>{storeStudentDivisionEnrollmentAssign.divisionId}</Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col span={12}>
            Do you wish to reshuffle students according to LAST NAME{' '}
            <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col span={12}>
            {' '}
            <Checkbox
              checked={shuffleLastName}
              onChange={() => {
                setShuffleLastName(!shuffleLastName);
                if (shufflePRN) {
                  setShufflePRN(false);
                }
              }}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col span={12}>
            Do you wish to reshuffle students as per GENDER{' '}
            <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col span={12}>
            {' '}
            <Checkbox
              checked={shuffleGender}
              onChange={() => {
                setShuffleGender(!shuffleGender);
                if (shufflePRN) {
                  setShufflePRN(false);
                }
              }}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col span={12}>
            Do you wish to reshuffle as per PRN NO{' '}
            <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col span={12}>
            <Checkbox
              checked={shufflePRN}
              onChange={() => {
                if (!shufflePRN) {
                  setShuffleGender(false);
                  setShuffleLastName(false);
                }
                setShufflePRN(!shufflePRN);
              }}
            />
          </Col>
        </Row>
      </Modal>

      <Modal
        width={1000}
        centered
        onCancel={() => setShowConfirmationModal(false)}
        onOk={() => {
          if (!confirmCheckBox) {
            alert('Please confirm division change');
          } else if (!updateDivisionDate) {
            alert('Please select correct date');
          } else {
            alert('Completed Successfully');
            setShowConfirmationModal(false);
          }
        }}
        okText="Submit"
        open={showConfirmationModal}>
        <h1>Change division</h1>
        <Row style={{ marginBottom: 20 }} />
        <Table
          dataSource={dataSource}
          columns={modalColumns}
        />
        <Row style={{ marginBottom: 20 }} />
        <Row style={{ marginBottom: 20 }}>
          <Col
            xs={12}
            xl={9}
            span={9}>
            Applicable date for change in Division{' '}
            <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
            <DatePicker onChange={onChange} />
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Typography.Text type="danger">
            Once above details are submitted, the process cannot be reversed.
          </Typography.Text>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Checkbox
            checked={confirmCheckBox}
            onChange={(e) => setConfirmCheckBox(e.target.checked)}>
            I confirm to submit the above division change details.
          </Checkbox>
        </Row>
      </Modal>
    </div>
  );
};

export default AssignDivision;

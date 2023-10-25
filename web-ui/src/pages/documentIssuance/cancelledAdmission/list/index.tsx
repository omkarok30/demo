import React, { useState } from "react";
import { Button, Card, Checkbox, Col, Form, Modal, notification, Row, Select, Space, Table, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/lib/table";
import _ from "lodash";
import { useSettings } from "@/store/settings/useSettings";
import { useTransferenceCertificate } from "@/store/documentIssuance/useTransferenceCertificate";
import * as modelTransferenceCertificate from "@/models/documentIssuance/transferenceCertificate/transferenceCertificate";
import { isEmptyValue } from "@/utils/object";
import { useAcademicYear } from "@/store/settings/useAcademicYear";
import { useStudentInfo } from "@/store/admissions/useStudentInfo";
import { UploadFileStatus } from "antd/lib/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import { schemaValidator } from "@/utils/validate";

const CancelledAdmissionList = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [form] = Form.useForm();
  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });
  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelTransferenceCertificate.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys]
  );
  const storeTransferenceCertificate = useTransferenceCertificate(
    (state: any) => ({
      allRecordsTransferenceCertificate:
        state.allRecordsTransferenceCertificate,
      getRecords: state.getRecords,
      addRecord: state.addRecord,

    })
  );
  const storeStudentInfo = useStudentInfo((state: any) => ({
    getRecord: state.getRecord,
    getRecords: state.getRecords,
    current: state.current,
    allRecords: state.allRecords,
  }));
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  
  const optionsAcademicYear = storeAcademicYear.comboByName;

  React.useEffect(() => {
    fetchSettings();
    storeAcademicYear.getAcademicYearDetails();
    storeStudentInfo.getRecords();
  }, [fetchSettings]);

  const [selectYear, setYear] = useState();

  React.useEffect(() => {
    if (isEmptyValue(selectYear)) {
      const first = _.first(optionsAcademicYear);
      const value = _.get(first, ["value"], "");
      setYear(value);
    }
  }, [optionsAcademicYear]);

  React.useEffect(() => {
    if (isEmptyValue(selectYear)) {
      return;
    }
    storeTransferenceCertificate.getRecords(selectYear);
  }, [selectYear]);

  

  const handleActionClick = ({ action, record,migration_status }) => {
    if (action === "edit") {
      navigate(`../cancelled_admission/edit/${'printoriginalTC'}/${record?.id}/${migration_status}`, {
        state: { id: record?.id },
      });
    }else{
      navigate(`../cancelled_admission/edit/${'issueoriginalTC'}/${record?.id}/${migration_status}`);
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeTransferenceCertificate.getRecords();
  }, []);

  const handleActionChange = (event) => {
    setYear(event);
    storeTransferenceCertificate.getRecords(event);
  };
  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelTransferenceCertificate.columns(settings);
    cols.unshift({
      title: "Student Code",
      dataIndex: "studentId",
      render: (_, record) => [<span>{getFullCode(record.studentId)}</span>],
    });
    cols.unshift({
      title: "Student Name",
      dataIndex: "studentId",
      render: (_, record) => [<span>{getFullName(record.studentId)}</span>],
    });
    cols.unshift({
      title: "Sr. No.",
      dataIndex: "id",
      render: (_, record) => [<span>{record.id}</span>],
    });
    cols.push({
      title: "Transfer Certificate",
      key: "transfer_certificate",
      render: (_, record) => [
        <>
          <Button
            style={{
              background: "green",
              color: "#fff",
              height: 20,
              fontSize: 12,
              alignItems: "center",
              display: "flex",
              borderRadius: 4,
            }}
            onClick={() => handleActionClick({ action: "new", record,migration_status:0 })}
          >
            Issue Original
          </Button>
          <Button
            style={{
              background: "green",
              color: "#fff",
              height: 20,
              fontSize: 12,
              alignItems: "center",
              display: "flex",
              borderRadius: 4,
              marginTop: 5,
            }}
            onClick={() => handleActionClick({ action: "edit", record,migration_status:0 })}
          >
            Print Again
          </Button>
          <Button
            style={{
              height: 20,
              fontSize: 12,
              alignItems: "center",
              display: "flex",
              borderRadius: 4,
              marginTop: 5,
            }}
            type="primary"
            onClick={() => showModal(record)}
          >
            Upload Acknowledgement
          </Button>
        </>,
      ],
    });
    cols.push({
      title: "Migration Certificate",
      key: "migration_certificate",
      render: (_, record) => [
        <>
          <Button
            style={{
              background: "green",
              color: "#fff",
              height: 20,
              fontSize: 12,
              alignItems: "center",
              display: "flex",
              borderRadius: 4,
            }}
            onClick={() => handleActionClick({ action: "edit", record,migration_status:1 })}
          >
            Print
          </Button>
        </>,
      ],
    });
    return cols;
  }, [settings, storeStudentInfo.allRecords]);
  const getFullName = (data) => {
    if (storeStudentInfo.allRecords) {
      const object = storeStudentInfo.allRecords.find((obj) => obj.id === data);
      if (object) {
        return (
          object.firstName + " " + object.middleName + " " + object.lastName
        );
      } else {
        return "";
      }
    } else {
      return "";
    }
  };
  const getFullCode = (data) => {
    if (storeStudentInfo.allRecords) {
      const object = storeStudentInfo.allRecords.find((obj) => obj.id === data);

      if (object) {
        return object.scholarNumber;
      } else {
        return "";
      }
    } else {
      return "";
    }
  };
  
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    scholarNumber: "",
  });
  const [selectedTC, setSelectedTC] = useState({
    transferCertificateNumber: "",
    dateOfIssue: "",
  });

  const showModal = (data) => {
    const object = storeStudentInfo.allRecords.find(
      (obj) => obj.id === data.studentId
    );
    setSelectedStudent(object);
    setSelectedTC(data);
    console.log(object, data);

    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const getFile = (e: UploadFileStatus) => {
    console.log(e);
    
    // if (Array.isArray(e)) {
    //   return e;
    // }
    //  return e && e.fileList;
  };
  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        const record = await storeTransferenceCertificate.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: "Saved Successfully!",
              description: `Created record for ${record.firstName}`,
            });
          }
        // if (isNew) {
        //   const record = await storePositionsList.addRecord(values);
        //   if (!isEmptyValue(record)) {
        //     notification.success({
        //       message: "Saved Successfully!",
        //       description: `Created record for ${record.firstName}`,
        //     });
        //   }
        // } else {
        //   const record = await storePositionsList.updateRecord(id, values);
        //   if (!isEmptyValue(record)) {
        //     notification.success({
        //       message: "Saved Successfully!",
        //       description: `Updated record for ${record.firstName}`,
        //     });
        //   }
        // }
        setSaveProgress({
          saving: false,
          disableSubmit: true,
          disableForm: true,
        });
      })
      .catch(() => {
        notification.error({ message: "Validations failed" });
        setSaveProgress({
          saving: false,
          disableSubmit: false,
          disableForm: false,
        });
      });
      // setLoading(true);
      // setTimeout(() => {
      //   setLoading(false);
      //   setOpen(false);
      // }, 3000);
  };
  return (
    <div className="layout-main-content">
      <Row justify="start">
        <Col>
          <Space>
            Cancellation Year:
            <Select
              style={{ width: 400 }}
              value={selectYear}
              options={optionsAcademicYear}
              onChange={(event) => {
                handleActionChange(event);
              }}
            />
          </Space>
        </Col>
      </Row>
      <Row justify="end">
        <Col>
          <Button type="primary" ></Button>
        </Col>
      </Row>
      <Table
        bordered
        columns={columns}
        dataSource={
          storeTransferenceCertificate.allRecordsTransferenceCertificate
        }
        scroll={{ x: 350 }}

      />
       <Modal
        open={open}
        title="Upload Acknowledgement"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={onFormSubmit}
          >
            Submit
          </Button>,
          <Button danger key="back" type="primary" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
        
      >
        <Row style={{ fontWeight: "bold" }}>
          <Col span={8}>Student Name:</Col>
          <Col span={16}>
            {selectedStudent.firstName} {selectedStudent.middleName}{" "}
            {selectedStudent.lastName}
          </Col>
        </Row>
        <Row className="mt-3" style={{ fontWeight: "bold" }}>
          <Col span={8}>Student Code:</Col>
          <Col span={16}> {selectedStudent.scholarNumber}</Col>
        </Row>
        <Row  className="mt-3" style={{ fontWeight: "bold" }}>
          <Col span={8}>TC Number: </Col>
          <Col span={16}>{selectedTC.transferCertificateNumber}</Col>
        </Row>
        <Row  className="mt-3"  style={{ fontWeight: "bold" }}>
          <Col span={8}>Date of Issue:</Col>
          <Col span={16}> {selectedTC.dateOfIssue}</Col>
        </Row>

        <Form   form={form} layout="vertical" autoComplete="off">
          <Row  className="mt-3 mb-4" >
            <Col span={8}>
              <label style={{ fontWeight: "bold" }}>
                Upload Acknowledgement*
              </label>
            </Col>
            <Col span={14}>
              <Form.Item
                name="uploadDocuments"
                style={{ fontWeight: "bold" }}
                getValueFromEvent={getFile}
                rules={schemaRules}
                required
              >
                <Upload >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <label   style={{ fontWeight: "bold" }}>
            Once a file is uploaded, it can not be edited.
          </label>
          <Checkbox
            // checked={isCurrentlyHoldingThisPosition}
            //   onChange={onChange}
            style={{ fontWeight: "bold", marginTop: 10 }}
          >
            I confirm to upload above file.
          </Checkbox>
        </Form>
      </Modal>
    </div>
  );
};

export default CancelledAdmissionList;

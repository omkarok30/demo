import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Select,
  Table,
  notification
} from "antd";
import { useNavigate } from "react-router-dom";

import { ColumnsType } from "antd/lib/table";
import _ from "lodash";
import { useSettings } from "@/store/settings/useSettings";

import * as modelPeo from "@/models/Academics/programManagement/peo";
import * as modelPo from "@/models/Academics/programManagement/po";
import * as modelPso from "@/models/Academics/programManagement/pso";

import { useAcademicYear } from "@/store/settings/useAcademicYear";
import { isEmptyValue } from "@/utils/object";
import { useProgramDetails } from "@/store/settings/useProgramDetails";
import { usePeo } from "@/store/Academics/programManagement/usePeo";
import { usePso } from "@/store/Academics/programManagement/usePso";
import { usePo } from "@/store/Academics/programManagement/usePo";
import PEOs from "../form/add";
import { When } from "react-if";
import { ProgramAsText } from "@/components/Renderers/ProgramAsText";

const PeoList = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [show, setShow] = useState(false);
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [form] = Form.useForm();

  const storePeo = usePeo((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords
  }));
  const storePo = usePo((state: any) => ({
    allPoRecords: state.allPoRecords,
    getRecords: state.getRecords
  }));
  const storePso = usePso((state: any) => ({
    allPsoRecords: state.allPsoRecords,
    getRecords: state.getRecords
  }));

  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails
  }));
  const storeProgramDetails = useProgramDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    optionsAllPrograms: state.optionsAllPrograms
  }));

  const optionsAcademicYear = storeAcademicYear.comboByName;
  const optionsPrograms = storeProgramDetails.optionsAllPrograms;

  const handleActionClick = ({ action, record, type }) => {
    console.log(record);

    if (action === "edit") {
      navigate(`../edit/${type}/${record?.id}`, {
        state: { id: record?.id }
      });
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeAcademicYear.getAcademicYearDetails();
    storeProgramDetails.getRecords();
  }, [fetchSettings]);
  const [selectYear, setYear] = useState();
  const [selectBatch, setBatch] = useState();

  const [academicYearLabel, setacademicYearLabel] = React.useState();
  const [selectProgram, setprogram] = useState();
  const [programLabel, setprogramLabel] = useState();
  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false
  });
  React.useEffect(() => {
    if (isEmptyValue(selectYear)) {
      const first = _.first(optionsAcademicYear);
      const value = _.get(first, ["value"], "");
      const label = _.get(first, ["label"], "");
      setYear(value);
      setacademicYearLabel(label);
    }
    if (isEmptyValue(setBatch)) {
      const first = _.first(optionsAcademicYear);
      const value = _.get(first, ["value"], "");
      const label = _.get(first, ["label"], "");
      setBatch(value);
    }
    if (isEmptyValue(selectProgram)) {
      const firstProgram = _.first(optionsPrograms);
      const valueProgram = _.get(firstProgram, ["value"], "");
      const labelProgram = _.get(firstProgram, ["label"], "");
      setprogram(valueProgram);
      setprogramLabel(labelProgram);
    }
  }, [optionsAcademicYear, optionsPrograms]);

  React.useEffect(() => {
    console.log(selectYear, selectProgram);

    storePeo.getRecords(selectYear, selectProgram);
    storePo.getRecords(selectYear, selectProgram);
    storePso.getRecords(selectYear, selectProgram);
  }, [selectYear, selectProgram]);

  React.useEffect(() => {
    console.log(
      "selectBatch",
      storePeo.allRecords,
      storePo.allPoRecords,
      storePso.allPsoRecords
    );
    if (
      storePeo.allRecords.length > 0 ||
      storePo.allPoRecords.length > 0 ||
      storePso.allPsoRecords.length > 0
    ) {
      setIsDataAvailable(true);
      setShow(false);
    } else {
      setIsDataAvailable(false);
    }
  }, [storePeo.allRecords, storePo.allPoRecords, storePso.allPsoRecords]);

  const setAcademicYear = (event) => {
    setYear(event);
    const value = event;
    const yearOptions = _.find(optionsAcademicYear, { value });
    const label = _.get(yearOptions, ["label"], "");
    setacademicYearLabel(label);
  };
  const setPrograms = (event) => {
    setprogram(event);
    const value = event;
    const programOptions = _.find(optionsPrograms, { value });
    const label = _.get(programOptions, ["label"], "");
    setprogramLabel(label);
  };
  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelPeo.columns(settings);
    cols.push({
      title: "Action",
      key: "action",
      render: (_, record) => [
        <span>
          <Button
            type="primary"
            onClick={() =>
              handleActionClick({ action: "edit", record, type: "update_peo" })
            }
          >
            Update
          </Button>
        </span>
      ]
    });
    return cols;
  }, [settings]);
  const columnsPo: ColumnsType<any> = React.useMemo(() => {
    const cols = modelPo.columns(settings);
    cols.push({
      title: "Action",
      key: "action",
      render: (_, record) => [
        <span>
          <Button
            type="primary"
            onClick={() =>
              handleActionClick({ action: "edit", record, type: "update_po" })
            }
          >
            Update
          </Button>
        </span>
      ]
    });
    return cols;
  }, [settings]);
  const columnsPso: ColumnsType<any> = React.useMemo(() => {
    const cols = modelPso.columns(settings);
    cols.push({
      title: "Action",
      key: "action",
      render: (_, record) => [
        <span>
          <Button
            type="primary"
            onClick={() =>
              handleActionClick({ action: "edit", record, type: "update_pso" })
            }
          >
            Update
          </Button>
        </span>
      ]
    });
    return cols;
  }, [settings]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [loadingConfirmation, setLoadingConfirmation] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const showModal = (data) => {
    console.log("model", data);
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
  const showModalConfirmation = () => {
    // console.log("model", data);
    setOpenConfirmation(true);
  };
  const handleOkConfirmation = () => {
    setLoadingConfirmation(true);
    setTimeout(() => {
      setLoadingConfirmation(false);
      setOpenConfirmation(false);
    }, 3000);
  };

  const handleCancelConfirmation = () => {
    setOpenConfirmation(false);
  };
  const onFormSubmit = () => {
    // console.log(form);

    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        showModalConfirmation();
        storePeo.getRecords(selectBatch, selectProgram);
        storePo.getRecords(selectBatch, selectProgram);
        storePso.getRecords(selectBatch, selectProgram);
        setSaveProgress({
          saving: false,
          disableSubmit: true,
          disableForm: true
        });
      })
      .catch(() => {
        notification.error({ message: "Validations failed" });
        setSaveProgress({
          saving: false,
          disableSubmit: false,
          disableForm: false
        });
      });
  };
  const onConfirmationSubmit = () => {
    navigate(`../add/${selectYear}/${selectProgram}/${selectBatch}`, {
      state: {
        record: {
          peo: storePeo.allRecords,
          po: storePo.allPoRecords,
          pso: storePso.allPsoRecords
        }
      }
    });
  };
  return (
    <div className="layout-main-content">
      <Card bordered={false} title="Create/View PEO, PO & PSO">
        <Form>
          <Row>
            <Col className="col-md-6">
              <Form.Item label="Program">
                <Select
                  style={{ width: "300px" }}
                  value={selectProgram}
                  options={optionsPrograms}
                  onChange={(event) => setPrograms(event)}
                />
              </Form.Item>
            </Col>
            <Col className="col-md-6 ml-0 md-ml-5">
              <Form.Item label="Batch">
                <Select
                  style={{ width: "300px" }}
                  value={selectYear}
                  options={optionsAcademicYear}
                  onChange={(event) => setAcademicYear(event)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <When condition={!isDataAvailable}>
          <Row className="justify-center my-4">
            <Button
              type="primary"
              onClick={() => setShow(true)}
              // icon={<SearchOutlined />}
              // size="small"
            >
              Create New
            </Button>
            <Button
              className="ml-2"
              onClick={() => showModal(selectYear)}
              //size="small"
              style={{ backgroundColor: "green", color: "white" }}
            >
              Clone Information
            </Button>
          </Row>
        </When>
        <When condition={show}>
          <PEOs />
        </When>
        <When condition={isDataAvailable && !openConfirmation}>
          <Card
            bordered={false}
            title="Program Educational Objectives (PEOs) Information"
            extra={
              <Button
                type="primary"
                style={{ background: "green", color: "#fff" }}
              >
                Download Report
              </Button>
            }
          >
            <Table
              bordered
              columns={columns}
              dataSource={storePeo.allRecords}
            />
          </Card>
          <Card
            bordered={false}
            title="Program Outcomes (POs) Information"
            extra={
              <Button
                type="primary"
                style={{ background: "green", color: "#fff" }}
              >
                Download Report
              </Button>
            }
          >
            <Table
              bordered
              columns={columnsPo}
              dataSource={storePo.allPoRecords}
            />
          </Card>
          <Card
            bordered={false}
            title="Program Specific Outcomes (PSOs) Information"
            extra={
              <Button
                type="primary"
                style={{ background: "green", color: "#fff" }}
              >
                Download Report
              </Button>
            }
          >
            <Table
              bordered
              columns={columnsPso}
              dataSource={storePso.allPsoRecords}
            />
          </Card>
        </When>
      </Card>
      <Modal
        open={open}
        title="Select Batch to Clone the Data"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={onFormSubmit}
          >
            Proceed
          </Button>,
          <Button danger key="back" type="primary" onClick={handleCancel}>
            Close
          </Button>
        ]}
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Row className="mt-3 mb-4">
            <Col span={8}>
              <label style={{ fontWeight: "bold" }}>COLNE BATCH*</label>
            </Col>
            <Col span={14}>
              <Form.Item
                name="cloneBatch"
                style={{ fontWeight: "bold" }}
                rules={[
                  { required: true, message: "Please select year of batch!" }
                ]}
              >
                <Select
                  style={{ width: "300px" }}
                  value={selectBatch}
                  options={optionsAcademicYear}
                  onChange={(event) => setBatch(event)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        open={openConfirmation}
        title="Confirmation"
        onOk={handleOkConfirmation}
        onCancel={handleCancelConfirmation}
        footer={[<div style={{display:'flex',justifyContent:'center'}}>
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={onConfirmationSubmit}
            disabled={storePeo.allRecords.length === 0 ||
              storePo.allPoRecords.length === 0 ||
              storePso.allPsoRecords.length === 0}
          >
            Proceed
          </Button>,
          <Button
            danger
            key="back"
            type="primary"
            onClick={handleCancelConfirmation}
          >
            Back
          </Button>
          </div>
        ]}
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Row className="mt-3 mb-4">
            <Col span={8}>
              <label style={{ fontWeight: "bold" }}>BATCH:</label>
            </Col>
            <Col span={14}>
              <label style={{ fontWeight: "bold" }}>{selectYear}</label>
            </Col>
            <Col span={8}>
              <label style={{ fontWeight: "bold" }}>PROGRAM:</label>
            </Col>
            <Col span={14}>
              <label style={{ fontWeight: "bold" }}>
                <ProgramAsText value={selectProgram} />
              </label>
            </Col>
            <Col span={8}>
              <label style={{ fontWeight: "bold" }}>CLONE BATCH:</label>
            </Col>
            <Col span={14}>
              <label style={{ fontWeight: "bold" }}>{selectBatch}</label>
            </Col>
            <When
              condition={
                storePeo.allRecords.length > 0 ||
                storePo.allPoRecords.length > 0 ||
                storePso.allPsoRecords.length > 0
              }
            >
              <Col
                className="mt-4"
                span={24}
                style={{
                  background: "green",
                  color: "#fff",
                  padding: 15,
                  borderRadius: 7
                }}
              >
                <span>Do you wish to clone the selected batch data?</span>
              </Col>
            </When>
            <When
              condition={
                storePeo.allRecords.length === 0 ||
                storePo.allPoRecords.length === 0 ||
                storePso.allPsoRecords.length === 0
              }
            >
              <Col
                className="mt-4"
                span={24}
                style={{
                  background: "red",
                  color: "#fff",
                  padding: 15,
                  borderRadius: 7
                }}
              >
                <span>No record found for selected batch to clone data.</span>
              </Col>
            </When>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default PeoList;

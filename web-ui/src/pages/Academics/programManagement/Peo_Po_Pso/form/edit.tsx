import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Form,
  Input,
  notification,
  Popconfirm
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { isEmptyValue } from "@/utils/object";
import * as modelPeo from "@/models/Academics/programManagement/peo";
import * as modelPo from "@/models/Academics/programManagement/po";
import * as modelPso from "@/models/Academics/programManagement/pso";
import { usePeo } from "@/store/Academics/programManagement/usePeo";
import { usePso } from "@/store/Academics/programManagement/usePso";
import { usePo } from "@/store/Academics/programManagement/usePo";
import { useSettings } from "@/store/settings/useSettings";
import { schemaValidator } from "@/utils/validate";
import { When } from "react-if";
import { ProgramAsText } from "@/pages/settings/ProgramDetails/renderers";
import { DepartmentAsText } from "@/pages/settings/AcademicDept/renderers";
import { useProgramDetails } from "@/store/settings/useProgramDetails";
import { YearAsText } from "@/pages/settings/AcademicYear/renderers";
const { TextArea } = Input;

const EmployeePositionsList = () => {
  const { id, type } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const settings = useSettings((state: any) => state.byKeys);
  const [currentObject, setCurrentObject] = useState({
    academicYear: "",
    programId: ""
  });

  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false
  });
  const schemaRulesPeo = React.useMemo(
    () => schemaValidator(modelPeo.schemaRules, { settings: settings.byKeys }),
    [settings.byKeys]
  );
  const schemaRulesPo = React.useMemo(
    () => schemaValidator(modelPo.schemaRules, { settings: settings.byKeys }),
    [settings.byKeys]
  );
  const schemaRulesPso = React.useMemo(
    () => schemaValidator(modelPso.schemaRules, { settings: settings.byKeys }),
    [settings.byKeys]
  );

  const storePeo = usePeo((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
    updateRecord: state.updateRecord
  }));
  const storePo = usePo((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
    updateRecord: state.updateRecord
  }));
  const storePso = usePso((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
    updateRecord: state.updateRecord
  }));
  const storeProgramDetails = useProgramDetails((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
  }));
  React.useEffect(() => {
    storeProgramDetails.getRecord(currentObject.programId)
  }, [currentObject]);

  const headerLabel =
    type === "update_peo"
      ? "Update PEO"
      : type === "update_po"
      ? "Update PO"
      : "Update PSO";

  React.useEffect(() => {
    if (type === "update_peo") {
      storePeo.getRecord(id);
    } else if (type === "update_po") {
      storePo.getRecord(id);
    } else if (type === "update_pso") {
      storePso.getRecord(id);
    }
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (type === "update_peo") {
      if (storePeo.current.id != id) {
        return;
      }
      setCurrentObject({
        academicYear: storePeo.current.academicYear,
        programId: storePeo.current.programId
      });
      form.setFieldsValue(storePeo.current);
    }
  }, [storePeo.current]);
  React.useEffect(() => {
    if (type === "update_po") {
      if (storePo.current.id != id) {
        return;
      }
      setCurrentObject({
        academicYear: storePo.current.academicYear,
        programId: storePo.current.programId
      });
      form.setFieldsValue(storePo.current);
    }
  }, [storePo.current]);
  React.useEffect(() => {
    if (type === "update_pso") {
      if (storePso.current.id != id) {
        return;
      }
      setCurrentObject({
        academicYear: storePso.current.academicYear,
        programId: storePso.current.programId
      });
      form.setFieldsValue(storePso.current);
    }
  }, [storePso.current]);
  const nvaigateToPreviousPage = () => {
    navigate(`/academics/program_management/manage_ppp/list`);
  };

  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        let record;
        if (type === "update_peo") {
          record == (await storePeo.updateRecord(id, values));
        } else if (type === "update_po") {
          record == (await storePo.updateRecord(id, values));
        } else if (type === "update_pso") {
          record == (await storePso.updateRecord(id, values));
        }

        if (!isEmptyValue(record)) {
          notification.success({
            message: "Saved Successfully!",
            description: `Updated record for ${record.programId}`
          });
        }
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
  return (
    <div className="layout-main-content">
      <Card bordered={false} title={headerLabel}>
        <Row className="mb-5">
          <Col span={12}>
          <span style={{display:'flex'}}><b className="mr-3">Batch</b><YearAsText value={currentObject?.academicYear}/></span> 
            
          </Col>
          <Col span={12}>
          <span style={{display:'flex'}}><b className="mr-3">Department</b> <DepartmentAsText value={storeProgramDetails.current?.departmentId} /></span>
          </Col>
          <Col span={12} style={{ display: "flex" }}>
            <b className="mr-3">Program </b>{" "}
            <span style={{ textTransform: "uppercase" }}>
              <ProgramAsText value={currentObject?.programId} />
            </span>
          </Col>
        </Row>
        <Row className="justify-center">
          <Col span={12}>
            <When condition={type === "update_peo"}>
              <Form form={form} layout="vertical" autoComplete="off">
                <Form.Item
                  name="peoNumber"
                  label="PEO Number"
                  style={{ fontWeight: "bold" }}
                  rules={schemaRulesPeo}
                  required
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  name="peoStatement"
                  label="PEO Statement"
                  style={{ fontWeight: "bold" }}
                  rules={schemaRulesPeo}
                  required
                >
                  <TextArea />
                </Form.Item>
                <Form.Item
                  name="approvePeo"
                  label="Approved In"
                  style={{ fontWeight: "bold" }}
                >
                  <TextArea />
                </Form.Item>
                <Form.Item className="text-center">
                  <Popconfirm
                    placement="top"
                    title={"Do you wish to continue this transaction?"}
                    okText="OK"
                    cancelText="Cancel"
                    onConfirm={onFormSubmit}
                  >
                    <Button className="mt-4" type="primary">
                      Submit
                    </Button>
                  </Popconfirm>

                  <Button
                    onClick={nvaigateToPreviousPage}
                    className="mt-4 ml-3"
                  >
                    Back
                  </Button>
                </Form.Item>
              </Form>
            </When>
            <When condition={type === "update_po"}>
              <Form form={form} layout="vertical" autoComplete="off">
                <Form.Item
                  name="poNumber"
                  label="PO Number"
                  style={{ fontWeight: "bold" }}
                  rules={schemaRulesPo}
                  required
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  name="poStatement"
                  label="PO Statement"
                  style={{ fontWeight: "bold" }}
                  rules={schemaRulesPo}
                  required
                >
                  <TextArea />
                </Form.Item>
                <Form.Item
                  name="approvePo"
                  label="Approved In"
                  style={{ fontWeight: "bold" }}
                >
                  <TextArea />
                </Form.Item>
                <Form.Item className="text-center">
                  <Popconfirm
                    placement="top"
                    title={"Do you wish to continue this transaction?"}
                    okText="OK"
                    cancelText="Cancel"
                    onConfirm={onFormSubmit}
                  >
                    <Button className="mt-4" type="primary">
                      Submit
                    </Button>
                  </Popconfirm>
                  <Button
                    onClick={nvaigateToPreviousPage}
                    className="mt-4 ml-3"
                  >
                    Back
                  </Button>
                </Form.Item>
              </Form>
            </When>
            <When condition={type === "update_pso"}>
              <Form form={form} layout="vertical" autoComplete="off">
                <Form.Item
                  name="psoNumber"
                  label="PSO Number"
                  style={{ fontWeight: "bold" }}
                  rules={schemaRulesPso}
                  required
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  name="psoStatement"
                  label="PSO Statement"
                  style={{ fontWeight: "bold" }}
                  rules={schemaRulesPso}
                  required
                >
                  <TextArea />
                </Form.Item>
                <Form.Item
                  name="approvePso"
                  label="Approved In"
                  style={{ fontWeight: "bold" }}
                >
                  <TextArea />
                </Form.Item>
                <Form.Item className="text-center">
                  <Popconfirm
                    placement="top"
                    title={"Do you wish to continue this transaction?"}
                    okText="OK"
                    cancelText="Cancel"
                    onConfirm={onFormSubmit}
                  >
                    <Button className="mt-4" type="primary">
                      Submit
                    </Button>
                  </Popconfirm>
                  <Button
                    onClick={nvaigateToPreviousPage}
                    className="mt-4 ml-3"
                  >
                    Back
                  </Button>
                </Form.Item>
              </Form>
            </When>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default EmployeePositionsList;

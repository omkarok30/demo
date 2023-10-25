import { ProgramAsText } from "@/components/Renderers/ProgramAsText";
import { DepartmentAsText } from "@/pages/settings/AcademicDept/renderers";
import { YearAsText } from "@/pages/settings/AcademicYear/renderers";
import { usePeo } from "@/store/Academics/programManagement/usePeo";
import { usePo } from "@/store/Academics/programManagement/usePo";
import { usePso } from "@/store/Academics/programManagement/usePso";
import { useProgramDetails } from "@/store/settings/useProgramDetails";
import { isEmptyValue } from "@/utils/object";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Descriptions,
  Form,
  Input,
  Radio,
  Row,
  Space,
  notification
} from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { useState } from "react";
import { When } from "react-if";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const { TextArea } = Input;
// const PEO = [
//   {
//     peoNumber: "PEO1",
//     PEOStatement: ""
//   }
// ];
// const PO = [
//   {
//     poNumber: "PO1",
//     POStatement: ""
//   }
// ];
// const PSO = [
//   {
//     psoNumber: "PSO1",
//     PSOStatement: ""
//   }
// ];
const PEOs = () => {
  const { year, program, batch } = useParams();
  const { state } = useLocation();
  const { record } = state;
  console.log("record", record);

  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [formPo] = Form.useForm();
  const [formPso] = Form.useForm();
  const [isPorgramHavePSO, setPorgramHavePSO] = useState(1);
  const [isConfirm, setIsConfirm] = useState(false);
  const [currentValueRadio, setcurrentValueRadio] = useState(1);

  const [saveProgress, setSaveProgress] = useState({
    saving: false,
    disableSubmit: false,
    disableForm: false
  });
  const storePeo = usePeo((state: any) => ({
    addRecord: state.add
  }));
  const storePo = usePo((state: any) => ({
    addRecord: state.add
  }));
  const storePso = usePso((state: any) => ({
    addRecord: state.add
  }));
  const storeProgramDetails = useProgramDetails((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
  }));
  React.useEffect(() => {
    storeProgramDetails.getRecord(program)
  }, [program]);
 
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };
  const onChange = (index) => {
    console.log("chnage", formPso.getFieldValue("radio"));
    // const { courseMethod } = fields;
    // Object.assign(courseMethod[index], {
    //   hoursPerWeek: obj.hoursPerWeek,
    //   creadits: obj.credits
    // });
    // form.setFieldsValue({ courseMethod });
  };
  const onSubmit = () => {
    console.log("Received values of PEOs:", form.getFieldValue("PEOs"));
    console.log("Received values of POs:", formPo.getFieldValue("POs"));
    console.log("Received values of PSOs:", formPso.getFieldValue("PSOs"));
  };
  const onConfirm = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setIsConfirm(true);
    } else {
      setIsConfirm(false);
    }
  };
  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        const record = await storePeo.addRecord(values);
        if (!isEmptyValue(record)) {
          notification.success({
            message: "Saved Successfully!",
            description: `Created record for ${record.programId}`
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
    formPo
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        const record = await storePo.addRecord(values);
        if (!isEmptyValue(record)) {
          notification.success({
            message: "Saved Successfully!",
            description: `Created record for ${record.programId}`
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
    formPso
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        const record = await storePso.addRecord(values);
        if (!isEmptyValue(record)) {
          notification.success({
            message: "Saved Successfully!",
            description: `Created record for ${record.programId}`
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
  const nvaigateToPreviousPage = () => {
    navigate(`/academics/program_management/manage_ppp/list`);
  };
  const removeitem = (keys) => {
    let element = keys.at(-1);
    return element.name;
  };
  return (
    <div className="layout-main-content">
      <Card bordered={false} title="Create PEO, PO & PSO">
        <Row justify={"center"} className="mb-4">
          <Col>
            <Descriptions column={24}>
              <Descriptions.Item label="Batch" span={12}>
                <YearAsText value={batch}/>
              </Descriptions.Item>
              <Descriptions.Item
                label="Department "
                span={12}
              ><DepartmentAsText value={storeProgramDetails.current.departmentId} /></Descriptions.Item>
              <Descriptions.Item label="Program" span={12}>
                <ProgramAsText value={program} />
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Form
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{ PEOs: record.peo }}
        >
          <div style={{ marginLeft: 100 }}>
            <label>PEOs</label>
            <Form.Item
              name="approvePeo"
              label="Approved In"
              style={{ width: 300 }}
            >
              <Input />
            </Form.Item>
            <Form.List name="PEOs">
              {(fields, { add, remove }, index) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <>
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "peoNumber"]}
                          label="PEO Number"
                          style={{ width: 200 }}
                          initialValue={
                            "PEO" + form.getFieldValue("PEOs").length
                          }
                        >
                          <TextArea disabled />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "peoStatement"]}
                          rules={[{ required: true, message: "required" }]}
                          label="PEO Statement"
                          style={{ minWidth: 300 }}
                        >
                          <TextArea />
                        </Form.Item>
                      </Space>
                      <When
                        condition={
                          removeitem(fields) === name &&
                          form.getFieldValue("PEOs").length > 1
                        }
                      >
                        <Form.Item>
                          <Button
                            type="primary"
                            danger
                            onClick={() => remove(removeitem(fields))}
                            block
                            style={{
                              fontSize: 12,
                              width: 70,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: 20
                            }}
                          >
                            Remove
                          </Button>
                        </Form.Item>
                      </When>
                    </>
                  ))}
                  <Form.Item>
                    <Button
                      style={{
                        background: "green",
                        color: "#fff",
                        fontSize: 12,
                        width: 70,
                        height: 20,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                      onClick={() => {
                        add();
                        onChange(index);
                      }}
                      block
                    >
                      Add PEO
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
        </Form>
        <Form
          form={formPo}
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{ POs: record.po }}
        >
          <div style={{ marginLeft: 100 }}>
            <label>POs</label>
            <Form.Item
              name="approvePo"
              label="Approved In"
              style={{ width: 300 }}
            >
              <Input />
            </Form.Item>
            <Form.List name="POs">
              {(fields, { add, remove }, index) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <>
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "poNumber"]}
                          label="PO Number"
                          style={{ width: 200 }}
                          initialValue={
                            "PO" + formPo.getFieldValue("POs").length
                          }
                        >
                          <TextArea disabled />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "poStatement"]}
                          rules={[{ required: true, message: "required" }]}
                          label="PO Statement"
                          style={{ minWidth: 300 }}
                        >
                          <TextArea />
                        </Form.Item>
                      </Space>
                      <When
                        condition={
                          removeitem(fields) === name &&
                          formPo.getFieldValue("POs").length > 1
                        }
                      >
                        <Form.Item>
                          <Button
                            type="primary"
                            danger
                            onClick={() => remove(removeitem(fields))}
                            block
                            style={{
                              fontSize: 12,
                              width: 70,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: 20
                            }}
                          >
                            Remove
                          </Button>
                        </Form.Item>
                      </When>
                    </>
                  ))}
                  <Form.Item>
                    <Button
                      style={{
                        background: "green",
                        color: "#fff",
                        fontSize: 12,
                        width: 70,
                        height: 20,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                      onClick={() => add()}
                      block
                    >
                      Add PO
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
          {/* <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item> */}
        </Form>
        <Form
          form={formPso}
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{ PSOs: record.pso }}
        >
          <div style={{ marginLeft: 100 }}>
            <label>PSOs</label>
            <Form.Item
              name="approvePso"
              label="Approved In"
              style={{ width: 300 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label=" Does the program have PSOs?"
              name="radio"
              rules={[{ required: true, message: "Please select an option!" }]}
            >
              <Radio.Group
                onChange={(e) => {
                  setcurrentValueRadio(e.target.value);
                }}
                // value={currentValueRadio}
                defaultValue={1}
              >
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            </Form.Item>
            <When condition={isPorgramHavePSO && currentValueRadio === 1}>
              <Form.List name="PSOs">
                {(fields, { add, remove }, index) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <>
                        <Space
                          key={key}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "psoNumber"]}
                            label="PSO Number"
                            style={{ width: 200 }}
                            initialValue={
                              "PSO" + formPso.getFieldValue("PSOs").length
                            }
                          >
                            <TextArea disabled />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "psoStatement"]}
                            rules={[{ required: true, message: "required" }]}
                            label="PSO Statement"
                            style={{ minWidth: 300 }}
                          >
                            <TextArea />
                          </Form.Item>
                        </Space>
                        <When
                          condition={
                            removeitem(fields) === name &&
                            formPso.getFieldValue("PSOs").length > 1
                          }
                        >
                          <Form.Item>
                            <Button
                              type="primary"
                              danger
                              onClick={() => remove(removeitem(fields))}
                              block
                              style={{
                                fontSize: 12,
                                width: 70,
                                height: 20,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            >
                              Remove
                            </Button>
                          </Form.Item>
                        </When>
                      </>
                    ))}
                    <Form.Item>
                      <Button
                        style={{
                          background: "green",
                          color: "#fff",
                          fontSize: 12,
                          width: 70,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: 20
                        }}
                        onClick={() => add()}
                        block
                      >
                        Add PSO
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </When>
          </div>
          {/* <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item> */}
        </Form>
        <div style={{ marginLeft: 150 }}>
          <Form.Item label='"Once the record is added in the system, no. of PEOs, POs and PSOs cannot be added or deleted."'>
            <Checkbox checked={isConfirm} onChange={onConfirm}>
              I confirm to create the above PEOs, POs and PSOs.
            </Checkbox>
          </Form.Item>
          <div style={{ display: "flex" }}>
            <Button
              disabled={!isConfirm}
              type="primary"
              htmlType="button"
              onClick={onFormSubmit}
            >
              Submit
            </Button>
            <Button
              className="ml-4"
              htmlType="button"
              onClick={nvaigateToPreviousPage}
            >
              Back
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default PEOs;

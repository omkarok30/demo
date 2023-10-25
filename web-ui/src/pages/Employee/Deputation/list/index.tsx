import React from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Table,
  Form,
  Input,
  Space,
  Select,
  DatePicker,
  Upload,
  Checkbox,
  notification,
  Affix,
} from "antd";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/lib/table";
import * as modelEmployeeDeputation from "@/models/Employee/EmployeeDeputation";
import { useEmployeeDeputation } from "@/store/employee/useEmployeeDeputation";
import { useSettings } from "@/store/settings/useSettings";
import { DepartmentAsText } from "@/pages/settings/AcademicDept/renderers";
import { attachRenderer } from "@/utils/tableExtras";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { todoLookUps } from "@/store/todoLookUps";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { UploadFileStatus } from "antd/lib/upload/interface";
import { useGlobalState } from "@/store/global";
import { schemaValidator } from "@/utils/validate";
import { isEmptyValue } from "@/utils/object";
const { TextArea } = Input;
const EmploymentStatus = todoLookUps.getState().EmploymentStatus;
const EmploymentActiveStatus = todoLookUps.getState().EmploymentActiveStatus;
const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />,
};
const EmployeeDeputationList = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [isCurrentlyHoldingThisPosition, setIsCurrentlyHoldingThisPosition] =
    React.useState(true);
  const [isHODPosition, setisHODPosition] = React.useState(false);
  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelEmployeeDeputation.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys]
  );
  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });

  const global = useGlobalState((state: any) => state.default);

  const storeEmployeeDeputation = useEmployeeDeputation((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    addRecord: state.addRecord,
    getRecord: state.getRecord,
    current: state.current,
    updateRecord: state.updateRecord,
  }));

  const navigateToNewForm = () => {
    navigate("/Employee/employee_deputation/edit/new");
  };

  const handleActionClick = ({ action, record }) => {
    if (action === "edit") {
      navigate(`/Employee/employee_deputation/edit/${record?.id}`, {
        state: { id: record?.id },
      });
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeEmployeeDeputation.getRecords();
    console.log(storeEmployeeDeputation.allRecords);
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelEmployeeDeputation.columns(settings);
    cols.push({
      title: "Document",
      key: "action",
      render: (_, record) => [
        <Button
          type="link"
          style={{ backgroundColor: "#2063B0", color: "white" }}
        >
          <DownloadOutlined />
        </Button>,
      ],
    });
    cols.push({
      title: "Action",
      key: "action",
      render: (_, record) => [
        <>
          <Button
            type="link"
            style={{ backgroundColor: "#2063B0", color: "white" }}
            onClick={() => handleActionClick({ action: "Revoke", record })}
          >
            Revoke
          </Button>
          <Button
            type="link"
            style={{
              backgroundColor: "#2063B0",
              color: "white",
              marginLeft: 10,
            }}
            onClick={() => handleActionClick({ action: "edit", record })}
          >
            Update
          </Button>
        </>,
      ],
    });
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);
  const columns1: ColumnsType<any> = React.useMemo(() => {
    let cols = modelEmployeeDeputation.columns1(settings);

    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  const onChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      console.log(`checked = ${e.target.checked}`);
      setIsCurrentlyHoldingThisPosition(true);
    } else {
      setIsCurrentlyHoldingThisPosition(false);
      console.log(`checked = ${e.target.checked}`);
    }
  };
  const getFile = (e: UploadFileStatus) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    //  return e && e.fileList;
  };

  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        // if (isNew) {
        //   const record = await storeEmployeeDeputation.addRecord(values);
        //   if (!isEmptyValue(record)) {
        //     notification.success({
        //       message: "Saved Successfully!",
        //       description: `Created record for ${record.firstName}`,
        //     });
        //   }
        // } else {
        //   const record = await storeEmployeeDeputation.updateRecord(id, values);
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
  };
  return (
    <div className="layout-main-content">
      <Card bordered={false}>
        <Row justify="center" className="mt-5">
          <Col span={12}>
            <Form form={form} layout="vertical" autoComplete="off">
              {storeEmployeeDeputation.allRecords.length > 0 ? (
                <>
                  {storeEmployeeDeputation.allRecords[0].status == "Active" ? (
                    <>
                      <Form.Item
                        name="status"
                        label="Employment Status"
                        rules={schemaRules}
                        style={{ flex: 1, marginRight: 10, fontWeight: "bold" }}
                      >
                        <Select
                          style={{ textTransform: "uppercase" }}
                          placeholder="Select a option"
                          allowClear
                          options={EmploymentStatus}
                        />
                      </Form.Item>
                      <Form.Item
                        name="deactivatereason"
                        label="Reason for Deactivation"
                        rules={schemaRules}
                        style={{ fontWeight: "bold" }}
                      >
                        <TextArea rows={4} />
                      </Form.Item>
                    </>
                  ) : (
                    <>
                      <Form.Item
                        name="status"
                        label="Employment Status"
                        rules={schemaRules}
                        style={{ flex: 1, marginRight: 10, fontWeight: "bold" }}
                      >
                        <Select
                          style={{ textTransform: "uppercase" }}
                          placeholder="Select a option"
                          allowClear
                          options={EmploymentActiveStatus}
                        />
                      </Form.Item>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Form.Item
                    name="deputation_date"
                    label="Deputation Date"
                    rules={schemaRules}
                    required
                    style={{ fontWeight: "bold" }}
                  >
                    <DatePicker
                      className="w-100%"
                      format={global.displayDateFormat}
                    />
                  </Form.Item>
                  <Form.Item
                    name="description"
                    label="Description"
                    rules={schemaRules}
                    style={{ fontWeight: "bold" }}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                  <Form.Item
                    name="document"
                    label="Document"
                    getValueFromEvent={getFile}
                    style={{ fontWeight: "bold" }}
                  >
                    <Upload>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                </>
              )}

              <Form.Item className="text-center">
                <Button className="mt-4" type="primary" onClick={onFormSubmit}>
                  Submit
                </Button>
                {/* <Button onClick={nvaigateToPreviousPage} className='mt-4 ml-3' >
                  Back
                </Button> */}
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
      <Card bordered={false}>
       
        <Row className="mt-5">
          <Col style={{ fontWeight: "bold", color: "black", marginBottom: 20 }}>
            Active/Inactive status
          </Col>
          <Col span={24}>
            <Table
              bordered
              columns={columns1}
              dataSource={storeEmployeeDeputation.allRecords}
            />
          </Col>
        </Row>
        <hr className="mt-5 mb-5" />
        <Row className="mt-5">
          <Col style={{ fontWeight: "bold", color: "black", marginBottom: 20 }}>
            Deputation History
          </Col>
          <Col span={24}>
            <Table
              bordered scroll={{ x: 350 }}
              columns={columns}
              dataSource={storeEmployeeDeputation.allRecords}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default EmployeeDeputationList;

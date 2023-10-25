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
  Descriptions,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { isEmptyValue } from "@/utils/object";
import * as modelEmployeeDeputation from "@/models/Employee/EmployeeDeputation";
import { useEmployeeDeputation } from "@/store/employee/useEmployeeDeputation";
import { useSettings } from "@/store/settings/useSettings";
import { DepartmentAsText } from "@/pages/settings/AcademicDept/renderers";
import { attachRenderer } from "@/utils/tableExtras";
import { UploadOutlined } from "@ant-design/icons";
import { todoLookUps } from "@/store/todoLookUps";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { UploadFileStatus } from "antd/lib/upload/interface";
import { useGlobalState } from "@/store/global";
import { schemaValidator } from "@/utils/validate";
import MainHeader from "../../MainHeader";
const { TextArea } = Input;
const EmploymentStatus = todoLookUps.getState().EmploymentStatus;

const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />,
};
const EmployeeDeputationForm = () => {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });
  const [isCurrentlyAppointed, setisCurrentlyAppointed] = React.useState(true);
  const [isHODPosition, setisHODPosition] = React.useState(false);
  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelEmployeeDeputation.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys]
  );

  const global = useGlobalState((state: any) => state.default);

  const storeEmployeeDeputation = useEmployeeDeputation((state: any) => ({
    // allRecords: state.allRecords,
    // getRecords: state.getRecords,
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
  }));

  const headerLabel = isNew ? "Add Deputation" : "Edit Deputation";

  const navigateToNewForm = () => {
    navigate("../edit/new");
  };

  const nvaigateToPreviousPage = () => {
    // navigate(`/employee/employee_details/edit/${empId}`, { state: { activeTab: 'job_history' } });
  };

  React.useEffect(() => {
    storeEmployeeDeputation.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeEmployeeDeputation.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeEmployeeDeputation.current);
  }, [storeEmployeeDeputation.current]);

  const onChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      console.log(`checked = ${e.target.checked}`);
      setisCurrentlyAppointed(true);
    } else {
      setisCurrentlyAppointed(false);
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
  const onPositionChange = () => {
    console.log(form.getFieldValue("positionName"));
    if (
      form.getFieldValue("positionName") === "ASSISTANT HEAD OF THE DEPARTMENT"
    ) {
      setisHODPosition(true);
    } else {
      setisHODPosition(false);
    }
  };
  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeEmployeeDeputation.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: "Saved Successfully!",
              description: `Created record for ${record.firstName}`,
            });
          }
        } else {
          const record = await storeEmployeeDeputation.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: "Saved Successfully!",
              description: `Updated record for ${record.firstName}`,
            });
          }
        }
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
      <MainHeader />
      <Card bordered={false} title={headerLabel}>
        <Row className="justify-center mt-5">
          <Col span={12}>
            <Form form={form} layout="vertical" autoComplete="off">
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
    </div>
  );
};

export default EmployeeDeputationForm;

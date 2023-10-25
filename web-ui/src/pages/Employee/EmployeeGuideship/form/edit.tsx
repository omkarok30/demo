import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Affix,
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  DatePicker,
  Input,
  Radio,
  Row,
  Select,
  notification,
  Tabs,
  Descriptions,
  Tag,
  Upload
} from "antd";
import { When } from "react-if";
import Meta from "antd/lib/card/Meta";
import { schemaValidator } from "@/utils/validate";
import { useGlobalState } from "@/store/global";
import { isEmptyValue } from "@/utils/object";
import { todoLookUps } from "@/store/todoLookUps";
import { useSettings } from "@/store/settings/useSettings";
import * as modelEmployeeDetails from "@/models/Employee/EmployeeDetails";
import { useEmployeeDetails } from "@/store/employee/useEmployeeDetails";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFileStatus } from "antd/lib/upload/interface";
const yesNo = todoLookUps.getState().yesNo;

const GuideshipDetails = () => {
  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect
  }));
  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelEmployeeDetails.schemaRules, {
        settings: settings.byKeys
      }),
    [settings.byKeys]
  );
  const [form] = Form.useForm();
  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false
  });
  const [optionsCaste, setOptionsCaste] = useState([{}]);
  const [admissionProcessBy, setAdmissionProcessBy] = useState();
  const { id } = useParams();
  const isNew = id === "new";
  const [isPG, setPG] = React.useState(false);
  const [isPHD, setPHD] = React.useState(false);

  const storeEmployeeDetails = useEmployeeDetails((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord
  }));

  React.useEffect(() => {
    storeEmployeeDetails.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeEmployeeDetails.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeEmployeeDetails.current);
  }, [storeEmployeeDetails.current]);

  const onReligionChange = (event: any) => {
    form.setFields([{ name: "cast", value: "" }]);
    let caste: any;
    caste = todoLookUps.getState().caste?.find((obj: any) => obj[event]);
    if (caste) {
      setOptionsCaste(caste[event]);
    } else {
      setOptionsCaste([]);
    }
  };

  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeEmployeeDetails.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: "Saved Successfully!",
              description: `Created record for ${record.firstName}`
            });
          }
        } else {
          const record = await storeEmployeeDetails.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: "Saved Successfully!",
              description: `Updated record for ${record.firstName}`
            });
          }
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
  const headerLabel = isNew ? "Add Guideship" : "Update Guideship";

  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const onPGRecognizedChange = () => {

    if (form.getFieldValue("is_pg_guid_yes")=='true') {
      setPG(true);
    } else {
      setPG(false);
    }
  };
  const onPHDRecognizedChange = () => {
    if (form.getFieldValue("is_phd_guid_yes")=='true') {
      console.log(form.getFieldValue("is_phd_guid_yes"));
      setPHD(true);
    } else {
      setPHD(false);
    }
  };
  return (
    <div className='layout-main-content'>
      <Card bordered={false}>
        <Row className='justify-center'>
          <Col span={12}>
            <Form form={form} layout='vertical'>
              <Form.Item
                name='is_pg_guid_yes'
                label='PG Recognized as Guide?'
                style={{ fontWeight: "bold" }}>
                <Select
                  onChange={onPGRecognizedChange}
                  style={{ textTransform: "uppercase" }}
                  placeholder='Select a option '
                  allowClear
                  options={yesNo}
                />
              </Form.Item>
              {isPG ? (
                <>
                  <Form.Item
                    name='pgfile'
                    label='PG Recognition Document'
                    getValueFromEvent={getFile}
                    style={{ flex: 1, marginRight: 10, fontWeight: "bold" }}>
                    <Upload>
                      <Button icon={<UploadOutlined />}>Choose File</Button>
                    </Upload>
                  </Form.Item>
                  <Form.Item
                    name='pg_registration_year'
                    label='PG Recognition Year'
                    rules={schemaRules}
                    required
                    style={{ flex: 1, marginRight: 10, fontWeight: "bold" }}>
                    <Input style={{ textTransform: "uppercase" }} />
                  </Form.Item>
                  <Form.Item
                    name='pgregdate'
                    label='Date of PG Recognition'
                    rules={schemaRules}
                    style={{ flex: 1, marginRight: 10, fontWeight: "bold" }}>
                    <DatePicker
                      className='w-100%'
                      format={global.displayDateFormat}
                      //  disabledDate={disabledDate} defaultPickerValue={defaultPickerValue}
                    />
                  </Form.Item>
                </>
              ) : (
                ""
              )}

              <Form.Item
                name='is_phd_guid_yes'
                label='Ph.D. Recognized as Guide?'
                style={{ fontWeight: "bold" }}>
                <Select
                  onChange={onPHDRecognizedChange}
                  style={{ textTransform: "uppercase" }}
                  placeholder='Select a option '
                  allowClear
                  options={yesNo}
                />
              </Form.Item>
              {isPHD ? (
                <>
                  <Form.Item
                    name='phdfile'
                    label='Ph.D. Recognition Document'
                    getValueFromEvent={getFile}
                    style={{ flex: 1, marginRight: 10, fontWeight: "bold" }}>
                    <Upload>
                      <Button icon={<UploadOutlined />}>Choose File</Button>
                    </Upload>
                  </Form.Item>
                  <Form.Item
                    name='phd_registration_year'
                    label='Ph.D. Recognition Year'
                    rules={schemaRules}
                    required
                    style={{ flex: 1, marginRight: 10, fontWeight: "bold" }}>
                    <Input style={{ textTransform: "uppercase" }} />
                  </Form.Item>
                  <Form.Item
                    name='phdregdate'
                    label='Date of Ph.D. Recognition'
                    rules={schemaRules}
                    required
                    style={{ flex: 1, marginRight: 10, fontWeight: "bold" }}>
                    <DatePicker
                      className='w-100%'
                      format={global.displayDateFormat}
                      //  disabledDate={disabledDate} defaultPickerValue={defaultPickerValue}
                    />
                  </Form.Item>
                </>
              ) : (
                ""
              )}
              <Form.Item className='text-center'>
                <Button className='mt-4' type='primary' onClick={onFormSubmit}>
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

export default GuideshipDetails;

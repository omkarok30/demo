import React from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Select, DatePicker, Modal, Upload, Checkbox, notification, Descriptions, Radio } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { isEmptyValue } from '@/utils/object';
import { ColumnsType } from 'antd/lib/table';
import * as modelEmployeeOnlineCoursesDetails from '@/models/Employee/DetailsOfActivity/OnlineCoursesDetails/OnlineCoursesDetails';
import { useEmployeeOnlineCoursesDetails } from '@/store/employee/DetailsOfActivity/OnlineCoursesDetail/useEmployeeOnlineCoursesDetail';
import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { UploadOutlined } from '@ant-design/icons';
import { todoLookUps } from '@/store/todoLookUps';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { UploadFileStatus } from 'antd/lib/upload/interface';
import { useGlobalState } from '@/store/global';
import { schemaValidator } from '@/utils/validate';
import MainHeader from '@/pages/Employee/MainHeader';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
const academicYear = todoLookUps.getState().academicYear;
const onlineCoursesMode = todoLookUps.getState().onlineCoursesMode;
const programs = todoLookUps.getState().program;
const relevantPo = todoLookUps.getState().relevantPo

const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />
};
import _ from 'lodash';
export interface ActivityModalType {
  id: any;
  studentId: any;
  open: boolean;
  handleOk: Function;
  handleCancel: Function;
}

const EmployeeOnlineCoursesDetailsForm = ({
  id,
  studentId,
  open,
  handleOk,
  handleCancel,
}: ActivityModalType) => {
  const { userId } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [isCurrentlyHoldingThisPosition, setIsCurrentlyHoldingThisPosition] = React.useState(true)
  const [isHODPosition, setisHODPosition] = React.useState(false)
  const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeOnlineCoursesDetails.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

  const global = useGlobalState((state: any) => state.default);

  const storeOnlineCoursesDetails = useEmployeeOnlineCoursesDetails((state: any) => ({
    // allRecords: state.allRecords,
    // getRecords: state.getRecords,
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
  }));

  const headerLabel = isNew ? 'Add Online Course' : 'Edit Online Course';

  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const storeProgramDetails = useProgramDetails((state: any) => ({
    optionsInstitutePrograms: state.optionsAllPrograms,
    getRecords: state.getRecords,
    allSemesterPatternPrograms: state.allSemesterPatternPrograms,
  }));

  const optionsAcademicYear = storeAcademicYear.comboByName;
  const optionsPrograms = storeProgramDetails.optionsInstitutePrograms;
  const navigateToNewForm = () => {
    navigate('../edit/new');
  };


  React.useEffect(() => {
    storeAcademicYear.getAcademicYearDetails();
    storeOnlineCoursesDetails.getRecord(id);
    storeProgramDetails.getRecords();
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);


  React.useEffect(() => {
    if (storeOnlineCoursesDetails.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeOnlineCoursesDetails.current);
  }, [storeOnlineCoursesDetails.current]);

  const nvaigateToPreviousPage = () => {
    // navigate(`/employee/employee_details/edit/${userId}`, { state: { activeTab: 'positions'} });
  }
  const onChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      console.log(`checked = ${e.target.checked}`);
      setIsCurrentlyHoldingThisPosition(true)
    } else {
      setIsCurrentlyHoldingThisPosition(false)
      console.log(`checked = ${e.target.checked}`);

    }
  };
  const getFile = (e: UploadFileStatus) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    //  return e && e.fileList;
  };
  const onPositionChange = () => {
    console.log(form.getFieldValue('positionName'));
    if (form.getFieldValue('positionName') === 'ASSISTANT HEAD OF THE DEPARTMENT') {
      setisHODPosition(true)
    } else {
      setisHODPosition(false)

    }
  };

  const doCancel = () => {
    if (_.isFunction(handleCancel)) {
      handleCancel(studentId);
    }
  };

  const onFormSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeOnlineCoursesDetails.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.firstName}` });
          }
        }
        else {
          const record = await storeOnlineCoursesDetails.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.firstName}` });
          }
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      });
  };

  return (
    <div className='layout-main-content'>
      <Modal
        title={headerLabel}
        open={open}
        onOk={onFormSubmit}
        onCancel={doCancel}
        closable
        width={1000}
        centered
        style={{ marginTop: 20, marginBottom: 20 }}>
        <MainHeader />
        <Row className='justify-center'>
          <Col span={12}>
            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
            >
              <Form.Item name="academicYear" label="Academic Year" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                <Select onChange={onPositionChange} options={optionsAcademicYear} />
              </Form.Item>
              <Form.Item name="courseName" label="Course Name" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                <Input />
              </Form.Item>
              <Form.Item name="courseDuration" label="Course Duration (In no.of weeks.)" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                <Input type='number' />
              </Form.Item>
              <Form.Item name="mode" label="Mode" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                <Select onChange={onPositionChange} options={onlineCoursesMode} />
              </Form.Item>
              <Form.Item name="startDate" label="Start Date" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                <DatePicker className="w-100%" format={global.displayDateFormat} />
              </Form.Item>
              <Form.Item name="endDate" label="End Date" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                <DatePicker className="w-100%" format={global.displayDateFormat} />
              </Form.Item>
              <Form.Item name="organizationName" label="Name of Training Organization" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                <Input />
              </Form.Item>
              <Form.Item name="program" label="Program" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                <Select onChange={onPositionChange} options={optionsPrograms} />
              </Form.Item>
              <Form.Item name="relevantPo" label="Relevant PO" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                <Select onChange={onPositionChange} options={relevantPo} />
              </Form.Item>
              <Form.Item name="fees" label="Fees (INR)" style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                <Input type='number' />
              </Form.Item>

              <Form.Item name="financialSupport" label="Financial Support" style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                <Radio.Group>
                  <Radio value='yes'>Yes</Radio>
                  <Radio value='no'>No</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="uploadDocument" label="Upload Document" getValueFromEvent={getFile} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                <Upload>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
              {/* <Form.Item className='text-center'>
                <Button className='mt-4' type="primary" onClick={onFormSubmit}>
                  Submit
                </Button>
                <Button onClick={nvaigateToPreviousPage} className='mt-4 ml-3' >
                  Back
                </Button>
              </Form.Item> */}
            </Form>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default EmployeeOnlineCoursesDetailsForm;

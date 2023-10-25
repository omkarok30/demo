import React from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Select, DatePicker, Upload, Checkbox, notification, Descriptions } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { isEmptyValue } from '@/utils/object';
import * as modelEmployeeJobHistory from '@/models/Employee/EmployeeJobHistory';
import { useEmployeeJobHistory } from '@/store/employee/useEmployeeJobHistory';
import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { UploadOutlined } from '@ant-design/icons';
import { todoLookUps } from '@/store/todoLookUps';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { UploadFileStatus } from 'antd/lib/upload/interface';
import { useGlobalState } from '@/store/global';
import { schemaValidator } from '@/utils/validate';
import MainHeader from '../../MainHeader';
import { useAcademicDepartment } from '@/store/settings/useAcademicDepartment';

const employeeJobHistoryUserType = todoLookUps.getState().employeeJobHistoryUserType;
const employeeJobHistoryDesignation = todoLookUps.getState().employeeJobHistoryDesignation;
const employeeJobHistoryAppointmentType = todoLookUps.getState().employeeJobHistoryAppointmentType;
const employeeJobHistoryAppointmentSubType = todoLookUps.getState().employeeJobHistoryAppointmentSubType;
const employeeJobHistoryParentDepartment = todoLookUps.getState().employeeJobHistoryParentDepartment
const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />
};
const EmployeePositionsList = () => {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [isCurrentlyAppointed, setisCurrentlyAppointed] = React.useState(false)
  const [isHODPosition, setisHODPosition] = React.useState(false)
  const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeJobHistory.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

  const global = useGlobalState((state: any) => state.default);
  const storeAcademicDepartment = useAcademicDepartment((state: any) => ({
    asDepartmentOptions: state.asDepartmentOptions,
    allDepartments: state.comboByName,

  }));
  const storeEmployeeJobHistory = useEmployeeJobHistory((state: any) => ({
    // allRecords: state.allRecords,
    // getRecords: state.getRecords,
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
  }));

  const headerLabel = isNew ? 'Add Job History' : 'Edit Job History';

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const nvaigateToPreviousPage = () => {
    // navigate(`/employee/employee_details/edit/${empId}`, { state: { activeTab: 'job_history' } });
  }

  React.useEffect(() => {
    storeEmployeeJobHistory.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);


  React.useEffect(() => {
    if (storeEmployeeJobHistory.current.id !== id) {
      return;
    }
    console.log('storeAcademicDepartment',storeAcademicDepartment.allDepartments);
    
    form.setFieldsValue(storeEmployeeJobHistory.current);
    if(storeEmployeeJobHistory.current?.appointmentStatus==='active'){
      setisCurrentlyAppointed(true)
    }
  }, [storeEmployeeJobHistory.current]);


  const onChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      console.log(`checked = ${e.target.checked}`);
      setisCurrentlyAppointed(true)
    } else {
      setisCurrentlyAppointed(false)
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
  const onFormSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeEmployeeJobHistory.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.firstName}` });
          }
        }
        else {
          const record = await storeEmployeeJobHistory.updateRecord(id, values);
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
      <MainHeader />
      <Card
        bordered={false}
        title={headerLabel}>
        <Row className='justify-center mt-5'>
          <Col span={12}>
            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
            >
              <Form.Item name="userType" label="User Type" rules={schemaRules} style={{ fontWeight: 'bold' }}>
                <Select onChange={onPositionChange} options={employeeJobHistoryUserType} />
              </Form.Item>
              <Form.Item name="designation" label="Designation" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                <Select onChange={onPositionChange} options={employeeJobHistoryDesignation} />
              </Form.Item>
              <Form.Item name="appointmentType" label="Appointment Type" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                <Select onChange={onPositionChange} options={employeeJobHistoryAppointmentType} />
              </Form.Item>
              <Form.Item name="subType" label="Appointment Sub-Type" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                <Select onChange={onPositionChange} options={employeeJobHistoryAppointmentSubType} />
              </Form.Item>
              <Form.Item name="departmentId" label="Parent Department" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                <Select onChange={onPositionChange} options={storeAcademicDepartment.allDepartments} />
              </Form.Item>

              <Form.Item name="dateOfAppointment" label="Date of Appointment" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                <DatePicker className="w-100%" format={global.displayDateFormat} />
              </Form.Item>
              <Form.Item rules={schemaRules}  name="fromDate" label="Date of Joining / Contract Start Date (in case of contractual basis)" required style={{ fontWeight: 'bold' }}>
                <DatePicker className="w-100%" format={global.displayDateFormat} />
              </Form.Item>
              {isCurrentlyAppointed ? '' :
                <>
                  <Form.Item rules={schemaRules} name="toDate" label="To Date" required style={{ fontWeight: 'bold' }}>
                    <DatePicker className="w-100%" format={global.displayDateFormat} />
                  </Form.Item>

                </>
              }

              <Form.Item name="appointmentDocument" label="Document" getValueFromEvent={getFile} style={{ fontWeight: 'bold' }}>
                <Upload>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item name="appointmentStatus" label="Document" getValueFromEvent={getFile} style={{ fontWeight: 'bold' }}>
              <Checkbox checked={isCurrentlyAppointed} onChange={onChange} style={{ fontWeight: 'bold' }}>Currently Appointed</Checkbox>

              </Form.Item>
              {isCurrentlyAppointed ? '' :
                <>
                  <Row className='mt-4'>
                    <b>"Once the above information is submitted, it cannot be updated or deleted."</b>
                    <Checkbox style={{ fontWeight: 'bold' }}>I confirm to submit the above information.</Checkbox>
                  </Row>


                </>
              }

              <Form.Item className='text-center'>
                <Button className='mt-4' type="primary" onClick={onFormSubmit}>
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

export default EmployeePositionsList;

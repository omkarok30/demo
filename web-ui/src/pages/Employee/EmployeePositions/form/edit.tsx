import React from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Select, DatePicker, Upload, Checkbox, notification, Descriptions } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { isEmptyValue } from '@/utils/object';
import { ColumnsType } from 'antd/lib/table';
import * as modelEmployeePositions from '@/models/Employee/EmployeePositions';
import { useEmployeePositions } from '@/store/employee/useEmployeePositions';
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

const employeePositions = todoLookUps.getState().employeePositions;
const employeePositionsDepartments = todoLookUps.getState().employeePositionsDepartments;


const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />
};
const EmployeePositionsList = () => {
  const { id, empId } = useParams();
  console.log(empId);
  const isNew = id === 'new';
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [isCurrentlyHoldingThisPosition, setIsCurrentlyHoldingThisPosition] = React.useState(false)
  const [isHODPosition, setisHODPosition] = React.useState(false)
  const schemaRules = React.useMemo(() => schemaValidator(modelEmployeePositions.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);
  //const employeePositions = React.useMemo(() => settings.get('employee_positions') || [], [settings]);

  const global = useGlobalState((state: any) => state.default);

  const storePositionsList = useEmployeePositions((state: any) => ({
    // allRecords: state.allRecords,
    // getRecords: state.getRecords,
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
  })); 
  const headerLabel = isNew ? 'Add Positions' : 'Edit Positions';

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };


  React.useEffect(() => {
    storePositionsList.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);


  React.useEffect(() => {
    if (storePositionsList.current.id !== id) {
      return;
    }
    form.setFieldsValue(storePositionsList.current);
    if(storePositionsList.current){
      
      if(storePositionsList.current.status==='active'){
        setIsCurrentlyHoldingThisPosition(true)
      }
    }    

  }, [storePositionsList.current]);

  const nvaigateToPreviousPage = () => {
    navigate(`/employee/employee_details/edit/${empId}`, { state: { activeTab: 'positions' } });
  }
  const onChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setIsCurrentlyHoldingThisPosition(true)
    } else {
      setIsCurrentlyHoldingThisPosition(false)

    }
  };
  const getFile = (e: UploadFileStatus) => {

    if (Array.isArray(e)) {
      return e;
    }
    //  return e && e.fileList;
  };
  const onPositionChange = () => {
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
          const record = await storePositionsList.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.firstName}` });
          }
        }
        else {
          const record = await storePositionsList.updateRecord(id, values);
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
        <Row className='justify-center'>
          <Col span={12}>
            <Form
              form={form}
              layout="vertical"
              autoComplete="off" >
              <Form.Item name="position" label="Position" style={{ fontWeight: 'bold' }} rules={schemaRules} required>
                <Select disabled={!isNew} onChange={onPositionChange} options={employeePositions} />

              </Form.Item>
              {!isHODPosition ? '' :
                <>
                  <Form.Item name="departmentName" label="Department" style={{ fontWeight: 'bold' }} rules={schemaRules} required>
                    <Select onChange={onPositionChange} options={employeePositionsDepartments} />
                  </Form.Item>
                </>
              }
              <Form.Item name="fromDate" label="From" style={{ fontWeight: 'bold' }} rules={schemaRules} required>
                <DatePicker placeholder='START DATE' className="w-100%" format={global.displayDateFormat} />
              </Form.Item>
              <Form.Item name="positionFromDate" label="Upload Document" style={{ fontWeight: 'bold' }} getValueFromEvent={getFile}>
                <Upload>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>

              {isCurrentlyHoldingThisPosition  ? <>
                  <Checkbox checked={isCurrentlyHoldingThisPosition} onChange={onChange} style={{ fontWeight: 'bold' }}>Currently holding this position</Checkbox>
                </> :
                <>
                  <Form.Item rules={schemaRules} style={{ marginTop: '20px', fontWeight: 'bold' }} name="toDate" label="To" required>
                    <DatePicker placeholder='END DATE' className="w-100%" format={global.displayDateFormat} />
                  </Form.Item>

                </>
              }
              <Form.Item className='text-center'>
                <Button className='mt-4' type="primary" >
                  Submit
                </Button>
                <Button onClick={nvaigateToPreviousPage} className='mt-4 ml-3' >
                  Back
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default EmployeePositionsList;

import React from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Select, DatePicker, Upload, Checkbox, notification, Affix } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import * as modelEmployeeJobHistory from '@/models/Employee/EmployeeJobHistory';
import { useEmployeeJobHistory } from '@/store/employee/useEmployeeJobHistory';
import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { todoLookUps } from '@/store/todoLookUps';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { UploadFileStatus } from 'antd/lib/upload/interface';
import { useGlobalState } from '@/store/global';
import { schemaValidator } from '@/utils/validate';
import { isEmptyValue } from '@/utils/object';
const employeePositions = todoLookUps.getState().employeePositions;
const employeePositionsDepartments = todoLookUps.getState().employeePositionsDepartments;


const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />
};
const EmployeeJobHistoryList = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [isCurrentlyHoldingThisPosition, setIsCurrentlyHoldingThisPosition] = React.useState(true)
  const [isHODPosition, setisHODPosition] = React.useState(false)
  const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeJobHistory.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);
  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });

  const global = useGlobalState((state: any) => state.default);

  const storeEmployeeJobHistory = useEmployeeJobHistory((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    addRecord: state.addRecord
  }));



  const navigateToNewForm = () => {
    navigate('/Employee/employee_job_history/edit/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`/Employee/employee_job_history/edit/${record?.id}`, { state: { id: record?.id } });
    }
  };


  React.useEffect(() => {
    fetchSettings();
    storeEmployeeJobHistory.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelEmployeeJobHistory.columns(settings);
    cols.push({
      title: 'Document',
      key: 'action',
      render: (_, record) => [<Button type="link" style={{ backgroundColor: '#2063B0', color: 'white' }}><DownloadOutlined /></Button>],
    });

    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [<Button type="link" style={{ backgroundColor: '#2063B0', color: 'white' }} onClick={() => handleActionClick({ action: 'edit', record })}>View/Update</Button>],
    });
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);
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

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false} >
        <Row justify="start">
          <Col>
            <Button type="primary"
              onClick={navigateToNewForm}>Add New Appointment Details</Button>
          </Col>
        </Row>
        <Row style={{ margin: 10 }}>
          <Col span={24}>
            <Table scroll={{ x: 350 }} bordered columns={columns} dataSource={storeEmployeeJobHistory.allRecords} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default EmployeeJobHistoryList;

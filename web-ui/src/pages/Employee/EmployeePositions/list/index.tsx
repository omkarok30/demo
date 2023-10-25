import React from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Select, DatePicker, Upload, Checkbox, notification, Affix } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

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
import { isEmptyValue } from '@/utils/object';
const employeePositions = todoLookUps.getState().employeePositions;
const employeePositionsDepartments = todoLookUps.getState().employeePositionsDepartments;


const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />
};
const EmployeePositionsList = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [isCurrentlyHoldingThisPosition, setIsCurrentlyHoldingThisPosition] = React.useState(true)
  const [isHODPosition, setisHODPosition] = React.useState(false)
  const schemaRules = React.useMemo(() => schemaValidator(modelEmployeePositions.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);
  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });

  const global = useGlobalState((state: any) => state.default);

  const storeEmployeeDetails = useEmployeePositions((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    addRecord: state.addRecord
  }));


  const navigateToNewForm = () => {
    navigate('/Employee/employee_position/edit/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`/Employee/employee_position/edit/${record?.id}/${id}`, { state: { id: record?.id } });
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeEmployeeDetails.getRecords();
  }, [isHODPosition]);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelEmployeePositions.columns(settings);
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
    console.log(form.getFieldValue('position'));
    if (form.getFieldValue('position') === 'ASSISTANT HEAD OF THE DEPARTMENT') {
      setisHODPosition(true)
    } else {
      setisHODPosition(false)
    }
  };
  const onFormSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });

        const record = await storeEmployeeDetails.addRecord(values);
        if (!isEmptyValue(record)) {
          notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.firstName}` });
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
      <Card
        bordered={false}>
        <Row justify="end">
          <Col>
            <Button type="primary" style={{ backgroundColor: '#2063B0', color: 'white', marginBottom: 10 }} onClick={navigateToNewForm}>Assign Positions</Button>
          </Col>
        </Row>
        <Table scroll={{ x: 350 }} bordered columns={columns} dataSource={storeEmployeeDetails.allRecords} />
      </Card>
    </div>
  );
};

export default EmployeePositionsList;

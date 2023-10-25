import React from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Select, DatePicker, Upload, Checkbox, notification, Affix } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import * as modelEmployeePatentDetails from '@/models/Employee/DetailsOfActivity/PatentDetails/PatentDetails';
import { useEmployeePatentDetails } from '@/store/employee/DetailsOfActivity/PatentDetails/useEmployeePatentDetails';
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
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';
import EmployeePatentDetailsForm from '../form/edit';
import { When } from 'react-if';

const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />
};
const EmployeePatentDetailsList = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [isCurrentlyHoldingThisPosition, setIsCurrentlyHoldingThisPosition] = React.useState(true)
  const [isHODPosition, setisHODPosition] = React.useState(false)
  const schemaRules = React.useMemo(() => schemaValidator(modelEmployeePatentDetails.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);
  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const { empId } = props;
  const global = useGlobalState((state: any) => state.default);

  const storeEmployeePatentDetails = useEmployeePatentDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    addRecord: state.addRecord
  }));

  const storeEmployeeDetails = useEmployeeDetails((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
  }));


  React.useEffect(() => {
    storeEmployeeDetails.getRecord(empId);
    return () => {
      form.setFieldsValue({});
    };
  }, [empId]);

  React.useEffect(() => {
    if (storeEmployeeDetails.current.id !== empId) {
      return;
    }
    form.setFieldsValue(storeEmployeeDetails.current);
  }, [storeEmployeeDetails.current]);

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`/Employee/employee_patent_details/edit/${empId}/${record?.id}`, { state: { id: record?.id } });
    }
    else {
      navigate(`/Employee/employee_patent_details/new`, { state: { action: 'new' } });
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeEmployeePatentDetails.getRecords();
    console.log('storeEmployeePatentDetails', storeEmployeePatentDetails.allRecords)
  }, []);

  const [patentProps, setPatentProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });

  const editdetails = (editid: any) => {
    setPatentProps({
      ...patentProps,
      open: true,
      studentId: `${id}`,
      id: editid,
    });
  };

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelEmployeePatentDetails.columns(settings);
    // cols.push({
    //     title: 'Document',
    //     key: 'action',
    //     render: (_, record) => [<Button type="link" style={{ backgroundColor: '#2063B0', color: 'white' }}><DownloadOutlined /></Button>],
    //   });
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [<Button type="link" style={{ backgroundColor: '#2063B0', color: 'white' }}
        // onClick={() => handleActionClick({ action: 'edit', record })}
        onClick={() => editdetails(`${record?.id}`)}
      >View/Update</Button>],
    });
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  const patentOk = (studentId: string, _values: any) => {
    setPatentProps({ ...patentProps, open: false, id: '', studentId: '' });
  };
  const patentCancel = () => {
    setPatentProps({ ...patentProps, open: false, id: '', studentId: '' });
  };

  return (
    <div className='layout-main-content'>
      <Table scroll={{ x: 350 }} bordered columns={columns} dataSource={storeEmployeePatentDetails.allRecords} />
      <When condition={patentProps.open === true}>
        {() => (
          <EmployeePatentDetailsForm
            {...patentProps}
            handleOk={patentOk}
            handleCancel={patentCancel}
          />
        )}
      </When>
    </div>
  );
};

export default EmployeePatentDetailsList;

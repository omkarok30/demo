import React from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Select, DatePicker, Upload, Checkbox, notification, Affix } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import * as modelDesignAndDevelopment from '@/models/Employee/DetailsOfActivity/DesignAndDevelopmentOfCurriculumDetails/DesignAndDevelopmentOfCurriculumDetails';
import { useDesignAndDevelopment } from '@/store/employee/DetailsOfActivity/DesignAndDevelopment/useDesignAndDevelopment';
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
import { When } from 'react-if';
import EmployeeDesignAndDevelopmentForm from '../form/edit';


const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />
};
const EmployeeDesignAndDevelopmentList = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const schemaRules = React.useMemo(() => schemaValidator(modelDesignAndDevelopment.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);
  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });

  const global = useGlobalState((state: any) => state.default);

  const storeDesignAndDevelopment = useDesignAndDevelopment((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    addRecord: state.addRecord
  }));



  const navigateToNewForm = () => {
    navigate('/Employee/employee_design_development/edit/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`/Employee/employee_design_development/edit/${record?.id}`, { state: { id: record?.id } });
    }
  };

  const [designDevelopmentProps, setDesignDevelopmentProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });

  const designDevelopmentOk = (studentId: string, _values: any) => {
    setDesignDevelopmentProps({ ...designDevelopmentProps, open: false, id: '', studentId: '' });
  };
  const designDevelopmentCancel = () => {
    setDesignDevelopmentProps({ ...designDevelopmentProps, open: false, id: '', studentId: '' });
  };

  const editdetails = (editid: any) => {
    setDesignDevelopmentProps({
      ...designDevelopmentProps,
      open: true,
      studentId: `${id}`,
      id: editid,
    });
  };

  React.useEffect(() => {
    fetchSettings();
    storeDesignAndDevelopment.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelDesignAndDevelopment.columns(settings);
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



  return (
    <div className='layout-main-content'>
      <Table scroll={{ x: 350 }} bordered columns={columns} dataSource={storeDesignAndDevelopment.allRecords} />
      <When condition={designDevelopmentProps.open === true}>
        {() => (
          <EmployeeDesignAndDevelopmentForm
            {...designDevelopmentProps}
            handleOk={designDevelopmentOk}
            handleCancel={designDevelopmentCancel}
          />
        )}
      </When>
    </div>
  );
};

export default EmployeeDesignAndDevelopmentList;

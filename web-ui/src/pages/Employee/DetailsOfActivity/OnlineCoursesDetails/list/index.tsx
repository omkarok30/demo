import React from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Select, DatePicker, Upload, Checkbox, notification, Affix } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import * as modelOnlineCoursesDetails from '@/models/Employee/DetailsOfActivity/OnlineCoursesDetails/OnlineCoursesDetails';
import { useEmployeeOnlineCoursesDetails } from '@/store/employee/DetailsOfActivity/OnlineCoursesDetail/useEmployeeOnlineCoursesDetail';
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
import EmployeeOnlineCoursesDetailsForm from '../form/edit';


const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />
};
const EmployeeOnlineCoursesDetailsList = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [isCurrentlyHoldingThisPosition, setIsCurrentlyHoldingThisPosition] = React.useState(true)
  const [isHODPosition, setisHODPosition] = React.useState(false)
  const schemaRules = React.useMemo(() => schemaValidator(modelOnlineCoursesDetails.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);
  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });

  const global = useGlobalState((state: any) => state.default);

  const storeEmployeeOnlineCoursesDetails = useEmployeeOnlineCoursesDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    addRecord: state.addRecord
  }));



  const navigateToNewForm = () => {
    navigate('/Employee/employee_online_courses_details/edit/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`/Employee/employee_online_courses_details/edit/${record?.id}`, { state: { id: record?.id } });
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeEmployeeOnlineCoursesDetails.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelOnlineCoursesDetails.columns(settings);
    // cols.push({
    //     title: 'Document',
    //     key: 'action',
    //     render: (_, record) => [<Button type="link" style={{ backgroundColor: '#2063B0', color: 'white' }}><DownloadOutlined /></Button>],
    //   });
    cols.push({
      title: 'Document',
      dataIndex: 'uploadDocument',
      render: (_, record) =>
        isEmptyValue(record.uploadDocument)
          ? [
            <span>
              <Button
                type='link'
                onClick={() => {
                  alert('Not provided');
                }}
              >
                NA
              </Button>
            </span>,
          ]
          : [
            <span>
                <a href={record.uploadDocument}>
                    <DownloadOutlined />
                </a>
            </span>,
        ],
    });
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


  const [onlineCourseProps, setOnlineCourseProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });

  const editdetails = (editid: any) => {
    setOnlineCourseProps({
      ...onlineCourseProps,
      open: true,
      studentId: `${id}`,
      id: editid,
    });
  };

  const onlineCourseOk = (studentId: string, _values: any) => {
    setOnlineCourseProps({ ...onlineCourseProps, open: false, id: '', studentId: '' });
  };
  const onlineCourseCancel = () => {
    setOnlineCourseProps({ ...onlineCourseProps, open: false, id: '', studentId: '' });
  };

  return (
    <div className='layout-main-content'>
      <Table scroll={{ x: 350 }} bordered columns={columns} dataSource={storeEmployeeOnlineCoursesDetails.allRecords} />
      <When condition={onlineCourseProps.open === true}>
        {() => (
          <EmployeeOnlineCoursesDetailsForm
            {...onlineCourseProps}
            handleOk={onlineCourseOk}
            handleCancel={onlineCourseCancel}
          />
        )}
      </When>
    </div>
  );
};

export default EmployeeOnlineCoursesDetailsList;

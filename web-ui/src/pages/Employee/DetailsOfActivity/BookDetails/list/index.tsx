import React from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Select, DatePicker, Upload, Checkbox, notification, Affix } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import * as modelEmployeeBookDetails from '@/models/Employee/DetailsOfActivity/BookDetails/BookDetails';
import { useEmployeeBookDetails } from '@/store/employee/DetailsOfActivity/BookDetails/useEmployeeBookDetails';
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
import EmployeeBookDetailsForm from '../form/edit';

const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />
};
const EmployeeBookDetailsList = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { empId } = props;
  const { id } = useParams();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeBookDetails.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

  const storeEmployeeBookDetails = useEmployeeBookDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    addRecord: state.addRecord
  }));


  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`/Employee/employee_book_details/edit/${empId}/${record?.id}`, { state: { id: record?.id } });
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeEmployeeBookDetails.getRecords();
  }, []);

  const [bookProps, setBookProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });

  const editdetails = (editid: any) => {
    setBookProps({
      ...bookProps,
      open: true,
      studentId: `${id}`,
      id: editid,
    });
  };
  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelEmployeeBookDetails.columns(settings);
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

  const bookOk = (studentId: string, _values: any) => {
    setBookProps({ ...bookProps, open: false, id: '', studentId: '' });
  };
  const bookCancel = () => {
    setBookProps({ ...bookProps, open: false, id: '', studentId: '' });
  };

  return (
    <div className='layout-main-content'>
      <Table scroll={{ x: 350 }} bordered columns={columns} dataSource={storeEmployeeBookDetails.allRecords} />
      <When condition={bookProps.open === true}>
        {() => (
          <EmployeeBookDetailsForm
            {...bookProps}
            handleOk={bookOk}
            handleCancel={bookCancel}
          />
        )}
      </When>
    </div>
  );
};

export default EmployeeBookDetailsList;

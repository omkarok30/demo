import React from 'react';
import { Button, Table, Form, } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import * as modelEmployeeSttpDetails from '@/models/Employee/DetailsOfActivity/SttpDetails/SttpDetails';
import { useEmployeeSttpDetails } from '@/store/employee/DetailsOfActivity/SttpDetails/useEmployeeSttpDetails';
import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';
import { When } from 'react-if';
import EmployeeSttpDetailsForm from '../form/edit';
const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />
};
const EmployeeSttpDetailsList = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { empId } = props;
  const { id } = useParams();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeEmployeeSttpDetails = useEmployeeSttpDetails((state: any) => ({
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


  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`/Employee/employee_sttp/edit/${empId}/${record?.id}`, { state: { id: record?.id } });
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeEmployeeSttpDetails.getRecords();
  }, []);

  const [sttpProps, setSttpProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });

  const editdetails = (editid: any) => {
    setSttpProps({
      ...sttpProps,
      open: true,
      studentId: `${id}`,
      id: editid,
    });
  };

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelEmployeeSttpDetails.columns(settings);
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

  const sttpOk = (studentId: string, _values: any) => {
    setSttpProps({ ...sttpProps, open: false, id: '', studentId: '' });
  };
  const sttpCancel = () => {
    setSttpProps({ ...sttpProps, open: false, id: '', studentId: '' });
  };

  return (
    <div className='layout-main-content'>
      <Table scroll={{ x: 350 }} bordered columns={columns} dataSource={storeEmployeeSttpDetails.allRecords} />
      <When condition={sttpProps.open === true}>
        {() => (
          <EmployeeSttpDetailsForm
            {...sttpProps}
            handleOk={sttpOk}
            handleCancel={sttpCancel}
          />
        )}
      </When>

    </div>
  );
};

export default EmployeeSttpDetailsList;

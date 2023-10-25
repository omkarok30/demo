import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { When } from 'react-if';
import EmployeeCorporateTrainingDetailsEdit from '../form/edit';
import * as modelCorporateTrainingDetailsList from '@/models/Employee/DetailsOfActivity/CorporateTrainingDetails/CorporateTrainingDetails';
import { useCorporateTrainingDetailsList } from '@/store/employee/DetailsOfActivity/CorporateTrainingDetails/useCorporateTrainingDetails';

import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { EmployeeAsText } from '@/components/Renderers/EmployeeAsText';
const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />,
};
const CorporateTrainingDetailsList = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const storeCorporateTrainingDetailsList = useCorporateTrainingDetailsList((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`/Employee/employee_corporate_training_details/edit/${record?.id}`, { state: { id: record?.id } });
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeCorporateTrainingDetailsList.getRecords();
  }, []);

  const [corporateTrainingProps, setCorporateTrainingProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });

  const editdetails = (editid: any) => {
    setCorporateTrainingProps({
      ...corporateTrainingProps,
      open: true,
      studentId: `${id}`,
      id: editid,
    });
  };

  const corporateTrainingOk = (studentId: string, _values: any) => {
    setCorporateTrainingProps({ ...corporateTrainingProps, open: false, id: '', studentId: '' });
  };
  const corporateTrainingCancel = () => {
    setCorporateTrainingProps({ ...corporateTrainingProps, open: false, id: '', studentId: '' });
  };

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelCorporateTrainingDetailsList.columns(settings);
    cols.splice(4, 0, {
      dataIndex: 'corporateDetailsEmployee$empIds',
      title: 'Faculty Involved',
      render: (_, record) => [<span><EmployeeAsText value={record.corporateDetailsEmployee$empIds}></EmployeeAsText></span>],

    });
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
                <Row>
                    <Col span={16}>
                        <Button type="primary"
                            // onClick={() => handleActionClick({ action: 'edit', record })}
                            onClick={() => editdetails(`${record?.id}`)}
                        >
                            View/Update
                        </Button>
                    </Col>
                </Row>,
      ],
    });
    // cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  const navigateToNewForm1 = () => {
    // navigate('../edit/new');
    navigate('/Employee/employee_corporate_training_details/edit/new');
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
        <div className='layout-main-content'>
            {open && <Modal style={{ justifyContent: 'center', alignItems: 'center' }} centered
                title="CONFIRMATION"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}>
                <p>Do you wish to continue this transaction?</p>
            </Modal>
            }
            <div style={{ marginTop: 20 }}>
                <Table scroll={{ x: 350 }} bordered columns={columns} dataSource={storeCorporateTrainingDetailsList.allRecords} />
                <When condition={corporateTrainingProps.open === true}>
                    {() => (
                        <EmployeeCorporateTrainingDetailsEdit
                            {...corporateTrainingProps}
                            handleOk={corporateTrainingOk}
                            handleCancel={corporateTrainingCancel}
                        />
                    )}
                </When>
            </div>
        </div>
  );
};

export default CorporateTrainingDetailsList;

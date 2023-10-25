import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { When } from 'react-if';
import EmployeeConsultancyIndustryDetailsEdit from '../form/edit';
import * as modelConsultancyIndustryDetails from '@/models/Employee/DetailsOfActivity/ConsultancyIndustryDetails/ConsultancyIndustryDetails';
import { useConsultancyIndustryDetailsList } from '@/store/employee/DetailsOfActivity/ConsultancyIndustryDetails/useConsultancyIndustryDetails';
import { isEmptyValue } from '@/utils/object';
import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { EmployeeAsText } from '@/components/Renderers/EmployeeAsText';
const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />,
};
const ConsultancyIndustryDetails = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const storeConsultancyIndustryDetails = useConsultancyIndustryDetailsList((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`/Employee/employee_consultancy_industry_details/edit/${record?.id}`, { state: { id: record?.id } });
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeConsultancyIndustryDetails.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelConsultancyIndustryDetails.columns(settings);

    cols.splice(4, 0, {
      dataIndex: 'consultacnyDetailsEmployee$empIds',
      title: 'Faculty Involved',
      render: (_, record) => [<span><EmployeeAsText value={record.consultacnyDetailsEmployee$empIds}></EmployeeAsText></span>],

    });
    cols.push({
      title: 'Document',
      dataIndex: 'consultancyDocument',
      render: (_, record) =>
        isEmptyValue(record.consultancyDocument)
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
                            <a href={record.document}>
                                <DownloadOutlined />
                            </a>
                        </span>,
            ],
    });
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) =>
        [
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
    navigate('/Employee/employee_consultancy_industry_details/edit/new');
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

  const [consultancyIndustryProps, setConsultancyIndustryProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });

  const editdetails = (editid: any) => {
    setConsultancyIndustryProps({
      ...consultancyIndustryProps,
      open: true,
      studentId: `${id}`,
      id: editid,
    });
  };

  const consultancyIndustryOk = (studentId: string, _values: any) => {
    setConsultancyIndustryProps({ ...consultancyIndustryProps, open: false, id: '', studentId: '' });
  };
  const consultancyIndustryCancel = () => {
    setConsultancyIndustryProps({ ...consultancyIndustryProps, open: false, id: '', studentId: '' });
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
                <Table scroll={{ x: 350 }} bordered columns={columns} dataSource={storeConsultancyIndustryDetails.allRecords} />
                <When condition={consultancyIndustryProps.open === true}>
                    {() => (
                        <EmployeeConsultancyIndustryDetailsEdit
                            {...consultancyIndustryProps}
                            handleOk={consultancyIndustryOk}
                            handleCancel={consultancyIndustryCancel}
                        />
                    )}
                </When>
            </div>
        </div>
  );
};

export default ConsultancyIndustryDetails;

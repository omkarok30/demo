import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { When } from 'react-if';
import EmployeeSponsoredResearchDetailsEdit from '../form/edit';
import * as modelSponsoredResearchDetailsList from '@/models/Employee/DetailsOfActivity/SponsoredResearchDetails/SponsoredResearchDetails';
import { useSponsoredResearchDetailsList } from '@/store/employee/DetailsOfActivity/SponsoredResearchDetails/useSponsoredResearchDetails';

import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { EmployeeAsText } from '@/components/Renderers/EmployeeAsText';
const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />,
};
const SponsoredResearchDetailsList = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { empId } = props;
  const { id } = useParams();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const storeSponsoredResearchDetailsList = useSponsoredResearchDetailsList((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`/Employee/employee_sponsored_research_details/edit/${record?.id}`, { state: { id: record?.id } });
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeSponsoredResearchDetailsList.getRecords();
  }, []);

  const [sponsoredProps, setSponsoredProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });

  const editdetails = (editid: any) => {
    setSponsoredProps({
      ...sponsoredProps,
      open: true,
      studentId: `${id}`,
      id: editid,
    });
  };

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelSponsoredResearchDetailsList.columns(settings);

    cols.splice(6, 0, {
      dataIndex: 'sponseredResearchEmployee$empIds',
      title: 'Co-Investigator/s',
      render: (_, record) => [<span><EmployeeAsText value={record.sponseredResearchEmployee$empIds}></EmployeeAsText></span>],

    });
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
                <Row>
                    <Col span={16}>
                        <Button type="primary"
                            //  onClick={() => handleActionClick({ action: 'edit', record })}
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
    navigate('/Employee/employee_sponsored_research_details/edit/new');
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

  const sponsoredOk = (studentId: string, _values: any) => {
    setSponsoredProps({ ...sponsoredProps, open: false, id: '', studentId: '' });
  };
  const sponsoredCancel = () => {
    setSponsoredProps({ ...sponsoredProps, open: false, id: '', studentId: '' });
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
                <Table scroll={{ x: 350 }} bordered columns={columns} dataSource={storeSponsoredResearchDetailsList.allRecords} />
                <When condition={sponsoredProps.open === true}>
                    {() => (
                        <EmployeeSponsoredResearchDetailsEdit
                            {...sponsoredProps}
                            handleOk={sponsoredOk}
                            handleCancel={sponsoredCancel}
                        />
                    )}
                </When>
            </div>
        </div>
  );
};

export default SponsoredResearchDetailsList;

import React, { useState } from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Modal } from 'antd';
import { useNavigate ,useParams} from 'react-router-dom';
import { UploadOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import * as modelEmployeePublicationDetailsList from '@/models/Employee/DetailsOfActivity/PublicationsDetails/PublicationsDetails'
import { usePublicationDetailsList } from '@/store/employee/DetailsOfActivity/PublicationDetails/usePublicationDetails';
import { When } from 'react-if';
import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { attachRenderer } from '@/utils/tableExtras';
const renderers = {
    departmentId: (value: string) => <DepartmentAsText value={value} />
};
import EmployeePublicationDetailsFormEdit from '../form/edit';
const PublicationDetailsList = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const { empId } = props;
    const settings = useSettings((state: any) => state.byKeys);
    const fetchSettings = useSettings((state: any) => state.fetchSettings);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const storeEmployeePublicationDetailsList = usePublicationDetailsList((state: any) => ({
        allRecords: state.allRecords,
        getRecords: state.getRecords,
    }));


    const handleActionClick = ({ action, record }) => {
        if (action === 'edit') {
            navigate(`/Employee/employee_publication_details/edit/${empId}/${record?.id}`, { state: { id: record?.id } });
        }
    };

    React.useEffect(() => {
        fetchSettings();
        storeEmployeePublicationDetailsList.getRecords();
    }, []);

    const [publicationProps, setPublicationProps] = React.useState({
        open: false,
        id: '',
        studentId: '',
    });

    const editdetails = (editid: any) => {
        setPublicationProps({
          ...publicationProps,
          open: true,
          studentId: `${id}`,
          id: editid,
        });
      };

    const columns: ColumnsType<any> = React.useMemo(() => {
        let cols = modelEmployeePublicationDetailsList.columns(settings);
        cols.push({
            title: 'Action',
            key: 'action',
            render: (_, record) => [
                <Row>
                    <Col span={16}>
                        <Button type="primary" 
                        // onClick={() => handleActionClick({ action: 'edit', record })}
                        // onClick={() => {
                        //     setPublicationProps({
                        //       ...publicationProps,
                        //       open: true,
                        //       studentId: `${record?.id}`,
                        //       id: 'new',
                        //       //event: `${urlParam}`,
                        //     });
                        //   }}
                          onClick={() => editdetails(`${record?.id}`)}
                        >
                            View/Update
                        </Button>
                    </Col>
                </Row>
            ],
        });
        //cols = attachRenderer(cols, renderers);
        return cols;
    }, [settings]);


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

   

    const publicationOk = (studentId: string, _values: any) => {
        setPublicationProps({ ...publicationProps, open: false, id: '', studentId: '' });
    };
    const publicationCancel = () => {
        setPublicationProps({ ...publicationProps, open: false, id: '', studentId: '' });
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
                <Table bordered columns={columns} dataSource={storeEmployeePublicationDetailsList.allRecords} scroll={{ x: 350 }} />

                <When condition={publicationProps.open === true}>
                    {() => (
                        <EmployeePublicationDetailsFormEdit
                            {...publicationProps}
                            handleOk={publicationOk}
                            handleCancel={publicationCancel}
                        />
                    )}
                </When>

            </div>
        </div>
    );
};

export default PublicationDetailsList;

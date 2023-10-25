import React, { useState } from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { UploadOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import * as modelMemberAcademicCouncilList from '@/models/Employee/DetailsOfActivity/MemberAcademicCouncilDetails/MemberAcademicCouncilDetails';
import { useMemberAcademicCouncilList } from '@/store/employee/DetailsOfActivity/MemberAcademicCouncilDetails/useMemberAcademicCouncil';

import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { When } from 'react-if';
import EmployeeMemberAcademicCouncilEdit from '../form/edit';
const renderers = {
    departmentId: (value: string) => <DepartmentAsText value={value} />
};
const MemberAcademicCouncilList = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { id } = useParams();
    const settings = useSettings((state: any) => state.byKeys);
    const fetchSettings = useSettings((state: any) => state.fetchSettings);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const storeMemberAcademicCouncilList = useMemberAcademicCouncilList((state: any) => ({
        allRecords: state.allRecords,
        getRecords: state.getRecords,
    }));



    const navigateToNewForm = () => {
        navigate('../edit/new');
    };

    const handleActionClick = ({ action, record }) => {
        if (action === 'edit') {
            navigate(`/Employee/employee_member_academic_council_details/edit/${record?.id}`, { state: { id: record?.id } });
        }
    };

    React.useEffect(() => {
        fetchSettings();
        storeMemberAcademicCouncilList.getRecords();
    }, []);

    const columns: ColumnsType<any> = React.useMemo(() => {
        let cols = modelMemberAcademicCouncilList.columns(settings);
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
                </Row>
            ],
        });
        //cols = attachRenderer(cols, renderers);
        return cols;
    }, [settings]);

    const navigateToNewForm1 = () => {
        //navigate('../edit/new');
        navigate(`/Employee/employee_member_academic_council_details/edit/new`);
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

    const [memberAcademicProps, setMemberAcademicProps] = React.useState({
        open: false,
        id: '',
        studentId: '',
    });

    const editdetails = (editid: any) => {
        setMemberAcademicProps({
            ...memberAcademicProps,
            open: true,
            studentId: `${id}`,
            id: editid,
        });
    };

    const memberAcademicOk = (studentId: string, _values: any) => {
        setMemberAcademicProps({ ...memberAcademicProps, open: false, id: '', studentId: '' });
    };
    const memberAcademicCancel = () => {
        setMemberAcademicProps({ ...memberAcademicProps, open: false, id: '', studentId: '' });
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
                <Table scroll={{ x: 350 }} bordered columns={columns} dataSource={storeMemberAcademicCouncilList.allRecords} />
                <When condition={memberAcademicProps.open === true}>
                    {() => (
                        <EmployeeMemberAcademicCouncilEdit
                            {...memberAcademicProps}
                            handleOk={memberAcademicOk}
                            handleCancel={memberAcademicCancel}
                        />
                    )}
                </When>
            </div>
        </div>
    );
};

export default MemberAcademicCouncilList;

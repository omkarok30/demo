import React, { useState } from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Collapse, Modal, Descriptions, Divider, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import * as modelEmployeeDepartmentLevel from '@/models/Academics/VisionAndMission/DepartmentLevel'
import { useDepartmentLevel } from '@/store/settings/useAcademicsDepartmentLevel';
import { PlusCircleOutlined } from "@ant-design/icons";
import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { schemaValidator } from '@/utils/validate';
import { useInstitute } from '@/store/settings/useInstitute';
import { getDepartmentLevels } from '@/services/settings/departmentLevel';
const { Panel } = Collapse;
const renderers = {
    departmentId: (value: string) => <DepartmentAsText value={value} />
};
import { useAcademicDepartment } from '@/store/settings/useAcademicDepartment';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
const DepartmentLevelList = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const settings = useSettings((state: any) => state.byKeys);
    const fetchSettings = useSettings((state: any) => state.fetchSettings);
    const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeDepartmentLevel.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

    const { departmentLevel, getDepartmentLevels } = useDepartmentLevel((state: any) => ({
        departmentLevel: state.current,
        getDepartmentLevels: state.getDepartmentLevels,
    }));

    React.useEffect(() => {
        getDepartmentLevels();
    }, [getDepartmentLevels]);

    const [openCloneDataModal, setOpenCloneDataModal] = React.useState(false);
    const [openmodal, setopenmodal] = React.useState(false);
    const handleOk = () => {
        setopenmodal(false);
    };

    const handleCancel = () => {
        setopenmodal(false);
    };

    const handleOk1 = () => {
        setOpenCloneDataModal(false);
    };

    const handleCancel1 = () => {
        setOpenCloneDataModal(false);
    };

    const [createVisionMission, setCreateVisionMission] = useState(false);

    const storeAcademicYear = useAcademicYear((state: any) => ({
        asOptions: state.asOptions,
        comboByName: state.comboByName,
    }));

    const optionsAcademicYear = React.useMemo(
        () => storeAcademicYear.comboByName || [],
        [storeAcademicYear.comboByName],
    );


    const handleActionClick = ({ action }) => {
        if (action === 'edit') {
            console.log(JSON.stringify(departmentLevel), "instituteLevelinstituteLevel")
            //navigate(`../edit/${record?.id}`, { state: { id: record?.id } });
            navigate('/Academics/vision_mission/employee_department_level/edit/' + departmentLevel?.id);
        }
    };

    const navigateToNewForm1 = () => {
        navigate('../edit/new');
        //navigate(`/Academics/vision_mission/employee_institute_level/new`);
    };

    const storeAcademicDepartment = useAcademicDepartment((state: any) => ({
        asDepartmentOptions: state.asDepartmentOptions,
        allDepartments: state.comboByName,
        allDepartmentRecords: state.allRecordsByName,

    }));

    React.useMemo(() => storeAcademicDepartment.asDepartmentOptions() || [], []);
    const deptoptions = storeAcademicDepartment.allDepartments;

    console.log(deptoptions, "storeAcademicDepartmentstoreAcademicDepartment")

    const selectDepartmentId = (value: any) => {
        const departmentInfo = storeAcademicDepartment.allDepartmentRecords?.filter((record: any) => record.id === value);
        console.log(departmentInfo, "departmentInfodepartmentInfo")

    };

    return (
        <div className='layout-main-content'>
            <Card
                bordered={true} style={{ marginBottom: 10 }}>
                <Row justify="space-between" style={{ backgroundColor: 'white' }}>
                    <Col>
                        <Button type="text" style={{ fontSize: 15, }}
                            onClick={navigateToNewForm1} ><PlusCircleOutlined />Create Vision & Mission for Academic Year</Button>
                    </Col>
                    <Col>
                        <Button type="text" style={{ color: 'red', fontSize: 15 }}>Note : * Indicates Mandatory Fields</Button>
                    </Col>
                </Row>
            </Card>

            <Card
                bordered={false}
                title="View/Update Vision & Mission">

                <Modal
                    title="Confirmation"
                    open={openmodal}
                    okText={'Confirm'}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} layout="vertical">
                        <h4 style={{ padding: 10, backgroundColor: '#008000', color: 'white' }}>Please confirm, if you wish to Freezed this record?</h4>
                    </Form>
                </Modal>

                <Modal
                    title="Confirmation"
                    open={openCloneDataModal}
                    okText={'Confirm'}
                    cancelText={'Cancel'}
                    onOk={handleOk1}
                    onCancel={handleCancel1}>
                    <Form form={form} layout="vertical">
                        <Form.Item name="passingYear" label="CLONE YEAR" required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                            <Select style={{ textTransform: 'uppercase' }}
                                placeholder="Select a option and change input text above"
                                allowClear
                                options={optionsAcademicYear}
                            />
                        </Form.Item>
                    </Form>
                </Modal>

                <Card bordered={false}
                >
                    <Form form={form} layout="vertical" style={{ borderRadius: 10, borderColor: '#E9CACF', backgroundColor: '#FFFFFF', }}>
                        <Row className='justify-center'>
                            <Col span={12}>
                                <Form.Item name="departmentId" label="Department" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                                    <Select options={storeAcademicDepartment.allDepartments?.filter((record: any) => record.value !== '1')} onChange={selectDepartmentId}
                                        placeholder={'SELECT DEPARTMENT'} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form form={form} layout="vertical" style={{ borderRadius: 10, borderColor: '#E9CACF', backgroundColor: '#FFFFFF', }}>

                            <Row className="justify-center mt-5" style={{ backgroundColor: '#F2DEDE', borderRadius: 5, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Col span={4} style={{ justifyContent: 'center', marginTop: 10 }}>
                                    <p style={{ alignItems: 'center', marginLeft: 20, color: '#A94442', fontWeight: 'bold' }}>{departmentLevel.fromYear}</p>
                                </Col>
                                <Col span={4} style={{ justifyContent: 'center', marginTop: 10 }}>
                                    <p className='w-md' style={{ color: '#A94442', fontWeight: 'bold' }}>to</p>
                                </Col>
                                <Col span={4} style={{ justifyContent: 'center', marginTop: 10 }}>
                                    <p style={{ color: '#A94442', fontWeight: 'bold' }}>{'Present'}</p>
                                </Col>
                                <Col span={12} style={{ justifyContent: 'center', }}>
                                    <Button className="md" type="primary" size='small'
                                        onClick={navigateToNewForm1} >
                                        Create New
                                    </Button>
                                    <Button className="md" type="primary" size='small' style={{ marginLeft: 10, backgroundColor: '#008000' }}
                                        onClick={() => { setOpenCloneDataModal(true) }}>
                                        Clone Information
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                        <Row className="justify-center mt-5" style={{ backgroundColor: '#F2DEDE', borderRadius: 5, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Col span={4} style={{ justifyContent: 'center', marginTop: 10 }}>
                                <p style={{ alignItems: 'center', marginLeft: 20, color: '#A94442', fontWeight: 'bold' }}>{departmentLevel.fromYear}</p>
                            </Col>
                            <Col span={4} style={{ justifyContent: 'center', marginTop: 10 }}>
                                <p className='w-md' style={{ color: '#A94442', fontWeight: 'bold' }}>to</p>
                            </Col>
                            <Col span={4} style={{ justifyContent: 'center', marginTop: 10 }}>
                                <p style={{ color: '#A94442', fontWeight: 'bold' }}>{departmentLevel.toYear}</p>
                            </Col>
                            <Col span={12} style={{ justifyContent: 'center', }}>
                                <Button className="md" type="primary" size='small'
                                    onClick={() => handleActionClick({ action: 'edit' })} >
                                    Update
                                </Button>
                                <Button className="md" type="primary" size='small' style={{ marginLeft: 10 }}
                                    onClick={() => { setopenmodal(true) }}>
                                    Freeze
                                </Button>
                            </Col>
                        </Row>
                        <div style={{ borderRadius: 2, borderColor: 'red', borderBlock: 1 }}>
                            <Descriptions layout='vertical' column={1} colon={false} style={{ borderBottomWidth: 1, borderColor: 'red' }}>
                                <Descriptions.Item label="Vision" labelStyle={{ fontWeight: 'bold', flex: 1, backgroundColor: '#F5F5F5', padding: 10, borderRadius: 1 }} contentStyle={{ fontWeight: 'bold', marginLeft: 10, borderWidth: 1 }}>
                                    {departmentLevel.vision}
                                </Descriptions.Item>
                            </Descriptions>

                            <h4 style={{ padding: 10, fontWeight: 'bold', }}>Approved In: {departmentLevel.approveVision}</h4>
                            <Col span={24} style={{ backgroundColor: '#E9D9D9' }}>
                            </Col>
                            <Descriptions layout='vertical' column={1} colon={false} style={{ borderBottomWidth: 1, borderColor: 'red', marginTop: 10 }}>
                                <Descriptions.Item label="Mission" labelStyle={{ fontWeight: 'bold', flex: 1, backgroundColor: '#F5F5F5', padding: 10 }} contentStyle={{ fontWeight: 'bold', marginLeft: 10, borderWidth: 1 }}>
                                    {departmentLevel.mision}
                                </Descriptions.Item>
                            </Descriptions>
                            <h4 style={{ padding: 10, fontWeight: 'bold', }}>Approved In: {departmentLevel.approveMision}</h4>
                            <Col span={24} style={{ backgroundColor: '#E9D9D9' }}>
                            </Col>
                            <Descriptions layout='vertical' column={1} colon={false} style={{ borderBottomWidth: 1, borderColor: 'red', marginTop: 10 }}>
                                <Descriptions.Item label="Mission Components:" labelStyle={{ fontWeight: 'bold', flex: 1, backgroundColor: '#F5F5F5', padding: 10 }} contentStyle={{ fontWeight: 'bold', marginLeft: 10, borderWidth: 1 }}>
                                    M1: MISSION
                                </Descriptions.Item>
                            </Descriptions>
                            <Row justify="start">
                                <Col>
                                    <h4 style={{ padding: 10, fontWeight: 'bold', }}>File: <Button className="md" type="ghost" size='small' style={{ marginLeft: 10 }}
                                    //onClick={() => handleActionClick({ action: 'edit' })}
                                    >
                                        {departmentLevel.momDocument == '' ? 'NA' : departmentLevel.momDocument}
                                    </Button></h4>

                                </Col>
                            </Row>
                        </div>
                        <Row className="justify-center">
                            <Button type="primary" style={{ backgroundColor: '#008000' }}>
                                Download Report
                            </Button>
                        </Row>
                    </Form>
                </Card>
                {/* <Table bordered columns={columns} dataSource={storeEmployeeInstituteLevel.allRecords} /> */}
            </Card>
        </div >
    );
};

export default DepartmentLevelList;

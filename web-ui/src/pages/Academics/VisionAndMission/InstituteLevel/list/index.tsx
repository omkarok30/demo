import React, { useState } from 'react';
import { Button, Card, Col, Row, Form, Collapse, Descriptions, Modal, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as modelEmployeeInstituteLevel from '@/models/Academics/VisionAndMission/InstituteLevel'
import { useInstituteLevel } from '@/store/settings/useAcademicsInstituteLevel';
import { PlusCircleOutlined } from "@ant-design/icons";
import { useSettings } from '@/store/settings/useSettings';
import CreateVisionMissionForm from '../CreateVisionMission';
import { schemaValidator } from '@/utils/validate';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
const { Panel } = Collapse;

const InstituteLevelList = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const settings = useSettings((state: any) => state.byKeys);
    const fetchSettings = useSettings((state: any) => state.fetchSettings);
    const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeInstituteLevel.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

    const { instituteLevel, getInstituteLevels } = useInstituteLevel((state: any) => ({
        instituteLevel: state.current,
        getInstituteLevels: state.getInstituteLevels,
    }));

    React.useEffect(() => {
        getInstituteLevels();
    }, [getInstituteLevels]);

    const [createVisionMission, setCreateVisionMission] = useState(false);

    const handleActionClick = ({ action }) => {
        if (action === 'edit') {
            //navigate(`../edit/${record?.id}`, { state: { id: record?.id } });
            navigate('/Academics/vision_mission/employee_institute_level/edit/' + instituteLevel?.id);
        }
    };

    const navigateToNewForm1 = () => {
        navigate('../edit/new');
        //navigate(`/Academics/vision_mission/employee_institute_level/new`);
    };

    const storeAcademicYear = useAcademicYear((state: any) => ({
        asOptions: state.asOptions,
        comboByName: state.comboByName,
    }));

    const optionsAcademicYear = React.useMemo(
        () => storeAcademicYear.comboByName || [],
        [storeAcademicYear.comboByName],
    );

    const [openmodal, setopenmodal] = React.useState(false);
    const [openCloneDataModal, setOpenCloneDataModal] = React.useState(false);
    const showModal = () => {
        setopenmodal(true);
    };

    const handleOk1 = () => {
        setOpenCloneDataModal(false);
    };

    const handleCancel1 = () => {
        setOpenCloneDataModal(false);
    };

    const handleOk = () => {
        setopenmodal(false);
    };

    const handleCancel = () => {
        setopenmodal(false);
    };

    return (
        <div className='layout-main-content'>
            <Card
                bordered={false}
                title="Vision & Mission - Institute Level">

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
                    title="Select Year to Clone the Data"
                    open={openCloneDataModal}
                    okText={'Proceed'}
                    cancelText={'Close'}
                    onOk={handleOk1}
                    onCancel={handleCancel1}
                >
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


                {createVisionMission && <div className="w">
                    <Collapse
                        defaultActiveKey={["1"]}
                        //onChange={onChange}
                        expandIcon={({ isActive }) =>
                            isActive ? <PlusCircleOutlined /> : <PlusCircleOutlined />
                        } >
                        <Panel header="Create Vision & Mission For Academic Year" key="1">
                            <CreateVisionMissionForm />
                        </Panel>
                    </Collapse>
                </div>
                }
                <Card bordered={false}
                    title="View/Update Vision & Mission">

                    <Form form={form} layout="vertical" style={{ borderRadius: 10, borderColor: '#E9CACF', backgroundColor: '#FFFFFF', }}>

                        <Row className="justify-center mt-5" style={{ backgroundColor: '#F2DEDE', borderRadius: 5, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Col span={4} style={{ justifyContent: 'center', marginTop: 10 }}>
                                <p style={{ alignItems: 'center', marginLeft: 20, color: '#A94442', fontWeight: 'bold' }}>{instituteLevel.fromYear}</p>
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

                    <Form form={form} layout="vertical" style={{ borderRadius: 10, borderColor: '#E9CACF', backgroundColor: '#FFFFFF', }}>

                        <Row className="justify-center mt-5" style={{ backgroundColor: '#F2DEDE', borderRadius: 5, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Col span={4} style={{ justifyContent: 'center', marginTop: 10 }}>
                                <p style={{ alignItems: 'center', marginLeft: 20, color: '#A94442', fontWeight: 'bold' }}>{instituteLevel.fromYear}</p>
                            </Col>
                            <Col span={4} style={{ justifyContent: 'center', marginTop: 10 }}>
                                <p className='w-md' style={{ color: '#A94442', fontWeight: 'bold' }}>to</p>
                            </Col>
                            <Col span={4} style={{ justifyContent: 'center', marginTop: 10 }}>
                                <p style={{ color: '#A94442', fontWeight: 'bold' }}>{instituteLevel.toYear}</p>
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
                                    {instituteLevel.vision}
                                </Descriptions.Item>
                            </Descriptions>

                            <h4 style={{ padding: 10, fontWeight: 'bold', }}>Approved In: {instituteLevel.approveVision}</h4>
                            <Col span={24} style={{ backgroundColor: '#E9D9D9' }}>
                            </Col>
                            <Descriptions layout='vertical' column={1} colon={false} style={{ borderBottomWidth: 1, borderColor: 'red', marginTop: 10 }}>
                                <Descriptions.Item label="Mission" labelStyle={{ fontWeight: 'bold', flex: 1, backgroundColor: '#F5F5F5', padding: 10 }} contentStyle={{ fontWeight: 'bold', marginLeft: 10, borderWidth: 1 }}>
                                    {instituteLevel.mision}
                                </Descriptions.Item>
                            </Descriptions>
                            <h4 style={{ padding: 10, fontWeight: 'bold', }}>Approved In: {instituteLevel.approveMision}</h4>
                            <Col span={24} style={{ backgroundColor: '#E9D9D9' }}>
                            </Col>
                            <Descriptions layout='vertical' column={1} colon={false} style={{ borderBottomWidth: 1, borderColor: 'red', marginTop: 10 }}>
                                <Descriptions.Item label="Mission Components:" labelStyle={{ fontWeight: 'bold', flex: 1, backgroundColor: '#F5F5F5', padding: 10 }} contentStyle={{ fontWeight: 'bold', marginLeft: 10, borderWidth: 1 }}>
                                    M1: MISSION
                                </Descriptions.Item>
                            </Descriptions>
                            <Row justify="end">
                                <Col>
                                    <h4 style={{ padding: 10, fontWeight: 'bold', }}>MoM File: <Button className="md" type="ghost" size='small' style={{ marginLeft: 10 }}
                                    //onClick={() => handleActionClick({ action: 'edit' })}
                                    >
                                        {instituteLevel.momDocument == '' ? 'NA' : instituteLevel.momDocument}
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

export default InstituteLevelList;

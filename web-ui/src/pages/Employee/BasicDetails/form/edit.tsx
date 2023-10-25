import React from 'react';
import { useParams } from 'react-router-dom';
import { Affix, Button, Card, Checkbox, Col, Form, Input, Radio, Row, Select, notification, Tabs, Descriptions, Tag } from 'antd';
import { When } from 'react-if';
import Meta from 'antd/lib/card/Meta';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';
import { todoLookUps } from '@/store/todoLookUps';
import { useSettings } from '@/store/settings/useSettings';
import * as modelEmployeeDetails from '@/models/Employee/EmployeeDetails';
const yesNo = todoLookUps.getState().yesNo;
const gender = todoLookUps.getState().gender;
const salutation = todoLookUps.getState().salutation;
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';
const BasicDetails = () => {
    const { id } = useParams();
    const isNew = id === 'new';
    const global = useGlobalState((state: any) => state.default);
    const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
    const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeDetails.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);
    const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
    const [form] = Form.useForm();

    const storeEmployeeDetails = useEmployeeDetails(
        (state: any) => ({
            getRecord: state.getRecord,
            current: state.current,
            addRecord: state.addRecord,
            updateRecord: state.updateRecord,
        }),
    );

    const onFormSubmit = () => {
        form.validateFields()
            .then(async (values) => {
                setSaveProgress({ ...saveProgress, disableSubmit: true });
                if (isNew) {
                    const record = await storeEmployeeDetails.addRecord(values);
                    if (!isEmptyValue(record)) {
                        notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.firstName}` });
                    }
                }
                else {
                    const record = await storeEmployeeDetails.updateRecord(id, values);
                    if (!isEmptyValue(record)) {
                        notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.firstName}` });
                    }
                }
                setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
            })
            .catch(() => {
                notification.error({ message: 'Validations failed' });
                setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
            });
    };

    return (
        <div>
            <Row className="justify-center">
                <Col className='w-md'>
                    <>
                        <Form.Item name="salutation" label="Salutation" style={{ fontWeight: 'bold' }} rules={[{ required: true }]}>
                            <Select style={{ textTransform: 'uppercase' }}
                                placeholder="Select a option and change input text above"
                                allowClear
                                options={salutation}
                            />
                        </Form.Item>
                        <Form.Item name="firstName" label="First Name" style={{ fontWeight: 'bold' }} rules={schemaRules} required>
                            <Input />
                        </Form.Item>
                        <Form.Item name="middleName" label="Middle Name" style={{ fontWeight: 'bold' }} rules={schemaRules} >
                            <Input />
                        </Form.Item>
                        <Form.Item name="lastName" label="Last Name" style={{ fontWeight: 'bold' }} rules={schemaRules} required>
                            <Input />
                        </Form.Item>
                        <Form.Item name="gender" label="Gender" style={{ fontWeight: 'bold' }} rules={[{ required: true }]}>
                            <Select style={{ textTransform: 'uppercase' }}
                                placeholder="Select a option and change input text above"
                                allowClear
                                options={gender}
                            />
                        </Form.Item>
                        <Form.Item name="mobile" label="Mobile Number" style={{ fontWeight: 'bold' }} rules={schemaRules} required >
                            <Input style={{ textTransform: 'uppercase' }}
                                maxLength={10}
                            />
                        </Form.Item>
                        <Form.Item name="altMobile" label="Alternate Mobile Number" style={{ fontWeight: 'bold' }} rules={schemaRules} >
                            <Input style={{ textTransform: 'uppercase' }}
                                maxLength={10} />
                        </Form.Item>
                        <Form.Item name="personalEmail" label="Personal Email Id" style={{ fontWeight: 'bold' }} rules={schemaRules} required>
                            <Input style={{ textTransform: 'uppercase' }}
                            />
                        </Form.Item>
                        <Form.Item name="email" label="Official Email Id" style={{ fontWeight: 'bold' }} rules={schemaRules} >
                            <Input style={{ textTransform: 'uppercase' }} />
                        </Form.Item>

                    </>
                    <Card bordered={false}>
                        <Affix offsetBottom={12}>
                            <Form.Item>
                                <Button type="primary"
                                    onClick={onFormSubmit}
                                    disabled={saveProgress.disableSubmit}
                                    loading={saveProgress.saving}>
                                    Update
                                </Button>
                            </Form.Item>
                        </Affix>
                    </Card>
                </Col>
            </Row>
        </div>
    )
};

export default BasicDetails;

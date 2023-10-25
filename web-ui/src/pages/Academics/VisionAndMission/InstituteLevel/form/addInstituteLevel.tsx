import React from 'react';
import { useParams } from 'react-router-dom';
import { Affix, Button, Card, Checkbox, Col, Form, Input, Descriptions, Radio, Row, Select, notification } from 'antd';
import { When } from 'react-if';

import * as modelEmployeeInstituteLevel from '@/models/Academics/VisionAndMission/InstituteLevel';
import { useSettings } from '@/store/settings/useSettings';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';
import { todoLookUps } from '@/store/todoLookUps';
import { useInstituteLevel } from '@/store/settings/useAcademicsInstituteLevel';

const AddInstituteLevel = () => {
    const { id } = useParams();
    const isNew = id !== 'new';

    const global = useGlobalState((state: any) => state.default);
    const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
    const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeInstituteLevel.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

    const storeEmployeeInstituteLevel = useInstituteLevel(
        (state: any) => ({
            current: state.current,
            getInstituteLevels: state.getInstituteLevels,
            updateRecord: state.updateRecord,
            addRecord: state.addRecord
        }),
    );

    const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
    const [form] = Form.useForm();

    React.useEffect(() => {
        storeEmployeeInstituteLevel.getInstituteLevels(id);
        return () => {
            form.setFieldsValue({});
        };
    }, [id]);

    React.useEffect(() => {
        if (storeEmployeeInstituteLevel.current.id !== id) {
            return;
        }
        form.setFieldsValue(storeEmployeeInstituteLevel.current);
    }, [storeEmployeeInstituteLevel.current]);

    const onFormSubmit = () => {
        form.validateFields()
            .then(async (values) => {
                setSaveProgress({ ...saveProgress, disableSubmit: true });
                if (isNew) {
                    const record = await storeEmployeeInstituteLevel.addRecord(values);
                    if (!isEmptyValue(record)) {
                        notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.bankName}` });
                    }
                }
                else {
                    const record = await storeEmployeeInstituteLevel.updateRecord(id, values);
                    if (!isEmptyValue(record)) {
                        notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.bankName}` });
                    }
                }
                setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
            })
            .catch(() => {
                notification.error({ message: 'Validations failed' });
                setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
            });
    };


    const headerLabel = isNew ? 'Add program' : 'Edit Program';

    return (<div className='layout-main-content'>
        <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
            <Card
                bordered={false}
            // actions={[
            //     <Affix offsetBottom={12}>
            //         <Form.Item>
            //             <Button type="primary"
            //                 //onClick={onFormSubmit} 
            //                 disabled={saveProgress.disableSubmit} loading={saveProgress.saving}>
            //                 Submit
            //             </Button>
            //         </Form.Item>
            //     </Affix>,
            // ]}
            >
                <Row className="justify-center">
                    <Col className='w-md'>
                        <When condition={isNew}>
                            <Descriptions layout="horizontal">
                                <Descriptions.Item label="ACADEMIC YEAR" contentStyle={{ fontWeight: 'bold', color: 'black' }} labelStyle={{ fontWeight: 'bold' }} >{storeEmployeeInstituteLevel.current.fromYear}  to  {storeEmployeeInstituteLevel.current.toYear}</Descriptions.Item>
                            </Descriptions>
                            <Form.Item label="VISION" rules={schemaRules} required>
                                <Input.TextArea rows={3} />
                            </Form.Item>
                            <Descriptions layout="horizontal">
                                <Descriptions.Item label="APPROVED IN" contentStyle={{ fontWeight: 'bold', color: 'black' }} labelStyle={{ fontWeight: 'bold' }} >{storeEmployeeInstituteLevel.current.approveVision}</Descriptions.Item>
                            </Descriptions>
                            <Form.Item label="MISSION" rules={schemaRules} required>
                                <Input.TextArea rows={3} />
                            </Form.Item>
                            <Descriptions layout="horizontal">
                                <Descriptions.Item label="APPROVED IN" contentStyle={{ fontWeight: 'bold', color: 'black' }} labelStyle={{ fontWeight: 'bold' }} >{storeEmployeeInstituteLevel.current.approveVision}</Descriptions.Item>
                            </Descriptions>
                            <Form.Item label="MISSION COMPONENT" rules={schemaRules} required>
                                <Input.TextArea rows={3} />
                            </Form.Item>
                            <Row className="justify-center">
                                <Form.Item>
                                    <Button type="primary"
                                        //onClick={onFormSubmit} 
                                        disabled={saveProgress.disableSubmit} loading={saveProgress.saving}>
                                        Confirm
                                    </Button>
                                </Form.Item>
                                <Form.Item style={{ marginLeft: 10 }}>
                                    <Button type="primary"
                                        //onClick={onFormSubmit} 
                                        disabled={saveProgress.disableSubmit} loading={saveProgress.saving}>
                                        Cancel
                                    </Button>
                                </Form.Item>
                            </Row>
                        </When>
                    </Col>
                </Row>
            </Card>
        </Form>
    </div>);
};

export default AddInstituteLevel;

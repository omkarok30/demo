import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Affix, Button, Card, Checkbox, Col, Form, Input, Radio, RadioChangeEvent, Modal, Row, Upload, Select, notification, Tabs, Descriptions, Tag } from 'antd';
import { When } from 'react-if';
import Meta from 'antd/lib/card/Meta';
import * as modelEmployeeAchievement from '@/models/Employee/EmployeeAchievement';
import { useSettings } from '@/store/settings/useSettings';
import { useEmployeeAchievement } from '@/store/employee/useAchievement';
import { UploadOutlined } from '@ant-design/icons';
import * as modelEmployeeInstituteLevel from '@/models/Academics/VisionAndMission/InstituteLevel'
import { useInstituteLevel } from '@/store/settings/useAcademicsInstituteLevel';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';
import { todoLookUps } from '@/store/todoLookUps';
const yesNo = todoLookUps.getState().yesNo;
const gender = todoLookUps.getState().gender;
const salutation = todoLookUps.getState().salutation;
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
const levelOfEducation = todoLookUps.getState().levelOfEducation;
const graduationYear = todoLookUps.getState().graduationYear;
const level = todoLookUps.getState().level;
const academicYear = todoLookUps.getState().academicYear;
import { UploadFileStatus } from 'antd/lib/upload/interface';
import MainHeader from '../../../../Employee/MainHeader';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import AddInstituteLevel from './addInstituteLevel';
const EmployeeInstituteLevelFormEdit = () => {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const [showInstituteLevelModal, setShowInstituteLevelModal] = useState<boolean>(false);
  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
  const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeInstituteLevel.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);
  const renderers = {
    departmentId: (value: string) => <DepartmentAsText value={value} />
  };
  const [addMissionCompo, setAddMissionCompo] = useState([''])
  const [currentVision, setCurrentVision] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [form] = Form.useForm();
  const [isAdditionalDivision, setIsAdditionalDivision] = React.useState(1);
  const storeEmployeeInstituteLevel = useInstituteLevel(
    (state: any) => ({
      current: state.current,
      getInstituteLevels: state.getInstituteLevels,
      updateRecord: state.updateRecord,
    }),
  );

  const storeAcademicYear = useAcademicYear((state: any) => ({
    getAcademicYearDetails: state.getAcademicYearDetails,
    comboByName: state.comboByName,
  }));

  const optionsAcademicYear = storeAcademicYear.comboByName;

  const getYearLabel = (data) => {
    let label = '';
    optionsAcademicYear.forEach(element => {
      if (element.value === data) {
        label = element.label;
      }
    });
    return label;
  }
  React.useEffect(() => {
    storeAcademicYear.getAcademicYearDetails();
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

    if (storeEmployeeInstituteLevel.current) {

      if (storeEmployeeInstituteLevel.current.toYear) {
        setCurrentVision(true)
      }
    }

  }, [storeEmployeeInstituteLevel.current]);


  const headerLabel = isNew ? 'Create Vision & Mission for Academic Year' : null;

  const getFile = (e: UploadFileStatus) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    //  return e && e.fileList;
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setIsAdditionalDivision(e.target.value);
  };

  const nvaigateToPreviousPage = () => {
    navigate(`/Academics/vision_mission/employee_institute_level/list`);
  }


  const onFormSubmit = () => {
    console.log(showInstituteLevelModal, "showInstituteLevelModal")
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          // const record = await storeEmployeeQualificationDetails.addRecord(values);
          // if (!isEmptyValue(record)) {
          //   notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.firstName}` });
          // }
          setShowInstituteLevelModal(true)
        }
        else {
          //setShowInstituteLevelModal(true)
          // const record = await storeEmployeeQualificationDetails.updateRecord(id, values);
          // if (!isEmptyValue(record)) {
          //   notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.firstName}` });
          // }
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      });
  };


  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title={headerLabel}
      >
        <Row className='justify-center'>
          <Col span={12}>
            <When condition={!isNew}>
              {() => (<>
                <Form
                  form={form}
                  layout="vertical"
                  autoComplete="off" >
                  <Form.Item name="fromYear" label="From Year" rules={schemaRules} style={{ fontWeight: 'bold' }}>
                    <Input bordered={false} />
                  </Form.Item>
                  <Form.Item name="toYear" label="To Year" rules={schemaRules} style={{ fontWeight: 'bold' }}>
                    <Input bordered={false} />
                  </Form.Item>
                  <Form.Item name="vision" label="Vision" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <Input.TextArea placeholder='ENTER VISION' rows={3} />
                  </Form.Item>
                  <Form.Item name="approveVision" label="Approved In" rules={schemaRules} style={{ fontWeight: 'bold' }}>
                    <Input />
                  </Form.Item>

                  <Form.Item name="mision" label="Mission" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <Input.TextArea placeholder='ENTER MISSION' rows={3} />
                  </Form.Item>
                  <Form.Item name="approveMision" label="Approved In" style={{ fontWeight: 'bold' }}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="isMissionComponent" label="Mission Component" style={{ fontWeight: 'bold' }}
                    rules={[{ required: true, message: "Please select an option!" }]}
                  >
                    {/* <Radio.Group>
                      <Radio value='yes'>Yes</Radio>
                      <Radio value='no'>No</Radio>

                    </Radio.Group> */}
                  </Form.Item>
                  <Form.Item label="M1:" required style={{ fontWeight: 'bold' }}>
                    <Input.TextArea placeholder='ENTER MISSION COMPONENT' rows={3} />
                  </Form.Item>
                  <Form.Item name="momDocument" label="Upload MoM" getValueFromEvent={getFile} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Upload>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>

                  <Form.Item className='text-center' style={{ fontWeight: 'bold', marginTop: 10 }}>
                    <Button className='mt-4' type="primary" >
                      Submit
                    </Button>
                    <Button className='mt-4' type="ghost" style={{ marginLeft: 10 }} onClick={nvaigateToPreviousPage}>
                      Back
                    </Button>
                  </Form.Item>
                </Form>
              </>
              )
              }
            </When>
            <When condition={isNew}>
              <Form
                form={form}
                layout="vertical"
                autoComplete="off" >
                <Form.Item name="fromYear" label="From Year" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                  <Select
                    //onChange={handleChange}
                    options={optionsAcademicYear} />
                </Form.Item>
                <Form.Item name="vision" label="Vision" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                  <Input.TextArea placeholder='ENTER VISION' rows={3} style={{ textTransform: 'uppercase' }} />
                </Form.Item>
                <Form.Item name="approveVision" label="Approved In" rules={schemaRules} style={{ fontWeight: 'bold' }}>
                  <Input style={{ textTransform: 'uppercase' }} />
                </Form.Item>

                <Form.Item name="mision" label="Mission" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                  <Input.TextArea placeholder='ENTER MISSION' rows={3} style={{ textTransform: 'uppercase' }} />
                </Form.Item>
                <Form.Item name="approveMision" label="Approved In" style={{ fontWeight: 'bold' }}>
                  <Input style={{ textTransform: 'uppercase' }} />
                </Form.Item>
                <Form.Item
                  name="isMissionComponent" label="Mission Component" style={{ fontWeight: 'bold' }}
                // rules={[{ required: true, message: "Please select an option!" }]}
                >
                  <Radio.Group onChange={onChange} value={isAdditionalDivision} >
                    <Radio value={1}>Yes</Radio>
                    <Radio value={''}>No</Radio>
                  </Radio.Group>
                </Form.Item>
                {isAdditionalDivision && addMissionCompo.map((item, inde) => {
                  return (
                    <div>
                      <Form.Item label={`M${inde + 1}`} required style={{ fontWeight: 'bold' }}>
                        <Input.TextArea placeholder='ENTER MISSION COMPONENT' rows={3} style={{ textTransform: 'uppercase' }} />
                      </Form.Item>

                    </div>
                  )
                })}
                <Row>
                  {isAdditionalDivision && <Row style={{ marginBottom: 20 }}>
                    <Col>
                      <Button type="primary" size='small' style={{ backgroundColor: '#008000' }}
                        onClick={() => {
                          setAddMissionCompo([...addMissionCompo, ''])
                        }}>ADD MISSION COMPONENT</Button>
                    </Col>
                  </Row>
                  }
                  {addMissionCompo.length > 1 && <Col style={{ marginLeft: 10, marginBottom: 20 }}>
                    <Button danger type="primary" size='small' style={{ backgroundColor: '#C41016' }}
                      onClick={() => {
                        const newArray = addMissionCompo.filter((i, j) => {
                          return addMissionCompo.length !== j
                        })
                        setAddMissionCompo(newArray)
                        newArray.pop()
                      }}>REMOVE</Button>
                  </Col>
                  }
                </Row>

                <Form.Item name="momDocument" label="Upload MoM" getValueFromEvent={getFile} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Upload>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>

                <div style={{ margin: 10 }}>
                  <Checkbox checked={currentVision}
                    onChange={e => setCurrentVision(e.target.checked)}
                  ><h4>Vision and Mission is same till current Academic Year</h4></Checkbox>
                </div>

                {currentVision == false && <Form.Item name="toYear" label="To Year" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                  <Select
                    //onChange={handleChange}
                    options={optionsAcademicYear} />
                </Form.Item>
                }
                <h4>"Once the above information is submitted, it cannot be updated or deleted."</h4>
                <div style={{ margin: 10 }}>
                  <Checkbox checked={confirm}
                    onChange={e => setConfirm(e.target.checked)}
                  // onChange={e => setIsSame(e.target.checked)} checked={isSame}
                  // onChange={onChange}
                  ><h4>I confirm to submit the above information.</h4></Checkbox>
                </div>

                <Form.Item className='text-center' style={{ fontWeight: 'bold', marginTop: 10 }}>
                  <Button className='mt-4' type="primary"
                    //onClick={onFormSubmit}
                    onClick={() => {
                      //setShowInstituteLevelModal(true)
                      confirm == true ? onFormSubmit() : alert("Please fill all required fields data")
                    }}
                  >

                    Proceed
                  </Button>
                  <Button className='mt-4' type="ghost" style={{ marginLeft: 10 }} onClick={nvaigateToPreviousPage}>
                    Back
                  </Button>
                </Form.Item>
              </Form>
            </When>
          </Col>
        </Row>
      </Card>
      <Modal title="Institute Vision Mission Confirmation"
        okText={'Confirm'}
        cancelText={'Cancel'}
        open={showInstituteLevelModal} onOk={() => {
          setShowInstituteLevelModal(false);
        }} onCancel={() => {
          setShowInstituteLevelModal(false);
        }}>
        {/* <AddInstituteLevel /> */}
        <div className='layout-main-content'>
          <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
            <Card bordered={false}>
              <Row className="justify-center">
                <Col className='w-md'>
                  <Descriptions layout="horizontal">
                    <Descriptions.Item label="ACADEMIC YEAR" contentStyle={{ fontWeight: 'bold', color: 'black' }} labelStyle={{ fontWeight: 'bold' }} >
                      {getYearLabel(form.getFieldValue('fromYear'))}  to
                      {currentVision ? ' PRESENT' : ' ' + getYearLabel(form.getFieldValue('toYear'))}
                    </Descriptions.Item>
                  </Descriptions>
                  <Form.Item name="vision" label="VISION:" rules={schemaRules} required style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                    <Input.TextArea placeholder='ENTER VISION' rows={3} style={{ textTransform: 'uppercase' }} />
                  </Form.Item>
                  <Form.Item name="approveVision" label="APPROVED IN:" rules={schemaRules} style={{ fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} />
                  </Form.Item>
                  <Form.Item name="mision" label="MISSION" rules={schemaRules} style={{ fontWeight: 'bold' }}>
                    <Input.TextArea rows={3} style={{ textTransform: 'uppercase' }} />
                  </Form.Item>
                  <Form.Item name="approveMision" label="APPROVED IN" rules={schemaRules} style={{ fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} />
                  </Form.Item>
                  <Form.Item label="MISSION COMPONENT" rules={schemaRules} style={{ fontWeight: 'bold' }}>
                    <Input.TextArea rows={3} style={{ textTransform: 'uppercase' }} />
                  </Form.Item>
                  <div style={{ backgroundColor: '#008000', padding: 10 }}>
                    <p style={{ color: 'white' }}>DO YOU WANT TO SUBMIT DATA?</p>
                  </div>
                </Col>
              </Row>
            </Card>
          </Form>
        </div>
      </Modal>

    </div>);
};

export default EmployeeInstituteLevelFormEdit;

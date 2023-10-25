import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Checkbox, Col, Form, Input, Radio, Modal, RadioChangeEvent, Descriptions, Row, Upload, Select, notification, } from 'antd';
import { When } from 'react-if';
import { useSettings } from '@/store/settings/useSettings';
import { UploadOutlined } from '@ant-design/icons';
import * as modelEmployeeDepartmentLevel from '@/models/Academics/VisionAndMission/DepartmentLevel'
import { useDepartmentLevel } from '@/store/settings/useAcademicsDepartmentLevel';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';
import { useAcademicDepartment } from '@/store/settings/useAcademicDepartment';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { UploadFileStatus } from 'antd/lib/upload/interface';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { DisplaySelect } from '@/components/FormItem/DisplaySelect';
const DepartmentLevelFormEdit = () => {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
    fetchSettings: state.fetchSettings,
  }));
  const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeDepartmentLevel.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);
  const renderers = {
    departmentId: (value: string) => <DepartmentAsText value={value} />
  };



  const [addMissionCompo, setAddMissionCompo] = useState([''])
  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [form] = Form.useForm();
  const [currentVision, setCurrentVision] = useState(true);
  const [IsToYear, setIsToYear] = useState(false);
  const storeEmployeeDepartmentLevel = useDepartmentLevel(
    (state: any) => ({
      current: state.current,
      getDepartmentLevels: state.getDepartmentLevels,
      addRecord: state.add,
      updateRecord: state.updateRecord,
    }),
  );

  const storeAcademicYear = useAcademicYear((state: any) => ({
    getAcademicYearDetails: state.getAcademicYearDetails,
    comboByName: state.comboByName,
  }));

  const optionsAcademicYear = storeAcademicYear.comboByName;

  const storeAcademicDepartment = useAcademicDepartment(
    (state: any) => ({
      asDepartmentOptions: state.asDepartmentOptions,
      allDepartments: state.comboByName,
      allDepartmentRecords: state.allRecordsByName,
    }),
  );

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
    storeEmployeeDepartmentLevel.getDepartmentLevels(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeEmployeeDepartmentLevel.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeEmployeeDepartmentLevel.current);

    if (storeEmployeeDepartmentLevel.current) {
      console.log("printstoreEmployeeDepartmentLevel", storeEmployeeDepartmentLevel.current.isToYear)
      if (!isNew) {
        if (storeEmployeeDepartmentLevel.current.isToYear === true) {
          setCurrentVision(false)
        } else {
          setCurrentVision(true)
        }
      } else {
        setCurrentVision(true)
      }
    }

  }, [storeEmployeeDepartmentLevel.current]);


  React.useEffect(() => {
    settings.fetchSettings();
    storeAcademicDepartment.asDepartmentOptions();
  }, []);

  const [isAdditionalDivision, setIsAdditionalDivision] = React.useState(1);
  const headerLabel = isNew ? 'Create Vision & Mission for Academic Year' : 'Update Vision & Mission';
  const [confirm, setConfirm] = useState(false);
  // const changeAdditionalDivision = (event: any) => {
  //   setIsAdditionalDivision(event.target.value);
  // };
  const [showDepartmentLevelModal, setShowDepartmentLevelModal] = useState<boolean>(false);
  const getFile = (e: UploadFileStatus) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    //  return e && e.fileList;
  };

  const onChange = (e: RadioChangeEvent) => {
    setIsAdditionalDivision(e.target.value);
  };

  const onFormSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          // const record = await storeEmployeeDepartmentLevel.addRecord(values);
          // if (!isEmptyValue(record)) {
          //   notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.id}` });
          // }
          setShowDepartmentLevelModal(true)
        }
        else {
          // const record = await storeEmployeeDepartmentLevel.updateRecord(id, values);
          // if (!isEmptyValue(record)) {
          //   notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.id}` });
          // }
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      });
  };

  const nvaigateToPreviousPage = () => {
    navigate(`/Academics/vision_mission/employee_department_level/list`);
  }

  const selectDepartmentId = (value: any) => {
    const departmentInfo = storeAcademicDepartment.allDepartmentRecords?.filter((record: any) => record.id === value);
  };


  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title={headerLabel} >

        <Row className='justify-center'>
          <Col span={12}>
            <When condition={!isNew}>
              {() => (<>
                <Form
                  form={form}
                  layout="vertical"
                  autoComplete="off" >
                  <Form.Item name="fromYear" label="From Year" rules={schemaRules} style={{ fontWeight: 'bold' }}>
                    <DisplaySelect options={optionsAcademicYear} />
                  </Form.Item>
                  {currentVision == false &&
                    <>
                      <Form.Item name="toYear" label="To Year" rules={schemaRules} style={{ fontWeight: 'bold' }}>
                        <DisplaySelect
                          //onChange={handleChange}
                          options={optionsAcademicYear} />
                      </Form.Item>
                    </>
                  }

                  <Form.Item name="departmentId" label="Department" rules={schemaRules} style={{ fontWeight: 'bold' }}>
                    {/* <Select disabled
                      //onChange={handleChange}
                      options={academicYear} /> */}
                    {/* <Input bordered={false} /> */}
                    <DisplaySelect options={storeAcademicDepartment.allDepartments?.filter((record: any) => record.value !== '1')} />
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

                  {currentVision == true && <div style={{ margin: 10 }}>
                    <Checkbox checked={currentVision}
                      onChange={e => setCurrentVision(e.target.checked)}
                    ><h4>Vision and Mission is same till current Academic Year</h4></Checkbox>
                  </div>
                  }

                  {/* {currentVision == false &&
                    <>
                      <Form.Item name="toYear" label="To Year" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                        <DisplaySelect
                          //onChange={handleChange}
                          options={optionsAcademicYear} />
                      </Form.Item>

                      <h4>"Once the record is added in the system, no. of Mission Components cannot be added or deleted."</h4>
                      <div style={{ margin: 10 }}>
                        <Checkbox checked={false}
                        // onChange={e => setIsSame(e.target.checked)} checked={isSame}
                        // onChange={onChange}
                        ><h4>I confirm to create the above information.</h4></Checkbox>
                      </div>
                    </>
                  } */}

                  <Form.Item className='text-center' style={{ fontWeight: 'bold', marginTop: 10 }}>
                    <Button className='mt-4' type="primary" onClick={onFormSubmit}>
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
                <Form.Item name="departmentId" label="Department" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                  {/* <Select disabled
                      //onChange={handleChange}
                      options={academicYear} /> */}
                  {/* <Input bordered={false} /> */}
                  <Select options={storeAcademicDepartment.allDepartments?.filter((record: any) => record.value !== '1')} onChange={selectDepartmentId}
                    placeholder={'SELECT DEPARTMENT'} />
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
                <Form.Item label="Mission Component" required style={{ fontWeight: 'bold' }}>
                  {/* <Input /> */}
                  {/* <Radio.Group onChange={onChange} value={isAdditionalDivision} >
                    <Radio value={1}>Yes</Radio>
                    <Radio value={''}>No</Radio>
                  </Radio.Group> */}
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
                  >
                    <h4>Vision and Mission is same till current Academic Year</h4></Checkbox>
                </div>

                {currentVision == false &&
                  <Form.Item name="toYear" label="To Year" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <Select
                      //onChange={handleChange}
                      options={optionsAcademicYear} />
                  </Form.Item>
                }
                <h4>"Once the record is added in the system, cannot be added or deleted."</h4>
                <div style={{ margin: 10 }}>
                  <Checkbox checked={confirm}
                    onChange={e => setConfirm(e.target.checked)}
                  // onChange={e => setIsSame(e.target.checked)} checked={isSame}
                  // onChange={onChange}
                  ><h4>I confirm to create the above VISION & MISSIONs.</h4></Checkbox>
                </div>

                <Form.Item className='text-center' style={{ fontWeight: 'bold', marginTop: 10 }}>
                  <Button className='mt-4' type="primary"
                    onClick={() => {
                      //setShowDepartmentLevelModal(true)
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

      <Modal title="Department Vision Mission Confirmation"
        okText={'Confirm'}
        cancelText={'Cancel'}
        open={showDepartmentLevelModal} onOk={() => {
          setShowDepartmentLevelModal(false);
        }} onCancel={() => {
          setShowDepartmentLevelModal(false);
        }}>
        {/* <AddInstituteLevel /> */}
        <div className='layout-main-content'>
          <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
            <Card bordered={false}>
              <Row className="justify-center">
                <Col className='md'>
                  <Descriptions layout="horizontal">
                    <Descriptions.Item label="ACADEMIC YEAR" contentStyle={{ fontWeight: 'bold', color: 'black' }} labelStyle={{ fontWeight: 'bold' }} >
                      {getYearLabel(form.getFieldValue('fromYear'))}  to
                      {currentVision ? ' PRESENT' : ' ' + getYearLabel(form.getFieldValue('toYear'))}
                    </Descriptions.Item>
                  </Descriptions>
                  <Form.Item name="departmentId" label="Department" rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                    <Select options={storeAcademicDepartment.allDepartments?.filter((record: any) => record.value !== '1')} onChange={selectDepartmentId}
                      disabled bordered={false} suffixIcon={true} />
                  </Form.Item>
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

export default DepartmentLevelFormEdit;

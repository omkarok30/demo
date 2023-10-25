import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Affix, Button, Card, Checkbox, Col, Form, Input, Radio, Row, Select, notification } from 'antd';
import { When } from 'react-if';

import { useSettings } from '@/store/settings/useSettings';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useAcademicDepartment } from '@/store/settings/useAcademicDepartment';
import { todoLookUps } from '@/store/todoLookUps';
import * as modelProgramDetails from '@/models/settings/ProgramDetails';
import { schemaValidator } from '@/utils/validate';
import { isEmptyValue } from '@/utils/object';
import { DisplaySelect } from '@/components/FormItem/DisplaySelect';
import { DisplayInput } from '@/components/FormItem/DisplayInput';

const yesNo = todoLookUps.getState().yesNo;
const examinationPattern = todoLookUps.getState().examinationPattern;
const affiliationType = todoLookUps.getState().affiliationType;
const programDuration = todoLookUps.getState().programDuration;

const ProgramDetailsEdit = () => {
  const { id, programType } = useParams();
  const isNew = id === 'new';

  const [isProgramActive, setIsProgramActive] = React.useState(true);
  const [isBatchToYear, setIsBatchToYear] = React.useState(true);

  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
    fetchSettings: state.fetchSettings,
  }));
  const storeAcademicYear = useAcademicYear(
    (state: any) => ({
      asOptions: state.asOptions,
      comboByName: state.comboByName,
    }),
  );

  const storeProgramDetails = useProgramDetails(
    (state: any) => ({
      getRecord: state.getRecord,
      current: state.current,
      addRecord: state.addRecord,
      updateRecord: state.updateRecord,
    }),
  );

  const storeAcademicDepartment = useAcademicDepartment(
    (state: any) => ({
      asDepartmentOptions: state.asDepartmentOptions,
      allDepartments: state.comboByName,
      allDepartmentRecords: state.allRecordsByName,
    }),
  );

  React.useEffect(() => {
    settings.fetchSettings();
    storeAcademicYear.asOptions();
    storeAcademicDepartment.asDepartmentOptions();
  }, []);

  const optionsLevelOfEducation = React.useMemo(() => settings.asSelect('level_of_education') || [], [settings.byKeys]);
  const optionsFacultyStudy = React.useMemo(() => settings.asSelect('faculty_study') || [], [settings.byKeys]);
  const optionsAcademicYear = React.useMemo(() => (storeAcademicYear.comboByName || []), [storeAcademicYear.comboByName]);
  const schemaRules = React.useMemo(() => schemaValidator(modelProgramDetails.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);
  const [implOfCbcs, setImplOfCbcs] = useState(false);
  const [levelOfEdu, setLevelOfEdu] = useState('');
  const [facultyOfStudy, setFacultyOfStudy] = useState('');
  const [isFyApplicable, setIsFyApplicable] = useState(false);
  const [commencementYear, setCommencementYear] = useState('');
  const [startYear, setStartYear] = React.useState('');
  const [isAdditionalDivision, setIsAdditionalDivision] = useState(false);

  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [form] = Form.useForm();

  React.useEffect(() => {
    storeProgramDetails.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeProgramDetails?.current?.id !== id) {
      return;
    }
    setIsProgramActive(!!isEmptyValue(storeProgramDetails.current.closeYear));
    setImplOfCbcs(storeProgramDetails.current.implOfCbcs);

    form.setFieldsValue(storeProgramDetails.current);
  }, [storeProgramDetails.current]);

  const selectLevelOfEducation = (value: string) => {
    setLevelOfEdu(value);
    if (value === 'UG' && facultyOfStudy === 'Engineering') {
      setIsFyApplicable(true);
    }
    else {
      setIsFyApplicable(false);
    }
  };

  const selectFacultyOfStudy = (value: string) => {
    setFacultyOfStudy(value);
    if (levelOfEdu === 'UG' && value === 'Engineering') {
      setIsFyApplicable(true);
    }
    else {
      setIsFyApplicable(false);
    }
  };

  const selectDepartmentId = (value: any) => {
    const departmentInfo = storeAcademicDepartment.allDepartmentRecords?.filter((record: any) => record.id === value);
    const startYear = departmentInfo[0].startYear;
    setCommencementYear(startYear);
  };

  const selectStartYear = (value: string) => {
    setStartYear(value);
  };

  const selectAdditionalDivision = (event: any) => {
    setIsAdditionalDivision(event.target.value);
  };

  const selectImplOfCbcs = (value: boolean) => {
    setImplOfCbcs(value);
  };

  const onFormSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        values.programType = programType;
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeProgramDetails.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.programmeName}` });
          }
        }
        else {
          const record = await storeProgramDetails.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.programmeName}` });
          }
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      });
  };

  const headerLabel = isNew ? 'Edit Program' : 'Add Program';

  return (<div className='layout-main-content'>
    <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
      <Card
        bordered={false}
        title={headerLabel}
        actions={[
          <Affix offsetBottom={12}>
            <Form.Item>
              <Button type="primary" onClick={onFormSubmit} disabled={saveProgress.disableSubmit}>Submit</Button>
            </Form.Item>
          </Affix>,
        ]}
      >
        <Row className="justify-center">
          <Col className='w-md'>
            <When condition={isNew}>
              {() => (<>
                <Form.Item name="levelOfEducation" label="Level of Education" rules={schemaRules} required>
                  <Select options={optionsLevelOfEducation} onChange={selectLevelOfEducation} />
                </Form.Item>
                <When condition={programType === 'department'}>
                  <Form.Item name="departmentId" label="Department" rules={schemaRules} required>
                    <Select options={storeAcademicDepartment.allDepartments?.filter((record: any) => record.value !== '1')} onChange={selectDepartmentId} />
                  </Form.Item>
                </When>
                <Form.Item name="facultyOfStudy" label="Faculty of Study" rules={schemaRules} required>
                  <Select options={optionsFacultyStudy} onChange={selectFacultyOfStudy} />
                </Form.Item>
                <Form.Item name="affiliationType" label="Affiliation Type" required>
                  <Select mode='multiple' options={affiliationType} />
                </Form.Item>
                <Form.Item name="programmeName" label="Program" rules={schemaRules} required>
                  <Input />
                </Form.Item>
                <Form.Item name="programDuration" label="Program Duration (Years)" rules={schemaRules} required>
                  <Select options={programDuration} />
                </Form.Item>
                <When condition={isFyApplicable}>
                  <Form.Item name="isFyApplicable" label="Is First Year Academics applicable" rules={schemaRules} required>
                    <Radio.Group options={yesNo} />
                  </Form.Item>
                </When>
                <Form.Item name="examinationPattern" label="Examination Pattern" rules={schemaRules} required>
                  <Select options={examinationPattern}>
                  </Select>
                </Form.Item>
                <Form.Item name="startYear" label="Commencement Year" rules={schemaRules} required>
                  <Select options={optionsAcademicYear.filter((record: any) => record.value >= commencementYear)} onChange={selectStartYear} />
                </Form.Item>
                <Form.Item name="implOfCbcs" label="Implementation of CBCS / Elective Course System" rules={schemaRules} required>
                  <Select options={yesNo} onChange={selectImplOfCbcs} />
                </Form.Item>
                <When condition={implOfCbcs}>
                  <Form.Item name="yearOfImpl" label="Year of Implementation of CBCS / Elective Course System" rules={schemaRules} required>
                    <Select options={optionsAcademicYear.filter((record: any) => record.value >= startYear)} />
                  </Form.Item>
                  <Form.Item name="linkToDocument" label="Link to the relevant document">
                    <Input />
                  </Form.Item>
                </When>
                <Form.Item name="degreeName" label="Degree" rules={schemaRules} required>
                  <Input />
                </Form.Item>
                <Form.Item name="sanctionedIntake" label="Registration Year Batch Sanctioned Intake" rules={schemaRules} required>
                  <Input />
                </Form.Item>
                <Form.Item name="lateralIntake" label="Lateral Entry Sanctioned Intake" rules={schemaRules} required>
                  <Input />
                </Form.Item>
                <Form.Item name="additionalDivision" label="Additional Division" rules={schemaRules} required>
                  <Radio.Group options={yesNo} onChange={selectAdditionalDivision} />
                </Form.Item>
                <When condition={isAdditionalDivision}>
                  <Form.Item name="additionalDivisionIntake" label="Additional Division Sanctioned Intake" rules={schemaRules} required>
                    <Input />
                  </Form.Item>
                </When>
                <Form.Item name="batchStartYearFrom" label="Batch Starting Year From" rules={schemaRules} required>
                  <Select options={optionsAcademicYear.filter((record: any) => record.value === startYear)} />
                </Form.Item>
                <When condition={isBatchToYear !== true}>
                  <Form.Item name="batchStartYearTo" label="Batch Starting Year To" rules={schemaRules} required>
                    <Select options={optionsAcademicYear.filter((record: any) => record.value > startYear)} />
                  </Form.Item>
                </When>
                <Form.Item >
                  <Checkbox onChange={e => setIsBatchToYear(e.target.checked)} checked={isBatchToYear} > Intake data is the same for the current batch.</Checkbox>
                </Form.Item>
              </>)}
            </When>

            <When condition={!isNew}>
              {() => (<>
                <Form.Item name="levelOfEducation" label="Level of Education" rules={schemaRules} required>
                  <DisplaySelect options={optionsLevelOfEducation} />
                </Form.Item>
                <When condition={programType === 'department'}>
                  <Form.Item name="departmentId" label="Department" rules={schemaRules} required>
                    <DisplaySelect options={storeAcademicDepartment.allDepartments?.filter((record: any) => record.value !== '1')} />
                  </Form.Item>
                </When>
                <Form.Item name="facultyOfStudy" label="Faculty of Study" rules={schemaRules} required>
                  <DisplaySelect options={optionsFacultyStudy} />
                </Form.Item>
                <Form.Item name="affiliationType" label="Affiliation Type" rules={schemaRules} required>
                  <Select mode='multiple' options={affiliationType} />
                </Form.Item>
                <Form.Item name="programmeName" label="Program" rules={schemaRules} required>
                  <Input />
                </Form.Item>
                <Form.Item name="programCode" label="Program Code" required>
                  <DisplayInput />
                </Form.Item>
                  {/* TODO: create DisplayRadio
                  <Form.Item name="isFyApplicable" label="Is First Year Academics applicable" rules={schemaRules} required>
                    <Radio.Group options={yesNo} />
                  </Form.Item>
                  */}
                <Form.Item name="examinationPattern" label="Examination Pattern" rules={schemaRules} required>
                  <DisplaySelect options={examinationPattern} />
                </Form.Item>
                <Form.Item name="startYear" label="Commencement Year" rules={schemaRules} required>
                  <DisplaySelect options={optionsAcademicYear.filter((record: any) => record.value >= commencementYear)} />
                </Form.Item>
                <Form.Item name="implOfCbcs" label="Implementation of CBCS / Elective Course System" rules={schemaRules} required>
                  <Select options={yesNo} onChange={selectImplOfCbcs} />
                </Form.Item>
                <When condition={implOfCbcs}>
                  <Form.Item name="yearOfImpl" label="Year of Implementation of CBCS / Elective Course System" rules={schemaRules} required>
                    <Select options={optionsAcademicYear.filter((record: any) => record.value >= startYear)}>
                    </Select>
                  </Form.Item>
                  <Form.Item name="linkToDocument" label="Link to the relevant document">
                    <Input />
                  </Form.Item>
                </When>
                <Form.Item name="degreeName" label="Degree" rules={schemaRules} required>
                  <Input />
                </Form.Item>
                <When condition={isProgramActive !== true}>
                  <Form.Item name="closeYear" label="Closure Year" rules={schemaRules} required>
                    <Select options={optionsAcademicYear} />
                  </Form.Item>
                </When>
                <Form.Item>
                  <Checkbox onChange={e => setIsProgramActive(e.target.checked)} checked={isProgramActive}>Program is currently active.</Checkbox>
                </Form.Item>
              </>)}
            </When>
          </Col>
        </Row>
      </Card>
    </Form>
  </div >);
};

export default ProgramDetailsEdit;

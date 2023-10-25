import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Affix, Button, Card, Checkbox, Col, Descriptions, Form, Input, Radio, Row, Select, notification } from 'antd';
import { When } from 'react-if';

import * as modelAcademicTools from '@/models/Academics/courseEvaluationTools/ToolsRepository';
import { useSettings } from '@/store/settings/useSettings';
import { useToolsRepository } from '@/store/Academics/courseEvaluationTools/useToolsRepository';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';
import { todoLookUps } from '@/store/todoLookUps';
import { ToolTypeAsText } from '@/components/Lookups/renderers/ToolTypeAsText';
import { ToolAssessmentAsText } from '@/components/Lookups/renderers/ToolAssessmentAsText';
import { ToolDependencyAsText } from '@/components/Lookups/renderers/ToolDependencyAsText';
import { YesNoAsText } from '@/components/Lookups/renderers/YesNoAsText';

const yesNo = todoLookUps.getState().yesNo;
const optionstoolType = todoLookUps.getState().toolType;
const optionstoolDependency = todoLookUps.getState().toolDependency;
const optionstoolAssessment = todoLookUps.getState().toolAssessment;

const AcademicToolsEdit = () => {
  const { id } = useParams();
  const isNew = id === 'new';

  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));

  const [isIndependentTool, setIsIndependentTool] = useState(false);
  const [isDependentTool, setIsDependentTool] = useState(false);

  const schemaRules = React.useMemo(() => schemaValidator(modelAcademicTools.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

  const storeAcademicTools = useToolsRepository(
    (state: any) => ({
      getRecord: state.getRecord,
      current: state.current,
      addRecord: state.addRecord,
      updateRecord: state.updateRecord,
      getRecords: state.getRecords,
      optionsTools: state.comboByName,
    }),
  );

  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [form] = Form.useForm();

  React.useEffect(() => {
    storeAcademicTools.getRecords();
    storeAcademicTools.getRecord(id);
    console.log(storeAcademicTools);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeAcademicTools.current.id !== id) {
      return;
    }
    setIsDependentTool(storeAcademicTools.current.toolDependency);
    form.setFieldsValue(storeAcademicTools.current);
  }, [storeAcademicTools.current]);
  const toolType = <ToolTypeAsText value={storeAcademicTools.current.toolType} />;
  const toolDependency = <ToolDependencyAsText value={storeAcademicTools.current.toolDependency} />;
  const toolAssessment = <ToolAssessmentAsText value={storeAcademicTools.current.toolAssessment} />;
  const toolCoAttainment = <YesNoAsText value={storeAcademicTools.current.toolCoAttainment} />;
  /* const [fields, setFields] = useState([{}]);
  const [size, setSize] = useState<SizeType>('small'); // default is 'middle'
  const addDynamicFields = () => {
    const newInputObj = {};
    fields.splice(0, 0, newInputObj);
    setFields([...fields]);
  };
  const removeDynamicFields = () => {
    if (fields.length !== 1) {
      fields.splice(-1);
      setFields([...fields]);
    }
  };
 */
  const onFormSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeAcademicTools.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.toolName}` });
          }
        }
        else {
          values.id = id;
          const record = await storeAcademicTools.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.toolName}` });
          }
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      });
  };

  const onOptionChange = (event: any) => {
    if (event === 'independent') {
      setIsIndependentTool(true);
      setIsDependentTool(false);
    }
    else if (event === 'dependent') {
      setIsIndependentTool(false);
      setIsDependentTool(true);
    }
  };

  const headerLabel = isNew ? 'Add Tools' : 'Edit Tools';

  return (<div className='layout-main-content'>
    <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
      <Card
        bordered={false}
        title={headerLabel}
        actions={[
          <Affix offsetBottom={12}>
            <Form.Item>
              <Button type="primary" onClick={onFormSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Affix>,
        ]}
      >
        <When condition={!isNew}>
          <Descriptions layout="horizontal">
            <Descriptions.Item label="Tool Name" span={2}>{storeAcademicTools.current.toolName}</Descriptions.Item>

            <Descriptions.Item label="Tool Type">{toolType}</Descriptions.Item>
            <Descriptions.Item label="Tool Dependency" span={2}>{toolDependency}</Descriptions.Item>
            <Descriptions.Item label="Tool Assessment Method">{toolAssessment}</Descriptions.Item>
            <Descriptions.Item label="Tool Applicable for CO Attainment">{toolCoAttainment}</Descriptions.Item>
          </Descriptions>

        </When>
        <Row className="justify-center">
          <Col className='w-md'>
            <When condition={!isNew}>
              {() => (<>
                <Form.Item name="toolName" label="Tool Name" rules={schemaRules} required>
                  <Input />
                </Form.Item>
                <Form.Item name="endSemExam" label="End Semester Exam?" rules={schemaRules} required>
                  <Radio.Group options={yesNo} />
                </Form.Item>
                <When condition={isDependentTool}>
                  <Form.Item name={'deptoolname'} label="Select Tool" required>
                    <Select showSearch mode="multiple" optionFilterProp="children" options={storeAcademicTools.optionsTools} defaultValue={storeAcademicTools.current.dependentToolIds} />
                  </Form.Item>
                </When>
              </>)}
            </When>

            <When condition={isNew}>
              {() => (<>
                <Form.Item name="toolName" label="Tool Name" rules={schemaRules} required>
                  <Input />
                </Form.Item>
                <Form.Item name="toolDependency" label="Tool Dependency" rules={schemaRules} required>
                  <Select options={optionstoolDependency} onChange={onOptionChange} />
                </Form.Item>
                <When condition={isIndependentTool}>
                  <Form.Item name="toolCoAttainment" label="Consider Tool for CO Attainment?" rules={schemaRules} required>
                    <Radio.Group options={yesNo} />
                  </Form.Item>
                </When>
                <Form.Item name="toolPublish" label="Consider Tool for Publish Option?" rules={schemaRules} required>
                  <Radio.Group options={yesNo} />
                </Form.Item>
                <When condition={isIndependentTool}>
                  <Form.Item name="endSemExam" label="End Semester Exam?" rules={schemaRules} required>
                    <Radio.Group options={yesNo} />
                  </Form.Item>
                  <Form.Item name="toolType" label="Tool Type" rules={schemaRules} required>
                    <Select options={optionstoolType} />
                  </Form.Item>
                  <Form.Item name="toolAssessment" label="Tool Assessment" rules={schemaRules} required>
                    <Select options={optionstoolAssessment} />
                  </Form.Item>
                </When>
                <When condition={isDependentTool}>
                  <Form.Item name={'deptoolname'} label="Select Tool" required>
                    <Select showSearch mode="multiple" optionFilterProp="children" options={storeAcademicTools.optionsTools} />
                  </Form.Item>
                </When>

                <Form.Item label='"Once the tool is added in the system, it cannot be updated or deleted."'>
                  <Checkbox>I confirm to create the above Tool.</Checkbox>
                </Form.Item>
              </>)}
            </When>

          </Col>
        </Row>
      </Card>
    </Form>
  </div >);
};

export default AcademicToolsEdit;

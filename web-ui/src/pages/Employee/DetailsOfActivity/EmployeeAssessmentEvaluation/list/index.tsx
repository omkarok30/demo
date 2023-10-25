import React from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Select, DatePicker, Upload, Checkbox, notification, Affix } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import * as modelAssessmentEvaluation from '@/models/Employee/DetailsOfActivity/AssessmentEvaluationModerationDetails/AssessmentEvaluationModerationDetails';
import { useEmployeeAssessmentEvaluation } from '@/store/employee/DetailsOfActivity/AssessmentEvaluationModerationDetails/useEmployeeAssessmentEvaluation';
import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { todoLookUps } from '@/store/todoLookUps';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { UploadFileStatus } from 'antd/lib/upload/interface';
import { useGlobalState } from '@/store/global';
import { schemaValidator } from '@/utils/validate';
import { isEmptyValue } from '@/utils/object';
import { When } from 'react-if';
import EmployeeAssessmentEvaluationModerationForm from '../form/edit';


const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />
};
const EmployeeEmployeeAssessmentEvaluationList = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const schemaRules = React.useMemo(() => schemaValidator(modelAssessmentEvaluation.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);
  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });

  const global = useGlobalState((state: any) => state.default);

  const storeEmployeeAssessmentEvaluation = useEmployeeAssessmentEvaluation((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    addRecord: state.addRecord
  }));



  const navigateToNewForm = () => {
    navigate('/Employee/employee_assessment_evaluation_moderation/edit/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`/Employee/employee_assessment_evaluation_moderation/edit/${record?.id}`, { state: { id: record?.id } });
    }
  };
  const [assessmentEvaluationProps, setAssessmentEvaluationProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });

  const assessmentEvaluationOk = (studentId: string, _values: any) => {
    setAssessmentEvaluationProps({ ...assessmentEvaluationProps, open: false, id: '', studentId: '' });
  };
  const assessmentEvaluationCancel = () => {
    setAssessmentEvaluationProps({ ...assessmentEvaluationProps, open: false, id: '', studentId: '' });
  };

  const editdetails = (editid: any) => {
    setAssessmentEvaluationProps({
      ...assessmentEvaluationProps,
      open: true,
      studentId: `${id}`,
      id: editid,
    });
  };


  React.useEffect(() => {
    fetchSettings();
    storeEmployeeAssessmentEvaluation.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelAssessmentEvaluation.columns(settings);
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [<Button type="link" style={{ backgroundColor: '#2063B0', color: 'white' }}
        // onClick={() => handleActionClick({ action: 'edit', record })}
        onClick={() => editdetails(`${record?.id}`)}
      >View/Update</Button>],
    });
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);



  return (
    <div className='layout-main-content'>
      <Table scroll={{ x: 350 }} bordered columns={columns} dataSource={storeEmployeeAssessmentEvaluation.allRecords} />
      <When condition={assessmentEvaluationProps.open === true}>
        {() => (
          <EmployeeAssessmentEvaluationModerationForm
            {...assessmentEvaluationProps}
            handleOk={assessmentEvaluationOk}
            handleCancel={assessmentEvaluationCancel}
          />
        )}
      </When>
    </div>
  );
};

export default EmployeeEmployeeAssessmentEvaluationList;

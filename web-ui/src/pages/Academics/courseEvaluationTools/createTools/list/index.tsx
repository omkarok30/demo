import React from 'react';
import { Button, Card, Col, Row, Table, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import { useSettings } from '@/store/settings/useSettings';
import { useToolsRepository } from '@/store/Academics/courseEvaluationTools/useToolsRepository';
import * as modelAcademicTools from '@/models/Academics/courseEvaluationTools/ToolsRepository';
import { attachRenderer } from '@/utils/tableExtras';
import { ToolTypeAsText } from '@/components/Lookups/renderers/ToolTypeAsText';
import { ToolAssessmentAsText } from '@/components/Lookups/renderers/ToolAssessmentAsText';
import { ToolDependencyAsText } from '@/components/Lookups/renderers/ToolDependencyAsText';
import { YesNoAsText } from '@/components/Lookups/renderers/YesNoAsText';

const renderers = {
  toolType: (value: string) => <ToolTypeAsText value={value} />,
  toolDependency: (value: string) => <ToolDependencyAsText value={value} />,
  toolAssessment: (value: string) => <ToolAssessmentAsText value={value} />,
  toolCoAttainment: (value: string) => <YesNoAsText value={value} />,
  toolPublish: (value: string) => <YesNoAsText value={value} />,
  endSemExam: (value: string) => <YesNoAsText value={value} />,
};

const AcademicToolsList = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeAcademicTools = useToolsRepository((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    activeToolsRecord: state.activeToolsRecord,
    inactiveToolsRecord: state.inactiveToolsRecord,
    inActivateTool: state.inActivateTool,
  }),
  );

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`../edit/${record?.id}`, { state: { id: record?.id } });
    }
    else if (action === 'inactivate') {
      const data = { inactive: true };
      storeAcademicTools.inActivateTool(record?.id, data);
    }
    else if (action === 'activate') {
      const data = { inactive: false };
      storeAcademicTools.inActivateTool(record?.id, data);
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeAcademicTools.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelAcademicTools.columns(settings);

    cols.push({
      title: 'Tool Assessment Method',
      key: 'toolAssessment',
      render: (_, record) => [<span>{record.toolDependency === 'dependent' ? record.dependentToolIds : <ToolAssessmentAsText value={record.toolAssessment} />}</span>],
    });
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [<span><Button type="link" onClick={() => handleActionClick({ action: 'edit', record })}>Edit</Button>, <Button type="link" onClick={() => handleActionClick({ action: 'inactivate', record })} style={{ color: 'red' }}>Deactivate</Button></span>],
    });
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  const inactiveColumns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelAcademicTools.columns(settings);
    cols.push({
      title: 'Tool Assessment Method',
      key: 'toolAssessment',
      render: (_, record) => [<span>{record.toolDependency === 'dependent' ? record.dependentToolIds : <ToolAssessmentAsText value={record.toolAssessment} />}</span>],
    });
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [<span><Button type="link" onClick={() => handleActionClick({ action: 'edit', record })}>Edit</Button>, <Button type="link" onClick={() => handleActionClick({ action: 'activate', record })} >Activate</Button></span>],
    });
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  const tabPages = [
    { label: 'Active Tools', key: 'active-tools', children: <Table bordered columns={columns} dataSource={storeAcademicTools.activeToolsRecord} /> },
    { label: 'Inactive Tools', key: 'inactive-tools', children: <Table bordered columns={inactiveColumns} dataSource={storeAcademicTools.inactiveToolsRecord} /> },
  ];

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="Evaluation Tools"
      >
        <Row justify="end">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>
              Add Tools
            </Button>
          </Col>
        </Row>
        <Tabs items={tabPages} tabPosition="top" />
      </Card>
    </div>
  );
};

export default AcademicToolsList;

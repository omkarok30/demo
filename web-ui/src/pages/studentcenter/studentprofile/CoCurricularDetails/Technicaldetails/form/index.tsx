import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { Button, Card, Col, Row, Table } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useTechnicalDetails } from '@/store/admissions/useTechnicalDetails';
import { useSettings } from '@/store/settings/useSettings';
import * as modelTechnicalDetails from '@/models/admissions/studentRecords/TechnicalDetails';
import { isEmptyValue } from '@/utils/object';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import {
  CountryAsText,
  EventLevelAsText,
  ParticipationTypeAsText,
} from '@/pages/admissions/StudentRecord/CoCurricularActivity/TechnicalDetails/renderers';
import { attachRenderer } from '@/utils/tableExtras';
const renderers = {
  academicYear: (value: string) => <YearAsText value={value} />,
  eventLevel: (value: string) => <EventLevelAsText value={value} />,
  participationType: (value: string) => (
    <ParticipationTypeAsText value={value} />
  ),
  country: (value: string) => <CountryAsText value={value} />,
};
const TechnicalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeTechnicalDetails = useTechnicalDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    deleteRecord: state.deleteRecord,
  }));

  const navigateToNewForm = () => {
    navigate(`../co-curricular/technical_details/new/${id}`);
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`../co-curricular/technical_details/${record?.id}/${id}`, {
        state: { id: record?.id },
      });
    }
    else if (action === 'delete') {
      storeTechnicalDetails.deleteRecord(record.id);
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeTechnicalDetails.getRecords(id);
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelTechnicalDetails.columns(settings);
    cols.push({
      title: 'Document',
      dataIndex: 'document',
      render: (_, record) =>
        isEmptyValue(record.document)
          ? [
              <span>
                <Button
                  type="link"
                  onClick={() => {
                    alert('Not provided');
                  }}
                >
                  NA
                </Button>
              </span>,
            ]
          : [
              <span>
                <a href={record.document}>
                  <DownloadOutlined />
                </a>
              </span>,
            ],
    });

    cols = attachRenderer(cols, renderers);

    return cols;
  }, [settings]);
  return (
    <div className="layout-main-content">
      <Card bordered={false} title="Technical Event Details "></Card>
      <Row justify="end" key="technical-details">
        <Col></Col>
      </Row>
      <Table
        bordered
        columns={columns}
        dataSource={storeTechnicalDetails.allRecords}
        scroll={{ x: 300 }}
      />
    </div>
  );
};

export default TechnicalDetails;

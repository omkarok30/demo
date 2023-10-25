import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { Button, Card, Col, Row, Table } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { usePublicationDetails } from '@/store/admissions/usePublicationDetails';
import { useSettings } from '@/store/settings/useSettings';
import * as modelPublicationDetails from '@/models/admissions/studentRecords/PublicationDetails';
import { isEmptyValue } from '@/utils/object';
import { EventLevelAsText } from '@/pages/admissions/StudentRecord/CoCurricularActivity/TechnicalDetails/renderers';
import {
  PaperTypeText,
  PublicationTypeAsText,
} from '@/pages/admissions/StudentRecord/CoCurricularActivity/PublicationDetails/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const renderers = {
  academicYear: (value: string) => <YearAsText value={value} />,
  publicationLevel: (value: string) => <EventLevelAsText value={value} />,
  publicationType: (value: string) => <PublicationTypeAsText value={value} />,
  typeOfPaper: (value: string) => <PaperTypeText value={value} />,
};
const PublicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storePublicationDetails = usePublicationDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    deleteRecord: state.deleteRecord,
  }));

  const navigateToNewForm = () => {
    navigate(`../co-curricular/publication_details/new/${id}`);
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`../co-curricular/publication_details/${record?.id}/${id}`, {
        state: { id: record?.id },
      });
    }
    else if (action === 'delete') {
      storePublicationDetails.deleteRecord(record.id);
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storePublicationDetails.getRecords(id);
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelPublicationDetails.columns(settings);
    cols.push({
      title: 'Paper',
      dataIndex: 'paperDocument',
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
                <a href={record.paperDocument}>
                  <DownloadOutlined />
                </a>
              </span>,
            ],
    });
    cols.push({
      title: 'Document',
      dataIndex: 'certificateDocument',
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
                <a href={record.certificateDocument}>
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
      <Card bordered={false} title="Publication Details "></Card>
      <Row justify="end" key="publication-details">
        <Col></Col>
      </Row>
      <Table
        bordered
        columns={columns}
        dataSource={storePublicationDetails.allRecords}
        scroll={{ x: 300 }}
      />
    </div>
  );
};

export default PublicationDetails;

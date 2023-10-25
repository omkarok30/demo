import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { Button, Card, Col, Row, Table } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useWorkshopDetails } from '@/store/admissions/useWorkshopDetails';
import { useSettings } from '@/store/settings/useSettings';
import * as modelWorkshopDetails from '@/models/admissions/studentRecords/WorkshopDetails';
import { isEmptyValue } from '@/utils/object';
import {
  EventLevelAsText,
  ParticipationTypeAsText,
} from '@/pages/admissions/StudentRecord/CoCurricularActivity/TechnicalDetails/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const renderers = {
  academicYear: (value: string) => <YearAsText value={value} />,
  workshopLevel: (value: string) => <EventLevelAsText value={value} />,
  participationType: (value: string) => (
    <ParticipationTypeAsText value={value} />
  ),
};
const Workshopdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeWorkshopdetails = useWorkshopDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    deleteRecord: state.deleteRecord,
  }));

  const navigateToNewForm = () => {
    navigate(`../co-curricular/workshop_details/new/${id}`);
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`../co-curricular/workshop_details/${record?.id}/${id}`, {
        state: { id: record?.id },
      });
    }
    else if (action === 'delete') {
      storeWorkshopdetails.deleteRecord(record.id);
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeWorkshopdetails.getRecords(id);
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelWorkshopDetails.columns(settings);
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
                <a href={record.paperDocument}>
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
      <Card bordered={false} title="Training/Workshop Details "></Card>
      <Row justify="end" key="publication-details">
        <Col></Col>
      </Row>
      <Table
        bordered
        columns={columns}
        dataSource={storeWorkshopdetails.allRecords}
        scroll={{ x: 300 }}
      />
    </div>
  );
};

export default Workshopdetails;

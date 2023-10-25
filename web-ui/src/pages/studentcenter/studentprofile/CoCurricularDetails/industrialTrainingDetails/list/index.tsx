import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { Button, Card, Col, Row, Table } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import { useIndustrialTrainingDetails } from '@/store/admissions/useIndustrialTrainingDetails';
import { useSettings } from '@/store/settings/useSettings';
import * as modelIndustrialTrainingDetails from '@/models/admissions/studentRecords/IndustrialTrainingDetails';
import { isEmptyValue } from '@/utils/object';
import { attachRenderer } from '@/utils/tableExtras';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const renderers = {
  academicYear: (value: string) => <YearAsText value={value} />,
};
const IndustrialTrainingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeIndustrialTrainingDetails = useIndustrialTrainingDetails(
    (state: any) => ({
      allRecords: state.allRecords,
      getRecords: state.getRecords,
      deleteRecord: state.deleteRecord,
    }),
  );

  const navigateToNewForm = () => {
    navigate(`../co-curricular/industrial_training_details/new/${id}`);
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(
        `../co-curricular/industrial_training_details/${record?.id}/${id}`,
        {
          state: { id: record?.id },
        },
      );
    }
    else if (action === 'delete') {
      storeIndustrialTrainingDetails.deleteRecord(record.id);
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeIndustrialTrainingDetails.getRecords(id);
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelIndustrialTrainingDetails.columns(settings);
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
      <Card
        bordered={false}
        title=" Industrial Training/Internship Details "
      ></Card>

      <Row justify="end" key="publication-details">
        <Col></Col>
      </Row>
      <Table
        bordered
        columns={columns}
        dataSource={storeIndustrialTrainingDetails.allRecords}
        scroll={{ x: 300 }}
      />
    </div>
  );
};

export default IndustrialTrainingDetails;

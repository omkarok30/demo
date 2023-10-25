import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { Button, Divider, Table, Typography } from 'antd';
import { useScholarShipDetails } from '@/store/admissions/BeneficiaryDetails/useScholarshipDetails';
import { useSettings } from '@/store/settings/useSettings';
import * as modal from '@/models/admissions/studentRecords/BeneficiaryDetails/ScholarshipDetails';
import { attachRenderer } from '@/utils/tableExtras';
import { OptionAsText } from '@/utils/getOptionsAsText';

const renderers = {
  academicYear: (value: string) => <OptionAsText value={value} fieldName="academicYear" />,
  eventLevel: (value: string) => <OptionAsText value={value} fieldName="eventLevel" />,
  participationType: (value: string) => <OptionAsText value={value} fieldName="participationType" />,
  achievement: (value: string) => <OptionAsText value={value} fieldName="achievement" />,
};

interface ActionProps {
  action: string;
  record: {
    id: string;
  };
}

const ScholarshipDetailsList = () => {
  const { id } = useParams();
  const { Title } = Typography;
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const store = useScholarShipDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    deleteRecord: state.deleteRecord,
  }));

  const handleActionClick = ({ action, record }: ActionProps) => {
    if (action === 'edit') {
      navigate(`../beneficiary_details/scholarship_details/${id}`, {
        state: { id: record?.id },
      });
    }
    else if (action === 'delete') {
      store.deleteRecord(record.id);
    }
  };

  React.useEffect(() => {
    fetchSettings();
    store.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modal.columns();
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <Button
          type="link"
          onClick={() => handleActionClick({ action: 'edit', record })}
        >
          View/Edit
        </Button>,
      ],
    });

    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  return (
    <>
      <Divider orientation="left">
        <Title level={5}>Scholarship/Freeship/Schemes Details</Title>
      </Divider>
      <Table
        bordered
        columns={columns}
        dataSource={store.allRecords}
        scroll={{ x: 300 }}
      />
    </>
  );
};

export default ScholarshipDetailsList;

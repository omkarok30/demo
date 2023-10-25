import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { Button, Divider, Table, Typography } from 'antd';
import { useFollowingCLassesDetails } from '@/store/admissions/BeneficiaryDetails/useFollowingClasses';
import { useSettings } from '@/store/settings/useSettings';
import * as modal from '@/models/admissions/studentRecords/BeneficiaryDetails/FollowingClasses';
import { attachRenderer } from '@/utils/tableExtras';
import { OptionAsText } from '@/utils/getOptionsAsText';

const renderers = {
  hostellite: (value: string) => <OptionAsText value={value} fieldName="hostellite" />,
  feesCategory: (value: string) => <OptionAsText value={value} fieldName="feesCategory" />,
  parentOccupation: (value: string) => <OptionAsText value={value} fieldName="parentOccupation" />,
  appliedGovernmentScholarship: (value: string) => <OptionAsText value={value} fieldName="appliedGovernmentScholarship" />,
  governmentScheme: (value: string) => <OptionAsText value={value} fieldName="governmentScheme" />,
  ebcScholarship: (value: string) => <OptionAsText value={value} fieldName="ebcScholarship" />,
  className: (value: string) => <OptionAsText value={value} fieldName="className" />,
};

interface ActionProps {
  action: string;
  record: {
    id: string;
  };
}

const FollowingClassesList = () => {
  const { id } = useParams();
  const { Title } = Typography;
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const store = useFollowingCLassesDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    deleteRecord: state.deleteRecord,
  }));

  const handleActionClick = ({ action, record }: ActionProps) => {
    if (action === 'edit') {
      navigate(`../beneficiary_details/following_classes/${id}`, {
        state: { id: record?.id },
      });
    }
    else if (action === 'delete') {
      store.deleteRecord(record.id);
    }
  };

  React.useEffect(() => {
    fetchSettings();
    store.getRecords(id);
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
        <Title level={5}>Following Classes</Title>
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

export default FollowingClassesList;

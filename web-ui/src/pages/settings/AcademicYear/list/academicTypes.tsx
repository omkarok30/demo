import React from 'react';
import { Card, Radio, Table } from 'antd';

import { ColumnsType } from 'antd/lib/table';
import * as modelAcademicYear from '@/models/settings/AcademicYear';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useSettings } from '@/store/settings/useSettings';

const AcademicTypes = () => {
  const storeAcademicYear = useAcademicYear(
    (state: any) => ({
      allAcademicYearDetails: state.allRecords,
      getAcademicYearDetails: state.getAcademicYearDetails,
      updateRecord: state.updateRecord,
    }),
  );

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const handleRadioClick = ({ value, record }) => {
    storeAcademicYear.updateRecord(record.id, { id: record.id, fyDeptType: value });
  };

  React.useEffect(() => {
    fetchSettings();
    storeAcademicYear.getAcademicYearDetails();
  }, [storeAcademicYear.getAcademicYearDetails]);

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelAcademicYear.academicTypesColumns();
    cols.push({
      title: 'Academic Type',
      key: 'fyDeptType',
      render: (_, record) => [
        <Radio.Group
          options={modelAcademicYear.optionsFyDeptType}
          value={record.fyDeptType}
          optionType="button"
          buttonStyle="solid"
          onChange={(e) => {
            const value = e.target.value;
            handleRadioClick({ value, record });
          }}
        />,
      ],
    });
    return cols;
  }, [settings]);

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="FY Academics Type"
      >
        <Table bordered columns={columns} dataSource={storeAcademicYear.allAcademicYearDetails} />
      </Card>
    </div>
  );
};

export default AcademicTypes;

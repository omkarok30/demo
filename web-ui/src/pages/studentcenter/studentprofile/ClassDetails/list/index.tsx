import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { Space, Table } from 'antd';
import { useClassDetails } from '@/store/StudentCenter/usecelassDetails';
import { useSettings } from '@/store/settings/useSettings';
import * as modalCLassDetails from '@/models/studentCenter/classDetails/ClassDetails';
import { ModeAsText } from '@/pages/admissions/StudentRecord/CoCurricularActivity/AddOnCertificateDetails/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import OverallResult from '@/pages/studentcenter/studentprofile/overallResult/list';

const renderers = {
  academicYear: (value: string) => <YearAsText value={value} />,
  mode: (value: string) => <ModeAsText value={value} />,
};
const AddOnCertificateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeClassDetails = useClassDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    deleteRecord: state.deleteRecord,
  }));

  const navigateToNewForm = () => {
    navigate(`../co-curricular/addoncertificate_details/new/${id}`);
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(
        `../co-curricular/addoncertificate_details/${record?.id}/${id}`,
        {
          state: { id: record?.id },
        },
      );
    }
    else if (action === 'delete') {
      storeClassDetails.deleteRecord(record.id);
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeClassDetails.getRecords(id);
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modalCLassDetails.columns(settings);
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);
  return (
    <div className="layout-main-content">
      <Space> Class Details</Space>
      <Table
        bordered
        columns={columns}
        dataSource={storeClassDetails.allRecords}
        scroll={{ x: 300 }}
      />
      <OverallResult />
    </div>
  );
};

export default AddOnCertificateDetails;

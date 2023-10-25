import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { Button, Card, Table } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useAddOnCertificateDetails } from '@/store/admissions/useAddOnCertificateDetails';
import { useSettings } from '@/store/settings/useSettings';
import * as modelAddOnCertificateDetails from '@/models/admissions/studentRecords/AddOnCertificateDetails';
import { isEmptyValue } from '@/utils/object';
import { ModeAsText } from '@/pages/admissions/StudentRecord/CoCurricularActivity/AddOnCertificateDetails/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const renderers = {
  academicYear: (value: string) => <YearAsText value={value} />,
  mode: (value: string) => <ModeAsText value={value} />,
};
const AddOnCertificateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeAddOnCertificateDetails = useAddOnCertificateDetails(
    (state: any) => ({
      allRecords: state.allRecords,
      getRecords: state.getRecords,
      deleteRecord: state.deleteRecord,
    }),
  );

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
      storeAddOnCertificateDetails.deleteRecord(record.id);
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeAddOnCertificateDetails.getRecords(id);
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelAddOnCertificateDetails.columns(settings);
    cols.push({
      title: 'Document',
      dataIndex: 'Document',
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
      <Card bordered={false} title="Add-On/Certificate Courses "></Card>
      <Table
        bordered
        columns={columns}
        dataSource={storeAddOnCertificateDetails.allRecords}
        scroll={{ x: 300 }}
      />
    </div>
  );
};

export default AddOnCertificateDetails;

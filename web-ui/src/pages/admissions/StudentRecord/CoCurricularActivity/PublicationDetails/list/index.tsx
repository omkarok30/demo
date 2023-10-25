import React from 'react';
import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import {
  Button,
  Col,
  Row,
  Space,
  Table,
} from 'antd';
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
import { When } from 'react-if';
import PublicationDetailsForm from '../form';
import { EditIcon } from '@/components/Icons/EditIcon';
import { DeleteIcon } from '@/components/Icons/DeleteIcon';

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
    } else if (action === 'delete') {
      storePublicationDetails.deleteRecord(record.id);
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storePublicationDetails.getRecords(id);
  }, []);

  const [technicalprops, setTechnicalprops] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });
  const technicalOk = (studentId: string, _values: any) => {
    setTechnicalprops({ ...technicalprops, open: false, id: '', studentId: '' });
  };
  const technicalCancel = () => {
    setTechnicalprops({ ...technicalprops, open: false, id: '', studentId: '' });
  };

  const editdetails = (editid: any) => {
    setTechnicalprops({
      ...technicalprops,
      open: true,
      studentId: `${id}`,
      id: editid,
    });
  };

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
                  type='link'
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
                  type='link'
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
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <span>
          <Button
            type='link'
            onClick={() => editdetails(`${record?.id}`)}
          >
            <EditIcon/>
          </Button>
          <Button
            type='link'
            style={{ color: 'red' }}
            onClick={() => handleActionClick({ action: 'delete', record })}
          >
            <DeleteIcon/>
          </Button>
        </span>,
      ],
    });
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);
  return (
    <div className='layout-main-content'>
      <Space> Publication Details</Space>
      <Row justify='end' key='publication-details'>
        <Col>
        </Col>
      </Row>
      <Table
        bordered
        columns={columns}
        dataSource={storePublicationDetails.allRecords}
        scroll={{ x: 300 }}
      />
      <When condition={technicalprops.open === true}>
        {() => (
          <PublicationDetailsForm
            {...technicalprops}
            handleOk={technicalOk}
            handleCancel={technicalCancel}
          />
        )}
      </When>
    </div>
  );
};

export default PublicationDetails;

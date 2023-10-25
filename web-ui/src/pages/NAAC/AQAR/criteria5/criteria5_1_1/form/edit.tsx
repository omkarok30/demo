import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Divider, Form } from 'antd';
import { useMemo } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { useCustomScholarHook } from '../renderers';
import * as modelCriteria511 from '@/models/NAAC/criteria5_1/criteria5_1_1';
import { useSettings } from '@/store/settings/useSettings';
import TableStudentDetail from '@/components/Naac/TableStudentDetail';
import NaacDataTable from '@/components/Naac/NaacDataTable';

const NaacCriteria511Edit = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');

  const { current, scholarsData } = useCustomScholarHook(yearId);
  const Criteria511Title = '5.1.1. Number of students benefited by scholarships and free ships provided by the Government during the year';

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelCriteria511.columnsScholarship(settings);
    // Update the seconds colums with dynamic data
    cols[1] = { title: 'Year', width: 100, render: (_: any, _record: any) => current?.year };
    cols[3].children[0] = {
      title: 'Number of students',
      dataIndex: 'studentBeneiciaryDetails$count',
      key: 'studentBeneiciaryDetails$count',
      width: 200,
      render: (_: any, record: any) => {
        return record.studentBeneiciaryDetails$governmentScheme ? <Link to={`../studentsList/?year=${yearId}&schemeNo=${record.studentBeneiciaryDetails$governmentScheme}`}>{record.studentBeneiciaryDetails$count}</Link> : '-';
      },
    };
    cols[3].children[1] = {
      title: 'Amount(Rs)',
      dataIndex: 'studentBeneiciaryDetails$sumgovernmentAmount',
      key: 'studentBeneiciaryDetails$sumgovernmentAmount',
      width: 200,
      render: (_: any, record: any) => {
        return record.studentBeneiciaryDetails$governmentScheme ? record.studentBeneiciaryDetails$sumgovernmentAmount : 0;
      },
    };
    cols[4].children[0] = {
      title: 'Number of students',
      dataIndex: 'studentBeneiciaryDetails$count',
      key: 'studentBeneiciaryDetails$count',
      width: 200,
      render: (_: any, record: any) => {
        return record.studentBeneiciaryDetails$privateScheme ? <Link to={`../studentsList/?year=${yearId}&schemeNo=${record.studentBeneiciaryDetails$privateScheme}`}>{record.studentBeneiciaryDetails$count}</Link> : '-';
      },
    };
    cols[4].children[1] = {
      title: 'Amount(Rs)',
      dataIndex: 'studentBeneiciaryDetails$sumprivateAmount',
      key: 'studentBeneiciaryDetails$sumprivateAmount',
      width: 200,
      render: (_: any, record: any) => {
        return record.studentBeneiciaryDetails$privateScheme ? record.studentBeneiciaryDetails$sumprivateAmount : 0;
      },
    };
    return cols;
  }, [settings, current]);

  return (
    <div className='layout-main-content'>
      <Form
      >
        <Card
          bordered={false}
          actions={[
            <Button onClick={() => navigate('../list')}>
              Back
            </Button>,
          ]}
        >
          <h3 style={{ margin: 0 }}>{Criteria511Title}</h3>

          <Divider />

          <TableStudentDetail benefitedTitle={'Number of students benefited by scholarships and freeships provided by the Government'} textContent='Percentage per year = (Number of students benefited by scholarships and freeships by the Government) / (Number of Students)*100' currentData={current} />

          <Divider style={{ margin: '1rem 0' }} />

          <NaacDataTable columns={columns} dataSource={scholarsData} downloadBtn />

        </Card>
      </Form >
    </div >
  );
};

export default NaacCriteria511Edit;

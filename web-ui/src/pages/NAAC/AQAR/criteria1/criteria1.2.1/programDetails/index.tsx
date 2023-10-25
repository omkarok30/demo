import { Button, Card, Divider } from 'antd';
import { useEffect, useMemo } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { useNavigate } from 'react-router-dom';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import { useNaacCriteria121 } from '@/store/NAAC/Criteria1/useNaacCriteria1_2_1';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import * as modelCriteria121 from '@/models/NAAC/criteria1/criteria1_2_1';
import calcPercentage from '@/utils/calculatePercent';

const NAACAQRProgramDetails = () => {
  const navigate = useNavigate();
  const title
    = '1.2.1. Number of Programmes in which Choice Based Credit System (CBCS)/ elective course system has been implemented';
  const storeProgramDetails = useProgramDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));
  const storeCriteria121 = useNaacCriteria121((state: any) => ({
    current: state.current,
    getRecord: state.getRecord,
  }));

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelCriteria121.programDetailsColumns();
    cols[4] = {
      dataIndex: 'implOfCbcs',
      title:
        'Status of implemetation of CBCS / elective course system (Yes/No)',
      width: 300,
      render: (_, record) => (record.implOfCbcs ? 'YES' : 'NO'),
    };
    cols[6] = {
      dataIndex: 'linkToDocument',
      title: 'Link to the Relevant Document',
      width: 300,
      render: (_, record) => (
         <a href={record.linkToDocument} target="_blank">{record.linkToDocument}</a>
      ),
    };
    return cols;
  }, []);

  useEffect(() => {
    storeCriteria121.getRecord('2023');
  }, []);

  return (
    <>
      <div className="layout-main-content">
        <h3>{title}</h3>
        <Divider />
        <Card
          bordered={false}
          actions={[
            <Button onClick={() => navigate('../yearWiseData')}>Back</Button>,
          ]}
        >
          <table style={{ border: '2px solid #f0f0f0' }}>
            <tbody className="ant-table-tbody">
              <tr>
                <td width={300}>
                  <b>{'Academic Year'}</b>
                </td>
                <td>{storeCriteria121.current?.academicYear}</td>
              </tr>
              <tr>
                <td width={300}>
                  <b>Number of Programs with CBCS / Elective Course System</b>
                </td>
                <td>
                  {storeCriteria121?.current?.degree_programme$cbcs$count}
                </td>
              </tr>
              <tr>
                <td width={300}>
                  <b>Number of Programs </b>
                </td>
                <td>{storeCriteria121?.current?.degree_programme$count}</td>
              </tr>
              <tr>
                <td width={300}>
                  <b>Percentage </b>
                </td>
                <td>
                  {storeCriteria121?.current?.degree_programme$cbcs$count
                    && calcPercentage(
                      storeCriteria121?.current?.degree_programme$cbcs$count,
                      storeCriteria121?.current?.degree_programme$count,
                    )}
                </td>
              </tr>
            </tbody>
          </table>
          <Divider style={{ margin: '1rem 0' }} />
          <NaacDataTable
            columns={columns}
            dataSource={storeProgramDetails.allRecords}
            downloadBtn
          />
        </Card>
      </div>
    </>
  );
};

export default NAACAQRProgramDetails;

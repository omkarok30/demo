import { useMemo, useState } from 'react';

import { Button, Card, Col, Divider, Row, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useCustomDataHook } from '../renderers';
import ModalProgramData from './modalProgramData';
import * as modelNaacProgram12 from '@/models/NAAC/extendedProfile/program/program_1_2';
import { useSettings } from '@/store/settings/useSettings';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import { attachRenderer } from '@/utils/tableExtras';

const renderers = {
  academicYear: (value: string) => <YearAsText value={value} />,
};

const NaacProgram12 = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const [selectedProgYear, setselectedProgYear] = useState<number | null>(null);

  const { yearOption, programmeCounts, handleAQARChange, optionsAcademicYear, getProgrammeRecord, programmeData } = useCustomDataHook();

  const programTitle = '1.2. Number of programs offered for the year';

  const handleGetData = (year: any) => {
    setselectedProgYear(year);
    getProgrammeRecord(year);
    setOpenModal(true);
  };

  const columns: ColumnsType<any> = useMemo(() => {
    let cols = modelNaacProgram12.columns(settings);
    cols[1] = {
      dataIndex: 'degreeProgramme$count',
      title: 'Number of programs offered',
      width: 300,
      render: (_, record) => record.degreeProgramme$count ? [<Button type='link' onClick={() => handleGetData(record.academicYear)}>{record.degreeProgramme$count}</Button>] : '-',
    };
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <Card bordered={false}>
        <Space.Compact direction="vertical">
          <h3 style={{ margin: 0 }}>{programTitle}</h3>
        </Space.Compact>
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} hideRatings />

        <Divider />

        <Row>
          <Col span={24}>
            <b>Year-wise Data</b>
            {programmeCounts && <NaacDataTable downloadBtn={false} columns={columns} dataSource={programmeCounts?.slice(0, 5)} />}
          </Col>

          <Divider />

          <Col span={24}>
            <FileDescriptionList criteria='1.2' title={programTitle} year={yearOption} />
          </Col>
        </Row>
      </Card>

      {
        useMemo(() => {
          return <ModalProgramData
            open={openModal}
            year={<YearAsText value={Number(selectedProgYear)} />}
            onHide={() => setOpenModal(false)}
            data={programmeData}
          />;
        }, [openModal, programmeData])
      }
    </div>
  );
};

export default NaacProgram12;

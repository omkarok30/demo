import React from 'react';
import { Button, Divider, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import { useSettings } from '@/store/settings/useSettings';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import { useTermDuration } from '@/store/Academics/programManagement/useTermDuration';

import * as modelTermDuration from '@/models/Academics/programManagement/termDuration';
import { isEmptyValue } from '@/utils/object';
import { attachRenderer } from '@/utils/tableExtras';
import { ClassAsText } from '@/components/Renderers/ClassAsText';

const renderers = {
  className: (value: string) => <ClassAsText value={value} />,
};
const SemesterPattern = (props: any) => {
  let year = props.year;
  if (year === '') {
    year = 0;
  }

  const navigate = useNavigate();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const storeProgramDetails = useProgramDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    allSemesterPatternPrograms: state.allSemesterPatternPrograms,
  }));

  const storeTermDuration = useTermDuration((state: any) => ({
    semsterallRecords: state.semsterallRecords,
    getRecords: state.getRecords,
  }));

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(
        `../edit/${record?.id}/${record?.className}/semester/${year}/${record?.programId}`,
        {
          state: { id: record?.id },
        },
      );
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeProgramDetails.getRecords();
    storeTermDuration.getRecords(year);
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelTermDuration.SemesterPatterncolumns();
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <Button
          type="link"
          onClick={() => handleActionClick({ action: 'edit', record })}
        >
          Edit
        </Button>,
      ],
    });
    cols = attachRenderer(cols, renderers);

    return cols;
  }, [settings]);
  const semesterPrograms = storeProgramDetails.allSemesterPatternPrograms;
  // const classOptions = todoLookUps.getState().className;
  const getClassLabel = (classId: any) => {
    if (classId === 1) {
      return 'First Year';
    }
    else if (classId === 2) {
      return 'Second Year';
    }
    else if (classId === 3) {
      return 'Third Year';
    }
    else if (classId === 4) {
      return 'Fourth Year';
    }
    else if (classId === 5) {
      return 'Fifth Year';
    }
    else if (classId === 6) {
      return 'Sixth Year';
    }
  };
  const classNames = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
  return (
    <div className="layout-main-content">
      <Divider orientation="left">Semester Pattern Programs</Divider>
      {semesterPrograms?.map((item: any) => {
        const termDurationdata = [];
        const programWiseRecord = _.filter(
          storeTermDuration.semsterallRecords,
          record => record.programId === item.id,
        );
        let classNameval = 0;
        for (let i = 1; i <= item.programDuration; i++) {
          const classLable = getClassLabel(i);
          const classValue = classNames[classNameval];
          classNameval++;
          const classWiseRecord = _.filter(
            programWiseRecord,
            record => record.className === classValue,
          );
          if (isEmptyValue(classWiseRecord)) {
            termDurationdata.push({ id: 'new', className: classValue, programId: item.id });
          }
          else {
            const newRecord = classWiseRecord[0];
            newRecord.startDate1 = classWiseRecord[0].semester[0].startDate;
            newRecord.endDate1 = classWiseRecord[0].semester[0].endDate;
            newRecord.startDate2 = classWiseRecord[0].semester[1].startDate;
            newRecord.endDate2 = classWiseRecord[0].semester[1].endDate;
            termDurationdata.push(newRecord);
          }
        }

        return (
          <div>
            <b>{item.programmeName}</b>
            <Table bordered columns={columns} dataSource={termDurationdata} />
          </div>
        );
      })}
    </div>
  );
};

export default SemesterPattern;

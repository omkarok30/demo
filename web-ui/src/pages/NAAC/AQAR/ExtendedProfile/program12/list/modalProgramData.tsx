import { Button, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useMemo } from 'react';
import * as modelNaacProgram12 from '@/models/NAAC/extendedProfile/program/program_1_2';
import { useSettings } from '@/store/settings/useSettings';
import { attachRenderer } from '@/utils/tableExtras';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const renderers = {
  degreeProgramme$startYear: (value: string) => <YearAsText value={Number(value)} />,
};

const ModalProgramData = (props) => {
  const settings = useSettings((state: any) => state.byKeys);
  const columns: ColumnsType<any> = useMemo(() => {
    let cols = modelNaacProgram12.columnsCourse(settings);
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  return (
    <Modal
      open={props.open}
      onCancel={props.onHide}
      footer={[
        <Button
          key="link"
          onClick={() => props.onHide()}
        >
          Cancel
        </Button>,
      ]}
      width={700}
    >
      <h4 style={{ display: 'flex' }}>Academic Year: {props.year}</h4>
      <Table bordered columns={columns} dataSource={props.data} />
    </Modal>
  );
};

export default ModalProgramData;

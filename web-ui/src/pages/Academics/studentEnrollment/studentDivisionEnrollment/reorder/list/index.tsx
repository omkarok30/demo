import { Button, Card, Col, Row, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useViewUpdateStudentDivisionEnrollment } from '@/store/Academics/studentDivisionEnrollment/viewUpdateStudentDisivisionEnrollment/useViewUpdateStudentDivisionEnrollment';
import { useSettings } from '@/store/settings/useSettings';

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}
const TableRow = (props: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <tr
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
};

const ReorderDivision = () => {
  const [dataSource, setDataSource] = useState([]);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const navigate = useNavigate();

  const storeViewStudentDivistionEnrollment =
    useViewUpdateStudentDivisionEnrollment((state: any) => ({
      getRecords: state.getRecords,
      allRecords: state.allRecords,
      setYear: state.setYear,
      setClassName: state.setClassName,
      setSemester: state.setSemester,
      setDivisionId: state.setDivisionId,
      setProgram: state.setProgram,
      year: state.year,
      programId: state.programId,
      className: state.className,
      divisionId: state.divisionId,
      semester: state.semester,
      programName: state.programName,
      semesterName: state.semesterName,
      divisionName: state.divisionName,
    }));

  useEffect(() => {
    setDataSource(storeViewStudentDivistionEnrollment.allRecords);
  }, [storeViewStudentDivistionEnrollment.allRecords]);

  const columns: ColumnsType<any> = useMemo(() => {
    const cols: any = [];
    cols.unshift({
      title: 'Student Name',
      dataIndex: 'studentName',
      render: (_, record) => [
        <span>
          {record.studentInfo$lastName} {record.studentInfo$firstName}{' '}
          {record.studentInfo$middleName}
        </span>,
      ],
    });
    cols.unshift({
      title: 'SR no',
      dataIndex: 'id',
      render: (_, record) => [<span>{record.id}</span>],
    });
    return cols;
  }, [settings]);

  const goBack = () => {
    navigate('../');
  };

  const submitAssignStudentDivision = () => {
    console.log('check!');
    goBack();
  };

  return (
    <Card
      title="View/Update Division"
      key={2}>
      <Row style={{ marginBottom: 20 }}>
        <Col span={3}>
          Academic Year <Typography.Text type="danger">*</Typography.Text>
        </Col>
        <Col span={9}>{storeViewStudentDivistionEnrollment.year}</Col>

        <Col span={3}>
          Program <Typography.Text type="danger">*</Typography.Text>
        </Col>
        <Col span={9}>{storeViewStudentDivistionEnrollment.programName}</Col>
      </Row>
      <Row style={{ marginBottom: 20 }}>
        <Col span={3}>
          Class <Typography.Text type="danger">*</Typography.Text>
        </Col>
        <Col span={9}>{storeViewStudentDivistionEnrollment.className}</Col>

        <Col span={3}>
          Semester <Typography.Text type="danger">*</Typography.Text>
        </Col>
        <Col span={9}>{storeViewStudentDivistionEnrollment.semesterName}</Col>
      </Row>
      <Row style={{ marginBottom: 20 }}>
        <Col span={3}>
          Division <Typography.Text type="danger">*</Typography.Text>
        </Col>
        <Col span={9}>{storeViewStudentDivistionEnrollment.divisionName}</Col>
      </Row>

      <Row style={{ marginBottom: 20, justifyContent: 'center' }}>
        <Col span={3}>
          <Button
            title="Submit"
            type="primary"
            onClick={submitAssignStudentDivision}>
            Submit
          </Button>
        </Col>
        <Col span={3}>
          <Button
            title="Back"
            type="default"
            onClick={goBack}>
            Back
          </Button>
        </Col>
      </Row>
      <>
        <DndContext onDragEnd={onDragEnd}>
          <SortableContext
            // rowKey array
            items={dataSource.map((i) => i.key)}
            strategy={verticalListSortingStrategy}>
            <Table
              components={{
                body: {
                  row: TableRow,
                },
              }}
              rowKey="key"
              dataSource={dataSource}
              columns={columns}
            />
          </SortableContext>
        </DndContext>
      </>
    </Card>
  );
};

export default ReorderDivision;

import { Col, Row, Select, Space, Typography } from 'antd';

interface OptionAcademic {
  value: number;
  label: string;
}
interface IProps {
  typeOfNaac?: string;
  yearOption: string;
  optionsAcademicYear: Array<OptionAcademic>;
  handleAQARChange: (value: string) => void;
  calcAverage?: Array<any>;
  hideRatings?: Boolean;
}

function YearOptionAndRatings(props: IProps) {
  const { yearOption, optionsAcademicYear, handleAQARChange, calcAverage, hideRatings } = props;

  return (
    <Row align='middle' justify={'space-between'}>
      <Col span={12}>
        <Space>
          <b>AQAR Year:</b>
          <Select
            style={{ width: 200 }}
            value={yearOption}
            options={optionsAcademicYear}
            defaultValue={yearOption}
            onChange={value => handleAQARChange(value)}
          />
        </Space>
      </Col>
      {!hideRatings && <Col span={8}>
        <Space size={60}>
          <Typography.Text><b>Internal Rating:-</b></Typography.Text>
          <Typography.Text><b>External Rating:-</b></Typography.Text>
        </Space>
      </Col>}

    </Row>
  );
}

export default YearOptionAndRatings;

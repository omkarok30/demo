import React, { useState } from "react";
import { Button, Card, Table, Form, Input, Space, Select } from "antd";
import { useNavigate } from "react-router-dom";

import { ColumnsType } from "antd/lib/table";
import { useSettings } from "@/store/settings/useSettings";
import { useManageCoursesDetails } from "@/store/Academics/courseManagement/manageCourses/useManageCoursesDetails";
import * as modelManageCourses from "@/models/Academics/courseManagement/manageCourses/ManageCourses";
import _ from "lodash";
import { useProgramDetails } from "@/store/settings/useProgramDetails";
import { attachRenderer } from "@/utils/tableExtras";
import { CurriculumAsText } from "../../../renderers";
const renderers = {
  curriculumComp: (value: string) => <CurriculumAsText value={value} />
};
const ActiveManageCoursesList = () => {
  const navigate = useNavigate();
  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
    fetchSettings: state.fetchSettings
  }));
  const [activeCourseRecords, setActiveCourseRecords] = useState([]);

  const storeManageCourses = useManageCoursesDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    activeCourseRecord: state.activeCourseRecord,
    inactiveCourseRecord: state.inactiveCourseRecord,
    inActivateCourse: state.inActivateCourse
  }));
  const storeProgramDetails = useProgramDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords
  }));

  React.useEffect(() => {
    settings.fetchSettings();
    storeManageCourses.getRecords();
    storeProgramDetails.getRecords();
  }, []);

  React.useEffect(() => {
    setActiveCourseRecords(storeManageCourses?.activeCourseRecord);
  }, [storeManageCourses?.activeCourseRecord]);

  const handleActionClick = ({ action, record }) => {
    if (action === "edit") {
      navigate(`../edit/${record?.id}`, { state: { id: record?.id } });
    } else if (action === "inactivate") {
      const data = { inactive: 1 };
      storeManageCourses.inActivateCourse(record?.id, data);
    } else if (action === "activate") {
      const data = { inactive: 2 };
      storeManageCourses.inActivateCourse(record?.id, data);
    }
  };

  const [selectDegreeLevel, setDegreeLevel] = useState();
  const [selectFacultyStudy, setFacultyStudy] = useState();
  const [selectProgramDetails, setProgramDetails] = useState();
  const [programOptions, setProgramOptions] = useState([]);

  const optionsLevelOfEducation = React.useMemo(
    () => settings.asSelect("level_of_education") || [],
    [settings.byKeys]
  );

  const faculty_study = React.useMemo(
    () => settings.asSelect("faculty_study") || [],
    [settings.byKeys]
  );

  let optionsProgramDetailss: any = _.map(
    storeProgramDetails.allRecords,
    (record) => ({
      value: record.id,
      label: `${record.programmeName} (${record.programCode})`,
      facultyOfStudy: record.facultyOfStudy
    })
  );

  React.useEffect(() => {
    if (!selectDegreeLevel) {
      const first = _.first(optionsLevelOfEducation);
      const value = _.get(first, ["value"], "");
      setDegreeLevel(value);
    }
  }, [optionsLevelOfEducation]);
  React.useEffect(() => {
    if (!selectFacultyStudy) {
      const first = _.first(faculty_study);
      const value = _.get(first, ["value"], "");
      setFacultyStudy(value);
      setProgramLevelEvent(value);
    }
  }, [faculty_study, optionsProgramDetailss]);
  React.useEffect(() => {
    if (!selectProgramDetails) {
      const first: any = _.first(programOptions);
      const value = _.get(first, ["value"], "");
      setProgramDetails(value);
    }
  }, [optionsProgramDetailss]);

  React.useEffect(() => {
    storeManageCourses.getRecords(selectDegreeLevel, selectProgramDetails);
  }, [selectDegreeLevel, selectProgramDetails]);

  const setDegreeLevelEvent = (event) => {
    setDegreeLevel(event);
  };
  const setProgramLevelEvent = (event) => {
    setFacultyStudy(event);

    if (optionsProgramDetailss) {
      let filter: any = optionsProgramDetailss.filter(
        (e) => e.facultyOfStudy === event
      );

      if (filter?.length > 0) {
        const first = _.first(filter);
        const value = _.get(first, ["value"], "");
        setProgramDetails(value);
      } else {
        let test;
        setProgramDetails(test);
      }
      setProgramOptions(filter);
    }

    // setDegreeLevel(event);
  };
  const setsetProgramDetailsEvent = (event) => {
    setProgramDetails(event);
  };

  const onSearchSubmit = (values: any) => {
    const searchString = values.target.value.trim();
    let serachResult = storeManageCourses.activeCourseRecord?.filter(
      (data) => data.name.toLowerCase().indexOf(searchString.toLowerCase()) >= 0
    );
    setActiveCourseRecords(serachResult);
  };

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelManageCourses.columns(settings);
    cols.push({
      title: "Action",
      key: "action",
      render: (_, record) => [
        <span>
          <Button
            type="primary"
            onClick={() => handleActionClick({ action: "edit", record })}
          >
            Edit
          </Button>

          <Button
            className="mt-3"
            type="primary"
            danger
            onClick={() => handleActionClick({ action: "inactivate", record })}
          >
            Deactivate
          </Button>
        </span>
      ]
    });
    cols = attachRenderer(cols, renderers);

    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <Card bordered={false}>
        <div className="row" style={{ display: "flex" }}>
          <div className="col-md-6">
            <Space>
              Faculty of Program:
              <Select
                style={{ minWidth: 300 }}
                value={selectFacultyStudy}
                options={faculty_study}
                onChange={(event) => setProgramLevelEvent(event)}
              />
            </Space>
          </div>
          <div className="col-md-6 md-ml-5">
            <Space>
              Degree Level:
              <Select
                style={{ minWidth: 300 }}
                value={selectDegreeLevel}
                options={optionsLevelOfEducation}
                onChange={(event) => setDegreeLevelEvent(event)}
              />
            </Space>
          </div>
        </div>
        <div className="row mt-5" style={{ display: "flex" }}>
          <div className="col-md-6 ">
            <Space>
              Program:
              <Select
                style={{ minWidth: 300 }}
                value={selectProgramDetails}
                options={programOptions}
                onChange={(event) => setsetProgramDetailsEvent(event)}
              />
            </Space>
          </div>
        </div>
        <div className="w-md mt-5">
          <Form onFinish={onSearchSubmit} autoComplete="off">
            <Form.Item name="searchCourse" label="Search Course">
              <Input placeholder="Enter Course Name" onKeyUp={onSearchSubmit} />
            </Form.Item>
          </Form>
        </div>

        <Table
          scroll={{ x: 350 }}
          bordered
          columns={columns}
          dataSource={activeCourseRecords}
        />
      </Card>
    </div>
  );
};

export default ActiveManageCoursesList;

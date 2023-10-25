import React from "react";
import _ from "lodash";
import { useManageCoursesDetails } from "@/store/Academics/courseManagement/manageCourses/useManageCoursesDetails";

export const CourseAsText = (props) => {
  const storeManageCourses = useManageCoursesDetails((state: any) => ({
    courseTextRecords: state.courseTextRecords
  }));

  const [label, setLabel] = React.useState();

  React.useEffect(() => {
    const value = props.value;
    const r = storeManageCourses.courseTextRecords.find(
      (e) => e.id == props.value
    );
    setLabel(_.get(r, ["name"], value));
  }, [props.value, storeManageCourses.courseTextRecords]);

  return <div>{label}</div>;
};

import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Table,
  Form,
  Input,
  Space,
  Collapse,
  Select,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";

const { Panel } = Collapse;
import { useSettings } from "@/store/settings/useSettings";
import { DepartmentAsText } from "@/pages/settings/AcademicDept/renderers";
import { attachRenderer } from "@/utils/tableExtras";
import PublicationDetailsList from "../DetailsOfActivity/PublicationDetails/list";
import SponsoredResearchDetailsList from "../DetailsOfActivity/SponsoredResearchDetails/list";
import ConsultancyIndustryDetails from "./ConsultancyIndustryDetails/list";
import CorporateTrainingDetailsList from "./CorporateTrainingDetails/list";
import GuidedStudentDetailsList from "./GuidedStudentDetails/list";
import GuestLecturerDetailsList from "./GuestLecturerDetails/list";
import InnovationInTeachingLearningList from "./InnovationInTeachingLearning/list";
import MemberAcademicCouncilList from "./MemberAcademicCouncil/list";
import EmployeeSttpDetailsList from "./SttpDetails/list";
import EmployeeBookDetailsList from "./BookDetails/list";
import EmployeePatentDetailsList from "./PatentDetails/list";
import SemesterEndQuestionPapersDetails from "./SemesterEndQuestionPapersDetails/list";
import ExtentionActivityDetailsList from "./ExtentionActivityDetails/list";
import DevelopmentActivityDetailsList from "./DevelopmentActivityDetails/list";
import EmployeeOnlineCoursesDetailsList from "./OnlineCoursesDetails/list";
const typeOfActivity = todoLookUps.getState().typeOfActivity;
const types = todoLookUps.getState().types;
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';
import { When } from 'react-if';
const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />,
};
import { todoLookUps } from "@/store/todoLookUps";
import EmployeeEmployeeAssessmentEvaluationList from "./EmployeeAssessmentEvaluation/list";
import EmployeeDesignAndDevelopmentList from "./DesignAndDevelopment/list";
import EmployeePublicationDetailsFormEdit from "./PublicationDetails/form/edit";
import EmployeeSttpDetailsForm from "./SttpDetails/form/edit";
import EmployeeBookDetailsForm from "./BookDetails/form/edit";
import EmployeePatentDetailsForm from "./PatentDetails/form/edit";
import EmployeeSponsoredResearchDetailsEdit from "./SponsoredResearchDetails/form/edit";
import EmployeeConsultancyIndustryDetailsEdit from "./ConsultancyIndustryDetails/form/edit";
import DevelopmentActivityDetailsEdit from "./DevelopmentActivityDetails/form/edit";
import EmployeeCorporateTrainingDetailsEdit from "./CorporateTrainingDetails/form/edit";
import EmployeeGuestLecturerDetailsEdit from "./GuestLecturerDetails/form/edit";
import InnovationInTeachingLearningEdit from "./InnovationInTeachingLearning/form/edit";
import ExtentionActivityDetailsEdit from "./ExtentionActivityDetails/form/edit";
import EmployeeOnlineCoursesDetailsForm from "./OnlineCoursesDetails/form/edit";
import EmployeeMemberAcademicCouncilEdit from "./MemberAcademicCouncil/form/edit";
import SemesterEndQuestionPapersDetailsEdit from "./SemesterEndQuestionPapersDetails/form/edit";
import EmployeeDesignAndDevelopmentForm from "./DesignAndDevelopment/form/edit";
import EmployeeAssessmentEvaluationModerationForm from "./EmployeeAssessmentEvaluation/form/edit";
const levelOfConference = todoLookUps.getState().levelOfConference;
const EmployeeDetailsActivity = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [type, setType] = useState("");
  const [isCurriculumDevelopment, setCurriculumDevelopment] = useState(false);
  const [subType, setSubType] = useState("");

  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  const handleChange = (value: string) => {
    setType(value);
    if (
      form.getFieldValue("TypeofActivity") ===
      "CURRICULUM DEVELOPMENT AND ASSESSMENT DETAILS"
    ) {
      setCurriculumDevelopment(true);
    } else {
      setCurriculumDevelopment(false);
    }
  };
  const handleChangeSubType = (value: string) => {
    setSubType(value);
  };

  const storeEmployeeDetails = useEmployeeDetails((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
  }));

  React.useEffect(() => {
    storeEmployeeDetails.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeEmployeeDetails.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeEmployeeDetails.current);
  }, [storeEmployeeDetails.current]);

  const [publicationProps, setPublicationProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });
  const [sttpProps, setSttpProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });
  const [bookProps, setBookProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });
  const [patentProps, setPatentProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });
  const [sponsoredProps, setSponsoredProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });
  const [consultancyIndustryProps, setConsultancyIndustryProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });
  const [developmentActivityProps, setDevelopmentActivityProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });

  const [corporateTrainingProps, setCorporateTrainingProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });

  const [guestLectureProps, setGuestLectureProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });

  const [innovationTeachingProps, setInnovationTeachingProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });

  const [extentionActivityProps, setExtentionActivityProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });

  const [onlineCourseProps, setOnlineCourseProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });

  const [memberAcademicProps, setMemberAcademicProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });
  const [semesterEndQuestioPaperProps, setSemesterEndQuestioPaperProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });

  const [designDevelopmentProps, setDesignDevelopmentProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });
  const [assessmentEvaluationProps, setAssessmentEvaluationProps] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });

  console.log("storeEmployeeDetails", storeEmployeeDetails.current)

  const publicationOk = (studentId: string, _values: any) => {
    setPublicationProps({ ...publicationProps, open: false, id: '', studentId: '' });
  };
  const publicationCancel = () => {
    setPublicationProps({ ...publicationProps, open: false, id: '', studentId: '' });
  };

  const sttpOk = (studentId: string, _values: any) => {
    setSttpProps({ ...sttpProps, open: false, id: '', studentId: '' });
  };
  const sttpCancel = () => {
    setSttpProps({ ...sttpProps, open: false, id: '', studentId: '' });
  };
  const bookOk = (studentId: string, _values: any) => {
    setBookProps({ ...bookProps, open: false, id: '', studentId: '' });
  };
  const bookCancel = () => {
    setBookProps({ ...bookProps, open: false, id: '', studentId: '' });
  };
  const patentOk = (studentId: string, _values: any) => {
    setPatentProps({ ...patentProps, open: false, id: '', studentId: '' });
  };
  const patentCancel = () => {
    setPatentProps({ ...patentProps, open: false, id: '', studentId: '' });
  };
  const sponsoredOk = (studentId: string, _values: any) => {
    setSponsoredProps({ ...sponsoredProps, open: false, id: '', studentId: '' });
  };
  const sponsoredCancel = () => {
    setSponsoredProps({ ...sponsoredProps, open: false, id: '', studentId: '' });
  };
  const consultancyIndustryOk = (studentId: string, _values: any) => {
    setConsultancyIndustryProps({ ...consultancyIndustryProps, open: false, id: '', studentId: '' });
  };
  const consultancyIndustryCancel = () => {
    setConsultancyIndustryProps({ ...consultancyIndustryProps, open: false, id: '', studentId: '' });
  };
  const developmentActivityOk = (studentId: string, _values: any) => {
    setDevelopmentActivityProps({ ...developmentActivityProps, open: false, id: '', studentId: '' });
  };
  const developmentActivityCancel = () => {
    setDevelopmentActivityProps({ ...developmentActivityProps, open: false, id: '', studentId: '' });
  };
  const corporateTrainingOk = (studentId: string, _values: any) => {
    setCorporateTrainingProps({ ...corporateTrainingProps, open: false, id: '', studentId: '' });
  };
  const corporateTrainingCancel = () => {
    setCorporateTrainingProps({ ...corporateTrainingProps, open: false, id: '', studentId: '' });
  };
  const guestLectureOk = (studentId: string, _values: any) => {
    setGuestLectureProps({ ...guestLectureProps, open: false, id: '', studentId: '' });
  };
  const guestLectureCancel = () => {
    setGuestLectureProps({ ...guestLectureProps, open: false, id: '', studentId: '' });
  };

  const innovationTeachingOk = (studentId: string, _values: any) => {
    setInnovationTeachingProps({ ...innovationTeachingProps, open: false, id: '', studentId: '' });
  };
  const innovationTeachingCancel = () => {
    setInnovationTeachingProps({ ...innovationTeachingProps, open: false, id: '', studentId: '' });
  };

  const extentionActivityOk = (studentId: string, _values: any) => {
    setExtentionActivityProps({ ...extentionActivityProps, open: false, id: '', studentId: '' });
  };
  const extentionActivityCancel = () => {
    setExtentionActivityProps({ ...extentionActivityProps, open: false, id: '', studentId: '' });
  };

  const onlineCourseOk = (studentId: string, _values: any) => {
    setOnlineCourseProps({ ...onlineCourseProps, open: false, id: '', studentId: '' });
  };
  const onlineCourseCancel = () => {
    setOnlineCourseProps({ ...onlineCourseProps, open: false, id: '', studentId: '' });
  };

  const memberAcademicOk = (studentId: string, _values: any) => {
    setMemberAcademicProps({ ...memberAcademicProps, open: false, id: '', studentId: '' });
  };
  const memberAcademicCancel = () => {
    setMemberAcademicProps({ ...memberAcademicProps, open: false, id: '', studentId: '' });
  };

  const semesterEndQuestioPaperOk = (studentId: string, _values: any) => {
    setSemesterEndQuestioPaperProps({ ...semesterEndQuestioPaperProps, open: false, id: '', studentId: '' });
  };
  const semesterEndQuestioPaperCancel = () => {
    setSemesterEndQuestioPaperProps({ ...semesterEndQuestioPaperProps, open: false, id: '', studentId: '' });
  };

  const designDevelopmentOk = (studentId: string, _values: any) => {
    setDesignDevelopmentProps({ ...designDevelopmentProps, open: false, id: '', studentId: '' });
  };
  const designDevelopmentCancel = () => {
    setDesignDevelopmentProps({ ...designDevelopmentProps, open: false, id: '', studentId: '' });
  };

  const assessmentEvaluationOk = (studentId: string, _values: any) => {
    setAssessmentEvaluationProps({ ...assessmentEvaluationProps, open: false, id: '', studentId: '' });
  };
  const assessmentEvaluationCancel = () => {
    setAssessmentEvaluationProps({ ...assessmentEvaluationProps, open: false, id: '', studentId: '' });
  };

  return (
    <div className="layout-main-content">
      <When condition={publicationProps.open === true}>
        {() => (
          <EmployeePublicationDetailsFormEdit
            {...publicationProps}
            handleOk={publicationOk}
            handleCancel={publicationCancel}
          />
        )}
      </When>

      <When condition={sttpProps.open === true}>
        {() => (
          <EmployeeSttpDetailsForm
            {...sttpProps}
            handleOk={sttpOk}
            handleCancel={sttpCancel}
          />
        )}
      </When>
      <When condition={bookProps.open === true}>
        {() => (
          <EmployeeBookDetailsForm
            {...bookProps}
            handleOk={bookOk}
            handleCancel={bookCancel}
          />
        )}
      </When>
      <When condition={patentProps.open === true}>
        {() => (
          <EmployeePatentDetailsForm
            {...patentProps}
            handleOk={patentOk}
            handleCancel={patentCancel}
          />
        )}
      </When>
      <When condition={sponsoredProps.open === true}>
        {() => (
          <EmployeeSponsoredResearchDetailsEdit
            {...sponsoredProps}
            handleOk={sponsoredOk}
            handleCancel={sponsoredCancel}
          />
        )}
      </When>
      <When condition={consultancyIndustryProps.open === true}>
        {() => (
          <EmployeeConsultancyIndustryDetailsEdit
            {...consultancyIndustryProps}
            handleOk={consultancyIndustryOk}
            handleCancel={consultancyIndustryCancel}
          />
        )}
      </When>
      <When condition={developmentActivityProps.open === true}>
        {() => (
          <DevelopmentActivityDetailsEdit
            {...developmentActivityProps}
            handleOk={developmentActivityOk}
            handleCancel={developmentActivityCancel}
          />
        )}
      </When>
      <When condition={corporateTrainingProps.open === true}>
        {() => (
          <EmployeeCorporateTrainingDetailsEdit
            {...corporateTrainingProps}
            handleOk={corporateTrainingOk}
            handleCancel={corporateTrainingCancel}
          />
        )}
      </When>
      <When condition={guestLectureProps.open === true}>
        {() => (
          <EmployeeGuestLecturerDetailsEdit
            {...guestLectureProps}
            handleOk={guestLectureOk}
            handleCancel={guestLectureCancel}
          />
        )}
      </When>
      <When condition={innovationTeachingProps.open === true}>
        {() => (
          <InnovationInTeachingLearningEdit
            {...innovationTeachingProps}
            handleOk={innovationTeachingOk}
            handleCancel={innovationTeachingCancel}
          />
        )}
      </When>
      <When condition={extentionActivityProps.open === true}>
        {() => (
          <ExtentionActivityDetailsEdit
            {...extentionActivityProps}
            handleOk={extentionActivityOk}
            handleCancel={extentionActivityCancel}
          />
        )}
      </When>
      <When condition={onlineCourseProps.open === true}>
        {() => (
          <EmployeeOnlineCoursesDetailsForm
            {...onlineCourseProps}
            handleOk={onlineCourseOk}
            handleCancel={onlineCourseCancel}
          />
        )}
      </When>
      <When condition={memberAcademicProps.open === true}>
        {() => (
          <EmployeeMemberAcademicCouncilEdit
            {...memberAcademicProps}
            handleOk={memberAcademicOk}
            handleCancel={memberAcademicCancel}
          />
        )}
      </When>
      <When condition={semesterEndQuestioPaperProps.open === true}>
        {() => (
          <SemesterEndQuestionPapersDetailsEdit
            {...semesterEndQuestioPaperProps}
            handleOk={semesterEndQuestioPaperOk}
            handleCancel={semesterEndQuestioPaperCancel}
          />
        )}
      </When>
      <When condition={designDevelopmentProps.open === true}>
        {() => (
          <EmployeeDesignAndDevelopmentForm
            {...designDevelopmentProps}
            handleOk={designDevelopmentOk}
            handleCancel={designDevelopmentCancel}
          />
        )}
      </When>
      <When condition={assessmentEvaluationProps.open === true}>
        {() => (
          <EmployeeAssessmentEvaluationModerationForm
            {...assessmentEvaluationProps}
            handleOk={assessmentEvaluationOk}
            handleCancel={assessmentEvaluationCancel}
          />
        )}
      </When>
      <div className="w">
        <Collapse
          defaultActiveKey={["1"]}
          onChange={onChange}
          expandIcon={({ isActive }) =>
            !isActive ? <PlusCircleOutlined /> : <MinusCircleOutlined />
          }
        >
          <Panel header="Add" key="1">
            <Form form={form} layout="vertical" autoComplete="off">
              <Form.Item
                name="TypeofActivity"
                label="Type of Activity"
                style={{ flex: 1, marginRight: 10, fontWeight: "bold" }}
              >
                <Select
                  style={{ textTransform: "uppercase" }}
                  placeholder="SELECT FROM DROPDOWN"
                  allowClear
                  onChange={handleChange}
                  options={typeOfActivity}
                />
              </Form.Item>
              {isCurriculumDevelopment ? (
                <>
                  <Form.Item
                    name="Types"
                    label="Types"
                    style={{ flex: 1, marginRight: 10, fontWeight: "bold" }}
                  >
                    <Select
                      style={{ textTransform: "uppercase" }}
                      placeholder="SELECT FROM DROPDOWN"
                      allowClear
                      onChange={handleChangeSubType}
                      options={types}
                    />
                  </Form.Item>
                </>
              ) : (
                ""
              )}
            </Form>
            {!isCurriculumDevelopment ? (
              <>
                <Button
                  className="mt-4"
                  type="primary"
                  onClick={() => {
                    if (type === "PUBLICATION") {
                      //navigate(`/Employee/employee_publication_details/edit/${id}/new`);

                      setPublicationProps({
                        ...publicationProps,
                        open: true,
                        studentId: `${id}`,
                        id: 'new',
                        //event: `${urlParam}`,
                      });

                    } else if (type === "STTP/WORKSHOP/FDTP/FDP/STC") {
                      //navigate(`/Employee/employee_sttp/edit/${id}/new`);
                      setSttpProps({
                        ...sttpProps,
                        open: true,
                        studentId: `${id}`,
                        id: 'new',
                        //event: `${urlParam}`,
                      });
                    } else if (type === "BOOK") {
                      //navigate(`/Employee/employee_book_details/edit/${id}/new`);
                      setBookProps({
                        ...bookProps,
                        open: true,
                        studentId: `${id}`,
                        id: 'new',
                        //event: `${urlParam}`,
                      });
                    } else if (type === "PATENT") {
                      //navigate(`/Employee/employee_patent_details/edit/${id}/new`);
                      setPatentProps({
                        ...patentProps,
                        open: true,
                        studentId: `${id}`,
                        id: 'new',
                        //event: `${urlParam}`,
                      });
                    } else if (type === "SPONSORED RESEARCH") {
                      // navigate(
                      //   `/Employee/employee_sponsored_research_details/edit/new`
                      // );
                      setSponsoredProps({
                        ...sponsoredProps,
                        open: true,
                        studentId: `${id}`,
                        id: 'new',
                        //event: `${urlParam}`,
                      });
                    } else if (type === "CONSULTANCY FROM INDUSTRY") {
                      // navigate(
                      //   `/Employee/employee_consultancy_industry_details/edit/new`
                      // );
                      setConsultancyIndustryProps({
                        ...consultancyIndustryProps,
                        open: true,
                        studentId: `${id}`,
                        id: 'new',
                        //event: `${urlParam}`,
                      });
                    } else if (type === "DEVELOPMENT ACTIVITY") {
                      // navigate(
                      //   `/Employee/employee_development_activity_details/edit/new`
                      // );
                      setDevelopmentActivityProps({
                        ...developmentActivityProps,
                        open: true,
                        studentId: `${id}`,
                        id: 'new',
                        //event: `${urlParam}`,
                      });
                    } else if (type === "GUEST LECTURE") {
                      // navigate(
                      //   `/Employee/employee_guest_lecturer_details/edit/new`
                      // );
                      setGuestLectureProps({
                        ...guestLectureProps,
                        open: true,
                        studentId: `${id}`,
                        id: 'new',
                        //event: `${urlParam}`,
                      });
                    } else if (type === "PG AND PHD STUDENTS GUIDED") {
                      navigate(
                        `/Employee/employee_guided_student_details/edit/new`
                      );
                    } else if (type === "INNOVATION IN TEACHING AND LEARNING") {
                      // navigate(
                      //   `/Employee/employee_innovation_in_teaching_learning/edit/new`
                      // );
                      setInnovationTeachingProps({
                        ...innovationTeachingProps,
                        open: true,
                        studentId: `${id}`,
                        id: 'new',
                        //event: `${urlParam}`,
                      });
                    } else if (
                      type === "CURRICULUM DEVELOPMENT AND ASSESSMENT DETAILS"
                    ) {
                      navigate(
                        `/Employee/employee_publication_details/edit/new`
                      );
                    } else if (type === "EXTENSION ACTIVITY") {
                      // navigate(
                      //   `/Employee/employee_extention_activity_details/edit/new`
                      // );
                      setExtentionActivityProps({
                        ...extentionActivityProps,
                        open: true,
                        studentId: `${id}`,
                        id: 'new',
                        //event: `${urlParam}`,
                      });
                    } else if (type === "ONLINE COURSES") {
                      // navigate(
                      //   `/Employee/employee_online_courses_details/edit/new`
                      // );
                      setOnlineCourseProps({
                        ...onlineCourseProps,
                        open: true,
                        studentId: `${id}`,
                        id: 'new',
                        //event: `${urlParam}`,
                      });
                    } else if (
                      type === "CURRICULUM DEVELOPMENT AND ASSESSMENT DETAILS"
                    ) {
                      navigate(
                        `/Employee/employee_publication_details/edit/new`
                      );
                    } else if (type === "CORPORATE TRAINING") {
                      // navigate(
                      //   `/Employee/employee_corporate_training_details/edit/new`
                      // );
                      setCorporateTrainingProps({
                        ...corporateTrainingProps,
                        open: true,
                        studentId: `${id}`,
                        id: 'new',
                        //event: `${urlParam}`,
                      });
                    }
                  }}
                >
                  ADD {type}
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="mt-4"
                  type="primary"
                  onClick={() => {
                    if (
                      subType ===
                      "MEMBER OF ACADEMIC COUNCIL/BOS OF AFFILIATING BOARD/UNIVERSITY DETAILS"
                    ) {
                      // navigate(
                      //   `/Employee/employee_member_academic_council_details/edit/new`
                      // );
                      setMemberAcademicProps({
                        ...memberAcademicProps,
                        open: true,
                        studentId: `${id}`,
                        id: 'new',
                        //event: `${urlParam}`,
                      });
                    } else if (
                      subType ===
                      "SETTING OF SEMESTER END QUESTION PAPERS DETAILS"
                    ) {
                      // navigate(
                      //   `/Employee/employee_semester_end_question_papers_details/edit/new`
                      // );
                      setSemesterEndQuestioPaperProps({
                        ...semesterEndQuestioPaperProps,
                        open: true,
                        studentId: `${id}`,
                        id: 'new',
                        //event: `${urlParam}`,
                      });
                    } else if (
                      subType === "DESIGN AND DEVELOPMENT OF CURRICULUM DETAILS"
                    ) {
                      // navigate(
                      //   `/Employee/employee_design_development/edit/new`
                      // );
                      setDesignDevelopmentProps({
                        ...designDevelopmentProps,
                        open: true,
                        studentId: `${id}`,
                        id: 'new',
                        //event: `${urlParam}`,
                      });
                    } else if (
                      subType === "ASSESSMENT/EVALUATION/MODERATION DETAILS"
                    ) {
                      // navigate(
                      //   `/Employee/employee_assessment_evaluation_moderation/edit/new`
                      // );
                      setAssessmentEvaluationProps({
                        ...assessmentEvaluationProps,
                        open: true,
                        studentId: `${id}`,
                        id: 'new',
                        //event: `${urlParam}`,
                      });
                    }
                  }}
                >
                  ADD {subType}
                </Button>
              </>
            )}
          </Panel>
          <Panel header="Publication Details" key="2">
            <PublicationDetailsList />
          </Panel>
          <Panel header="STTP/Workshop/FDTP/FDP/STC Details" key="3">
            <EmployeeSttpDetailsList empId={id} />
          </Panel>
          <Panel header="Book Details" key="4">
            <EmployeeBookDetailsList />
          </Panel>
          <Panel header="Patent Details" key="5">
            <EmployeePatentDetailsList />
          </Panel>
          <Panel header="Sponsored Research Details" key="6">
            <SponsoredResearchDetailsList />
          </Panel>
          <Panel header="Consultancy From Industry Details" key="7">
            <ConsultancyIndustryDetails />
          </Panel>
          <Panel header="Corporate Training Details" key="8">
            <CorporateTrainingDetailsList />
          </Panel>
          <Panel header="Development Activity Details" key="9">
            <DevelopmentActivityDetailsList />
          </Panel>
          <Panel header="Guided Student Details" key="10">
            <GuidedStudentDetailsList />
          </Panel>
          <Panel header="Guest Lecturer Details" key="11">
            <GuestLecturerDetailsList />
          </Panel>
          <Panel header="Innovation In Teaching And Learning Details" key="12">
            <InnovationInTeachingLearningList />
          </Panel>
          <Panel
            header="Member Of Academic Council/BOS Of Affiliating Board/University Details"
            key="13"
          >
            <MemberAcademicCouncilList />
          </Panel>
          <Panel
            header="Setting Of Semester End Question Papers Details"
            key="14"
          >
            <SemesterEndQuestionPapersDetails />
          </Panel>
          <Panel
            header=" Design And Development Of Curriculum Details"
            key="15"
          >
            <EmployeeDesignAndDevelopmentList />
          </Panel>
          <Panel header="Assessment/Evaluation/Moderation Details" key="16">
            <EmployeeEmployeeAssessmentEvaluationList />
          </Panel>
          <Panel header="Extention Activity Details" key="17">
            <ExtentionActivityDetailsList />
          </Panel>
          <Panel header="Online Courses Details" key="18">
            <EmployeeOnlineCoursesDetailsList />
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default EmployeeDetailsActivity;

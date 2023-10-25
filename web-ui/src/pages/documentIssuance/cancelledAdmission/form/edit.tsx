import React from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Form,
  Input,
  DatePicker,
  Checkbox,
  notification,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { isEmptyValue } from "@/utils/object";
import * as modelTransferenceCertificate from "@/models/documentIssuance/transferenceCertificate/transferenceCertificate";
import { useTransferenceCertificate } from "@/store/documentIssuance/useTransferenceCertificate";
import { useStudentInfo } from "@/store/admissions/useStudentInfo";

import { useSettings } from "@/store/settings/useSettings";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useGlobalState } from "@/store/global";
import { schemaValidator } from "@/utils/validate";
import moment from "moment";
import { useProgramDetails } from "@/store/settings/useProgramDetails";
const { TextArea } = Input;

const EditCancelledAdmission = () => {
  const { id, type,migration_status } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const settings = useSettings((state: any) => state.byKeys);
  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });
  const [isConfirm, setIsConfirm] =
    React.useState(false);
  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelTransferenceCertificate.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys]
  );
  //const employeePositions = React.useMemo(() => settings.get('employee_positions') || [], [settings]);

  const global = useGlobalState((state: any) => state.default);

  const storeTransferenceCertificate = useTransferenceCertificate(
    (state: any) => ({
      getRecord: state.getRecord,
      currentTransferenceCertificate: state.currentTransferenceCertificate,
      addRecord: state.addRecord,
      updateRecord: state.updateRecord,
    })
  );
  const storeStudentInfo = useStudentInfo((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
  }));
  const storeProgramDetails = useProgramDetails((state: any) => ({
    currentPrograms:state.current,
    getProgramsRecord: state.getRecord,
  }));
  const headerLabel = isNew ? "Add Admission" : "Cancel Admission";

  React.useEffect(() => {
    storeTransferenceCertificate.getRecord(id);

    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeTransferenceCertificate.currentTransferenceCertificate.id !== id) {
      return;
    }

    if (type ==="printoriginalTC") {
      form.setFieldsValue(
        storeTransferenceCertificate.currentTransferenceCertificate
      );
    }
    if (storeTransferenceCertificate.currentTransferenceCertificate) {
      storeStudentInfo.getRecord(
        storeTransferenceCertificate.currentTransferenceCertificate.studentId
      );
      form.setFieldsValue(storeStudentInfo.current);
    }
  }, [storeTransferenceCertificate.currentTransferenceCertificate]);
  React.useEffect(() => {
    form.setFieldValue(
      "fullName",
      storeStudentInfo.current.firstName +
        " " +
        storeStudentInfo.current.middleName +
        " " +
        storeStudentInfo.current.lastName
    );
    form.setFieldValue(
      "dateOfBirth",
      getDate(storeStudentInfo.current.dateOfBirth) +
        " " +
        getDateInWords(storeStudentInfo.current.dateOfBirth)
    );
    form.setFieldValue(
      "dateOfAdmission",
      getDate(storeStudentInfo.current.dateOfAdmission)
    ); 
    storeProgramDetails.getProgramsRecord(storeStudentInfo.current.programId)

  }, [storeStudentInfo.current]);
  React.useEffect(() => {
    form.setFieldValue(
      "degreeName",
      storeProgramDetails.currentPrograms.degreeName +
        " SINCE " +
        getYear(storeStudentInfo.current.dateOfAdmission)
    );
    form.setFieldValue(
      "leavingReason",
    
      storeProgramDetails.currentPrograms.degreeName +
        " IN " +
        getYearMonth(storeStudentInfo.current.dateOfAdmission)
    );
  }, [storeProgramDetails.currentPrograms]);
  const nvaigateToPreviousPage = () => {
    navigate(`/document/transference_certificate/list`, {
      state: { activeTab: "positions" },
    });
  };
  const onChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      form
        .validateFields()
        .then(async (values) => {
          setIsConfirm(true);
        })
        .catch(() => {
          setIsConfirm(false);
          notification.error({ message: "Please fill all required fields." });
          setSaveProgress({
            saving: false,
            disableSubmit: false,
            disableForm: false,
          });
        });
    } else {
      setIsConfirm(false);
    }
  };
  const getDateInWords = (data) => {
    var wDays = [
      "first",
      "second",
      "third",
      "fourth",
      "fifth",
      "sixth",
      "	seventh",
      "eighth",
      "ninth",
      "tenth",
      "eleventh",
      "twelfth",
      "thirteenth",
      "fourteenth",
      "fifteenth",
      "sixteenth",
      "seventeenth",
      "eighteenth",
      "nineteenth",
      "twentieth",
      "twenty-first",
      "twenty-second",
      "twenty-third",
      "twenty-fourth",
      "twenty-fifth",
      "twenty-sixth",
      "twenty-seventh",
      "twenty-eighth",
      "twenty-ninth",
      "thirtieth",
      "thirty-first",
    ];

    var wMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var wNumbers = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
      "twenty",
      "twentyone",
    ];
    let dateString = moment(data).format("YYYY-MM-DD");

    let date: any = new Date(dateString);
    var day = parseInt(date.getUTCDate()) - 1;
    var month = parseInt(date.getUTCMonth());
    var year = date.getUTCFullYear().toString();

    var x = year.charAt(0);
    var xx = year.charAt(1);
    var xxx = year.charAt(2);
    var xxxx = year.charAt(3);

    var a = parseInt(x + xx) - 1;
    var b = parseInt(xxx) - 1;
    var c = parseInt(xxxx) - 1;
   
    return (
      wDays[day] +
      " " +
      wMonths[month] +
      " " +
      wNumbers[a] +
      " " +
      wNumbers[b] +
      " " +
      wNumbers[c]
    );
  };
  const getDate = (data) => {
    let dateString = moment(data).format("DD-MM-YYYY");
    return dateString;
  };
  const getYear = (data) => {
    let dateString = moment(data).format("YYYY");
    let nextYear = moment(dateString).add(1, 'years').format("YY");
    return dateString+'-'+nextYear;
  };
  const getYearMonth = (data) => {
    let dateString = moment(data).format("YYYY");
    let month = moment(data).format("MMMM");

    return month+' '+dateString;
  };
  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeTransferenceCertificate.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: "Saved Successfully!",
              description: `Created record for ${record.firstName}`,
            });
          }
        } else {
          const record = await storeTransferenceCertificate.updateRecord(
            id,
            values
          );
          if (!isEmptyValue(record)) {
            notification.success({
              message: "Saved Successfully!",
              description: `Updated record for ${record.firstName}`,
            });
          }
        }
        setSaveProgress({
          saving: false,
          disableSubmit: true,
          disableForm: true,
        });
      })
      .catch(() => {
        notification.error({ message: "Validations failed" });
        setSaveProgress({
          saving: false,
          disableSubmit: false,
          disableForm: false,
        });
      });
  };
  return (
    <div className="layout-main-content">
      <Row
        justify="end"
        style={{ paddingBottom: 10, backgroundColor: "white" }}
      >
        <Col>
          <Button type="text" style={{ color: "red", fontSize: 16 }}>
            Note : * Indicates Mandatory Fields
          </Button>
        </Col>
      </Row>
      <Card bordered={false} title={headerLabel}>
        <Row className="justify-center">
          <Col span={12}>
            <Form form={form} layout="vertical" autoComplete="off">
              <Form.Item
                style={{ fontWeight: "bold" }}
                name="fullName"
                label="Name of the Candidate in full"
              >
                <Input disabled />
              </Form.Item>
              <label>
                Religion,caste & sub caste in the case of pupils belonging to
                Backward classes and category of Backward Classes (i.e. SC/ST/VJ
                and NT/OBC/SBC)
              </label>
              <div style={{ marginTop: 20, marginRight: 50, marginLeft: 50 }}>
                <Form.Item
                  style={{ fontWeight: "bold" }}
                  name="religion"
                  label="Religion"
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  style={{ fontWeight: "bold" }}
                  name="cast"
                  label="Caste"
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  style={{ fontWeight: "bold" }}
                  name="subcast"
                  label="Sub-caste"
                >
                  <Input disabled />
                </Form.Item>
              </div>
              <Form.Item
                style={{ fontWeight: "bold" }}
                name="birthPlace"
                label="Place of Birth"
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                style={{ fontWeight: "bold" }}
                name="dateOfBirth"
                label="Date of Birth,Month and Year according to the Christian year & the national calender both in words and figures"
              >
                <TextArea style={{ textTransform: "uppercase" }} disabled />
              </Form.Item>
              <Form.Item
                style={{ fontWeight: "bold" }}
                name="leavingNationality"
                label="Nationality"
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                style={{ fontWeight: "bold" }}
                name=""
                label="Institution last attended"
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                style={{ fontWeight: "bold" }}
                name="dateOfAdmission"
                label="Date of admission at this Institute"
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                style={{ fontWeight: "bold" }}
                name="degreeName"
                label="Course & Year in which studying and since when"
              >
                <TextArea disabled />
              </Form.Item>
              <Form.Item
                style={{ fontWeight: "bold" }}
                name="conduct"
                label="Conduct"
                rules={schemaRules}
                required
              >
                <Input disabled={migration_status==='1'}/>
              </Form.Item>
              <Form.Item
                style={{ fontWeight: "bold" }}
                name="dateOfLeave"
                label="Date of leaving this Institution"
                rules={schemaRules}
                required
              >
                <DatePicker
                  className="w-100%"
                  format={global.displayDateFormat}
                  disabled={migration_status==='1'}
                />
              </Form.Item>
              <Form.Item
                style={{ fontWeight: "bold" }}
                name="leavingReason"
                label="Reason of leaving this Institution"
                rules={schemaRules}
                required
              >
                <TextArea style={{ textTransform: "uppercase" }} disabled={migration_status==='1'}/>
              </Form.Item>
              <Form.Item
                style={{ fontWeight: "bold" }}
                name="remark"
                label="Remark"
           
              >
                <Input disabled={migration_status==='1'}/>
              </Form.Item>
              <Form.Item
                name="dateOfIssue"
                label="Date of Issue"
                style={{ fontWeight: "bold" }}
                rules={schemaRules}
                required
              >
                <DatePicker
                defaultValue={moment()}
                  className="w-100%"
                  format={global.displayDateFormat}
                />
              </Form.Item>
              <label style={{ fontWeight: "bold" }}>
                "Once an information is added, it cannot be deleted/Updated."
              </label>

              <Checkbox
                checked={isConfirm}
                onChange={onChange}
                style={{ fontWeight: "bold", marginTop: 10 }}
              >
                I confirm to submit the above information!
              </Checkbox>
              <Form.Item className="text-center">
                <Button disabled={!isConfirm} onClick={onFormSubmit} className="mt-4" type="primary">
                  Submit
                </Button>
                <Button onClick={nvaigateToPreviousPage} className="mt-4 ml-3">
                  Back
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default EditCancelledAdmission;

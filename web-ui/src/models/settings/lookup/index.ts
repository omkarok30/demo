import _ from 'lodash';
import * as yup from 'yup';
import { ColumnsType } from 'antd/lib/table';
import { columnRowNo } from '@/utils/tableExtras';
import { isStringsArray } from '@/utils/object';
import { HoverCell } from '@/components/Table/elements';

const valueModel = {
  model: {
    value: { type: 'string', db: 'value' },
  },
  columns: (settings: any) => {
    const cols: ColumnsType<any> = [
      columnRowNo(),
      { dataIndex: 'value', title: 'Value', render: text => HoverCell(text) },
    ];
    return cols;
  },
  schemaRules: yup.object().shape({
    value: yup.string().required('required'),
  }),
  formNew: (settings: any) => {
    const fields = {
      value: { input: 'input', title: 'Value' },
    };
    return fields;
  },
};

export const arrayToOptions = (value) => {
  if (!isStringsArray(value)) {
    return [];
  }
  const object = _.map(value, v => ({ label: v, value: v }));
  return object;
};

export const arrayToValueObject = (value) => {
  if (!isStringsArray(value)) {
    return value;
  }
  const object = _.map(value, v => ({ value: v }));
  return object;
};
export const valueObjectToString = (value) => {
  const inst = value?.constructor?.name || null;
  if (inst !== 'Object') {
    return '';
  }
  return _.get(value, ['value'], '');
};

const lookupItems = {
  // BD1 -Type of Entity
  type_entity: valueModel,
  // ["Company/Trust", "Educational Unit"];

  // BD2 - Type of Educational Unit
  type_educational_unit: valueModel,
  // ["Private", "State Government", "Central Government"]

  // BD3 - Level of Education
  level_of_education: valueModel,
  // ["UG", "PG", "Diploma", "PHD"]

  // BD4 - Faculty of Study
  faculty_study: valueModel,
  // ["Engineering", "Pharmacy", "Management", "Computer Applications", "Hotel Management", "Commerce"]

  // BD5 - Education Type
  education_type: valueModel,
  // ["Diploma Engineering", "Diploma Pharmacy", "UG Engineering", "UG Management", "PG Engineering"]

  // BD6 - Affiliation Type
  affiliation_type: valueModel,
  // ["Tier II", "Tier I (University/Board Affiliated)", "Tier I (Independent)"]

  // BD7 - Country
  country: valueModel,
  // ["India"]

  // BD8 - State
  state: valueModel,
  // ["Maharashtra", "Karnataka", "Delhi"]

  // BD9 - Examination Pattern
  exam_pattern: valueModel,
  // ["Annual", "Semester", "Trimester"]

  // BD10 - Academic Year
  academic_year: valueModel,
  // []

  // BD11 - User Access Types
  user_access_type: valueModel,
  // ["Admin", "Employee", "Student", "Parent", "Alumni", "Trustee/Director"]

  // BD12 - Board
  board: valueModel,
  // ["State Board", "CBSE", "ICSE"]

  // -- System Profiles -> Manage Positions
  positions: {
    model: {
      position: { type: 'string', db: 'position' },
      level: { type: 'string', db: 'level' },
      accessTo: { type: 'string', db: 'accessTo' },
    },
    columns: (settings: any) => {
      const cols: ColumnsType<any> = [
        columnRowNo(),
        { dataIndex: 'position', title: 'Position', render: text => HoverCell(text) },
        { dataIndex: 'level', title: 'Level' },
        { dataIndex: 'accessTo', title: 'Access to' },
      ];
      return cols;
    },
    schemaRules: yup.object().shape({
      position: yup.string().notRequired(),
      level: yup.string().notRequired(),
      accessTo: yup.string().notRequired(),
    }),
    formNew: (settings: any) => {
      const fields = {
        position: { input: 'input', title: 'Position' },
        level: { input: 'input', title: 'Level' },
        accessTo: { input: 'input', title: 'Access to' },
      };
      return fields;
    },
  },
  // [
  //   { "position": "CAMPUS INCHARGE", "level": "L1", "accessTo": "ACADEMICS ADMINISTRATIVE" },
  //   { "position": "RWORK ADMINISTRATOR", "level": "L1", "accessTo": "ADMINISTRATIVE ACADEMICS" },
  //   { "position": "PRINCIPAL", "level": "L1", "accessTo": "ACADEMICS ADMINISTRATIVE" },
  //   { "position": "VICE PRINCIPAL", "level": "L1", "accessTo": "ACADEMICS ADMINISTRATIVE" },
  //   { "position": "DEAN ACADEMICS", "level": "L2", "accessTo": "ACADEMICS" },
  //   { "position": "DEAN ADMISSIONS, PUBLICITY AND PROTOCOL", "level": "L2", "accessTo": "" },
  //   { "position": "DEAN STUDENTS", "level": "L2", "accessTo": "ACADEMICS" },
  //   { "position": "DEAN ADMINISTRATION", "level": "L2", "accessTo": "ADMINISTRATIVE" },
  //   { "position": "DEAN RESEARCH AND DEVELOPEMENT", "level": "L2", "accessTo": "" },
  //   { "position": "DEAN TRAINING, PLACEMENT AND INDUSTRY INTERACTION", "level": "L2", "accessTo": "ACADEMICS" },
  //   { "position": "NAAC CO-ORDINATOR", "level": "L2", "accessTo": "ACADEMICS ADMINISTRATIVE" },
  //   { "position": "NBA CO-ORDINATOR", "level": "L2", "accessTo": "ACADEMICS ADMINISTRATIVE" },
  //   { "position": "HEAD OF THE DEPARTMENT", "level": "L3", "accessTo": "ACADEMICS" },
  //   { "position": "ASSISTANT HEAD OF THE DEPARTMENT", "level": "L3", "accessTo": "ACADEMICS" },
  //   { "position": "REGISTRAR", "level": "L2", "accessTo": "ADMINISTRATIVE" },
  //   { "position": "LIBRARIAN", "level": "L2", "accessTo": "" },
  //   { "position": "ASSISTANT LIBRARIAN", "level": "L3", "accessTo": "" },
  //   { "position": "JUNIOR ASSISTANT LIBRARIAN", "level": "L3", "accessTo": "" },
  //   { "position": "NSS CO-ORDINATOR", "level": "L2", "accessTo": "ACADEMICS ADMINISTRATIVE" },
  //   { "position": "WORKSHOP IN-CHARGE", "level": "L3", "accessTo": "ACADEMICS" }
  // ]

  // -- System Profiles ->Manage Designations
  designations: valueModel,
  // ["ADJUNCT PROFESSOR", "ASSISTANT LIBRARIAN", "ASSISTANT PROFESSOR", "ASSOCIATE PROFESSOR", "DRIVER", "ELECTRICIAN", "I/C PRINCIPAL", "JR. ASSISTANT LIBRARIAN", "JR. CLERK", "LAB ASSISTANT", "LAB ATTENDANT", "LECTURER", "LIBRARIAN", "LIBRARY ASSISTANT", "LIBRARY ATTENDANT", "OFFICE SUPRINTENDENT", "PEON", "PRINCIPAL", "PROFESSOR", "REGISTAR"]

  // --System Profiles -> user_types
  user_types: valueModel,
  // ["STUDENT", "TEACHING STAFF", "TEACHING STAFF", "PARENT"]

  // -- System Profiles -> Manage Appointment Types
  appointment_types: {
    model: {
      appointmentType: { type: 'string', db: 'appointmentType' },
      subType: { type: 'string', db: 'subType' },
    },
    columns: (settings: any) => {
      const cols: ColumnsType<any> = [
        columnRowNo(),
        { dataIndex: 'appointmentType', title: 'Appointment type', render: text => HoverCell(text) },
        { dataIndex: 'subType', title: 'Sub type' },
      ];
      return cols;
    },
    schemaRules: yup.object().shape({
      appointmentType: yup.string().notRequired(),
      subType: yup.string().notRequired(),
    }),
    formNew: (settings: any) => {
      const fields = {
        appointmentType: { input: 'input', title: 'Appointment type' },
        subType: { input: 'input', title: 'Sub type' },
      };
      return fields;
    },
  },
  // [
  //   { "appointmentType": "TEMPORARY", "subType": "REGULAR STIPENDIARY" },
  //   { "appointmentType": "ADHOC", "subType": "REGULAR" },
  //   { "appointmentType": "CLOCK HOUR BASIS (CHB)", "subType": "CONTRACTUAL" },
  //   { "appointmentType": "APPROVED (PROBATION)", "subType": "REGULAR" },
  //   { "appointmentType": "APPROVED (PERMANENT)", "subType": "REGULAR" },
  //   { "appointmentType": "APPROVED (TEMPORARY)", "subType": "REGULAR" },
  //   { "appointmentType": "ADJUNCT", "subType": "CONTRACTUAL" },
  //   { "appointmentType": "CONTRACTUAL", "subType": "CONTRACTUAL" }
  // ]

  // -- System Profiles -> religions
  religions: valueModel,
  // ["HINDU", "ISLAM", "CHRISTAIN", "JAIN", "SIKH", "BUDDHIST", "MUSALMAN", "MUSLIM", "MUSLIM SHIKALGAR", "NAVBOUDHA", "NA"]

  // -- System Profiles -> Manage Castes
  castes: {
    model: {
      religionName: { type: 'string', db: 'religionName' },
      casteName: { type: 'string', db: 'casteName' },
    },
    columns: (settings: any) => {
      const cols: ColumnsType<any> = [
        columnRowNo(),
        { dataIndex: 'religionName', title: 'Religion name', render: text => HoverCell(text) },
        { dataIndex: 'casteName', title: 'Caste name' },
      ];
      return cols;
    },
    schemaRules: yup.object().shape({
      religionName: yup.string().notRequired(),
      casteName: yup.string().notRequired(),
    }),
    formNew: (settings: any) => {
      const fields = {
        religionName: { input: 'input', title: 'Religion name' },
        casteName: { input: 'input', title: 'Caste name' },
      };
      return fields;
    },
  },
  // [{ "religionName": "HINDU", "casteName": "AARYA VAISHYA KOMATI" }, { "religionName": "CHRISTAIN", "casteName": "ADI DRAVIDAR" }, { "religionName": "HINDU", "casteName": "BELDAR" }, { "religionName": "HINDU", "casteName": "BHAMTA RAJPUT" }, { "religionName": "HINDU", "casteName": "BHANA (BALMIKI)" }, { "religionName": "HINDU", "casteName": "BRAHMIN" }, { "religionName": "HINDU", "casteName": "BURUD" }, { "religionName": "HINDU", "casteName": "CHAMBHAR" }, { "religionName": "HINDU", "casteName": "DHANAGAR" }, { "religionName": "HINDU", "casteName": "DHOR" }, { "religionName": "JAIN", "casteName": "DIGAMBAR" }, { "religionName": "HINDU", "casteName": "GADI VADAR" }, { "religionName": "HINDU", "casteName": "GAVALI" }, { "religionName": "HINDU", "casteName": "GONDHALI" }, { "religionName": "HINDU", "casteName": "GOSAVI" }, { "religionName": "HINDU", "casteName": "GURAV" }, { "religionName": "HINDU", "casteName": "HANBAR" }, { "religionName": "HINDU", "casteName": "HOLAR" }, { "religionName": "BUDDHIST", "casteName": "JAIN DIGAMBAR" }, { "religionName": "BUDDHIST", "casteName": "JAIN-CHATURTH" }, { "religionName": "BUDDHIST", "casteName": "JANGAM" }, { "religionName": "HINDU", "casteName": "JANGAM" }, { "religionName": "SIKH", "casteName": "JAT" }, { "religionName": "HINDU", "casteName": "KAIKADI" }, { "religionName": "HINDU", "casteName": "KALAL" }, { "religionName": "SIKH", "casteName": "KAMBOJ" }, { "religionName": "ISLAM", "casteName": "KASAB" }, { "religionName": "HINDU", "casteName": "KASAR" }, { "religionName": "HINDU", "casteName": "KASHIKAPDE" }, { "religionName": "HINDU", "casteName": "KHATIK" }, { "religionName": "MUSLIM", "casteName": "KHATIK" }, { "religionName": "SIKH", "casteName": "KHATRI" }, { "religionName": "ISLAM", "casteName": "KJHGFDS" }, { "religionName": "HINDU", "casteName": "KOLI" }, { "religionName": "HINDU", "casteName": "KOMATI" }, { "religionName": "HINDU", "casteName": "KOSHTI" }, { "religionName": "HINDU", "casteName": "KSHATRIYA" }, { "religionName": "HINDU", "casteName": "KUMBHAR" }, { "religionName": "HINDU", "casteName": "KUNABI MARATHA" }, { "religionName": "HINDU", "casteName": "KUNBI" }, { "religionName": "HINDU", "casteName": "KURUHINESHETY" }, { "religionName": "HINDU", "casteName": "LAAD" }, { "religionName": "HINDU", "casteName": "LAMAN" }, { "religionName": "HINDU", "casteName": "LINGAYAT" }, { "religionName": "HINDU", "casteName": "LINGAYAT MALI" }, { "religionName": "HINDU", "casteName": "LINGAYAT-WANI" }, { "religionName": "HINDU", "casteName": "LINGDHER" }, { "religionName": "HINDU", "casteName": "LOHAR" }, { "religionName": "HINDU", "casteName": "LONARI" }, { "religionName": "HINDU", "casteName": "LONIYA" }, { "religionName": "CHRISTAIN", "casteName": "LUJHGF" }, { "religionName": "HINDU", "casteName": "MAHADEV KOLI" }, { "religionName": "HINDU", "casteName": "MAHAR" }, { "religionName": "HINDU", "casteName": "MALI" }, { "religionName": "HINDU", "casteName": "MANG" }, { "religionName": "HINDU", "casteName": "MARATHA" }, { "religionName": "BUDDHIST", "casteName": "MARAWADI" }, { "religionName": "HINDU", "casteName": "MARWADI" }, { "religionName": "ISLAM", "casteName": "MUJAWAR" }, { "religionName": "CHRISTAIN", "casteName": "MUKKUVAR" }, { "religionName": "HINDU", "casteName": "MUNERWARLU" }, { "religionName": "MUSALMAN", "casteName": "MUSALMAN" }, { "religionName": "ISLAM", "casteName": "MUSLIM" }, { "religionName": "HINDU", "casteName": "NA" }, { "religionName": "MUSALMAN", "casteName": "NA" }, { "religionName": "JAIN", "casteName": "NA" }, { "religionName": "CHRISTAIN", "casteName": "NADAR" }, { "religionName": "HINDU", "casteName": "NAMDEV SHIMPI" }, { "religionName": "HINDU", "casteName": "NANDIWALE" }, { "religionName": "NAVBOUDHA", "casteName": "NAVBOUDH" }, { "religionName": "NAVBOUDHA", "casteName": "NAVBOUDHA" }, { "religionName": "HINDU", "casteName": "NHAVI" }, { "religionName": "HINDU", "casteName": "NILGAR" }, { "religionName": "HINDU", "casteName": "OTARI" }, { "religionName": "HINDU", "casteName": "PADMASHALI" }, { "religionName": "CHRISTAIN", "casteName": "PARAVAR" }, { "religionName": "HINDU", "casteName": "PARDESHI" }, { "religionName": "HINDU", "casteName": "PARIT" }, { "religionName": "HINDU", "casteName": "RAMOSHI" }, { "religionName": "SIKH", "casteName": "SAINI" }, { "religionName": "HINDU", "casteName": "SANGAR" }, { "religionName": "HINDU", "casteName": "SHEGAR" }, { "religionName": "HINDU", "casteName": "SHETTI" }, { "religionName": "HINDU", "casteName": "SHIMPI" }, { "religionName": "JAIN", "casteName": "SHWETAMBAR" }, { "religionName": "HINDU", "casteName": "SONAR" }, { "religionName": "HINDU", "casteName": "SUTAR" }, { "religionName": "MUSLIM", "casteName": "TAMBOLI" }, { "religionName": "HINDU", "casteName": "TELI" }, { "religionName": "HINDU", "casteName": "THAKAR" }, { "religionName": "HINDU", "casteName": "THOGATI" }, { "religionName": "CHRISTAIN", "casteName": "UDAYAR" }, { "religionName": "HINDU", "casteName": "VADAR" }, { "religionName": "HINDU", "casteName": "VANJARI" }, { "religionName": "HINDU", "casteName": "VIRSHAIV LINGAYT" }, { "religionName": "HINDU", "casteName": "WANI" }, { "religionName": "HINDU", "casteName": "YELAM" }]

  // -- System Profiles -> Manage Admission Categories
  admission_categories: valueModel,
  // ["OPEN", "OBC", "VJ", "NT-B", "NT-C", "NT-D", "SBC", "ST", "SEBC", "EWS", "SC"]

  // -- System Profiles ->  Manage Fees Categories
  fees_categories: valueModel,
  // ["OPEN", "OBC", "VJ", "NT-B", "NT-C", "NT-D", "SBC", "ST", "SEBC", "EWS", "SC", "TFWS", "J&K", "EBC"]

  // -- System Profiles ->  Manage Admission Types
  admission_types: {
    model: {
      typeOfAdmission: { type: 'string', db: 'typeOfAdmission' },
      admissionCategory: { type: 'string', db: 'admissionCategory' },
    },
    columns: (settings: any) => {
      const cols: ColumnsType<any> = [
        columnRowNo(),
        { dataIndex: 'typeOfAdmission', title: 'Type of admission', render: text => HoverCell(text) },
        { dataIndex: 'admissionCategory', title: 'Admission category' },
      ];
      return cols;
    },
    schemaRules: yup.object().shape({
      typeOfAdmission: yup.string().notRequired(),
      admissionCategory: yup.string().notRequired(),
    }),
    formNew: (settings: any) => {
      const fields = {
        typeOfAdmission: { input: 'input', title: 'Type of admission' },
        admissionCategory: { input: 'input', title: 'Admission category' },
      };
      return fields;
    },
  },
  // [{ "typeOfAdmission": "CAP", "admissionCategory": "GOVERNMENT PROCESS" }, { "typeOfAdmission": "CAP", "admissionCategory": "GOVERNMENT PROCESS" }, { "typeOfAdmission": "CAP", "admissionCategory": "GOVERNMENT PROCESS" }, { "typeOfAdmission": "INSTITUTE LEVEL", "admissionCategory": "INSTITUTE LEVEL" }, { "typeOfAdmission": "AGAINST CAP", "admissionCategory": "INSTITUTE LEVEL" }]

  // -- System Profiles ->  Manage Mother Tongues
  mother_tongues: valueModel,
  // ["MARATHI", "HINDI", "BENGALI", "TELUGU", "TAMIL", "GUJARATI", "KANNADA", "MALAYALAM", "ODIA", "PUNJABI", "ASSAMESE", "MAITHILI", "BHILI/BHILODI", "SANTALI", "KASHMIRI", "NEPALI", "GONDI", "SINDHI", "KONKANI", "DORGI", "KHANDESHI", "KURUKH", "TULU", "MEITEI/MANIPURI", "BODO", "KHASI", "MUNDARI", "URDU", "HO", "GARO", "TRIPURI"]

  // -- System Profiles ->  Manage Indirect Attainment Methods
  indirect_attainment_methods: valueModel,
  // ["EMPLOYEE METHOD", "ALUMNI FEEDBACK", "GUEST LECTURE FEEDBACK", "INDUSTRIAL VISIT", "COURSE END SURVEY", "EXIT SURVEY", "PARENT SURVE"]

  // -- System Profiles ->  Manage Curriculum Components - Engineering
  curriculum_components_engineering: valueModel,
  // ["HUMANITIES AND SOCIAL SCIENCE", "BASIC SCIENCE", "MATHEMATICS", "ENGINEERING SKILLS", "PROFESSIONAL LABS", "PROFESSIONAL CORE", "ELECTIVES", "MINOR INCLUDING MANAGEMENT", "INDUSTRIAL TRAINING", "BASIC ENGINEERING", "PROJECTS"]

  // -- System Profiles ->  Manage Curriculum Components - Management and Others
  curriculum_components_management_others: valueModel,
  // []

  // -- System Profiles ->  Manage Students Beneficiary Schemes - Government
  students_beneficiary_schemes_government: valueModel,
  // ["ABSD", "KJSHDKJ", "IWUEO"]

  // -- System Profiles ->  Manage Students Beneficiary Schemes - Institute
  students_beneficiary_schemes_institute: valueModel,
  // ["ABSD"]

  // -- System Profiles ->  Manage Students Beneficiary Schemes - Private
  students_beneficiary_schemes_private: valueModel,
  // ["ABSD", "ZXZNXNM"]

  // -- System Profiles ->  Manage Teaching Method
  teaching_method: valueModel,
  // []

  // -- System Profiles ->  Manage Specialization
  specialization: {
    model: {
      specialization: { type: 'string', db: 'specialization' },
      subType: { type: 'string', db: 'subType' },
    },
    columns: (settings: any) => {
      const cols: ColumnsType<any> = [
        columnRowNo(),
        { dataIndex: 'specialization', title: 'Specialization', render: text => HoverCell(text) },
        { dataIndex: 'subType', title: 'Sub Type' },
      ];
      return cols;
    },
    schemaRules: yup.object().shape({
      specialization: yup.string().notRequired(),
      subType: yup.string().notRequired(),
    }),
    formNew: (settings: any) => {
      const fields = {
        specialization: { input: 'input', title: 'Specialization' },
        subType: { input: 'select', title: 'Sub Type', values: arrayToOptions(['General Specialization', 'Sectoral Specialization']) },
      };
      return fields;
    },
  },
};
// [{ "specialization": "", "subType": "" }]

export const modelLookupsItem = (type) => {
  const newLocal = lookupItems[type];
  return newLocal;
};

import React from 'react';
import { Card, Table } from 'antd';
import { useSettings } from '@/store/settings/useSettings';
import { columns } from '@/models/settings/Settings';

const List = () => {
  const {
    settings,
    fetchSettings,
  } = useSettings((state: any) => ({
    settings: state.settings,
    fetchSettings: state.fetchSettings,
  }));

  React.useEffect(() => {
    fetchSettings(true);
  }, []);

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="Global Settings"
      >
        <Table columns={columns()} dataSource={settings} pagination={false} />
      </Card>
    </div>
  );
};

// const schema1 = yup.object().shape({
//   isBig: yup.boolean(),
//   count: yup.number()
//     .when(['$formValues', 'isBig'], (formValues, isBig, schema, options) => {
//       debugger;
//       console.log('formValues, isBig, schema, options', formValues, isBig, schema, options);
//       if (isBig) {
//         // true;
//       }
//       return (formValues.value === 4 ? schema.max(6) : schema);
//     }),
// });

// debugger;
// // schema1.validate({}, { context: { other: 4 } });
// const msg = schema1.validateSyncAt('count', { count: 4, isBig: 'big' }, { context: { formValues: { value: 4 } } });
// console.log(msg);
// debugger;

// const schema = yup.object().shape({
//   name: yup.string().required(),
//   age: yup
//     .number()
//     .required()
//     // .typeError('Number only.')
//     .positive()
//     .integer('should be integer'), // .round()

//   ok: yup
//     .number()
//     .required()
//     .when(['$formValues', '$settings'], (formValues, settings, schema): any => {
//       debugger;
//       // console.log('name', name);
//       // console.log('age', age);
//       console.log('formValues:', formValues);
//       console.log('settings:', settings);
//       return schema.defined();
//       // return formValues.age ? schema.min(5) : schema.min(0);
//       if (settings.year === 2022) {
//         // return Promise.reject(new Error('Settings year cannot be 2022'));
//         // return new yup.ValidationError('Settings year cannot be 2022');
//         // return yup.mixed().typeError('Settings year cannot be 2022');
//         return schema.test('setting-is-not-2022', 'Settings year cannot be 2022', (value, { createError }) => {
//           debugger;
//           // return createError({ message:'some error' });
//           return false;
//         });
//       }
//     }),
// });

// function List() {
//   const [form] = Form.useForm();

//   const yupSync = schemaValidator(schema);
//   return (
//     <div className='layout-main-content'>
//       <Form form={form} layout="vertical">
//         <Card
//           bordered={false}
//           title="Settings List"
//           className='content-center'
//           actions={[
//             <Form.Item>
//               <Button type="primary" htmlType="submit">
//                 Submit
//               </Button>
//             </Form.Item>,
//           ]}
//         >
//           <Row className="justify-center">
//             <Col className='w-md'>
//               <Form.Item name="name" label="Name" rules={yupSync} required>
//                 <Input placeholder="Please input your name" />
//               </Form.Item>
//               <Form.Item name="age" label="Age" rules={yupSync}>
//                 <Input placeholder="Please input age" />
//               </Form.Item>
//               <Form.Item name="ok" label="OK" rules={yupSync}>
//                 <Input placeholder="Please input ok" />
//               </Form.Item>
//             </Col>
//           </Row>
//         </Card>
//       </Form>
//     </div>
//   );
// }

export default List;

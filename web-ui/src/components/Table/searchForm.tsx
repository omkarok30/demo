import { Button, Form, Input } from 'antd';

const SearchForm = ({ searchFormInputs, data, handleSearchClick }: any) => {
  const [form] = Form.useForm();
  const onFinish = (formValues: any) => {
    const isObjEmpty = Object.values(formValues).every(value => !value);
    if (isObjEmpty) {
      handleSearchClick(data);
    }
    else {
      if (formValues?.searchTerm) {
        const keyFilters = (item: any) => (obj: any) =>
          Object.values(obj)
            .toString()
            ?.trim()
            ?.toLowerCase()
            ?.indexOf(item?.toString()?.trim()?.toLowerCase()) > -1;
        const filteredData = data.filter(keyFilters(formValues?.searchTerm));
        handleSearchClick(filteredData);
      }
      else {
        const filteredData = data.filter((row: any) => {
          return Object.keys(formValues).some((propertyName) => {
            if (formValues[propertyName]) {
              return (
                row[propertyName]
                  ?.toString()
                  ?.trim()
                  ?.toLowerCase()
                  ?.indexOf(formValues[propertyName]?.toString()?.trim()?.toLowerCase()) > -1
              );
            }
          });
        });
        handleSearchClick(filteredData);
      }
    }
  };
  const onReset = () => {
    form.resetFields();
    handleSearchClick(data);
  };

  const renderFormElements = () => {
    return searchFormInputs?.length > 0
      ? (
          searchFormInputs?.map((item: any) => {
            if (item.type) {
              return (
              <Form.Item name={item.name} label={item.label}>
                <Input />
              </Form.Item>
              );
            }
          })
        )
      : (
        <Form.Item name="searchTerm" label="Search">
          <Input />
        </Form.Item>
        );
  };
  return (
    <>
      <Form
        layout="inline"
        autoComplete="off"
        className="ant-form"
        form={form}
        name="search-form"
        onFinish={onFinish}
      >
        {renderFormElements()}
        <Button type="primary" htmlType="submit">
          Search
        </Button>
        <Button type="ghost" onClick={onReset}>
          Reset
        </Button>
      </Form>
    </>
  );
};

export default SearchForm;

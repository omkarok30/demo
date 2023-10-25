import {
  Button,
  Card,
  Checkbox,
  Form,
  Modal,
  Select,
  Typography,
  notification,
} from "antd";
import React, { useMemo } from "react";
import _ from "lodash";

import TextArea from "antd/lib/input/TextArea";
import { When } from "react-if";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useSettings } from "@/store/settings/useSettings";
import { schemaValidator } from "@/utils/validate";
import * as modelReview from "@/models/NAAC/review/review";
import { useReview } from "@/store/NAAC/Review/useReview";
import { isEmptyValue } from "@/utils/object";
import { useAcademicYear } from "@/store/settings/useAcademicYear";

export interface IReviewEditType {
  recordId: any;
  open: boolean;
  criteria: any;
  reviewType: string;
  handleOk: Function;
  handleCancel: Function;
  title: string;
  year: any;
}

const ReviewEdit = ({
  recordId,
  open,
  criteria,
  reviewType,
  handleOk,
  handleCancel,
  title,
  year,
}: IReviewEditType) => {
  const [selectRating, setRating] = React.useState(0);
  const [allFieldDisabled, setAllFieldDisabled] = React.useState(false);
  const [submitBtnDisabled, setSubmitBtnDisabled] = React.useState(true);

  const [form] = Form.useForm();
  const isNew = recordId === "new";

  const titleMessage =
    reviewType.toLocaleLowerCase() === "internal"
      ? `${criteria} Internal Review`
      : `${criteria} External Review`;

  const ratingLabel =
    reviewType.toLocaleLowerCase() === "internal"
      ? "Internal Rating"
      : " External Rating";

  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelReview.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys]
  );

  const store = useReview((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    saveDraft: state.saveDraft,
    submit: state.submit,
    clearRecord: state.clearRecord,
  }));

  const ratingsOptions: any = [
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];

  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });

  React.useEffect(() => {
    store.getRecord(recordId);
    return () => {
      form.setFieldsValue({});
    };
  }, [recordId]);

  React.useEffect(() => {
    if (store?.current?.id !== recordId) {
      return;
    }
    form.setFieldsValue(store.current);
  }, [store.current]);

  React.useEffect(() => {
    if (isNew) {
      store.clearRecord();
    }
  }, []);

  const storeAcademicYear = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
  }));

  const optionsAcademicYear = useMemo(
    () => storeAcademicYear.comboByName || [],
    [storeAcademicYear.comboByName]
  );

  const firstRating = _.first(ratingsOptions);
  const firstRatingOption = _.get(firstRating, ["value"], "");

  const proceedToSubmit = () => {
    setAllFieldDisabled(true);
  };

  const proceedSubmitCancel = () => {
    setAllFieldDisabled(false);
  };

  const onFormSubmit = () => {
    if (saveProgress.disableSubmit) {
      return;
    }
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await store.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: "Saved Successfully!",
              description: "Review submitted.",
            });
          }
        } else {
          const record = await store.submit(recordId, values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: "Saved Successfully!",
              description: "Review submitted.",
            });
          }
        }
        setSaveProgress({
          saving: false,
          disableSubmit: true,
          disableForm: true,
        });
        if (_.isFunction(handleOk)) {
          handleOk();
        }
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

  const onSaveDraft = () => {
    if (saveProgress.disableSubmit) {
      return;
    }
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await store.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: "Saved Successfully!",
              description: "Review Drafted.",
            });
          }
        } else {
          const record = await store.saveDraft(recordId, values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: "Saved Successfully!",
              description: "Review Drafted.",
            });
          }
        }
        setSaveProgress({
          saving: false,
          disableSubmit: true,
          disableForm: true,
        });
        if (_.isFunction(handleOk)) {
          handleOk();
        }
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

  const handleRatings = (value) => {
    setRating(value);
  };

  const doCancel = () => {
    if (_.isFunction(handleCancel)) {
      handleCancel();
    }
  };

  const onConfirmSubmit = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setSubmitBtnDisabled(false);
    } else {
      setSubmitBtnDisabled(true);
    }
    console.log(submitBtnDisabled);

    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <>
      <Modal
        title={titleMessage}
        open={open}
        width={700}
        onCancel={doCancel}
        footer={
          <div>
            <When condition={allFieldDisabled === false}>
              <Button key="1" type="primary" onClick={onSaveDraft}>
                Save Draft
              </Button>
              ,
              <Button key="2" type="primary" onClick={proceedToSubmit}>
                Proceed to Submit
              </Button>
              ,
              <Button key="3" onClick={doCancel}>
                Cancel
              </Button>
            </When>
            <When condition={allFieldDisabled === true}>
              <Button
                key="1"
                disabled={submitBtnDisabled}
                type="primary"
                onClick={onSaveDraft}
              >
                Submit
              </Button>
              ,
              <Button key="3" onClick={proceedSubmitCancel}>
                Cancel
              </Button>
            </When>
          </div>
        }
      >
        <Typography.Text>
          <b style={{ whiteSpace: 'pre-line' }}>{title}</b>
        </Typography.Text>
        <Form
          form={form}
          layout="vertical"
          disabled={saveProgress.disableForm}
          name="basic"
        >
          <Card bordered={false}>
            <Form.Item label="Academic year">
              <Select
                disabled
                style={{ width: 300 }}
                options={optionsAcademicYear}
                value={year}
              ></Select>
            </Form.Item>
            <Form.Item
              label={ratingLabel}
              name="reviewerScore"
              rules={schemaRules}
            >
              <Select
                disabled={allFieldDisabled}
                style={{ width: 300 }}
                options={ratingsOptions}
                defaultValue={firstRatingOption}
                onChange={(value: string) => handleRatings(value)}
              ></Select>
            </Form.Item>
            <Form.Item
              label="Remarks / Comments"
              name="comment"
              rules={schemaRules}
            >
              <TextArea
                disabled={allFieldDisabled}
                rows={4}
                value={store?.current?.comment}
              />
            </Form.Item>
            <When condition={allFieldDisabled === true}>
              <div>"Once the review is submitted, it cannot be edited."</div>
              <Checkbox onChange={onConfirmSubmit}>
                I confirm to submit the above review.
              </Checkbox>
            </When>
          </Card>
        </Form>
      </Modal>
    </>
  );
};

export default ReviewEdit;

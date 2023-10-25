import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button, Divider, Space, notification } from 'antd';
import { When } from 'react-if';
import { EditIcon } from '../Icons/EditIcon';
import { useQLMCriteria } from '@/store/NAAC/QLMCriteria/useQLMCriteria';

interface IEditorApp {
  year: any;
  criteriaNumber: string;
  assessmentType: string;
  characterLimit: string;
  title: string;
}

function EditorApp({
  year,
  criteriaNumber,
  assessmentType,
  characterLimit,
  title,
}: IEditorApp) {
  const editorRef: any = useRef(null);
  const [disabled, setDisabled] = useState(true);

  const { getDescriptionData, descriptionData } = useQLMCriteria((state: any) => ({
    addRecord: state.addRecord,
    clearRecord: state.clearRecord,
    getDescriptionData: state.getDescriptionData,
    descriptionData: state.descriptionData,
  }));

  const handleClick = () => {
    setDisabled(false);
  };

  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });

  useEffect(() => {
    if (year) {
      getDescriptionData(year, criteriaNumber, assessmentType);
    }
  }, [year]);

  const handleSave = async () => {
    if (editorRef.current) {
      const payload = {
        AcademiYear: year,
        text: editorRef.current.getContent(),
        criteriaNumber,
        AssessmentType: assessmentType,
      };
      setSaveProgress({ ...saveProgress, disableSubmit: true });
      //  const record = await store.clearRecord()
      // eslint-disable-next-line no-console
      console.log(payload);
      editorRef.current.setContent('');
      notification.success({
        message: 'Saved Successfully!',
        description: 'The record has been added in System.',
      });
      setDisabled(true);
    }
  };

  const handleBack = () => {
    setDisabled(true);
  };
  return (
    <>
      <div
        style={{
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontWeight: 'bold', marginRight: '10px' }}>{title}</span>
        <Button onClick={handleClick}>
          <EditIcon></EditIcon>
        </Button>
      </div>
      <div style={{ margin: '5px' }}></div>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={descriptionData?.text || ''}
        disabled={disabled}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | '
            + 'bold italic strikethrough | fontfamily fontsize blocks  | alignleft aligncenter '
            + 'alignright alignjustify | bullist numlist outdent indent | '
            + 'forecolor backcolor  removeformat help|'
            + ' table pagebreak | charmap emoticons | fullscreen preview | image media link anchor code wordcount',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          toolbar_sticky: false,
        }}
      />
      <Space direction="vertical" style={{ margin: '10px' }}>
        <span>*At least {characterLimit} characters and within 200 words.</span>
        <When condition={disabled === false}>
          <span> Note: Please use 'Ctrl+v' for paste</span>
        </When>
      </Space>
      <When condition={disabled === false}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Space>
            <Button type="primary" onClick={() => handleSave()}>
              Save
            </Button>
            <Button onClick={handleBack}>Back</Button>
          </Space>
        </div>
      </When>
      <Divider />
    </>
  );
}

export default EditorApp;

import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { EditIcon } from "../Icons/EditIcon";
import { Button, notification, Space } from "antd";
import { When } from "react-if";

const EditorApp = () => {
  const editorRef: any = useRef(null);
  const [disabled, setDisabled] = useState(true);

  const handleClick = () => {
    setDisabled(false);
  };

  const handleSave = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      notification.success({
        message: "Saved Successfully!",
        description: "The record has been added in System."
      });
      setDisabled(true);
    }
    editorRef.clear();
  };

  const handleBack = () => {
    setDisabled(true);
  };

  return (
    <>
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontWeight: "bold", marginRight: "10px" }}>
          Description of initiatives:
        </span>
        <Button onClick={handleClick}>
          <EditIcon></EditIcon>
        </Button>
      </div>
      <div style={{ margin: "5px" }}></div>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue=""
        disabled={disabled}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | " +
            "bold italic strikethrough | fontfamily fontsize blocks  | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "forecolor backcolor  removeformat help|" +
            " table pagebreak | charmap emoticons | fullscreen preview | image media link anchor code",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          toolbar_sticky: false
        }}
      />
      <Space direction="vertical" style={{ margin: "10px" }}>
        <span>*At least 100 characters and within 200 words.</span>
        <When condition={disabled === false}>
          <span> Note: Please use 'Ctrl+v' for paste</span>
        </When>
      </Space>
      <When condition={disabled === false}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Space>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
            <Button onClick={handleBack}>Back</Button>
          </Space>
        </div>
      </When>
    </>
  );
};

export default EditorApp;

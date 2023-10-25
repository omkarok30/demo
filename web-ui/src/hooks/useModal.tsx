import React from 'react';

const useModalCore = ({
  defaultVisible = false,
} = {}) => {
  const [visible, setVisible] = React.useState(defaultVisible);

  const show = React.useCallback(() => setVisible(true), [visible]);
  const close = React.useCallback(() => setVisible(false), [visible]);

  return {
    visible,
    show,
    close,
  };
};

export const useModal = ({ modalProps = { open: false }, defaultExtraData = null } = {}) => {
  const [extraData, setExtraData] = React.useState(defaultExtraData);

  const { show, close, visible } = useModalCore({
    defaultVisible: modalProps.open,
  });

  return {
    modalProps: {
      ...modalProps,
      onCancel: (e) => {
        modalProps.onCancel?.(e);
        close();
      },
      open: visible,
      visible,
      extraData,
    },
    show,
    close,
    setExtraData,
  };
};

import _ from 'lodash';
import React from 'react';
// import { LabeledValue } from 'antd/lib/select';
import { isEmptyValue } from '@/utils/object';

interface DisplaySelectProps {
  value?: string;
  options?: any;
}
export const DisplaySelect: React.FC<DisplaySelectProps> = ({ value = '', options = {} }) => {
  const display = React.useMemo(() => {
    let text = value;
    let option: any = _.find(options, { value });
    if (isEmptyValue(option)) {
      option = _.find(options, { label: value });
    }
    if (!isEmptyValue(option)) {
      text = option.label || option.value;
    }

    if (isEmptyValue(text)) {
      return <>&nbsp;</>;
    }
    return <span className={isEmptyValue(option) ? 'underline decoration-pink-500/30' : ''}>{text}</span>;
  }, [value, options]);

  return (
    <div className='box-border m-0 relative inline-block w-full min-w-0 py-[4px] px-[11px] text-opacity-65 line-height-[1.5715] bg-[#fff] border border-[#d9d9d9] rounded-sm'>
      {display}
    </div>
  );
};

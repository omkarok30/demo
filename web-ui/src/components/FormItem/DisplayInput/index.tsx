import React from 'react';
import { isEmptyValue } from '@/utils/object';

interface DisplayInputProps {
  value?: string;
}
export const DisplayInput: React.FC<DisplayInputProps> = ({ value = '' }) => {
  const display = React.useMemo(() => {
    if (isEmptyValue(value)) {
      return <>&nbsp;</>;
    }
    return <span>{value}</span>;
  }, [value]);

  return (
    <div className='box-border m-0 relative inline-block w-full min-w-0 py-[4px] px-[11px] text-opacity-65 line-height-[1.5715] bg-[#fff] border border-[#d9d9d9] rounded-sm'>
      {display}
    </div>
  );
};

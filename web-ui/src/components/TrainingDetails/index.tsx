import React from 'react';
import {

  Col,
  Form,
  Row,
  Select,
} from 'antd';

import { useAcademicYear } from '@/store/settings/useAcademicYear';

const TrainingDetails = () => {
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
  }));

  const optionsAcademicYear = React.useMemo(
    () => storeAcademicYear.comboByName || [],
    [storeAcademicYear.comboByName],
  );

  return (
    <div>
     
    
          <Form.Item
                        name='academicYear'
                        label='Academic Year'
                        required
                      >
                        <Select options={optionsAcademicYear} />
                      </Form.Item>
                    
                     
    </div>
  );
};

export default TrainingDetails;

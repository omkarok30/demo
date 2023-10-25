import { Card } from 'antd';
import BeneficiaryDetails from './form';
import ScholarshipDetailsList from './ScholerShipDetails/list';
import FollowingClassesList from './FollowingClasses/list';

const Beneficiary = () => {
  return (
    <div className="layout-main-content">
      <Card bordered={false} >
        <BeneficiaryDetails />
        <FollowingClassesList />
        <ScholarshipDetailsList />
      </Card>
    </div>
  );
};

export default Beneficiary;

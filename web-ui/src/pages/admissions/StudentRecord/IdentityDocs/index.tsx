import { Card } from 'antd';
import AdhaarDetails from './AdhaarDetails/list';
import PanCardDetails from './PanCardDetails/list';
import LicenseDetails from './LicenseDetails/list';
import VoterIdDetails from './VoterIdDetails/list';
import PassportDetails from './PassportDetails/list';

const IdentityDocuments = () => {
  return (
    <div className="layout-main-content">
    
        <AdhaarDetails />
        <PanCardDetails />
        <LicenseDetails />
        <VoterIdDetails />
        <PassportDetails />

    </div>
  );
};

export default IdentityDocuments;

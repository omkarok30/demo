import { memo } from 'react';

export default memo(() => (
  <div className='layout-right-footer'>
    <div>© {`${new Date().getFullYear()}`}. RSense Technology Solutions Pvt. Ltd.</div>
  </div>
));

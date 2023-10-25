import React from 'react';
import { Card, Col, List, Row } from 'antd';

import _ from 'lodash';
import { Case, Default, Switch } from 'react-if';
import LookupsDetail from '../form/details';
import { useLookups } from '@/store/settings/useLookups';
import { useSettings } from '@/store/settings/useSettings';

const LookupItem = ({ lookup }) => {
  const storeLookups = useLookups((state: any) => ({
    lookupSelected: state.lookupSelected,
  }));
  return (
    <Switch>
      <Case condition={() => _.isEqual(lookup.id, storeLookups.lookupSelected?.id)}>
        <div className="font-semibold">{lookup.name}</div>
      </Case>
      <Default>{lookup.name}</Default>
    </Switch>
  );
};

const LookupsList = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeLookups = useLookups((state: any) => ({
    lookupsList: state.lookupsList,
    getRecords: state.getRecords,
    lookupSelected: state.lookupSelected,
    setSelected: state.setSelected,
  }));

  React.useEffect(() => {
    fetchSettings();
    storeLookups.getRecords();
  }, []);

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="System Profiles"
      >
        <Row justify="space-around" wrap={false} gutter={16}>
          <Col flex="none">
            <List className="w-240px"
              bordered
              dataSource={storeLookups.lookupsList}
              renderItem={lookup => (
                <List.Item onClick={() => storeLookups.setSelected(lookup)} className="cursor-pointer">
                  <LookupItem lookup={lookup} />
                </List.Item>
              )}
            />
          </Col>
          <Col flex="auto">
            <LookupsDetail />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default LookupsList;

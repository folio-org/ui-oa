import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Badge,
  MultiColumnList,
  Row
} from '@folio/stripes/components';

const propTypes = {
  request: PropTypes.object
};

const formatter = {
  type: e => {
    return e?.type?.label;
  },
};

const renderBadge = (publicationStatuses) => {
  return <Badge>{publicationStatuses?.length}</Badge>
}

const PublicationStatus = ({ request }) => {
  console.log(request)
  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge(request?.publicationStatuses)}
      displayWhenOpen={renderBadge(request?.publicationStatuses)}
      label={<FormattedMessage id="ui-oa.publicationRequest.publicationStatus" />}
    >
      <Row>
        <MultiColumnList
          columnMapping={{
            publicationStatus: <FormattedMessage id="ui-oa.publicationStatus.status" />,
            statusDate: <FormattedMessage id="ui-oa.publicationStatus.statusDate" />,
            statusNote: <FormattedMessage id="ui-oa.publicationStatus.statusNote" />,
          }}
          contentData={request?.publicationStatuses}
          formatter={formatter}
          visibleColumns={['publicationStatus', 'statusDate', 'statusNote']}
        />
      </Row>
    </Accordion>
  );
};

PublicationStatus.propTypes = propTypes;

export default PublicationStatus;

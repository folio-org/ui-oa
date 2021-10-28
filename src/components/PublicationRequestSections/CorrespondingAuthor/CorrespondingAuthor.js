import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Badge,
  Col,
  Label,
  MultiColumnList,
  Row
} from '@folio/stripes/components';

import PartyInfo from '../PartyInfo';

const propTypes = {
  request: PropTypes.object
};

const renderBadge = (correspondingAuthor) => {
  return correspondingAuthor ? <Badge>1</Badge> : <Badge>0</Badge>;
};

const CorrespondingAuthor = ({ request }) => {
  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge(request?.correspondingAuthor)}
      displayWhenOpen={renderBadge(request?.correspondingAuthor)}
      label={<FormattedMessage id="ui-oa.publicationRequest.correspondingAuthor" />}
    >
      <PartyInfo
        otherEmailAddresses={request?.otherEmailAddresses}
        party={request?.correspondingAuthor?.partyOwner}
        streetAddresses={request?.streetAddresses}
      />
      <Row>
        <Col xs={12}>
          <Label>
            <FormattedMessage id="ui-oa.publicationRequest.affiliations" />
          </Label>
          <MultiColumnList
            columnMapping={{
              faculty: <FormattedMessage id="ui-oa.affiliation.faculty" />,
              school: <FormattedMessage id="ui-oa.affiliation.school" />,
              department: <FormattedMessage id="ui-oa.affiliation.department" />,
              dateFrom: <FormattedMessage id="ui-oa.affiliation.dateFrom" />,
              dateTo: <FormattedMessage id="ui-oa.affiliation.dateTo" />,
            }}
            contentData={request?.correspondingAuthor?.affiliations}
            visibleColumns={['faculty', 'school', 'department', 'dateFrom', 'dateTo']}
          />
        </Col>
      </Row>

    </Accordion>

  );
};

CorrespondingAuthor.propTypes = propTypes;

export default CorrespondingAuthor;

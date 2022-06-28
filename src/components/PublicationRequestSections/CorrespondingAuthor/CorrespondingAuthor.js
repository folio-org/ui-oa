import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import {
  Accordion,
  Badge,
  Col,
  Label,
  MultiColumnList,
  Row,
  Card,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes-core';

import PartyInfo from '../../PartySections/PartyInfo';

import urls from '../../../util/urls';

const propTypes = {
  request: PropTypes.object,
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
      label={
        <FormattedMessage id="ui-oa.publicationRequest.correspondingAuthor" />
      }
    >
      <Card
        cardStyle="positive"
        headerStart={
          <AppIcon app="oa" iconKey="party" size="small">
            {request?.correspondingAuthor?.partyOwner?.id ? (
              <Link to={urls.party(request.correspondingAuthor.partyOwner.id)}>
                <strong>{request?.correspondingAuthor?.partyOwner?.fullName}</strong>
              </Link>
            ) : (
              <strong>{request?.correspondingAuthor?.partyOwner?.fullName}</strong>
            )}
          </AppIcon>
        }
        roundedBorder
      >
        <PartyInfo isCard party={request?.correspondingAuthor?.partyOwner} />
      </Card>
      {request?.correspondingAuthor?.affiliations && (
        <Row>
          <Col xs={12}>
            <Label>
              <FormattedMessage id="ui-oa.publicationRequest.affiliations" />
            </Label>
            <MultiColumnList
              columnMapping={{
                faculty: <FormattedMessage id="ui-oa.affiliation.faculty" />,
                school: <FormattedMessage id="ui-oa.affiliation.school" />,
                department: (
                  <FormattedMessage id="ui-oa.affiliation.department" />
                ),
                dateFrom: <FormattedMessage id="ui-oa.affiliation.dateFrom" />,
                dateTo: <FormattedMessage id="ui-oa.affiliation.dateTo" />,
              }}
              contentData={request?.correspondingAuthor?.affiliations}
              visibleColumns={[
                'faculty',
                'school',
                'department',
                'dateFrom',
                'dateTo',
              ]}
            />
          </Col>
        </Row>
      )}
    </Accordion>
  );
};

CorrespondingAuthor.propTypes = propTypes;

export default CorrespondingAuthor;

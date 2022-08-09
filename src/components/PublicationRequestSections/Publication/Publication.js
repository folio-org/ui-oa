import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import {
  Accordion,
  Badge,
  Col,
  KeyValue,
  Label,
  MultiColumnList,
  Row,
  Card,
  Headline,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';
import { JournalDetails, BookDetails } from '../PublicationType';
import publicationRequestFields from '../../../constants/publicationRequestFields';
import ExternalLink from '../../ExternalLink';
import { getSortedItems } from '../../../util';
import urls from '../../../util/urls';

const propTypes = {
  request: PropTypes.object,
};

const formatter = {
  type: (e) => {
    return e?.type?.label;
  },
};

const isJournal = (request) => {
  return (
    request?.publicationType?.value === publicationRequestFields.JOURNAL_ARTICLE
  );
};

const isBook = (request) => {
  return request?.publicationType?.value === publicationRequestFields.BOOK;
};

const hasPublication = (request) => {
  return !!(
    request?.doi ||
    request?.publicationTitle ||
    request?.authorNames ||
    request?.publicationType ||
    request?.subtype ||
    request?.publisher ||
    request?.license ||
    request?.localReference ||
    request?.publicationUrl ||
    request?.identifiers?.length !== 0
  );
};

const renderBadge = (request) => {
  return hasPublication(request) ? <Badge>1</Badge> : <Badge>0</Badge>;
};

const Publication = ({ request }) => {
  const sortedIdentifiers = getSortedItems(request?.identifiers, null, {
    column: 'type.value',
    direction: 'asc',
  });

  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge(request)}
      displayWhenOpen={renderBadge(request)}
      label={<FormattedMessage id="ui-oa.publicationRequest.publication" />}
    >
      <Row>
        <Col xs={6}>
          <KeyValue
            label={
              <FormattedMessage id="ui-oa.publicationRequest.publicationTitle" />
            }
            value={request?.publicationTitle}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={
              <FormattedMessage id="ui-oa.publicationRequest.authorNames" />
            }
            value={request?.authorNames}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={3}>
          <KeyValue
            label={
              <FormattedMessage id="ui-oa.publicationRequest.publicationType" />
            }
            value={request?.publicationType?.label}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.publicationRequest.subtype" />}
            value={request?.subtype?.label}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.publicationRequest.publisher" />}
            value={request?.publisher?.label}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.publicationRequest.license" />}
            value={request?.license?.label}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <KeyValue
            label={
              <FormattedMessage id="ui-oa.publicationRequest.publicationUrl" />
            }
            value={
              request?.publicationUrl ? (
                <ExternalLink
                  content={request.publicationUrl}
                  href={request.publicationUrl}
                  icon
                />
              ) : null
            }
          />
        </Col>
      </Row>

      <Row>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.publicationRequest.doi" />}
            value={
              request?.doi ? (
                <ExternalLink
                  content={request.doi}
                  href={'https://dx.doi.org/' + request.doi}
                  icon
                />
              ) : null
            }
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={
              <FormattedMessage id="ui-oa.publicationRequest.localReference" />
            }
            value={request?.localReference}
          />
        </Col>
      </Row>

      {request?.work && (
        <>
          <Row>
            <Col xs={6}>
              <KeyValue
                label={<FormattedMessage id="ui-oa.journal.journalDOAJ" />}
                value={request?.workIndexedInDOAJ?.label}
              />
            </Col>
            <Col xs={6}>
              <KeyValue
                label={<FormattedMessage id="ui-oa.journal.journalOAStatus" />}
                value={request?.workOAStatus?.label}
              />
            </Col>
          </Row>
        </>
      )}
      {request?.identifiers?.length > 0 && (
        <Row>
          <Col xs={12}>
            <Label>
              <FormattedMessage id="ui-oa.identifiers.otherIdentifiers" />
            </Label>
            <MultiColumnList
              columnMapping={{
                type: <FormattedMessage id="ui-oa.identifiers.type" />,
                publicationIdentifier: (
                  <FormattedMessage id="ui-oa.identifiers.identifier" />
                ),
              }}
              contentData={sortedIdentifiers}
              formatter={formatter}
              interactive={false}
              visibleColumns={['type', 'publicationIdentifier']}
            />
          </Col>
        </Row>
      )}
      {isJournal(request) && (
        <>
          <br />
          <Headline margin="small" size="large" tag="h5">
            <FormattedMessage id="ui-oa.publicationRequest.journalDetails" />
          </Headline>
          <Card
            cardStyle="positive"
            headerStart={
              <AppIcon app="oa" iconKey="journal" size="small">
                {request.work?.id ? (
                  <Link to={urls.journal(request.work.id)}>
                    <strong>{request?.work?.title}</strong>
                  </Link>
                ) : (
                  <strong>{request?.work?.title}</strong>
                )}
              </AppIcon>
            }
            roundedBorder
          >
            <JournalDetails isCard journal={request?.work} />
          </Card>
        </>
      )}
      {isBook(request) && <BookDetails request={request} />}
    </Accordion>
  );
};

Publication.propTypes = propTypes;

export default Publication;

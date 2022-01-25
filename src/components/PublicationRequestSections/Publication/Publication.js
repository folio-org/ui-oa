import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Badge,
  Col,
  Icon,
  KeyValue,
  Label,
  MultiColumnList,
  NoValue,
  Row
} from '@folio/stripes/components';
import { JournalDetails, BookDetails } from '../PublicationType';
import { publicationRequestFields } from '../../../constants';
import ExternalLink from '../../ExternalLink';

const propTypes = {
  request: PropTypes.object
};

const formatter = {
  type: e => {
    return e?.type?.label;
  },
};

const isJournal = (request) => {
  return request?.publicationType?.value === publicationRequestFields.JOURNAL_ARTICLE;
};

const isBook = (request) => {
  return request?.publicationType?.value === publicationRequestFields.BOOK;
};

const hasPublication = (request) => {
  return !!(request?.doi ||
    request?.publicationTitle ||
    request?.authorNames ||
    request?.publicationType ||
    request?.subtype ||
    request?.publisher ||
    request?.license ||
    request?.localReference ||
    request?.publicationUrl ||
    request?.identifiers?.length !== 0);
};

const renderBadge = (request) => {
  return hasPublication(request) ? <Badge>1</Badge> : <Badge>0</Badge>;
};

const Publication = ({ request }) => {
  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge(request)}
      displayWhenOpen={renderBadge(request)}
      label={<FormattedMessage id="ui-oa.publicationRequest.publication" />}
    >
      <Row start="xs">
        <Col xs={6}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.publicationTitle" />}>
            {request?.publicationTitle ?
              <div>{request.publicationTitle}</div>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
        <Col xs={6}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.authorNames" />}>
            {request?.authorNames?.length ?
              <div>{request.authorNames}</div>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
      </Row>

      <Row start="xs">
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.publicationType" />}>
            {request?.publicationType ?
              <div>{request.publicationType.label}</div>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.subtype" />}>
            {request?.subtype ?
              <div>{request.subtype.label}</div>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.publisher" />}>
            {request?.publisher ?
              <div>{request.publisher.label}</div>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.license" />}>
            {request?.license ?
              <div>{request.license.label}</div>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
      </Row>

      <Row start="xs">
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.localReference" />}>
            {request?.localReference ?
              <div>{request.localReference}</div>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
        <Col xs={9}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.publicationUrl" />}>
            {request?.publicationUrl ?
              <a href={request.publicationUrl}>
                {request.publicationUrl}
                <Icon icon="external-link" iconPosition="end" />
              </a>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
      </Row>

      <Row start="xs">
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.doi" />}>
            {request?.doi ?
              <ExternalLink
                content={request.doi}
                href={'https://dx.doi.org/' + request.doi}
              />
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Label>
            <FormattedMessage id="ui-oa.identifiers.otherIdentifiers" />
          </Label>
          <MultiColumnList
            columnMapping={{
              type: <FormattedMessage id="ui-oa.identifiers.type" />,
              publicationIdentifier: <FormattedMessage id="ui-oa.identifiers.identifier" />,
            }}
            contentData={request?.identifiers}
            formatter={formatter}
            visibleColumns={['type', 'publicationIdentifier']}
          />
        </Col>
      </Row>

      {isJournal(request) ?
        <JournalDetails request={request} /> :
        <div />
      }
      {isBook(request) ?
        <BookDetails request={request} /> :
        <div />
      }
    </Accordion>
  );
};

Publication.propTypes = propTypes;

export default Publication;

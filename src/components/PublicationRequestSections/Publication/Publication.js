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
import JournalDetails from '../JournalDetails';
import BookDetails from '../BookDetails';

const propTypes = {
  request: PropTypes.object
};

const formatter = {
  type: e => {
    return e?.type?.label;
  },
};

const isJournal = (request) => {
  return request?.publicationType?.value === 'journal_article' ? true : false
}

const isBook = (request) => {
  return request?.publicationType?.value === 'book' ? true : false
}

const hasPublication = (request) => {
  return (request?.doi ||
    request?.publicationTitle ||
    request?.authorNames ||
    request?.publicationType ||
    request?.subtype ||
    request?.publisher ||
    request?.license ||
    request?.localReference ||
    request?.publicationUrl ||
    request?.identifiers?.length !== 0) ? true : false
}

const renderBadge = (request) => {
  return hasPublication(request) ? <Badge>1</Badge> : <Badge>0</Badge>
}

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
            <div>
              {request?.publicationTitle ?
                <div>{request.publicationTitle}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={6}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.authorNames" />}>
            <div>
              {request?.authorNames?.length ?
                <div>{request.authorNames}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
      </Row>

      <Row start="xs">
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.publicationType" />}>
            <div>
              {request?.publicationType ?
                <div>{request.publicationType.label}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.subtype" />}>
            <div>
              {request?.subtype ?
                <div>{request.subtype.label}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.publisher" />}>
            <div>
              {request?.publisher ?
                <div>{request.publisher.label}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.license" />}>
            <div>
              {request?.license ?
                <div>{request.license.label}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
      </Row>

      <Row start="xs">
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.localReference" />}>
            <div>
              {request?.localReference ?
                <div>{request.localReference}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={9}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.publicationUrl" />}>
            <div>
              {request?.publicationUrl ?
                <a href={request.publicationUrl} >
                  {request.publicationUrl}
                  <Icon icon="external-link" iconPosition="end" />
                </a>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
      </Row>

      <Row start="xs">
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.doi" />}>
            <div>
              {request?.doi ?
                <a href={"https://dx.doi.org/" + request.doi} >
                  {request.doi}
                  <Icon icon="external-link" iconPosition="end" />
                </a>
                :
                <NoValue />
              }
            </div>
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

import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { Col, Headline, KeyValue, Row } from '@folio/stripes/components';

const propTypes = {
  request: PropTypes.object,
};

const BookDetails = ({ request }) => {
  return (
    <>
      <Row start="xs">
        <Col xs={3}>
          <Headline margin="small" size="large" tag="h5">
            <FormattedMessage id="ui-oa.publicationRequest.bookDetails" />
          </Headline>
          <KeyValue
            label={
              <FormattedMessage id="ui-oa.publicationRequest.publicationYear" />
            }
            value={request?.publicationYear}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={
              <FormattedMessage id="ui-oa.publicationRequest.publicationPlace" />
            }
            value={request?.publicationPlace}
          />
        </Col>
        <Col xs={6} />
      </Row>
    </>
  );
};

BookDetails.propTypes = propTypes;

export default BookDetails;

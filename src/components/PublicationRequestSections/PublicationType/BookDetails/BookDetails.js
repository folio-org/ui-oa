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
        <Headline margin="small" size="large" tag="h5">
          <FormattedMessage id="ui-oa.publicationRequest.bookDetails" />
        </Headline>
      </Row>
      <Row>
        <Col xs={3}>
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
      </Row>
    </>
  );
};

BookDetails.propTypes = propTypes;

export default BookDetails;

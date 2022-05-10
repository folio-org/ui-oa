import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Col,
  FormattedUTCDate,
  Headline,
  KeyValue,
  Row,
} from '@folio/stripes/components';

const propTypes = {
  request: PropTypes.object,
};

const BookDetails = ({ request }) => {
  return (
    <>
      <br />
      <Row start="xs">
        <Col xs={12}>
          <Headline margin="small" size="large" tag="h5">
            <FormattedMessage id="ui-oa.publicationRequest.bookDetails" />
          </Headline>
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={
              <FormattedMessage id="ui-oa.publicationRequest.publicationYear" />
            }
            value={
              request?.bookDateOfPublication ? (
                <FormattedUTCDate value={request.bookDateOfPublication} />
              ) : null
            }
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={
              <FormattedMessage id="ui-oa.publicationRequest.publicationPlace" />
            }
            value={request?.bookPlaceOfPublication}
          />
        </Col>
      </Row>
    </>
  );
};

BookDetails.propTypes = propTypes;

export default BookDetails;

import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { Col, Headline, KeyValue, Row } from '@folio/stripes/components';

import { findIssnByNamespace } from '../../../../util/journalUtils';

const propTypes = {
  request: PropTypes.shape({
    work: PropTypes.object,
  }),
  isCard: PropTypes.bool,
};

const JournalDetails = ({ request: { work } = {}, isCard }) => {
  const printIssn = findIssnByNamespace(work, 'print');
  const electronicIssn = findIssnByNamespace(work, 'electronic');

  return (
    <>
      {!isCard && (
        <>
          <br />
          <Row start="xs">
            <Col xs={12}>
              <Headline margin="small" size="large" tag="h5">
                <FormattedMessage id="ui-oa.publicationRequest.journalDetails" />
              </Headline>
              <KeyValue
                label={<FormattedMessage id="ui-oa.publicationJournal.title" />}
                value={work?.title}
              />
            </Col>
          </Row>
        </>
      )}
      <Row start="xs">
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.publicationJournal.issnPrint" />}
            value={printIssn?.value}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={
              <FormattedMessage id="ui-oa.publicationJournal.issnElectronic" />
            }
            value={electronicIssn?.value}
          />
        </Col>
      </Row>
    </>
  );
};

JournalDetails.propTypes = propTypes;

export default JournalDetails;

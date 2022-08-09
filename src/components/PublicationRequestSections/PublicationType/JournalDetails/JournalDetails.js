import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { Col, KeyValue, Row } from '@folio/stripes/components';

import { findIssnByNamespace } from '../../../../util/journalUtils';

const propTypes = {
  journal: PropTypes.object,
  isCard: PropTypes.bool,
};

const JournalDetails = ({ journal = {}, isCard }) => {
  const printIssn = findIssnByNamespace(journal, 'print');
  const electronicIssn = findIssnByNamespace(journal, 'electronic');

  return (
    <>
      {!isCard && (
        <>
          <br />
          <Row start="xs">
            <Col xs={12}>
              <KeyValue
                label={<FormattedMessage id="ui-oa.publicationJournal.title" />}
                value={journal?.title}
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

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

// import { Field } from 'react-final-form';
// import { FieldArray } from 'react-final-form-arrays';

import {
  // Accordion,
  AccordionSet,
  Button,
  // Checkbox,
  // Col,
  // Headline,
  Pane,
  PaneFooter,
  PaneHeader,
  Paneset,
  // Row,
  // Select,
  // TextArea,
  // TextField,
} from '@folio/stripes/components';
// import FundingFieldArray from '../components/publicationRequestCreateSections/fieldArrays/fundingFieldArray';
// import OtherEmailFieldArray from '../components/publicationRequestCreateSections/fieldArrays/otherEmailFieldArray';
// import IdentifiersFieldArray from '../components/publicationRequestCreateSections/fieldArrays/identifiersFieldArray';
// import PublicationStatusFieldArray from '../components/publicationRequestCreateSections/fieldArrays/publicationStatusFieldArray';
// import StreetAddressesFieldArray from '../components/publicationRequestCreateSections/fieldArrays/streetAddressesFieldArray';
import RequestInfo from '../components/publicationRequestCreateSections/requestInfo';
import CorrespondingAuthor from '../components/publicationRequestCreateSections/correspondingAuthor';
import RequestContact from '../components/publicationRequestCreateSections/requestContact';
import Publication from '../components/publicationRequestCreateSections/publication';
import PublicationStatus from '../components/publicationRequestCreateSections/publicationStatus';
import Funding from '../components/publicationRequestCreateSections/funding';

const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }).isRequired,
  pristine: PropTypes.bool,
  refValues: PropTypes.object,
  submitting: PropTypes.bool,
};


const publicationRequestCreate = ({ handlers: { onClose, onSubmit }, pristine, refValues, submitting }) => {
  const renderPaneFooter = () => {
    return (
      <PaneFooter
        renderEnd={(
          <Button
            buttonStyle="primary mega"
            disabled={pristine || submitting}
            marginBottom0
            onClick={onSubmit}
            type="submit"
          >
            <FormattedMessage id="stripes-components.saveAndClose" />
          </Button>
        )}
        renderStart={(
          <Button
            buttonStyle="default mega"
            marginBottom0
            onClick={onClose}
          >
            <FormattedMessage id="stripes-components.cancel" />
          </Button>
        )}
      />
    );
  };

  return (
    <Paneset>
      <Pane
        defaultWidth="fill"
        footer={renderPaneFooter()}
        renderHeader={renderProps => <PaneHeader {...renderProps} paneTitle="New Publication Request" />}
      >
        <AccordionSet>
          <RequestInfo refValues={refValues} />
          <CorrespondingAuthor />
          <RequestContact />
          <Publication />
          <PublicationStatus />
          <Funding />
        </AccordionSet>
      </Pane>
    </Paneset>
  );
};

publicationRequestCreate.propTypes = propTypes;

export default publicationRequestCreate;

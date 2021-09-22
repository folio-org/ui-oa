import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  AccordionSet,
  Button,
  Pane,
  PaneFooter,
  PaneHeader,
  Paneset,
} from '@folio/stripes/components';
import RequestInfoCreate from '../components/PublicationRequestCreateSections/RequestInfoCreate';
import CorrespondingAuthorCreate from '../components/PublicationRequestCreateSections/CorrespondingAuthorCreate';
import RequestContactCreate from '../components/PublicationRequestCreateSections/RequestContactCreate';
import PublicationCreate from '../components/PublicationRequestCreateSections/PublicationCreate';
import PublicationStatusCreate from '../components/PublicationRequestCreateSections/PublicationStatusCreate';
import FundingCreate from '../components/PublicationRequestCreateSections/FundingCreate';

const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }).isRequired,
  pristine: PropTypes.bool,
  refValues: PropTypes.object,
  submitting: PropTypes.bool,
};


const PublicationRequestCreate = ({ handlers: { onClose, onSubmit }, pristine, submitting }) => {
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
        centerContent
        defaultWidth="100%"
        footer={renderPaneFooter()}
        renderHeader={renderProps => <PaneHeader {...renderProps} paneTitle="New publication request" />}
      >
        <AccordionSet>
          <RequestInfoCreate />
          <CorrespondingAuthorCreate />
          <RequestContactCreate />
          <PublicationCreate />
          <PublicationStatusCreate />
          <FundingCreate />
        </AccordionSet>
      </Pane>
    </Paneset>
  );
};

PublicationRequestCreate.propTypes = propTypes;

export default PublicationRequestCreate;

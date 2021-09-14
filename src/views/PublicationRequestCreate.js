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
import RequestInfo from '../components/PublicationRequestCreateSections/RequestInfoCreate';
import CorrespondingAuthor from '../components/PublicationRequestCreateSections/CorrespondingAuthorCreate';
import RequestContactCreate from '../components/PublicationRequestCreateSections/RequestContactCreate';
import Publication from '../components/PublicationRequestCreateSections/PublicationCreate';
import PublicationStatusCreate from '../components/PublicationRequestCreateSections/PublicationStatusCreate';
import Funding from '../components/PublicationRequestCreateSections/FundingCreate';

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
          <RequestInfo />
          <CorrespondingAuthor />
          <RequestContactCreate />
          <Publication />
          <PublicationStatusCreate />
          <Funding />
        </AccordionSet>
      </Pane>
    </Paneset>
  );
};

PublicationRequestCreate.propTypes = propTypes;

export default PublicationRequestCreate;

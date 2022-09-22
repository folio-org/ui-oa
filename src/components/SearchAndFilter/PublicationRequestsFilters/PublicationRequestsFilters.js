import PropTypes from 'prop-types';
import { CheckboxFilter } from '@folio/stripes/smart-components';
import {
  Accordion,
  AccordionSet,
  FilterAccordionHeader,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { DateFilter } from '@folio/stripes-erm-components';

import { useOARefdata } from '../../../util';

const propTypes = {
  activeFilters: PropTypes.object,
  filterHandlers: PropTypes.object,
};

function PublicationRequestsFilters({ activeFilters, filterHandlers }) {
  const requestStatusValues = useOARefdata('PublicationRequest.RequestStatus');
  const chargeStatusValues = useOARefdata('Charge.ChargeStatus');
  const publicationTypeValues = useOARefdata(
    'PublicationRequest.PublicationType'
  );
  const workOAStatusValues = useOARefdata('Work.OaStatus');
  const publisherValues = useOARefdata('PublicationRequest.Publisher');
  const chargePayersValues = useOARefdata('Payer.Payer');

  const onChangeHandler = (group) => {
    filterHandlers.state({
      ...activeFilters,
      [group.name]: group.values,
    });
  };

  const renderRequestStatusFilter = () => {
    return (
      <Accordion
        displayClearButton={activeFilters?.requestStatus?.length > 0}
        header={FilterAccordionHeader}
        id="request-status-filter-accordion"
        label={<FormattedMessage id="ui-oa.publicationRequest.status" />}
        onClearFilter={() => {
          filterHandlers.clearGroup('requestStatus');
        }}
        separator={false}
      >
        <CheckboxFilter
          dataOptions={requestStatusValues}
          name="requestStatus"
          onChange={onChangeHandler}
          selectedValues={activeFilters?.requestStatus || []}
        />
      </Accordion>
    );
  };

  const renderRequestDateFilter = () => {
    return (
      <DateFilter
        accordionLabel={
          <FormattedMessage id="ui-oa.publicationRequest.requestDate" />
        }
        activeFilters={activeFilters}
        filterHandlers={filterHandlers}
        hideNoDateSetCheckbox
        name="requestDate"
      />
    );
  };

  const renderChargeStatusFitler = () => {
    return (
      <Accordion
        closedByDefault
        displayClearButton={activeFilters?.chargeStatus?.length > 0}
        header={FilterAccordionHeader}
        id="charge-status-filter-accordion"
        label={<FormattedMessage id="ui-oa.searchAndFilter.chargeStatus" />}
        onClearFilter={() => {
          filterHandlers.clearGroup('chargeStatus');
        }}
        separator={false}
      >
        <CheckboxFilter
          dataOptions={chargeStatusValues}
          name="chargeStatus"
          onChange={onChangeHandler}
          selectedValues={activeFilters?.chargeStatus || []}
        />
      </Accordion>
    );
  };

  const renderPublicationTypeFilter = () => {
    return (
      <Accordion
        closedByDefault
        displayClearButton={activeFilters?.publicationType?.length > 0}
        header={FilterAccordionHeader}
        id="publication-type-filter-accordion"
        label={
          <FormattedMessage id="ui-oa.publicationRequest.publicationType" />
        }
        onClearFilter={() => {
          filterHandlers.clearGroup('publicationType');
        }}
        separator={false}
      >
        <CheckboxFilter
          dataOptions={publicationTypeValues}
          name="publicationType"
          onChange={onChangeHandler}
          selectedValues={activeFilters?.publicationType || []}
        />
      </Accordion>
    );
  };

  const renderOAStatusFilter = () => {
    return (
      <Accordion
        closedByDefault
        displayClearButton={activeFilters?.workOAStatus?.length > 0}
        header={FilterAccordionHeader}
        id="work-oa-status-filter-accordion"
        label={<FormattedMessage id="ui-oa.journal.oaStatus" />}
        onClearFilter={() => {
          filterHandlers.clearGroup('workOAStatus');
        }}
        separator={false}
      >
        <CheckboxFilter
          dataOptions={workOAStatusValues}
          name="workOAStatus"
          onChange={onChangeHandler}
          selectedValues={activeFilters?.workOAStatus || []}
        />
      </Accordion>
    );
  };

  const renderPublisherFilter = () => {
    return (
      <Accordion
        closedByDefault
        displayClearButton={activeFilters?.publisher?.length > 0}
        header={FilterAccordionHeader}
        id="publisher-filter-accordion"
        label={<FormattedMessage id="ui-oa.publicationRequest.publisher" />}
        onClearFilter={() => {
          filterHandlers.clearGroup('publisher');
        }}
        separator={false}
      >
        <CheckboxFilter
          dataOptions={publisherValues}
          name="publisher"
          onChange={onChangeHandler}
          selectedValues={activeFilters?.publisher || []}
        />
      </Accordion>
    );
  };

  const renderChargePayersFilter = () => {
    return (
      <Accordion
        closedByDefault
        displayClearButton={activeFilters?.chargePayers?.length > 0}
        header={FilterAccordionHeader}
        id="charge-payers-filter-accordion"
        label={<FormattedMessage id="ui-oa.searchAndFilter.chargePayers" />}
        onClearFilter={() => {
          filterHandlers.clearGroup('chargePayers');
        }}
        separator={false}
      >
        <CheckboxFilter
          dataOptions={chargePayersValues}
          name="chargePayers"
          onChange={onChangeHandler}
          selectedValues={activeFilters?.chargePayers || []}
        />
      </Accordion>
    );
  };

  return (
    <>
      <AccordionSet>
        {renderRequestStatusFilter()}
        {renderRequestDateFilter()}
        {renderChargeStatusFitler()}
        {renderPublicationTypeFilter()}
        {renderOAStatusFilter()}
        {renderPublisherFilter()}
        {renderChargePayersFilter()}
      </AccordionSet>
    </>
  );
}

PublicationRequestsFilters.propTypes = propTypes;

export default PublicationRequestsFilters;

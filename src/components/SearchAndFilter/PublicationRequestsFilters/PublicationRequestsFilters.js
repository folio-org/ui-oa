import PropTypes from 'prop-types';
import {
  CheckboxFilter,
  MultiSelectionFilter,
} from '@folio/stripes/smart-components';
import {
  Accordion,
  AccordionSet,
  FilterAccordionHeader,
  Headline,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { DateFilter } from '@folio/stripes-erm-components';
import ChecklistFilter from '../ChecklistFilter';

import { useOARefdata } from '../../../util';

const propTypes = {
  activeFilters: PropTypes.object,
  filterHandlers: PropTypes.object,
};

const PublicationRequestsFilters = ({ activeFilters, filterHandlers }) => {
  const requestStatusValues = useOARefdata('PublicationRequest.RequestStatus');
  const chargeStatusValues = useOARefdata('Charge.ChargeStatus');
  const publicationTypeValues = useOARefdata(
    'PublicationRequest.PublicationType'
  );
  const workOAStatusValues = useOARefdata('Work.OaStatus');
  const publisherValues = useOARefdata('PublicationRequest.Publisher');
  const chargePayersValues = useOARefdata('Payer.Payer');
  const correspondingInstitutionLevel1Values = useOARefdata(
    'Party.InstitutionLevel1'
  );

  const retrospectiveOAValues = [
    { label: <FormattedMessage id="ui-oa.yes" />, value: 'true' },
    { label: <FormattedMessage id="ui-oa.no" />, value: 'false' },
  ];

  const onChangeHandler = (group) => {
    filterHandlers.state({
      ...activeFilters,
      [group.name]: group.values,
    });
  };

  const renderChecklistFilter = () => {
    return (
      <ChecklistFilter
        activeFilters={activeFilters}
        filterHandlers={filterHandlers}
      />
    );
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
        closedByDefault={false}
        filterHandlers={filterHandlers}
        hideNoDateSetCheckbox
        name="requestDate"
      />
    );
  };

  const renderRetrospectiveOAFilter = () => {
    return (
      <Accordion
        displayClearButton={activeFilters?.retrospectiveOA?.length > 0}
        header={FilterAccordionHeader}
        id="retrospective-open-access-filter-accordion"
        label={
          <FormattedMessage id="ui-oa.publicationRequest.retrospectiveOpenAccess" />
        }
        onClearFilter={() => {
          filterHandlers.clearGroup('retrospectiveOA');
        }}
        separator={false}
      >
        <CheckboxFilter
          dataOptions={retrospectiveOAValues}
          name="retrospectiveOA"
          onChange={onChangeHandler}
          selectedValues={activeFilters?.retrospectiveOA || []}
        />
      </Accordion>
    );
  };

  const renderCorrespondingInstitutionLevel1Filter = () => {
    return (
      <Accordion
        displayClearButton={
          activeFilters?.correspondingInstitutionLevel1?.length > 0
        }
        header={FilterAccordionHeader}
        id="corresponding-institution-level-one-filter-accordion"
        label={<FormattedMessage id="ui-oa.party.institutionLevelOne" />}
        onClearFilter={() => {
          filterHandlers.clearGroup('correspondingInstitutionLevel1');
        }}
        separator={false}
      >
        <MultiSelectionFilter
          ariaLabelledBy="corresponding-institution-level-one-filter-accordion"
          dataOptions={correspondingInstitutionLevel1Values}
          id="corresponding-institution-level-one-filter"
          name="correspondingInstitutionLevel1"
          onChange={onChangeHandler}
          selectedValues={activeFilters?.correspondingInstitutionLevel1 || []}
        />
      </Accordion>
    );
  };

  const renderChargeStatusFitler = () => {
    return (
      <Accordion
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
        displayClearButton={activeFilters?.publisher?.length > 0}
        header={FilterAccordionHeader}
        id="publisher-filter-accordion"
        label={<FormattedMessage id="ui-oa.publicationRequest.publisher" />}
        onClearFilter={() => {
          filterHandlers.clearGroup('publisher');
        }}
        separator={false}
      >
        <MultiSelectionFilter
          ariaLabelledBy="publisher-filter-accordion"
          dataOptions={publisherValues}
          id="publisher-filter"
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
        displayClearButton={activeFilters?.chargePayers?.length > 0}
        header={FilterAccordionHeader}
        id="charge-payers-filter-accordion"
        label={<FormattedMessage id="ui-oa.searchAndFilter.chargePayers" />}
        onClearFilter={() => {
          filterHandlers.clearGroup('chargePayers');
        }}
        separator={false}
      >
        <MultiSelectionFilter
          ariaLabelledBy="charge-payers-filter-accordion"
          dataOptions={chargePayersValues}
          id="charge-payers-filter"
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
        <Headline faded margin="none" size="large">
          <FormattedMessage id="ui-oa.searchAndFilter.requestFilters" />
        </Headline>
        {renderRequestStatusFilter()}
        {renderRequestDateFilter()}
        {renderRetrospectiveOAFilter()}
        {renderCorrespondingInstitutionLevel1Filter()}
        {renderChecklistFilter()}
        <hr />
        <Headline faded margin="none" size="large">
          <FormattedMessage id="ui-oa.searchAndFilter.publicationFilters" />
        </Headline>
        {renderPublicationTypeFilter()}
        {renderPublisherFilter()}
        {renderOAStatusFilter()}
        <hr />
        <Headline faded margin="none" size="large">
          <FormattedMessage id="ui-oa.searchAndFilter.chargeFilters" />
        </Headline>
        {renderChargeStatusFitler()}
        {renderChargePayersFilter()}
      </AccordionSet>
    </>
  );
};

PublicationRequestsFilters.propTypes = propTypes;

export default PublicationRequestsFilters;

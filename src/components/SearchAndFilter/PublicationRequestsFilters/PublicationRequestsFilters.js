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

import { useOARefdata, selectifyRefdata } from '../../../util';

const propTypes = {
  activeFilters: PropTypes.object,
  filterHandlers: PropTypes.object,
};

const PublicationRequestsFilters = ({ activeFilters, filterHandlers }) => {
  const [
    REQUEST_STATUS,
    CHARGE_STATUS,
    PUBLICATION_TYPE,
    OA_STATUS,
    PUBLISHERS,
    CHARGE_PAYERS,
    CORRESPONDING_INSTITUTE,
    CORRESPONDENCE_STATUS
  ] = [
    'PublicationRequest.RequestStatus',
    'Charge.ChargeStatus',
    'PublicationRequest.PublicationType',
    'Work.OaStatus',
    'PublicationRequest.Publisher',
    'Payer.Payer',
    'Party.InstitutionLevel1',
    'Correspondence.Status'
  ];

  const refdataValues = useOARefdata([
    REQUEST_STATUS,
    CHARGE_STATUS,
    PUBLICATION_TYPE,
    OA_STATUS,
    PUBLISHERS,
    CHARGE_PAYERS,
    CORRESPONDING_INSTITUTE,
    CORRESPONDENCE_STATUS,
  ]);

  const requestStatusValues = selectifyRefdata(
    refdataValues,
    REQUEST_STATUS,
    'value'
  );
  const chargeStatusValues = selectifyRefdata(
    refdataValues,
    CHARGE_STATUS,
    'value'
  );
  const publicationTypeValues = selectifyRefdata(
    refdataValues,
    PUBLICATION_TYPE,
    'value'
  );
  const workOAStatusValues = selectifyRefdata(
    refdataValues,
    OA_STATUS,
    'value'
  );
  const publisherValues = selectifyRefdata(refdataValues, PUBLISHERS, 'value');
  const chargePayersValues = selectifyRefdata(
    refdataValues,
    CHARGE_PAYERS,
    'value'
  );
  const correspondingInstitutionLevel1Values = selectifyRefdata(
    refdataValues,
    CORRESPONDING_INSTITUTE,
    'value'
  );

  const correspondenceStatusValues = selectifyRefdata(
    refdataValues,
    CORRESPONDENCE_STATUS,
    'value'
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

  const renderCorrespondenceStatusFilter = () => {
    return (
      <Accordion
        displayClearButton={activeFilters?.correspondenceStatus?.length > 0}
        header={FilterAccordionHeader}
        id="correspondence-status-filter-accordion"
        label={
          <FormattedMessage id="ui-oa.searchAndFilter.correspondenceStatus" />
        }
        onClearFilter={() => {
          filterHandlers.clearGroup('correspondenceStatus');
        }}
        separator={false}
      >
        <MultiSelectionFilter
          ariaLabelledBy="correspondence-status-filter-accordion"
          dataOptions={correspondenceStatusValues}
          id="correspondence-status-filter"
          name="correspondenceStatus"
          onChange={onChangeHandler}
          selectedValues={activeFilters?.correspondenceStatus || []}
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
          <FormattedMessage id="ui-oa.searchAndFilter.correspondenceFilters" />
        </Headline>
        {renderCorrespondenceStatusFilter()}
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

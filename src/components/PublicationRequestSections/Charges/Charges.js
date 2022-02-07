import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { IfPermission } from '@folio/stripes/core';
import { Accordion, Badge, Button } from '@folio/stripes/components';

import urls from '../../../util/urls';

const propTypes = {
  request: PropTypes.object,
};

const Charges = ({ request }) => {
  const renderBadge = (charges) => {
    return charges ? <Badge>{charges?.length}</Badge> : <Badge>0</Badge>;
  };

  const renderAddChargesButton = () => {
    return (
      <>
        <IfPermission perm="oa.publicationRequest.edit">
          <Button
            id="add-charge-button"
            to={`${urls.publicationRequestChargeCreate(request?.id)}`}
          >
            <FormattedMessage id="ui-oa.publicationRequest.addCharge" />
          </Button>
        </IfPermission>
      </>
    );
  };

  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge(request?.charges)}
      displayWhenOpen={renderAddChargesButton()}
      label={<FormattedMessage id="ui-oa.publicationRequest.charges" />}
    />
  );
};

Charges.propTypes = propTypes;

export default Charges;

import PropTypes from 'prop-types';
import { Accordion, Badge, Card } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { AppIcon } from '@folio/stripes/core';
import urls from '../../../util/urls';


const propTypes = {
  request: PropTypes.object,
};

const Agreement = ({ request }) => {
  const renderBadge = (agreement) => {
    return agreement ? <Badge>1</Badge> : <Badge>0</Badge>;
  };

  const renderAgreement = (agreement) => {
    return (
      <>
        <Link to={urls.agreementView(agreement?.remoteId)}>
          {agreement?.id}
        </Link>
      </>
    );
  };
  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge(request?.agreement)}
      displayWhenOpen={renderBadge(request?.agreement)}
      label={<FormattedMessage id="ui-oa.publicationRequest.agreement" />}
    >
      <Card
        cardStyle="positive"
        headerStart={
          <AppIcon app="agreements" size="small">
            <strong>
              <FormattedMessage id="ui-oa.publicationRequest.agreement" />
            </strong>
          </AppIcon>
        }
      >
        {renderAgreement(request?.agreement)}
      </Card>
    </Accordion>
  );
};

Agreement.propTypes = propTypes;

export default Agreement;

import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { Col, KeyValue, Row } from '@folio/stripes/components';

const propTypes = {
  journal: PropTypes.object,
};

const JournalInfo = ({ journal }) => {
  //  TODO: ORCID iD, Phone and Mobile Phone still need to be implemented on backend
  const renderInstances = () => {
    return (
      <>
        {journal.instances.map((instance) => (
          <>
            <Row>
              <Col xs={3}>
                <KeyValue
                  label={<FormattedMessage id="ui-oa.journal.title" />}
                  value={instance?.title}
                />
              </Col>
              <Col xs={3}>
                <KeyValue
                  label={<FormattedMessage id="ui-oa.journal.materialType" />}
                  value={instance?.subType?.label}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <KeyValue
                  label={<FormattedMessage id="ui-oa.journal.ezb" />}
                  value={instance?.ezb}
                />
              </Col>
              <Col xs={3}>
                <KeyValue
                  label={<FormattedMessage id="ui-oa.journal.zdb" />}
                  value={instance?.zdb}
                />
              </Col>
              <Col xs={3}>
                <KeyValue
                  label={<FormattedMessage id="ui-oa.journal.issn" />}
                  value={instance?.issn}
                />
              </Col>
            </Row>
            <hr />
          </>
        ))}
      </>
    );
  };

  return <>{journal.instances ? renderInstances() : null}</>;
};

JournalInfo.propTypes = propTypes;

export default JournalInfo;

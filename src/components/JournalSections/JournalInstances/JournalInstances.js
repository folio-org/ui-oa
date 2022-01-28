import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { Col, KeyValue, Row, Layout } from '@folio/stripes/components';

import { findIdentifierByNamespace } from '../../../util/journalUtils';

const propTypes = {
  journal: PropTypes.object,
};

const JournalInstances = ({ journal }) => {
  const renderEmpty = () => {
    return (
      <Layout className="padding-bottom-gutter">
        <FormattedMessage id="ui-oa.journal.noTitleInstances" />
      </Layout>
    );
  };

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
              {findIdentifierByNamespace(instance, 'ezb') && (
                <Col xs={3}>
                  <KeyValue
                    label={<FormattedMessage id="ui-oa.journal.ezb" />}
                    value={findIdentifierByNamespace(instance, 'ezb')?.value}
                  />
                </Col>
              )}
              {findIdentifierByNamespace(instance, 'zdb') && (
                <Col xs={3}>
                  <KeyValue
                    label={<FormattedMessage id="ui-oa.journal.zdb" />}
                    value={findIdentifierByNamespace(instance, 'zdb')?.value}
                  />
                </Col>
              )}
              {findIdentifierByNamespace(instance, 'issn') && (
                <Col xs={3}>
                  <KeyValue
                    label={<FormattedMessage id="ui-oa.journal.issn" />}
                    value={findIdentifierByNamespace(instance, 'issn')?.value}
                  />
                </Col>
              )}
            </Row>
            <hr />
          </>
        ))}
      </>
    );
  };

  return <>{journal.instances ? renderInstances() : renderEmpty()}</>;
};

JournalInstances.propTypes = propTypes;

export default JournalInstances;

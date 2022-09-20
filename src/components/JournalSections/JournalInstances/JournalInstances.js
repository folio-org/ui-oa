/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { orderBy } from 'lodash';

import {
  Col,
  KeyValue,
  Row,
  Layout,
  Headline,
} from '@folio/stripes/components';

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

  return journal?.instances ? (
    <div tabIndex={0}>
      {orderBy(journal.instances, 'subType.value').map((instance, index) => {
        const ezbIdentifier = findIdentifierByNamespace(instance, 'ezb');
        const zdbIdentifier = findIdentifierByNamespace(instance, 'zdb');
        const issnIdentifier = findIdentifierByNamespace(instance, 'issn');

        return (
          <div key={index} data-testid={`journalInstances[${index}]`}>
            {index === 0 && (
              <>
                <Headline margin="small" size="xx-large" tag="h1">
                  {instance?.title}
                </Headline>
                <Row>
                  <Col xs={3}>
                    <KeyValue
                      label={<FormattedMessage id="ui-oa.journal.inDOAJ" />}
                      value={journal?.indexedInDOAJ?.label}
                    />
                  </Col>
                  <Col xs={3}>
                    <KeyValue
                      label={<FormattedMessage id="ui-oa.journal.oaStatus" />}
                      value={journal?.oaStatus?.label}
                    />
                  </Col>
                </Row>
              </>
            )}
            <hr />
            <Row>
              <Col xs={3}>
                <KeyValue
                  label={<FormattedMessage id="ui-oa.journal.materialType" />}
                  value={instance?.subType?.label}
                />
              </Col>
            </Row>
            <Row>
              {ezbIdentifier && (
                <Col xs={3}>
                  <KeyValue
                    label={<FormattedMessage id="ui-oa.journal.ezb" />}
                    value={ezbIdentifier?.value}
                  />
                </Col>
              )}
              {zdbIdentifier && (
                <Col xs={3}>
                  <KeyValue
                    label={<FormattedMessage id="ui-oa.journal.zdb" />}
                    value={zdbIdentifier?.value}
                  />
                </Col>
              )}
              {issnIdentifier && (
                <Col xs={3}>
                  <KeyValue
                    label={<FormattedMessage id="ui-oa.journal.issn" />}
                    value={issnIdentifier?.value}
                  />
                </Col>
              )}
            </Row>
          </div>
        );
      })}
    </div>
  ) : (
    renderEmpty()
  );
};

JournalInstances.propTypes = propTypes;

export default JournalInstances;

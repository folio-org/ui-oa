import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Col,
  IconButton,
  Row,
  Select,
  Tooltip,
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';
import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import useOARefdata from '../../../../util/useOARefdata';
import selectifyRefdata from '../../../../util/selectifyRefdata';

const [FUNDER, ASPECT_FUNDED] = ['Funding.Funder', 'Funding.AspectFunded'];

const FundingField = ({ fields: { name } }) => {
  const { items, onAddField, onDeleteField } = useKiwtFieldArray(name);
  const funderRefdataValues = useOARefdata([FUNDER, ASPECT_FUNDED]);

  const fundersValues = selectifyRefdata(funderRefdataValues, FUNDER);
  const aspectFundedValues = selectifyRefdata(
    funderRefdataValues,
    ASPECT_FUNDED
  );

  return (
    <>
      {items.map((funding, index) => {
        return (
          <div key={name + index} data-testid={`fundingFieldArray[${index}]`}>
            <Row>
              <Col xs={3}>
                <Field
                  autoFocus={!funding?.id}
                  component={Select}
                  dataOptions={[
                    { value: '', label: '' },
                    ...aspectFundedValues,
                  ]}
                  label={
                    <FormattedMessage id="ui-oa.publicationRequest.aspectFunded" />
                  }
                  name={`${name}[${index}].aspectFunded.id`}
                  required
                  validate={requiredValidator}
                />
              </Col>
              <Col xs={3}>
                <Field
                  component={Select}
                  dataOptions={[{ value: '', label: '' }, ...fundersValues]}
                  label={
                    <FormattedMessage id="ui-oa.publicationRequest.funder" />
                  }
                  name={`${name}[${index}].funder.id`}
                  required
                  validate={requiredValidator}
                />
              </Col>
              <Col xs={6}>
                <Tooltip
                  id={`funding-${index + 1}-trash-button-tooltip`}
                  text={
                    <FormattedMessage
                      id="ui-oa.publicationRequest.removeFundingIndex"
                      values={{ index: index + 1 }}
                    />
                  }
                >
                  {({ ref, ariaIds }) => (
                    <IconButton
                      ref={ref}
                      aria-describedby={ariaIds.sub}
                      aria-labelledby={ariaIds.text}
                      icon="trash"
                      onClick={() => onDeleteField(index, funding)}
                      style={{ 'paddingTop': '25px' }}
                    />
                  )}
                </Tooltip>
              </Col>
            </Row>
          </div>
        );
      })}
      <Button onClick={() => onAddField({})}>
        <FormattedMessage id="ui-oa.funders.addFunding" />
      </Button>
    </>
  );
};

FundingField.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const FundingFieldArray = () => {
  return <FieldArray component={FundingField} name="fundings" />;
};

export default FundingFieldArray;

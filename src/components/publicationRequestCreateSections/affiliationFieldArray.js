import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { EditCard } from '@folio/stripes-erm-components';

import {
  Button,
  Col,
  Headline,
  Label,
  Row,
} from '@folio/stripes/components';

const OtherEmailFieldArray = () => {
  const renderAffiliations = (fields) => {
    return (
      <div>
        {fields.map((affiliation, index) => (
          <EditCard
            key={affiliation}
            deleteButtonTooltipText={<FormattedMessage id="ui-oa.affiliation.removeAffiliation" values={{ number: index + 1 }}/>}
            header={<FormattedMessage id="ui-oa.affiliation.affiliationTitle" values={{ number: index + 1 }}/>}
            onDelete={index !== 0 ? () => fields.remove(index) : undefined}
          >
            {/* TODO: Detect if affiliation is selected / new and render correct func */}
          </EditCard>
        ))}
      </div>
    )
  }

  const renderNewAffiliation = () => {
    return (
      <div>
        <Row>
          <Col xs={3}>
            <Button>
              <FormattedMessage id="ui-oa.affiliation.selectAffiliation" />
            </Button>
          </Col>
          <Col xs={9} />
        </Row>
        <Row>
          <Col xs={3}>
            <Field
              component={Datepicker}
              label={<FormattedMessage id="ui-oa.affiliation.affiliationDateFrom" />}
              name={"affiliationDateFrom"}
            />
          </Col>
          <Col xs={3}>
            <Field
              component={Datepicker}
              label={<FormattedMessage id="ui-oa.affiliation.affiliationDateTo" />}
              name={"affiliationDateTo"}
            />
          </Col>
          <Col xs={6} />
        </Row>
      </div>
    )
  }

  const renderSelectedAffiliation = (affiliation) => {
    return (
      <div>
        <Row>
          <Col xs={3}>
            <Label>
              <FormattedMessage id="ui-oa.affiliation.faculty" />
            </Label>
            <p>
              {/* {affiliation.faculty} */}
              Science
            </p>
          </Col>
          <Col xs={3}>
            <Label>
              <FormattedMessage id="ui-oa.affiliation.school" />
            </Label>
            <p>
              {/* {affiliation.school} */}
              Science
            </p>
          </Col>
          <Col xs={3}>
            <Label>
              <FormattedMessage id="ui-oa.affiliation.department" />
            </Label>
            <p>
              {/* {affiliation.department} */}
              Science
            </p>
          </Col>
          <Col xs={3} />
        </Row>

        <Row>
          <Col xs={3}>
            <Button>
              <FormattedMessage id="ui-oa.affiliation.editAffiliation" />
            </Button>
          </Col>
          <Col xs={9} />
        </Row>

        <Row>
          <Col xs={3}>
            <Field
              component={Datepicker}
              label={<FormattedMessage id="ui-oa.affiliation.affiliationDateFrom" />}
              name={"affiliationDateFrom"}
            />
          </Col>
          <Col xs={3}>
            <Field
              component={Datepicker}
              label={<FormattedMessage id="ui-oa.affiliation.affiliationDateTo" />}
              name={"affiliationDateTo"}
            />
          </Col>
          <Col xs={6} />
        </Row>
      </div>
    )
  }

  const renderEmpty = () => {
    return (
      <div></div>
    )
  }

  return (
    <FieldArray name="affiliation">
      {({ fields }) => (
        <div>
          <div>
            {fields.length ? renderAffiliations(fields) : renderEmpty()}
          </div>
          <Button
            onClick={() => fields.push({})}
          >
            <FormattedMessage id="ui-oa.affiliation.addAffiliation" />
          </Button>
        </div>
      )}
    </FieldArray>)
}

export default OtherEmailFieldArray;
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Accordion,
  AccordionSet,
  Button,
  Col,
  Datepicker,
  Headline,
  Pane,
  PaneFooter,
  PaneHeader,
  Paneset,
  Row,
  Select,
  TextField,
  TextLink
} from '@folio/stripes/components';
import FunderFieldArray from '../components/publicationRequestCreateSections/funderFieldArray';

const publicationRequestCreate = ({
  handlers: {
    onClose,
    onSubmit
  },
  pristine,
  refValues,
  submitting
}) => {
  const renderPaneFooter = () => {
    return (
      <PaneFooter
        renderEnd={(
          <Button
            buttonStyle="primary mega"
            disabled={pristine || submitting}
            marginBottom0
            onClick={onSubmit}
            type="submit"
          >
            <FormattedMessage id="stripes-components.saveAndClose" />
          </Button>
        )}
        renderStart={(
          <Button
            buttonStyle="default mega"
            marginBottom0
            onClick={onClose}
          >
            <FormattedMessage id="stripes-components.cancel" />
          </Button>
        )}
      />
    );
  }

  return (
    <Paneset>
      <Pane
        defaultWidth="fill"
        footer={renderPaneFooter()}
        renderHeader={renderProps => <PaneHeader {...renderProps} paneTitle="New Publication Request" />}
      >
        <AccordionSet>
          <Row end="xs">
            <Col xs={3}>
              <Field
                component={TextLink}
                label={<FormattedMessage id="ui-oa.publicationRequest.createPublicationRequest" />}
                name={"requestDate"}
              // required
              />
            </Col>
            <Col xs={3}>
              <Field
                component={Datepicker}
                label={<FormattedMessage id="ui-oa.publicationRequest.createPublicationRequest" />}
                name={"requestDate"}
              // required
              />
            </Col>
            <Col xs={3}>
              <Field
                component={Select}
                dataOptions={['', ...refValues]}
                label={<FormattedMessage id="ui-oa.publicationRequest.status" />}
                name="requestStatus"
              // required
              />
            </Col>
            <Col xs={3}>
              <Field
                component={Select}
                dataOptions={['']}
                label={<FormattedMessage id="ui-oa.publicationRequest.rejectionReason" />}
                name="asdf"
              />
            </Col>
          </Row>

          <Accordion
            label={<FormattedMessage id="ui-oa.publicationRequest.correspondingAuthor" />}
          >
            <Row end="xs">
              <Col xs={3}>
                <Field
                  component={Select}
                  dataOptions={[]}
                  label={<FormattedMessage id="ui-oa.publicationRequest.title" />}
                  name="asdf"
                />
              </Col>
              <Col xs={3}>
                <Field
                  autoFocus
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.familyName" />}
                  maxLength={255}
                  name="asdf"
                />
              </Col>
              <Col xs={3}>
                <Field
                  autoFocus
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.givenName" />}
                  maxLength={255}
                  name="asdf"
                />
              </Col>
              <Col xs={3}>
                <Field
                  autoFocus
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.orcidId" />}
                  maxLength={255}
                  name="asdf"
                />
              </Col>
            </Row>

            <Row>
              <Col xs>
                {/* TODO: Author Lookup Button */}
              </Col>
            </Row>

            <Row end="xs">
              <Col xs={3}>
                <Field
                  autoFocus
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.mainEmail" />}
                  maxLength={255}
                  name="asdf"
                />
              </Col>
              <Col xs={3}>
                <Field
                  autoFocus
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.phone" />}
                  maxLength={255}
                  name="asdf"
                />
              </Col>
              <Col xs={3}>
                <Field
                  autoFocus
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.mobile" />}
                  maxLength={255}
                  name="asdf"
                />
              </Col>
              <Col xs={3}>
              </Col>
            </Row>

            <Row>
              <Col xs>
                {/* TODO: FieldArray for Email Addresses */}
              </Col>
            </Row>

            <Row>
              <Col xs>
                {/* TODO: FieldArray for Street Addresses */}
              </Col>
            </Row>

            <Row>
              <Col xs>
                <Headline size="large" margin="small" tag="h3">
                  <FormattedMessage id="ui-oa.publicationRequest.streetAddresses" />
                </Headline>
              </Col>
            </Row>

            <Row>
              <Col xs>
                <Headline size="large" margin="small" tag="h3">
                  <FormattedMessage id="ui-oa.publicationRequest.affiliations" />
                </Headline>
              </Col>
            </Row>

          </Accordion>

          <Accordion
            label={<FormattedMessage id="ui-oa.publicationRequest.requestContact" />}
          >
            <Row end="xs">
              <Col xs={3}>
                <Field
                  component={Select}
                  dataOptions={[]}
                  label={<FormattedMessage id="ui-oa.publicationRequest.title" />}
                  name="asdf"
                />
              </Col>
              <Col xs={3}>
                <Field
                  autoFocus
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.familyName" />}
                  maxLength={255}
                  name="asdf"
                />
              </Col>
              <Col xs={3}>
                <Field
                  autoFocus
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.givenName" />}
                  maxLength={255}
                  name="asdf"
                />
              </Col>
              <Col xs={3}>
              </Col>
            </Row>

            <Row end="xs">
              <Col xs={3}>
                <Field
                  autoFocus
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.mainEmail" />}
                  maxLength={255}
                  name="asdf"
                />
              </Col>
              <Col xs={3}>
                <Field
                  autoFocus
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.phone" />}
                  maxLength={255}
                  name="asdf"
                />
              </Col>
              <Col xs={3}>
                <Field
                  autoFocus
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.mobile" />}
                  maxLength={255}
                  name="asdf"
                />
              </Col>
              <Col xs={3}>
              </Col>
            </Row>

          </Accordion>

          <Accordion
            label={<FormattedMessage id="ui-oa.publicationRequest.publication" />}
          >
            <Row end="xs">
              <Col xs={3}>
                <Field
                  component={Select}
                  dataOptions={[]}
                  label={<FormattedMessage id="ui-oa.publicationRequest.doi" />}
                  name="asdf"
                />
              </Col>
              <Col xs={3}>
              </Col>
              <Col xs={3}>
              </Col>
              <Col xs={3}>
              </Col>
            </Row>

            <Row end="xs">
              <Col xs={3}>
                <Field
                  component={Select}
                  dataOptions={[]}
                  label={<FormattedMessage id="ui-oa.publicationRequest.publicationType" />}
                  name="asdf"
                />
              </Col>
              <Col xs={3}>
                <Field
                  component={Select}
                  dataOptions={[]}
                  label={<FormattedMessage id="ui-oa.publicationRequest.subtype" />}
                  name="asdf"
                />
              </Col>
              <Col xs={3}>
                <Field
                  component={Select}
                  dataOptions={[]}
                  label={<FormattedMessage id="ui-oa.publicationRequest.publisher" />}
                  name="asdf"
                />
              </Col>
              <Col xs={3}>
                <Field
                  component={Select}
                  dataOptions={[]}
                  label={<FormattedMessage id="ui-oa.publicationRequest.license" />}
                  name="asdf"
                />
              </Col>
            </Row>

            <Row end="xs">
              <Col xs={6}>
                <Field
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.publicationTitle" />}
                  name="asdf"
                />
              </Col>
              <Col xs={6}>
                <Field
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.authorNames" />}
                  name="asdf"
                />
              </Col>
            </Row>

            <Row end="xs">
              <Col xs={6}>
                <Field
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.publicationUrl" />}
                  name="asdf"
                />
              </Col>
              <Col xs={6}>
                <Field
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.localReference" />}
                  name="asdf"
                />
              </Col>
            </Row>

            <Row>
              <Col xs>
                <Headline size="large" margin="small" tag="h3">
                  <FormattedMessage id="ui-oa.publicationRequest.identifiers" />
                </Headline>
              </Col>
            </Row>

            <Row end="xs">
              <Col xs={6}>
                <Field
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.journalTitle" />}
                  name="asdf"
                />
              </Col>
              <Col xs={3}>
                <Field
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.issnPrint" />}
                  name="asdf"
                />
              </Col>
              <Col xs={3}>
                <Field
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.issnElectronic" />}
                  name="asdf"
                />
              </Col>
            </Row>


            <Row end="xs">
              <Col xs={3}>
                <Field
                  component={Select}
                  dataOptions={[]}
                  label={<FormattedMessage id="ui-oa.publicationRequest.oaStatus" />}
                  name="asdf"
                />
              </Col>
              <Col xs={9}>
              </Col>
            </Row>

            <Row>
              <Col xs>
                <Headline size="large" margin="small" tag="h3">
                  <FormattedMessage id="ui-oa.publicationRequest.bookDetails" />
                </Headline>
              </Col>
            </Row>

            <Row end="xs">
              <Col xs={3}>
                <Field
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.publicationYear" />}
                  name="asdf"
                />
              </Col>
              <Col xs={3}>
                <Field
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.publicationPlace" />}
                  name="asdf"
                />
              </Col>
              <Col xs={6}>
              </Col>
            </Row>
          </Accordion>

          <Accordion label={<FormattedMessage id="ui-oa.publicationRequest.publicationStatus" />}>
            <Row end="xs">
              <Col xs={3}>
                <Field
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.status" />}
                  name="asdf"
                />
              </Col>
              <Col xs={3}>
                <Field
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.statusDate" />}
                  name="asdf"
                />
              </Col>
              <Col xs={6}>
                <Field
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.publicationRequest.statusNote" />}
                  name="asdf"
                />
              </Col>
            </Row>
          </Accordion>

          <Accordion label={<FormattedMessage id="ui-oa.publicationRequest.funding" />}>
            {/* <FieldArray
              component={FunderFieldArray}
              name="funding"
              items={values}
            /> */}
            <FunderFieldArray
            name="funding"/>
          </Accordion>

        </AccordionSet>
      </Pane>
    </Paneset >
  )
}
export default publicationRequestCreate;
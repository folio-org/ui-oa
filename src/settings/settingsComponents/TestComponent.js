import React from 'react';

import { Button, Col, Pane, Row, TextField } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import { Form, Field, useFormState } from 'react-final-form';

import generateKiwtQuery from '../../util/generateKiwtQuery';
import TypeDown from '../../components/TypeDown/TypeDown';

const TestField = () => {
  const pathMutator = (input, path) => {
    const query = generateKiwtQuery(
      {
        searchKey: 'name,alternateNames.name'
      }, {
        sort: 'name',
        query: input,
        stats: false
      }
    );

    return `${path}${query}`;
  };

  console.log("Current values: %o", useFormState()?.values)
  return (
    <Field
      component={TypeDown}
      name="test"
      path="erm/sas"
      pathMutator={pathMutator}
      renderFooter={() => (
        <>
          <Button
            id="footer button 1"
            onClick={() => {
              alert('sup')
            }}
            type="button"
          >
            Hello 1
          </Button>
          <Button
            id="footer button 2"
            onClick={() => {
              alert('sup 2')
            }}
            type="button"
          >
            Hello 2
          </Button>
        </>
      )}
      renderListItem={agreement => {
        return (
          <>
            <AppIcon
              app="agreements"
              size="small"
            >
              {agreement.name}
            </AppIcon>
          </>
        );
      }}
    />
    );
};


const TestComponent = () => {
  return (
    <Pane
      defaultWidth="fill"
      dismissible
      id="test-typedown"
      paneTitle={"Test typedown"}
    >
      <Form
        enableReinitialize
        navigationCheck
        onSubmit={(values) => console.log("submitting: %o", values)}
        subscription={{ values: true }}
      >
        {({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col xs={6}>
                  <TestField />
                </Col>
                <Col xs={6}>
                  <Field
                    component={TextField}
                    name="test2"
                  />
                </Col>
              </Row>
            </form>
          );
        }}
      </Form>
    </Pane>
  );
};

export default TestComponent;

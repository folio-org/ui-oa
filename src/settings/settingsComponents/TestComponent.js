import React from 'react';

import { Pane } from '@folio/stripes/components';
import TypeDown from '../../components/TypeDown/TypeDown';
import { Form, Field, useFormState } from 'react-final-form';

const TestField = () => {

  const pathMutator = (input, path) => {
    const withFilters = `?match=name&match=alternateNames.name&term=${input}`;
    return `${path}${input ? withFilters : ''}`;
  };
  console.log("Current values: %o", useFormState()?.values)
  return (
    <Field
      component={TypeDown}
      name="test"
      path="erm/sas"
      pathMutator={pathMutator}
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
              <TestField />
            </form>
          );
        }}
      </Form>
    </Pane>
  );
};

export default TestComponent;

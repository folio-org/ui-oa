import React from 'react';

import { Pane } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import { Form, Field, useFormState } from 'react-final-form';

import TypeDown from '../../components/TypeDown/TypeDown';

const TestField = () => {
  const pathMutator = (input, path) => {
    const pathParams = [];
    if (input) {
      pathParams.push(`match=name&match=alternateNames.name&term=${input}`)
    }
    pathParams.push('sort=name;asc');

    return `${path}?${pathParams.join('&')}`;
  };
  console.log("Current values: %o", useFormState()?.values)
  return (
    <Field
      component={TypeDown}
      name="test"
      path="erm/sas"
      pathMutator={pathMutator}
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
              <TestField />
            </form>
          );
        }}
      </Form>
    </Pane>
  );
};

export default TestComponent;

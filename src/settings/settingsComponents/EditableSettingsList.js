import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'react-final-form-arrays';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { Pane } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

import EditableSettingsListFieldArray from './EditableSettingsListFieldArray';

class EditableSettingsList extends React.Component {
  static propTypes = {
    onSave: PropTypes.func,
    data: PropTypes.shape({
      refdatavalues: PropTypes.arrayOf(PropTypes.object)
    }),
    settingSection: PropTypes.string,
    initialValues: PropTypes.object
  };

  handleSave = (...rest) => {
    return this.props.onSave(...rest);
  }

  render() {
    const {
      data,
      settingSection,
      initialValues,
    } = this.props;
    return (
      <Form
        enableReinitialize
        initialValues={initialValues}
        keepDirtyOnReinitialize
        mutators={{
          setSettingValue: (args, state, tools) => {
            tools.changeValue(state, args[0], () => args[1]);
          },
          ...arrayMutators
        }}
        navigationCheck
        onSubmit={this.handleSave}
        subscription={{ value: true }}
      >
        {({ handleSubmit, mutators }) => (
          <Pane
            defaultWidth="fill"
            id={`settings-${settingSection}`}
            paneTitle={<FormattedMessage id={`ui-oa.settingsSection.${settingSection}`} />}
          >
            <form onSubmit={handleSubmit}>
              <FieldArray
                component={EditableSettingsListFieldArray}
                data={{
                  refdatavalues: data?.refdatavalues
                }}
                initialValues={initialValues}
                mutators={mutators}
                name="settings"
                onSave={this.handleSave}
              />
            </form>
          </Pane>
        )}
      </Form>
    );
  }
}

export default EditableSettingsList;

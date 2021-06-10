import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import SettingField from './SettingField';

export default class EditableSettingsListFieldArray extends React.Component {
  static propTypes = {
    fields: PropTypes.object,
    onSave: PropTypes.func,
    data: PropTypes.shape({
      refdatavalues: PropTypes.arrayOf(PropTypes.object)
    }),
    mutators: PropTypes.object,
    initialValues: PropTypes.object
  };

  handleSave = (index) => {
    const setting = this.props.fields.value[index];
    return this.props.onSave(setting);
  }

  render() {
    const { data, fields, mutators } = this.props;
    return (
      // Returns the settings in alphabetical order
      (fields.value || []).sort((a, b) => {
        return (a.key > b.key ? 1 : (b.key > a.key) ? -1 : 0);
      }).map((setting, i) => (
        <Field
          key={`${fields.name}[${i}]`}
          component={SettingField}
          initialValues={this.props.initialValues}
          mutators={mutators}
          name={`${fields.name}[${i}].value`}
          onSave={() => this.handleSave(i)}
          settingData={{
            currentSetting: setting,
            refdatavalues: data?.refdatavalues
          }}
        />
      ))
    );
  }
}

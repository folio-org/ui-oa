import PropTypes from 'prop-types';
import { CheckboxFilter } from '@folio/stripes/smart-components';

const propTypes = {
  activeFilters: PropTypes.object,
  // data: PropTypes.object.isRequired,
  filterHandlers: PropTypes.object,
};

function OAFilters({ activeFilters, filterHandlers }) {
  const onChangeHandler = (group) => {
    filterHandlers.state({
      ...activeFilters,
      [group.name]: group.values
    });
  };
  return (
    <CheckboxFilter
      dataOptions={[
        { id: '123', label: 'Test 1', value: 'test1' },
        { id: '456', label: 'Test 2', value: 'test2' }
      ]}
      name="journalVolume"
      onChange={onChangeHandler}
      selectedValues={activeFilters['journalVolume'] || []}
    />
  );
}

OAFilters.propTypes = propTypes;

export default OAFilters;

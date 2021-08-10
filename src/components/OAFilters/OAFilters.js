import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { CheckboxFilter } from '@folio/stripes/smart-components';

const propTypes = {
  activeFilters: PropTypes.object,
  data: PropTypes.object.isRequired,
  filterHandlers: PropTypes.object,
}

export default function OAFilters({ activeFilters, filterHandlers }) {
  return (
      <CheckboxFilter
        dataOptions={[
          {id: '123', label: 'Test 1', value: 'test1'},
          {id: '456', label: 'Test 2', value: 'test2'}
        ]}
        name={'journalVolume'}
        onChange={(group) => {
          filterHandlers.state({
            ...activeFilters,
            [group.name]: group.values
          });
        }}
        selectedValues={activeFilters['journalVolume'] || []}
      />
  );
}
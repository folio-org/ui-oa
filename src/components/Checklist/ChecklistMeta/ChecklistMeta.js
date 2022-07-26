import PropTypes from 'prop-types';

import { FormattedTime, FormattedDate, FormattedMessage } from 'react-intl';

import css from '../Checklist.css';

const propTypes = {
  dateCreated: PropTypes.string,
  lastUpdated: PropTypes.string,
};

const ChecklistMeta = ({ dateCreated, lastUpdated }) => {
  if (dateCreated && lastUpdated) {
    return (
      <div className={css.metaContainer}>
        {dateCreated === lastUpdated ? (
          <FormattedMessage
            id="ui-oa.checklist.created"
            values={{
              date: <FormattedDate value={dateCreated} />,
              time: <FormattedTime value={dateCreated} />,
            }}
          >
            {(txt) => <span className={css.meta}>{txt}</span>}
          </FormattedMessage>
        ) : (
          <FormattedMessage
            id="ui-oa.checklist.updated"
            values={{
              date: <FormattedDate value={lastUpdated} />,
              time: <FormattedTime value={lastUpdated} />,
            }}
          >
            {(txt) => <span className={css.meta}>{txt}</span>}
          </FormattedMessage>
        )}
      </div>
    );
  }
  return <></>;
};

ChecklistMeta.propTypes = propTypes;

export default ChecklistMeta;

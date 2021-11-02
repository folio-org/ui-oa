import PropTypes from 'prop-types';
import { Icon } from '@folio/stripes/components';

const propTypes = {
  content: PropTypes.string,
  href: PropTypes.string
};

const ExternalLink = ({ content, href }) => {
  return (
    <a href={href}>
      {content}
      <Icon icon="external-link" iconPosition="end" />
    </a>
  );
};

ExternalLink.propTypes = propTypes;

export default ExternalLink;

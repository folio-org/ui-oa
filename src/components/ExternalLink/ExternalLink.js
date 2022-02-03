import PropTypes from 'prop-types';
import { Icon } from '@folio/stripes/components';

const propTypes = {
  content: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.bool
};

const ExternalLink = ({ content, href, icon }) => {
  return (
    <a href={href}>
      {content}
      {icon &&
      <Icon icon="external-link" iconPosition="end" />
      }
    </a>
  );
};

ExternalLink.propTypes = propTypes;

export default ExternalLink;

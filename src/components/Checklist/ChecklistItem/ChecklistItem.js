import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import classNames from 'classnames';
import orderBy from 'lodash/orderBy';

import {
  Col,
  Row,
  InfoPopover,
  IconButton,
  Headline,
  Layout,
} from '@folio/stripes/components';
import { IconSelect } from '@k-int/stripes-kint-components';

import css from '../Checklist.css';
import ChecklistMeta from '../ChecklistMeta';

import { CheckFatIcon, CrossFatIcon, DashFatIcon } from '../../CustomIcons';

const propTypes = {
  resource: PropTypes.object,
  item: PropTypes.object,
  handleSubmit: PropTypes.func,
  setSelectedNotesItem: PropTypes.func,
};
const ChecklistItem = ({
  resource,
  item,
  handleSubmit,
  setSelectedNotesItem,
}) => {
  const sortedNotes = orderBy(item.notes, 'lastUpdated', 'desc');

  const buttonOptions = [
    {
      icon: CheckFatIcon,
      value: 'yes',
      label: <FormattedMessage id="ui-oa.checklist.outcome.yes" />,
      buttonProps: { className: classNames(css.yesOptionButton, css.buttonBorder) },
      iconProps: {
        iconClassName: css.yesOptionIcon,
      },
    },
    {
      icon: CrossFatIcon,
      value: 'no',
      label: <FormattedMessage id="ui-oa.checklist.outcome.no" />,
      buttonProps: { className: classNames(css.noOptionButton, css.buttonBorder) },
      iconProps: {
        iconClassName: css.noOptionIcon,
      },
    },
    {
      icon: DashFatIcon,
      value: 'other',
      label: <FormattedMessage id="ui-oa.checklist.outcome.other" />,
      buttonProps: { className: classNames(css.otherOptionButton, css.buttonBorder) },
      iconProps: {
        iconClassName: css.otherOptionIcon,
      },
    },
  ];

  const notSet = {
    icon: 'ellipsis',
    value: '',
    label: <FormattedMessage id="ui-oa.checklist.outcome.notSet" />,
    buttonProps: { className: css.buttonBorder },
  };

  return (
    <>
      <div key={item?.id} className={css.checklistContainer}>
        <Layout className="flex justified">
          <Headline margin="none" size="large" tag="h3">
            {item.definition.label}
            <InfoPopover content={item?.definition?.description} />
          </Headline>
          <IconSelect
            notSet={notSet}
            onChange={(_e, value) => {
              handleSubmit({ outcome: value }, item);
            }}
            options={buttonOptions}
            value={item?.outcome?.value || ''}
          />
        </Layout>
        <Row>
          <Col xs={12}>
            <ChecklistMeta
              dateCreated={resource?.dateCreated}
              lastUpdated={item?.lastUpdated || resource?.dateCreated}
            />
          </Col>
        </Row>
        <br />
        {item?.notes?.length > 0 && (
          <>
            <Row>
              <Col style={{ lineHeight: 1.5 }} xs={12}>
                {sortedNotes[0]?.note?.length < 100
                  ? sortedNotes[0]?.note
                  : sortedNotes[0]?.note?.substring(0, 100) + '...'}
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <ChecklistMeta
                  dateCreated={sortedNotes[0]?.dateCreated}
                  lastUpdated={sortedNotes[0]?.lastUpdated}
                />
              </Col>
            </Row>
            <br />
          </>
        )}
        <Row>
          <Col xs={12}>
            <FormattedMessage
              id="ui-oa.checklist.notesForItem"
              values={{ item: item.definition.label }}
            >
              {(ariaLabel) => (
                <IconButton
                  ariaLabel={ariaLabel}
                  badgeCount={item?.notes?.length || 0}
                  icon="document"
                  onClick={() => setSelectedNotesItem(item)}
                />
              )}
            </FormattedMessage>
            <IconButton
              icon={
                item?.status?.value === 'not_required'
                  ? 'eye-open'
                  : 'eye-closed'
              }
              onClick={() => {
                if (item?.status?.value === 'not_required') {
                  handleSubmit({ status: 'required' }, item);
                } else {
                  handleSubmit({ status: 'not_required' }, item);
                }
              }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

ChecklistItem.propTypes = propTypes;
export default ChecklistItem;

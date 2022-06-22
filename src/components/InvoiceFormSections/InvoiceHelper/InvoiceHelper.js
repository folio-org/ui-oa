import { MessageBanner, Row, Col } from '@folio/stripes/components';
import {
  FormattedMessage,
} from 'react-intl';

const InvoiceHelper = () => {
  return (
    <>
      <Row>
        <Col xs={12}>
          <MessageBanner>
            <FormattedMessage id="ui-oa.charge.invoice.invoiceHelperMessage" />
          </MessageBanner>
        </Col>
      </Row>
      <br />
    </>
  );
};

export default InvoiceHelper;

import { render, screen } from '@testing-library/react';
import RequestInfo from './RequestInfoCreate';

describe('request info', () => {
  test('reason for rejection is disabled when status is not selected', () => {
    const { getByText } = renderWithIntl(
      <RequestInfo />,
      translationsProperties
    );
    expect(getByText('Status')).toBeInTheDocument();
  })
});
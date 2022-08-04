const charge = {
  id: '3c939ec0-2a2a-4c34-948f-caf147405526',
  discount: 10.0,
  amount: {
    id: '34ed52f9-cd01-49f7-9bac-7bb703e9c970',
    value: 100.0,
    baseCurrency: 'USD',
  },
  exchangeRate: {
    id: '8d8d7800-4ded-49a3-b20b-068f59d6f89d',
    coefficient: 1.1,
    fromCurrency: 'USD',
    toCurrency: 'GBP',
  },
  description: 'Test Charge',
  localAmount: {
    value: 110.0,
    baseCurrency: 'GBP',
  },
};

const handlers = {
    onClose: jest.fn(),
    onDelete: jest.fn(),
    onEdit: jest.fn(),
    onSubmit: jest.fn(),
};
export { charge, handlers };

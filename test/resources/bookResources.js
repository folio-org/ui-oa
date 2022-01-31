const book = {
    'publicationPlace': 'Test Place',
    'publicationYear' : 'Test Year'
};

const handlers = {
    onClose: jest.fn(),
    onDelete: jest.fn(),
    onEdit: jest.fn(),
    onSubmit: jest.fn(),
};

export { book, handlers };

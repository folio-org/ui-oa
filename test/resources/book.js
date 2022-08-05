const book = {
    'bookPlaceOfPublication': 'Test Place',
    'bookDateOfPublication' : '1996-10-10'
};

const handlers = {
    onClose: jest.fn(),
    onDelete: jest.fn(),
    onEdit: jest.fn(),
    onSubmit: jest.fn(),
};

export { book, handlers };

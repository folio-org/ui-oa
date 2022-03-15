import orderBy from 'lodash/orderBy';

const getSortedItems = (input, sortBy, sortDirection) => {
    return orderBy(input, sortBy, sortDirection);
};

export default getSortedItems;

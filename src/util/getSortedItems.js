import orderBy from 'lodash/orderBy';

const getSortedItems = (input, sortFormatter, sortState) => {
  return orderBy(input, sortFormatter[sortState?.column], sortState?.direction);
};

export default getSortedItems;

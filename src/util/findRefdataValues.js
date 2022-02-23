/* eslint-disable react-hooks/rules-of-hooks */
import useOARefdata from './useOARefdata';

const findRefdataValue = (desc, id) => {
  const refdata = useOARefdata(desc);
  const refDataValue = refdata?.find((rdc) => rdc.id === id);
  return refDataValue?.label;
};

export default findRefdataValue;

import { getBeerList, getBeerMetaData } from '../../api';
import { ApiParams, Beer, METADATA } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Array<Beer>, metadata: METADATA) => void, params?: ApiParams) => {
  (async () => {
    try {
      const responseBeerList = await getBeerList(params);
      const responseBeerMetaData = await getBeerMetaData(params);
      setData(responseBeerList.data, responseBeerMetaData.data);
    } catch (error) {
      handle(error);
    }
  })();
};

const typeOptions = [
  'Not set',
  'micro',
  'nano',
  'regional',
  'brewpub',
  'large',
  'planning',
  'bar',
  'contract',
  'proprietor',
  'closed',
];

export { fetchData, typeOptions };

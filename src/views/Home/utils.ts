import { getRandomBeerList, searchBeerList } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';

const searchByTerm = (setData: (data: Array<Beer>) => void, searchTerm: string) => {
  (async () => {
    try {
      const { data } = await searchBeerList(searchTerm);
      setData(data);
    } catch (error) {
      handle(error);
    }
  })();
};

const fetchData = (setData: (data: Array<Beer>) => void) => {
  (async () => {
    try {
      const { data } = await getRandomBeerList(10);
      setData(data);
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchData, searchByTerm };

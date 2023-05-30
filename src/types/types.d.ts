type TYPE =
  | 'micro'
  | 'nano'
  | 'regional'
  | 'brewpub'
  | 'large'
  | 'planning'
  | 'bar'
  | 'contract'
  | 'proprietor'
  | 'closed';

type SORT = 'asc' | 'desc';

type METADATA = {
  page: string;
  per_page: string;
  total: string;
}

export type { TYPE, SORT, METADATA };

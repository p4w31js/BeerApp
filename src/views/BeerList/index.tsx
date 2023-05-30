import { useEffect, useState } from 'react';
import { ApiParams, Beer, SORT } from '../../types';
import { fetchData, typeOptions } from './utils';
import { Avatar, CircularProgress, FormControl, Grid, InputLabel, List, ListItemAvatar, ListItemButton, ListItemText, MenuItem, Pagination, Select, Typography } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';

const pageSize = 10;

const BeerList = () => {
  const navigate = useNavigate();
  const [isBeerListLoading, setIsBeerListLoading] = useState(true);
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [pagesCount, setPagesCount] = useState(3);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SORT>("asc");
  const [filterByType, setFilterByType] = useState("Not set");

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  useEffect(() => {
    setIsBeerListLoading(true);

    const apiParams = {
      per_page: pageSize,
      page: page,
      sort: `name:${sort}`,
      ...(filterByType !== "Not set" && { by_type: filterByType })
    } as ApiParams;

    fetchData(
      (data, metaData) => {
        setIsBeerListLoading(false);
        setBeerList(data);
        setPagesCount((Math.ceil(+metaData.total / +metaData.per_page)));
      },
      apiParams);

  }, [page, sort, filterByType]);

  return (
    <article>
      <section>
        <header>
          <Typography variant="h5" component="h5" mb={2}>Beer List page</Typography>
        </header>
        <main>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel>Sorting</InputLabel>
                <Select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SORT)}
                  label="Sorting"
                >
                  {["asc", "desc"].map((item) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel>Filter by type</InputLabel>
                <Select
                  value={filterByType}
                  onChange={(e) => {
                    setPage(1);
                    setFilterByType(e.target.value);
                  }}
                  label="Filter by type">
                  {typeOptions.map((item) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {isBeerListLoading ? (
            <CircularProgress />
          ) : (
            <List>
              {beerList.map((beer) => (
                <ListItemButton key={beer.id} onClick={() => onBeerClick(beer.id)}>
                  <ListItemAvatar>
                    <Avatar>
                      <SportsBar />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={beer.name} secondary={beer.brewery_type} />
                </ListItemButton>
              ))}
            </List>
          )}

          <Grid container spacing={0} justifyContent="flex-end">
            <Grid item>
              <Pagination count={pagesCount} page={page} onChange={(_event: React.ChangeEvent<unknown>, page: number) => {
                setPage(page);
              }} />
            </Grid>
          </Grid>
        </main>
      </section>
    </article>
  );
};

export default BeerList;

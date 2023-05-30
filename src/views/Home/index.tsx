import { useEffect, useState } from 'react';
import { fetchData, searchByTerm } from './utils';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, TextField, Link } from '@mui/material';
import styles from './Home.module.css';
import { useLocalStorage } from 'usehooks-ts';

const Home = () => {
  const [localStorageBeerList, setLocalStorageBeerList] = useLocalStorage<any>('beerList', []);
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>(localStorageBeerList);
  const [refetchData, setRefetchData] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if(searchTerm.length === 0) {
      fetchData(setBeerList);
    }
  }, [refetchData, searchTerm]);

  useEffect(() => {
    if(searchTerm.length > 0) {
      searchByTerm(setBeerList, searchTerm); 
    }
  }, [searchTerm]);

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField label='Filter...' variant='outlined'
                  onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                    setSearchTerm(event.target.value);
                  }}
                />
                <Button variant='contained' onClick={() => {
                  setRefetchData(prev => !prev);
                }}>Reload list</Button>
              </div>
              <ul className={styles.list}>
                {beerList.map((beer, index) => {
                  const isChecked = savedList.some(item => item.id === beer.id);

                  return (
                    <li key={index.toString()}>
                      <Checkbox
                        checked={isChecked}
                        onClick={() => {
                          if (isChecked) {
                            const newList = savedList.filter(item => item.id !== beer.id);
                            setSavedList(newList);
                            setLocalStorageBeerList(newList);
                          } else {
                            const newList = [...savedList, beer];
                            setSavedList(newList);
                            setLocalStorageBeerList(newList);
                          }
                        }} />
                      <Link component={RouterLink} to={`/beer/${beer.id}`}>
                        {beer.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button variant='contained' size='small' onClick={() => {
                  setSavedList([]);
                  setLocalStorageBeerList([]);
                }}>
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {savedList.map((beer, index) => {
                  const isChecked = savedList.some(item => item.id === beer.id);

                  return (
                    <li key={index.toString()}>
                      <Checkbox
                        checked={savedList.some(item => item.id === beer.id)}
                        onClick={() => {
                          if (isChecked) {
                            const newList = savedList.filter(item => item.id !== beer.id);
                            setSavedList(newList);
                            setLocalStorageBeerList(newList);
                          } else {
                            const newList = [...savedList, beer];
                            setSavedList(newList);
                            setLocalStorageBeerList(newList);
                          }
                        }} />
                      <Link component={RouterLink} to={`/beer/${beer.id}`}>
                        {beer.name}
                      </Link>
                    </li>
                  )
                })}
                {!savedList.length && <p>No saved items</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;

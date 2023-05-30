import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData, fieldLabelPairs } from './utils';
import { useParams } from 'react-router-dom';
import { Card, CircularProgress, Grid, Link, Typography } from '@mui/material';
import styles from './Beer.module.css';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  useEffect(() => fetchData(setBeer, id), [id]);

  return (
    <article>
      <section className={styles.container}>
        <header >
          <Typography variant="h5" component="h5" mb={2}>
            {beer?.name}
          </Typography>
        </header>
        <main>
          <Card >
            {beer ? (
              <>
                {fieldLabelPairs.map(({ key, label, isLink }) => (
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <div className={styles.label}>{label}</div>
                    </Grid>
                    {
                      isLink && (beer)?.[key] ? (
                        <Grid item xs={12} md={8}>
                          <div className={styles.content}>
                            <Link href={(beer)?.[key]} target='_blank'>{(beer)?.[key]}</Link>
                          </div>
                        </Grid>
                      ) : (
                        <Grid item xs={12} md={8}>
                          <div className={styles.content}>{(beer)?.[key] || "-"}</div>
                        </Grid>
                      )
                    }
                  </Grid>
                ))}
              </>
            ) : (
              <CircularProgress />
            )}
          </Card>
        </main>
      </section>
    </article >
  );
};

export default Beer;

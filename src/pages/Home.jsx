import React, { useContext } from 'react';

// Material-ui
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

// Context
import { AppContext } from '../context/AppContext';

// Component
import ItemCard from '../components/ItemCard';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 10,
    overflow: 'hidden',
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
  grid: {
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
}));

function Home() {
  const { items } = useContext(AppContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <div className={classes.list}>
            <List>
              { items.length
                ? items.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))
                : undefined}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;

import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

// Material-ui
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
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
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function Home() {
  const { items } = useContext(AppContext);
  const { push } = useHistory();
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
      <Fab
        aria-label="Add"
        className={classes.fab}
        color="primary"
        onClick={() => push('/add')}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default Home;

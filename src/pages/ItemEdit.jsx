import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import clsx from 'clsx';

// Material-ui
import SaveIcon from '@material-ui/icons/SaveRounded';
import RemoveIcon from '@material-ui/icons/DeleteForever';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { green, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

// Context
import { AppContext } from '../context/AppContext';

// Component

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
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabLeft: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
  fabRed: {
    color: theme.palette.common.white,
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[600],
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    paddingRight: 15,
  },
}));

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSet(e) {
    setValue(e);
  }

  return {
    value,
    onChange: handleChange,
    set: handleSet,
  };
}

function ItemEdit() {
  const [loading, setLoading] = useState(true);
  const name = useFormInput('Loading...');
  const type = useFormInput('Loading...');
  const amount = useFormInput(0);
  const {
    getItem,
    editItem,
    deleteItem,
    types,
  } = useContext(AppContext);
  const { push } = useHistory();
  const { id } = useParams();
  const classes = useStyles();

  useEffect(() => {
    const item = getItem(id);
    name.set(item.name);
    type.set(item.type);
    amount.set(Number(item.amount));
    setLoading(false);
  }, [id]);

  const handleDelete = () => {
    deleteItem(Number(id));
    push('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedItem = {
      name: name.value,
      type: type.value,
      amount: Number(amount.value),
    };

    editItem(id, updatedItem);
    push('/');
  };

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
          <form className={classes.container} noValidate autoComplete="off">
            <div>
              <TextField
                id="item-name"
                label="Item Name"
                multiline
                rows="4"
                fullWidth
                className={classes.textField}
                value={name.value}
                disabled={loading}
                onChange={name.onChange}
                margin="normal"
                variant="outlined"
              />
            </div>
            <TextField
              id="item-type"
              select
              label="Item Type"
              fullWidth
              className={classes.textField}
              value={type.value}
              disabled={loading}
              onChange={type.onChange}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
              variant="outlined"
            >
              {types.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              id="item-amount"
              label="Item Amount"
              type="number"
              value={amount.value}
              disabled={loading}
              onChange={amount.onChange}
              fullWidth
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              variant="outlined"
            />
          </form>
        </Grid>
      </Grid>
      <Fab
        aria-label="Delete"
        className={clsx(classes.fabLeft, classes.fabRed)}
        color="inherit"
        onClick={handleDelete}
      >
        <RemoveIcon />
      </Fab>
      <Fab
        aria-label="Save"
        className={clsx(classes.fab, classes.fabGreen)}
        color="inherit"
        onClick={handleSubmit}
      >
        <SaveIcon />
      </Fab>
    </div>
  );
}

export default ItemEdit;

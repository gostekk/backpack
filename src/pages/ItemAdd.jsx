import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

// Material-ui
import SaveIcon from '@material-ui/icons/SaveRounded';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { green } from '@material-ui/core/colors';
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
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
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

  return {
    value,
    onChange: handleChange,
  };
}

function ItemAdd() {
  const name = useFormInput('');
  const type = useFormInput('Undefined');
  const amount = useFormInput(1);
  const { addItem, types } = useContext(AppContext);
  const { push } = useHistory();
  const classes = useStyles();


  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      name: name.value,
      type: type.value,
      amount: amount.value,
    };

    addItem(item);
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

export default ItemAdd;

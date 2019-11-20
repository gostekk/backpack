import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// Material-ui
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Typography from '@material-ui/core/Typography';

export default function ItemCard(props) {
  const { item } = props;
  const { push } = useHistory();

  return (
    <>
      <ListItem>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid item>
            <Typography variant="body1">
              {item.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              {item.amount}
            </Typography>
          </Grid>
        </Grid>
        <ListItemSecondaryAction>
          <IconButton
            size="small"
            edge="end"
            aria-label="more"
            onClick={() => push(`/edit/${item.id}`)}
          >
            <MoreHoriz />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};

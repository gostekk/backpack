import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, ThemeProvider } from '@material-ui/core';

import theme from '../styles/theme';
import { AppProvider } from './AppContext';

function Provider(props) {
  const { children } = props;
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <AppProvider>
          {children}
        </AppProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

Provider.propTypes = ({
  children: PropTypes.object.isRequired,
});

export default Provider;

/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import CssBaseline from '@material-ui/core/CssBaseline';
import Search from './containers/Search';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: grey,
  },
  status: {
    danger: 'orange',
  },
});

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Search />
      </div>
    </MuiThemeProvider>
  </React.Fragment>
);
export default App;
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Search from '@material-ui/icons/Search';


const Searchbar = (props) => {
    return (
    <div>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Search />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Search Terms" />
          </Grid>
        </Grid>
    </div>)
};

export default Searchbar;
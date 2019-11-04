import React from 'react';
import { Grid } from 'semantic-ui-react';

const LayoutGrid = props => {
  return (
    <Grid
      container
      textAlign={props.center ? 'center' : 'left'}
      verticalAlign={props.center ? 'middle' : 'top'}
      style={{
        minHeight: 'calc(100vh - 80px)'
      }}>
      {props.children}
    </Grid>
  );
};

export default LayoutGrid;

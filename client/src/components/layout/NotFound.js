import React, { Fragment } from 'react';
import { Grid, Header } from 'semantic-ui-react';

const NotFound = () => {
  return (
    <Grid verticalAlign="middle" style={{ height: 'calc(100vh - 5rem)' }}>
      <Grid.Column>
        <Header
          color="red"
          size="huge"
          icon="exclamation triangle"
          content="Page Not Found"
          subheader="Sorry, this page does not exist"
        />
      </Grid.Column>
    </Grid>
  );
};

export default NotFound;

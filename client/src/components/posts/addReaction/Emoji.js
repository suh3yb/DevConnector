import React from 'react';

import '../post.css';
import { Button } from 'semantic-ui-react';

const Emoji = ({ className, onclick, symbol, label }) => (
  <Button
    icon
    circular
    basic
    size="mini"
    role="img"
    aria-label={label ? label : ''}
    aria-hidden={label ? 'false' : 'true'}
    onClick={onclick}
    className={className}>
    {symbol}
  </Button>
);

export default Emoji;

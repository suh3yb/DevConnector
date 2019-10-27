import React from 'react';

import '../post.css';

const Emoji = ({ className, onclick, symbol, label }) => (
  <button
    role="img"
    aria-label={label ? label : ''}
    aria-hidden={label ? 'false' : 'true'}
    onClick={onclick}
    className={`reaction emoji ${className}`}>
    {symbol}
  </button>
);

export default Emoji;

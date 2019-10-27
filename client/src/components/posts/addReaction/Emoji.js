import React from 'react';

import '../post.css';

const Emoji = ({ className, onclick, symbol, label }) => (
  <button
    className='reaction'
    className='emoji'
    role='img'
    aria-label={label ? label : ''}
    aria-hidden={label ? 'false' : 'true'}
    onClick={onclick}
    className={className}
  >
    {symbol}
  </button>
);

export default Emoji;

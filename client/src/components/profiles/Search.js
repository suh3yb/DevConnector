import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchProfile } from '../../redux/actions/profileAction';

const Search = ({ searchProfile, profiles }) => {
  const [input, setInput] = useState('');

  const names = profiles.map(profile => ({ name: profile.user.name, id: profile.user._id }));
  const suggestions =
    input && names.filter(user => user.name.toLowerCase().includes(input.toLowerCase()));

  return (
    <Fragment>
      <div className="search-container">
        <form
          className="search-label"
          onSubmit={e => {
            e.preventDefault();
            searchProfile({ name: input });
            setInput('');
          }}
        >
          <input
            type="text"
            placeholder=" Search..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <i className="fa fa-search search-icon" />
          {suggestions.length > 0 && (
            <div className="bg-light live-search-container">
              {suggestions.slice(0, 6).map(user => (
                <Link to={`/profile/${user.id}`} style={{ display: 'block' }} key={user.id}>
                  {user.name}
                </Link>
              ))}
            </div>
          )}
        </form>
      </div>
    </Fragment>
  );
};

Search.propTypes = {
  searchProfile: PropTypes.func.isRequired,
  profiles: PropTypes.array.isRequired,
};

export default connect(
  null,
  { searchProfile },
)(Search);

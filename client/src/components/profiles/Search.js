import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchProfile } from '../../redux/actions/profileAction';
import { Form, Input, List, Segment } from 'semantic-ui-react';

const Search = ({ searchProfile, profiles }) => {
  const [input, setInput] = useState('');

  const users = profiles.map(profile => ({
    name: profile.user.name,
    id: profile.user._id
  }));
  const suggestions =
    input &&
    users.filter(user => user.name.toLowerCase().includes(input.toLowerCase()));

  return (
    <Form
      style={{ width: '100%' }}
      onSubmit={e => {
        e.preventDefault();
        searchProfile({ name: input });
        setInput('');
      }}>
      <Form.Field>
        <Input
          size="big"
          icon="search"
          type="text"
          placeholder=" Search..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </Form.Field>
      {suggestions.length > 0 && (
        <Segment
          raised
          color="blue"
          style={{
            position: 'absolute',
            top: '3rem',
            width: '100%',
            zIndex: 1000
          }}>
          <List divided relaxed>
            {suggestions.slice(0, 6).map(user => (
              <List.Item key={user.id}>
                <List.Header as={Link} to={`/profile/${user.id}`}>
                  {user.name}
                </List.Header>
              </List.Item>
            ))}
          </List>
        </Segment>
      )}
    </Form>
  );
};

Search.propTypes = {
  searchProfile: PropTypes.func.isRequired,
  profiles: PropTypes.array.isRequired
};

export default connect(
  null,
  { searchProfile }
)(Search);

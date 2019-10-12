import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../redux/actions/profileAction';
import {
  Card,
  Header,
  Grid,
  List,
  Menu,
  Icon,
  Label,
  Button,
  Divider
} from 'semantic-ui-react';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <Card fluid style={{ flexBasis: '100%' }}>
      <Card.Content>
        <Header icon="github" as="h1" content="Github Repos" />
        <Divider />

        {repos === null ? (
          <Spinner />
        ) : (
          <Grid
            style={{ marginTop: '1rem' }}
            container
            as={Card.Group}
            stackable
            columns="three">
            {repos.map(repo => (
              <Card
                as="a"
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                key={repo.id}>
                <Card.Content>
                  <Header
                    textAlign="center"
                    as="h4"
                    content={repo.name}
                    subheader={repo.description}
                  />
                </Card.Content>
                <Card.Content extra textAlign="center">
                  <Button as="div" labelPosition="right">
                    <Button size="tiny" color="orange" icon="star" />
                    <Label
                      size="tiny"
                      color="orange"
                      basic
                      pointing="left"
                      content={repo.stargazers_count}
                    />
                  </Button>
                  <Button as="div" labelPosition="right">
                    <Button size="tiny" color="grey" icon="eye" />
                    <Label
                      size="tiny"
                      color="grey"
                      basic
                      pointing="left"
                      content={repo.watchers_count}
                    />
                  </Button>
                  <Button as="div" labelPosition="right">
                    <Button size="tiny" color="blue" icon="fork" />
                    <Label
                      size="tiny"
                      color="blue"
                      basic
                      pointing="left"
                      content={repo.forks_count}
                    />
                  </Button>
                </Card.Content>
              </Card>
            ))}
          </Grid>
        )}
      </Card.Content>
    </Card>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  repos: state.profile.repos
});

export default connect(
  mapStateToProps,
  { getGithubRepos }
)(ProfileGithub);

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import UpdatePassword from '../profile-forms/UpdatePassword';
import Profiles from '../profiles/Profiles';
import Search from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import Message from '../message/Message';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import ChatList from '../message/ChatList';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';
import { Container } from 'semantic-ui-react';

const Routes = () => {
  return (
    <Container
      style={{
        minHeight: 'calc(100vh - 74px)',
        paddingTop: '24px',
        paddingBottom: '24px',
      }}
    >
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password/:token" component={ResetPassword} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/change-password" component={UpdatePassword} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <PrivateRoute exact path="/profile/search" component={Search} />
        <PrivateRoute exact path="/messages/:id/:name" component={Message} />
        <PrivateRoute exact path="/messages" component={ChatList} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  );
};

export default Routes;

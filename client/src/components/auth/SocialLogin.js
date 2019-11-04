import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import config from '../../firebaseConfig.json';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';

import { socialLogin } from '../../redux/actions/authAction';

// Configure Firebase.
const firebaseConfig = {
  apiKey: config.firebaseApiKey,
  authDomain: config.firebaseAuthDomain,
};

firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

const SocialLogin = ({ socialLogin }) => {
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const socialTokenObj = await firebase.auth().currentUser.getIdTokenResult(false);
        const socialToken = socialTokenObj.token;
        socialLogin(socialToken);
      }
    });

    return () => unregisterAuthObserver(); // this is for cleanup like componentWillUnmount
  }, [socialLogin]);

  return (
    <div>
      <p>Sign-in using Social Media:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

SocialLogin.propTypes = {
  socialLogin: PropTypes.func.isRequired,
};

export default connect(
  null,
  { socialLogin },
)(SocialLogin);

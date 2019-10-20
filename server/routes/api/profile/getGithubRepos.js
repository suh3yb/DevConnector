'use strict';

const request = require('request');
const config = require('config');

const getGithubRepos = async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId',
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    await request(options, (error, response, body) => {
      if (error) throw error;

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No github profile found' });
      }

      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.send('Server Error');
  }
};

module.exports = getGithubRepos;

const functions = require('firebase-functions');
const axios = require('axios');

exports.fulfilment = functions.https.onRequest((req, res) => {
  const { SongName } = req.body.queryResult.parameters;

  const authBody = {
    grant_type: 'client_credentials',
  };
  const authHeaders = {
    Authorization: `Basic ${process.env.SPOTIFY_TOKEN}`,
  };


  axios.post('https://accounts.spotify.com/api/token', authBody, { headers: authHeaders })
    .then(({ data }) => {
      const accessToken = data.access_token;

      const headers = { Authorization: `Bearer ${accessToken}` };
      const params = { q: SongName, type: 'track' };

      return axios.get('https://api.spotify.com/v1/search', { headers, params })
        .then(({ data: { tracks } }) => {
          const { track } = tracks.find(item => !!item.track.preview_url);

          res.json({ fulfillmentText: `Here is the song: ${track.preview_url}` });
        })
        .catch((err) => {
          res.json({ fulfillmentText: `Sorry, could not find this song ${err}` });
        });
    }).catch((err) => {
      console.error('err', err);
      res.json({ fulfillmentText: `Sorry, could not find this song ${err}` });
    });
  // res.json({ fulfillmentText: `Song Name: ${SongName}` });
});

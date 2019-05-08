const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.fulfilment = functions.https.onRequest((req, res) => {
  const { SongName } = req.body.queryResult.parameters;
  res.json({ fulfillmentText: `Song Name: ${SongName}` });
});

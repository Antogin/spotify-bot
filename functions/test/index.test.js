const test = require('firebase-functions-test')();
const assert = require('assert')
const myFunctions = require('../index.js');
const req = { body: { queryResult: { parameters: { SongName: 'SongName' } } } };

const res = {
    json: (code) => {

    }
};

it('Should pass', () => {
    myFunctions.fulfilment(req, res)
})

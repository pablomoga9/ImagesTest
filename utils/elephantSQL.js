const pg = require('pg');
require('dotenv').config();
const client = new pg.Client(process.env.ELEPHANT);

client.connect(function(err){
    if(err){
        return console.error(err)
    }
    else{
        return console.error('connected to DB');
    }
})

module.exports = client;

/*
 * GET users listing.
 */

exports.list = function(req, res){
  console.log('start:');
  var fetch = require('../modules/fetch.js');
  fetch.fetch('soufun',{city:'hz',page:5},function(data){
        res.send(data);
  })
  
};
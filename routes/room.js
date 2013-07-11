exports.select = function(req, res){



}

var queryParser = function(query){
    var list = {
        city:query.city,
        page:query.page
     }
     return list;

}

exports.data = function(req, res){

    console.log('start:');
    var fetch = require('../modules/fetch.js');
    var list = queryParser(req.query);
    fetch.fetch(req.query.cpa,list,function(data){
        res.send(data);
    })
    
}
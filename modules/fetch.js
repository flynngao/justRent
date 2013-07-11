var red, blue, reset;
red = '\033[31m';
blue = '\033[34m';
reset = '\033[0m';

var iconv = require('iconv-lite');
var cheer = require('cheerio');
var request = require('request');
var _ = require('underscore');

var dataparser = {
  'soufun': function(body, p) {

    var datas = {};
    var html = iconv.decode(body, 'GBK');
    var $ = cheer.load(html);

    var city = $('.soufunsearch110615city p:first-child').text();
    $('.esflist .list_pic .bkyellow').each(function(index, element) {
      var house = {};
      house.money = $(element).find('.money strong').text();
      house.address = city + $(element).find('.house .black a').attr('title');
       

      datas[(index + p * 30)] = house;
    })
    return datas;

  },
  'ganji': function(body) {
    return iconv.decode(body, 'utf8');
  },
  '58': function(body) {
    var datas = {};

    var html = iconv.decode(body, 'utf8');
    var $ = cheer.load(html);

    $('.tbimg tr').each(function(index, element) {
      var house = {};
      // house
      house.money = $(element).find('.pri').text();
      house.address = $(element)

      _.extend(datas, house);
    });
    return datas;
  },
  '5i5j': function(body) {
    return iconv.decode(body, 'utf8');
  }


}

var urlparser = {
  'soufun': function(list, page) {
    var url = 'http://zu.' + list.city + '.soufun.com/house/' + 'i3' + page + '/';
    console.log(blue,list,reset);
    return url;

  },
  'ganji': function(list) {

    var url = 'http://' + list.city + '.ganji.com/fang1/'
    return url;

  },
  '58': function(list) {
    var url = 'http://' + list.city + '.58.com/zufang'
    return url;
  },
  '5i5j': function(list) {
    var url = 'http://' + list.city + '.5i5j.com/rent'
  }

}

exports.fetch = function fetch(company, list, cb) {

  var totalData = {}
  console.log(blue,list,company,urlparser[company],reset);
  for (var p = 0; p < list.page; p++) {

    // 循环闭包
    (function(i, td) {
      var url = urlparser[company](list, (i + 1));

      console.log(red, url, reset);
      request({
        url: url,
        encoding: null
      }, function(error, response, body) {
        

         _.extend(td,dataparser[company](body, i));
        // 最后一个返回，改变拼接方式
        
        if (i == list.page - 1) {
          console.log(td);
          cb(td);
        }
      });
    })(p, totalData)

  }


}

exports.fetchAll = function(list, cb) {
  var dataAll = {};
  for (var i in urlparser) {
    fetch(i, list, function(data) {
      _.extend(dataAll, data);
    });

  }
  cb(dataAll);
}
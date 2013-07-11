window.indexCtrl = function($scope,$http){

    var color = {
      1000: '#ff3c00',
      2000: '#ffe100',
      3000: '#eaff00',
      4000: '#66ff00',
      6000: '#09ff00',
      7000: '#00ccff',
      8000: '#a200ff',
      99999:'#ffffff'
    };

    var _indexCtrl ={


        
        init: function(params){


            // 地址解析
            var map = new soso.maps.Map(document.getElementById("mapDiv"),{
                center: new soso.maps.LatLng(39.916527,116.397128),
                zoom:12
            });
            new soso.maps.Geocoder({
                complete : function(result){
                        map.setCenter(result.detail.location);
                    }
            }).getLocation('杭州');
            
            
            // 初始化地图
            $http.get('/data.json?cpa=soufun&city=hz&page=100',{
                params:params,
                cache:false,
                
            }).success(function (data) {
                    for(var i in data){
                        (function(p,money){
                                var fillColor;                        
                                for(var i in color){
                                        if(money<i){
                                            fillColor = color[i];
                                            break;
                                        }
                                        
                                    }
                                var geocoder = new soso.maps.Geocoder({
                                complete : function(result){  
                                   var circle = new soso.maps.Circle({
                                        radius: 200,
                                        map: map,
                                        fillColor:fillColor,
                                        strokeWeight:0,
                                        center:result.detail.location
                                    });
                                    
                                    console.log(circle);

                                }
                            })
                            geocoder.getLocation(data[p].address);
                        })(i,data[i].money);
                        
                    }
                    
                
            }).error(function(){
                console.log('request error');
            });
        }
    }

    _indexCtrl.init();
}
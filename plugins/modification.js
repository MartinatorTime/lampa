   console.log(window.location.origin);
 //  console.log(window.location.hostname);

   window.lampa_settings.torrents_use = true;
   window.lampa_settings.demo = false;
   window.lampa_settings.read_only = false;

   Lampa.Utils.putScriptAsync([
	    'https://bylampa.github.io/addon.js?v=' + Math.random(),
	    'https://bylampa.github.io/themes.js?v=' + Math.random()
   ], function () {});

   var timer = setInterval(function(){
        if(typeof Lampa !== 'undefined'){
            clearInterval(timer);

            if(!Lampa.Storage.get('set','false')) start_set();
		 
        }
    },200);

    function start_set(){
           Lampa.Storage.set('set','true');
           Lampa.Storage.set('keyboard_type', 'integrate');
           Lampa.Storage.set('start_page', 'main');
           Lampa.Storage.set('source', 'cub');
           Lampa.Storage.set('background', 'false');
	   Lampa.Storage.set('animation', 'false');
	   Lampa.Storage.set('mask', 'false');
	   Lampa.Storage.set('player_normalization', 'true');
	   Lampa.Storage.set('player_timecode', 'ask');
	   Lampa.Storage.set('screensaver', 'false');
           Lampa.Storage.set('pages_save_total', '3');
	   Lampa.Storage.set('device_name', 'Lampa Uncensored');
	   location.reload()
     } 

     Lampa.Storage.listener.follow('change', function (event) {
      if (event.name == 'activity' && Lampa.Activity.active().component === 'bookmarks') {
        setTimeout(function(){
          Lampa.Controller.move('down');
          Lampa.Controller.move('up');
        },50)
      }
     });



 /*Lampa.Listener.follow("full", function(a) {
    if (a.type === "complite") {
        var e = a.data.movie;
        var urlType = e.name ? "tv" : "movie"; // Определяем тип
        var o = Lampa.TMDB.api(urlType) + "/" + e.id + "/images?api_key=" + Lampa.TMDB.key() + "&language=" + Lampa.Storage.get("language");

        $.get(o, function(response) {
            if (response.logos && response.logos[0]) {
                var logoPath = response.logos[0].file_path;
                if (logoPath !== "") {
                    $(".full-start-new__title").html(
                        '<img style="margin-top: 5px;max-height: 125px;" src="' + Lampa.TMDB.image("/t/p/w300" + logoPath.replace(".svg", ".png")) + '" />'
                    );
                }
            }
        });
    }
});*/

// Вынесенные параметры
var apiKey = "4ef0d7355d9ffb5151e987764708ce96";
var apiProxyUrl = "http://212.113.103.137:9118/proxy/"; // Прокси для API
var imgProxyUrl = "http://212.113.103.137:9118/proxyimg/"; // Прокси для изображений

Lampa.Listener.follow("full", function(a) {
    if (a.type === "complite") {
        var e = a.data.movie;
        var urlType = e.name ? "tv" : "movie"; // Определяем тип

        var o = apiProxyUrl + "http://api.themoviedb.org/3/" + urlType + "/" + e.id + "/images?api_key=" + apiKey + "&language=" + Lampa.Storage.get("language");

        $.get(o, function(response) {
            if (response.logos && response.logos[0]) {
                var logoPath = response.logos[0].file_path;
                if (logoPath !== "") {
                    $(".full-start-new__title").html(
                        '<img style="margin-top: 5px; max-height: 125px;" src="' + imgProxyUrl + "http://image.tmdb.org/t/p/w200" + logoPath.replace(".svg", ".png") + '" />'
                    );
                }
            }
        });
    }
});


/*!function() {
    "use strict";
    
    // Добавляем параметр в настройки
    Lampa.SettingsApi.addParam({
        component: 'interface',
        param: {
            name: 'logo_title',
            type: 'trigger',
            default: true
        },
        field: {
            name: 'Логотип вместо названия'
        },
	onRender: function(item) {
         setTimeout(function() {
             $('div[data-name="logo_title"]').insertAfter('div[data-name="black_style"]');
         }, 0);
	}
    });
    
    // Проверяем, был ли уже добавлен плагин
    window.logoplugin || (window.logoplugin = !0,
        // Вынесенные параметры
      var apiKey = "4ef0d7355d9ffb5151e987764708ce96";
      var apiProxyUrl = "http://212.113.103.137:9118/proxy/"; // Прокси для API
      var imgProxyUrl = "http://212.113.103.137:9118/proxyimg/"; // Прокси для изображений

      Lampa.Listener.follow("full", function(a) {
           if (a.type == "complite" && Lampa.Storage.get('logo_title') !== false) {
              var e = a.data.movie;
              var urlType = e.name ? "tv" : "movie"; // Определяем тип

              var o = apiProxyUrl + "http://api.themoviedb.org/3/" + urlType + "/" + e.id + "/images?api_key=" + apiKey + "&language=" + Lampa.Storage.get("language");

              $.get(o, function(response) {
                  if (response.logos && response.logos[0]) {
                      var logoPath = response.logos[0].file_path;
                      if (logoPath !== "") {
                          $(".full-start-new__title").html(
                              '<img style="margin-top: 5px; max-height: 125px;" src="' + imgProxyUrl + "http://image.tmdb.org/t/p/w200" + logoPath.replace(".svg", ".png") + '" />'
                          );
                      }
                  }
              });
          }
      });
    );
}();*/



    




; /* Start:"a:4:{s:4:"full";s:72:"/local/components/dev/news.list/templates/salony/script.js?1550799147778";s:6:"source";s:58:"/local/components/dev/news.list/templates/salony/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
/*$(document).ready(function (e) {

    

    $(".radio-city").click(function(){
		console.log($(this));
		
		

    });
});*/


/*
BX.ready(function(){
   BX.bindDelegate(
      document.body, 'click', {className: 'radio-city' },
      function(e){
         if(!e) {
            e = window.event;
         }
		 
          // console.log(e.target.dataset.classa);
		  
		  
		BX.fireEvent(
			{className: e.target.dataset.classa},
			'click'
		);
         // console.log(window.location);
         
         
		// BX.ajax.get(
			// window.location.origin+'?AJAX_ID='+e.target.dataset.jsid,
			// function (result)
			// {
				// console.log(result);
			// }
		// );
		 
		 
		 // return BX.PreventDefault(e);
      }
   );
});

*/

/* End */
;
; /* Start:"a:4:{s:4:"full";s:81:"/local/components/dev/map.yandex.view/templates/.default/script.js?15507991472040";s:6:"source";s:66:"/local/components/dev/map.yandex.view/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
if (!window.BX_YMapAddPlacemark)
{
	var arPlacemarks = [];
	var gMap;
	
	window.BX_YMapAddPlacemark = function(map, arPlacemark)
	{
		gMap = map;
		if (null == map)
			return false;

		if(!arPlacemark.LAT || !arPlacemark.LON)
			return false;

		var props = {};
		if (null != arPlacemark.TEXT && arPlacemark.TEXT.length > 0)
		{
			var value_view = '';

			if (arPlacemark.TEXT.length > 0)
			{
				var rnpos = arPlacemark.TEXT.indexOf("\n");
				value_view = rnpos <= 0 ? arPlacemark.TEXT : arPlacemark.TEXT.substring(0, rnpos);
			}

			props.balloonContent = arPlacemark.TEXT.replace(/\n/g, '<br />');
			props.hintContent = value_view;
		}

		var obPlacemark = new ymaps.Placemark(
			[arPlacemark.LAT, arPlacemark.LON],
			props,
			{
				balloonCloseButton: true,
				preset: 'twirl#redIcon' 
			}
		);		
		map.geoObjects.add(obPlacemark);
		arPlacemarks.push(arPlacemark);
		return obPlacemark;
	}
	
	window.moveCenter = function(point)
	{
		// console.log(arPlacemarks[point]);
		gMap.setCenter([arPlacemarks[point].LAT,arPlacemarks[point].LON], 15);
	}
	
	window.moveCenterCustom = function(LON, LAT)
	{
		// console.log(arPlacemarks[point]);
		gMap.setCenter([LAT, LON], 15);
	}
	
}

if (!window.BX_YMapAddPolyline)
{
	window.BX_YMapAddPolyline = function(map, arPolyline)
	{
		if (null == map)
			return false;

		if (null != arPolyline.POINTS && arPolyline.POINTS.length > 1)
		{
			var arPoints = [];
			for (var i = 0, len = arPolyline.POINTS.length; i < len; i++)
			{
				arPoints.push([arPolyline.POINTS[i].LAT, arPolyline.POINTS[i].LON]);
			}
		}
		else
		{
			return false;
		}

		var obParams = {clickable: true};
		if (null != arPolyline.STYLE)
		{
			obParams.strokeColor = arPolyline.STYLE.strokeColor;
			obParams.strokeWidth = arPolyline.STYLE.strokeWidth;
		}
		var obPolyline = new ymaps.Polyline(
			arPoints, {balloonContent: arPolyline.TITLE}, obParams
		);

		map.geoObjects.add(obPolyline);

		return obPolyline;
	}
}
/* End */
;; /* /local/components/dev/news.list/templates/salony/script.js?1550799147778*/
; /* /local/components/dev/map.yandex.view/templates/.default/script.js?15507991472040*/

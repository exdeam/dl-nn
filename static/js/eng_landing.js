var _ENG_PIXELS = _ENG_PIXELS || [];
var ENG_LANDING = function(obj)
{
	this.cuid_cookie_name = "__eng_pxl_cuid";
};

var ENG_LANDING_PIXEL = function(obj)
{
	this.pixel_id = obj.pixelid || null;
	this.delay_time_ms = obj.dtms || null;
	this.cuid_cookie_exp_secs = 120;
	this.api = "ext1-api.engageya.com/gas-api/track.json";
	this.random_id = Math.ceil((Math.random()*100000000000000000));
	this.cb = "eng_pxl_cb_" + this.random_id;
};

var ENG_LANDING_CONV_RETRY = function(obj)
{

};

ENG_LANDING_PIXEL.prototype = new ENG_LANDING();
ENG_LANDING_CONV_RETRY.prototype = new ENG_LANDING();

// pixel - start

ENG_LANDING_PIXEL.prototype.init = function (obj)
{
	var curObj = obj || this;
	if (this.delay_time_ms)
	{
		var delayTime = this.delay_time_ms;
		this.delay_time_ms = null;
		window.setTimeout(function (){curObj.init(curObj)},delayTime);
	}
	else
	{
		this.cuid = this.get_cuid();
		curObj.fire_pixel();
	}
}

ENG_LANDING_PIXEL.prototype.fire_pixel = function ()
{
	if (this.cuid) 
	{
		this.set_cookie();
		var imgObj = document.createElement("img");
		imgObj.src = "//"+this.api+"?pixelid="+this.pixel_id+"&eng_click="+this.cuid;
		document.getElementsByTagName('head')[0].appendChild(imgObj);
	}
	else
	{
		window[this.cb] = function (data)
		{
		}
		var src = "//"+this.api+"?pixelid="+this.pixel_id+"&is_js=true&cb="+this.cb;
		this.append_script_to_head(src,"");
	}
}
// pixel - end

// landing - start
ENG_LANDING.prototype.append_script_to_head = function (scriptURL,id)
{
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.id = id;
	s.src = scriptURL;
	s.charset = "UTF-8";
	s.async = true;
	var h=document.getElementsByTagName("script")[0];
	h.parentNode.insertBefore(s,h);
}

ENG_LANDING.prototype.get_cuid = function ()
{
	var cuid = "";
	var cuidArr = document.location.href.match("eng_click=([^\&]+)") || document.referrer.match("eng_click=([^\&]+)");
	if (cuidArr)
		cuid = cuidArr[1];
	else
		cuid = this.get_cookie();
	return cuid;
}

ENG_LANDING.prototype.set_cookie = function (cname, cvalue, ex_secs)
{
	var d = new Date();
	d.setTime(d.getTime() + (this.cuid_cookie_exp_secs*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = this.cuid_cookie_name + "=" + this.cuid + "; " + expires;
}

ENG_LANDING.prototype.get_cookie = function () 
{
	var name = this.cuid_cookie_name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length; i++) 
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
	}
	return "";
};
// landing - end

(function ()
{
	var executor = function (cmd,params) 
	{
		switch(cmd) 
		{
			case "createPixel":
				var pixel = new ENG_LANDING_PIXEL(params);
				pixel.init();
				break;
		}
	};
	var func = window['EngLandingObject'];
	var time = window[func].l;
	for (var key in window[func].q) 
	{ 
		var obj = window[func].q[key];
		var cmd  = obj[0];
		var params = obj[1];
		executor(cmd,params);	
	}
	window[func] = executor;
}());

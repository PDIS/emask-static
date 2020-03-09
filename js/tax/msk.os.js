(function(msk) {

	// ========================
	//  
	// ========================
	msk.os.add({
//		allowMobiles : [ 'Android', 'iPad'  ],
		allowMobiles : [ 'Android', 'iPad' ,'iPhone','iPod' ],
		allowDesktops : [ 'Windows', 'Mac', 'Linux' ],
		allowBrowser : [ 'Chrome', 'Firefox', 'Safari' ],
		isDesktop : function() {
			return isDesktop();
		},
		isMobile : function() {
			return isMobile();
		},
		isBrowser : function() {
			return isBrowser();
		},
		init : function() {
			console.info("navigator.userAgent:" + navigator.userAgent)
			this.browser = this.searchString(this.dataBrowser, 'browser')
					|| "An unknown browser";
			this.version = this.searchVersion(navigator.userAgent)
					|| this.searchVersion(navigator.appVersion)
					|| "an unknown version";
			
			this.OS = this.searchString(this.dataOS, 'OS') || "an unknown OS";
		},
		searchString : function(data, type) {
 			for (var i = 0; i < data.length; i++) {
				var dataString = data[i].string;
				var dataProp = data[i].prop;

				if (type == "browser" && navigator.appName == 'Netscape') {
					var ua = navigator.userAgent;
					var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
					if (re.exec(ua) != null) {
						rv = parseFloat(RegExp.$1);
						this.versionSearchString = "rv";
						return "IE"
					}
				}
				
				this.versionSearchString = data[i].versionSearch
						|| data[i].identity;
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1){
						return data[i].identity;
					} 
				} else if (dataProp){
					return data[i].identity;
				}
			}
		},
		searchVersion : function(dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if (index == -1)
				return;
			return parseFloat(dataString.substring(index
					+ this.versionSearchString.length + 1));
		},
		dataBrowser : [ {
			string : navigator.userAgent,
			subString : "CriOS",
			identity : "Chrome"
		}, {
			string : navigator.userAgent,
			subString : "Chrome",
			identity : "Chrome"
		}, {
			string : navigator.userAgent,
			subString : "OmniWeb",
			versionSearch : "OmniWeb/",
			identity : "OmniWeb"
		}, {
			string : navigator.vendor,
			subString : "Apple",
			identity : "Safari",
			versionSearch : "Version"
		}, {
			prop : window.opera,
			identity : "Opera"
		}, {
			string : navigator.vendor,
			subString : "iCab",
			identity : "iCab"
		}, {
			string : navigator.vendor,
			subString : "KDE",
			identity : "Konqueror"
		}, {
			string : navigator.userAgent,
			subString : "Firefox",
			identity : "Firefox"
		}, {
			string : navigator.vendor,
			subString : "Camino",
			identity : "Camino"
		}, { // for newer Netscapes (6+)
			string : navigator.userAgent,
			subString : "Netscape",
			identity : "Netscape"
		}, {
			string : navigator.userAgent,
			subString : "MSIE",
			identity : "IE",
			versionSearch : "MSIE"
		}, {
			string : navigator.userAgent,
			subString : "Gecko",
			identity : "Mozilla",
			versionSearch : "rv"
		}, { // for older Netscapes (4-)
			string : navigator.userAgent,
			subString : "Mozilla",
			identity : "Netscape",
			versionSearch : "Mozilla"
		} ],
		dataOS : [ {
			string : navigator.platform,
			subString : "Win",
			identity : "Windows"
		}, {
			string : navigator.platform,
			subString : "Mac",
			identity : "Mac"
		}, {
			string : navigator.userAgent,
			subString : "iPhone",
			identity : "iPhone/iPod"
		}, {
			string : navigator.userAgent,
			subString : "Android",
			identity : "Android"
		}, {
			string : navigator.platform,
			subString : "Linux",
			identity : "Linux"
		}, {
			string : navigator.platform,
			subString : "iPad",
			identity : "iPad"
		}  ]
	});
	function isDesktop() {
		// [合法]桌機檢測
		var desktopRe = new RegExp(msk.os.allowDesktops.join('|'), 'i');
		return desktopRe.test(msk.os.OS);
	}
	function isMobile() {
		// [合法]行動裝置檢測
		var mobileRe = new RegExp(msk.os.allowMobiles.join('|'), 'i');

		return mobileRe.test(navigator.userAgent);
	}
	function isBrowser() {
		// [合法] browser 
		var browserRe = new RegExp(msk.os.allowBrowser.join('|'), 'i');
		return browserRe.test(msk.os.browser);
	}
	msk.os.init();
})(msk);
/**
 * 
 * @param msk
 */
(function(msk) {
	// begin
	// ==============================================================================
	// msk.verify.idn 共用工具
	// ==============================================================================
	msk.verify.add({
		checkIDNFormat : function(id) {
			// 身分證格式是否正確(國人)
			return checkIDNFormat(id);
		},
		checkIDN : function(id) {
			// 身分證驗證碼是否正確(國人)
			return checkIDN(id);
		},
		isValidEMail : function(id) {
			// 身分證驗證碼是否正確(國人)
			return isValidEMail(id);
		},
		checkFRG : function(id) {
			//  判斷外僑證號檢查碼是否正確(舊版)
			return checkFRG(id);
		},
		checkMainLandID : function(id) {
			// 身分證驗證碼是否正確(國人)
			return checkMainLandID(id);
		},
		checkMainLandIDFormat : function(id) {
			// 身分證驗證碼是否正確(國人)
			return checkMainLandIDFormat(id);
		},
		checkFRGFormat_new : function(id) {
			// 身分證驗證碼是否正確(外僑)
			return checkFRGFormat_new(id);
		},
		checkFRGFormat : function(id) {
			return checkFRGFormat(id);
		},
		isValidSpouseIDNFormat : function(id) {
 			return isValidSpouseIDNFormat(id);
		},
		isValidSpouseIDN : function(id) {
 			return isValidSpouseIDN(id);
		},
		isSpouseIDNExcept2ndDup : function(spouseId, payerId) {
			// 身分證驗證碼是否正確(國人)
			return isSpouseIDNExcept2ndDup(spouseId, payerId);
		},
		isSpouseGenderDup : function(spouseId, payerId) {
			// 身分證驗證碼是否正確(國人)
			return isSpouseGenderDup(spouseId, payerId);
		},
		checkFRG_new : function(id) {
			return checkFRG_new(id);
		},
		isValidDateForIDN  : function(id) {
			return isValidDateForIDN(id);
		},
		isValidDependIDNFormat  : function(id) {
			return isValidDependIDNFormat(id);
		},
		isValidDependIDN2Format  : function(id) {
			return isValidDependIDN2Format(id);
		},
	});
	/**
	 * 同性別判別只用於身分證字號其他不用
	 */
//	function isSpouseGenderDup(spouseId, payerId) {
//		if (checkIDNFormat(spouseId)) {
//			var spouseIdn = $("#" + spouseId).val(), spouseGender = spouseIdn
//					.substr(1, 1), payerIdn = $("#" + payerId).val(), payerGender = payerIdn
//					.substr(1, 1);
//			if (spouseGender == payerGender) {
//				return true;
//			}
//		}
//		return false;
//	} 
	function isSpouseGenderDup( ) {
		var payerIdn = $("#payerModal_irc01_idn").val(),
		spousIdn = $("#payerModal_irc01_spousIdn").val(),
		 homosexual = [ "331392,002368",
		                "290258,310131",
		            	"320676,321135",
		            	"206265,331312",
		            	"322117,204424",
		            	"267039,207385",//2017.01.16 add
		            	//"323917,259146",2017.01.16 remove
		            	"254636,020124",
		            	"001341,010357",
		            	"270770,219764"];
		
		if (payerIdn == "" || spousIdn == "") {
			return true;
		}
		// 檢查第二碼是否相同
		if (getSex(payerIdn) != getSex(spousIdn)) {
			return true;
		}
		// 檢查清單 homosexual
		for (var i = 0; i < homosexual.length; i++) {
			if (homosexual[i].search(payerIdn.substr(2,6)) >= 0
					&& homosexual[i].search(spousIdn.substr(2,6))  >= 0) {
				return true;
			}
		}

		return false;

	}
	function getSex(idn) {
		var s = idn.substr(1, 1);
		if ("1,A,C,E".indexOf(s) >= 0) {
			return "M"; // 男
		} else if ("2,B,D,F".indexOf(s) >= 0) {
			return "F"; // 女
		} else {
			return "";
		}
	}
	/**
	 * 納稅義務人與配偶之身分證統一編號，除第二位不同，其餘相同
	 */
	function isSpouseIDNExcept2ndDup(spouseId, payerId) {
		if (checkIDNFormat(spouseId)) {
			var spouseIdn = $("#" + spouseId).val(), spouseLetter = spouseIdn
					.substr(0, 1), spouseLatter8 = spouseIdn.substr(2, 8), payerIdn = $(
					"#" + payerId).val(), payerLetter = payerIdn.substr(0, 1), payerLatter8 = payerIdn
					.substr(2, 8);
			if (spouseLetter == payerLetter && spouseLatter8 == payerLatter8) {
				return true;
			}
		}
		return false;
	}
	function isValidSpouseIDNFormat(id) {
		return checkIDNFormat(id) || checkFRGFormat(id)
				|| checkFRGFormat_new(id) || checkMainLandIDFormat(id);
	}

	function isValidSpouseIDN(id) {
		return checkIDN(id) || checkFRG(id) || checkFRG_new(id)
				|| checkMainLandID(id);
	}
	
	function isValidDependIDNFormat(id) {
		return checkIDNFormat(id) || checkFRGFormat(id)
				|| checkFRGFormat_new(id)  ;
	}

	function isValidDependIDN2Format(id) {
		return  checkMainLandIDFormat(id);
	}
	
	/**
	 * 先判別外僑證號格式是否正確(新版)
	 */
	function checkFRGFormat_new(id) {
		var idn = $("#" + id).val();
		if (isUndefined(idn)) {
			idn = id;
		}
		if ((idn.length == 10) && msk.util.isAllNumber(idn.substring(2, 10))
				&& msk.util.isCapitalEngLetter(idn.charAt(0))
				&& (idn.charAt(1) == "C" || idn.charAt(1) == "D")) {
			return true;
		}
		return false;
	}
	/**
	 * 判別外僑證號格式是否正確(舊版)
	 */
	function checkFRGFormat(id) {
		var idn = $("#" + id).val();
		if (isUndefined(idn)) {
			idn = id;
		}
		if ((idn.length == 10) && msk.util.isAllNumber(idn.substring(0, 8))
				&& msk.util.isCapitalEngLetter(idn.charAt(8))
				&& msk.util.isCapitalEngLetter(idn.charAt(9))
				&& msk.verify.isValidDateForIDN(idn.substring(0, 8))) {
			return true;
		}
		return false;
	}
	// 2002/07/31 再修外僑檢核條件（中心傅萬鵬e_mail檢核格式）：
	// 一、第一位英文字母之處理方式與本國人國民身分證統一編號相同
	// 二、找出第二位英文字母的對應數值，取其個位數
	// 三、經前述步驟將第一、二位英文字母轉換後，產生一個十位數字的數列
	// 四、其餘檢查方式與本國人國民身分證統一編號檢查法之步驟四至步驟七相同
	/**
	 * 判斷外僑證號檢查碼是否正確(新版)
	 */
	function checkFRG_new(id) {
		var idn = $("#" + id).val(), myIdn = '', X, alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", numeric = "0123456789", index, shiftKey = new Array(
				10, 11, 12, 13, 14, 15, 16, 17, 34, 18, 19, 20, 21, 22, 35, 23,
				24, 25, 26, 27, 28, 29, 32, 30, 31, 33), unitKey = new Array(0,
				1, 2, 3, 4, 5, 6, 7, 4, 8, 9, 0, 1, 2, 5, 3, 4, 5, 6, 7, 8, 9,
				2, 0, 1, 3), result = false;
		if (isUndefined(idn)) {
			idn = id;
		}
		myIdn = idn;
		if (idn.length != 10) {
			return false;
		}
		if ((index = alpha.indexOf(myIdn.charAt(0))) == -1)
			return false;

		X = shiftKey[index];

		X = Math.floor(X / 10) + 9 * (X % 10) + 8
				* unitKey[alpha.indexOf(myIdn.charAt(1))] + 7
				* numeric.indexOf(myIdn.charAt(2)) + 6
				* numeric.indexOf(myIdn.charAt(3)) + 5
				* numeric.indexOf(myIdn.charAt(4)) + 4
				* numeric.indexOf(myIdn.charAt(5)) + 3
				* numeric.indexOf(myIdn.charAt(6)) + 2
				* numeric.indexOf(myIdn.charAt(7))
				+ numeric.indexOf(myIdn.charAt(8))
				+ numeric.indexOf(myIdn.charAt(9));
		result = (eval(X % 10) == 0) ? true : false;
		return result;
	}

	/**
	 * 檢查大陸地區證號格式
	 */
	function checkMainLandIDFormat(id) {
		var idn = $("#" + id).val(), myIdn = "", len = 0;
		if (isUndefined(idn)) {
			idn = id;
		}
		myIdn += idn;
		len = myIdn.length;
		if (len == 10 || (len == 7 && myIdn.charAt(0) == "9"))
			return true;
		else
			return false;
	}

	/**
	 * 檢查大陸地區證號
	 */
	function checkMainLandID(id) {
		var idn = $("#" + id).val(), myIdn = "", len = 0, result = false;
		if (isUndefined(idn)) {
			idn = id;
		}
		myIdn += idn;
		len = myIdn.length;
		if (checkMainLandIDFormat(id)) {
			if (len == 7) {
				for (var i = 19; i < 100; i++) {
					if (msk.util.isValidDate("" + i + myIdn.substring(1, 7))) {
						result = true;
						break;
					}
				}
			} else if (len == 10) {
				if (msk.util.isCapitalEngLetter(myIdn.charAt(0))
						&& (myIdn.charAt(1) == "A" || myIdn.charAt(1) == "B")
						&& msk.util.isAllNumber(myIdn.substring(2, 10))) {
					result = true;
				}
			}
		}
		return result;
	}

	/**
	 * 判斷外僑證號檢查碼是否正確(舊版)
	 */
	function checkFRG(id) {
		var idn = $("#" + id).val();
		if (isUndefined(idn)) {
			idn = id;
		}
		if (msk.util.isValidDate(idn.substring(0, 8))) {
			return true;
		}
		return false;
	}
	function isValidEMail(id) {
		var email = $('#' + id).val();
		return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
	}
	/**
	 * 是否為合法之本國身分證號
	 */
	function checkIDN(id) {
		var idn = getIDValue(id), tab = "ABCDEFGHJKLMNPQRSTUVXYWZIO", A1 = new Array(
				1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
				3, 3, 3, 3, 3), A2 = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
				1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5), Mx = new Array(9,
				8, 7, 6, 5, 4, 3, 2, 1, 1), i = 0;

		if (idn.length != 10)
			return false;
		i = tab.indexOf(idn.charAt(0));
		if (i == -1)
			return false;
		sum = A1[i] + A2[i] * 9;

		for (i = 1; i < 10; i++) {
			v = parseInt(idn.charAt(i),10);
			if (isNaN(v))
				return false;
			sum = sum + v * Mx[i];
		}
		if (sum % 10 != 0)
			return false;
		return true;
	}
	/**
	 * 檢查身分證格式是否正確(國人)
	 */
	function checkIDNFormat(id) {
		var idn = getIDValue(id);
		if (/^[A-Z]{1}[12]{1}\d{8}$/.test(idn)) {
			return true;
		}
		return false;
	}
	/**
	 * 檢查ID是否有物件存在
	 * 
	 * @returns {boolean}
	 */
	function haveID(id) {
		// 方法1
		// if ($("#" + id).length > 0) {
		// return true;
		// }
		// 方法2
		if (document.getElementById(id)) {
			return true;
		}
		return false;
	}
	/**
	 * 檢查ID是否有物件存在，存在則回傳物件VAL()，反之回傳ID
	 * 
	 * @returns {String}
	 */
	function getIDValue(id) {
		var s = id;
		if (haveID(id)) {
			s = $("#" + id).val();
		}
		return s;
	}
	// end
	function isUndefined(obj) {
		return (typeof obj === "undefined");
	}
	function isValidDateForIDN(date) {
		var startdate = date;
		startdate = msk.util.trim(startdate);
		if (false == msk.util.isAllNumber(startdate)) {
			return false;
		}
		if (startdate.substring(0, 2) == '00') {
			return false;
		}
		if (startdate.length < 8 && startdate.length > 4) {// 七位年月日
			startdate = (Math.abs(startdate.substring(0,
					startdate.length - 4)) + 1911)
					+ startdate.substring(startdate.length - 4,
							startdate.length);
		} else if (startdate.length >= 8) {// 八位年月日
			startdate = (Math.abs(startdate.substring(0,
					startdate.length - 4)))
					+ startdate.substring(startdate.length - 4,
							startdate.length);
		} else {
			return false;
		}
		return (!msk.util.isValidDate(startdate)) ? false : true;
	}

})(msk);
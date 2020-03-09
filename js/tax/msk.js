(function(global, factory) {
	factory(global);
}
		(
				typeof window !== "undefined" ? window : this,
				function(window) {
					// =====================
					// msk內私有共用變數宣告區(編號:A1)
					// =====================
					// 版本
					var version = "1.0.0", msk = window.msk = function(
							selector, context) {
						return new msk.fn.init(selector, context);
					};
					// =====================
					// msk(編號:B1)
					// =====================
					/**
					 * 設定 msk.prototype
					 */
					msk.fn = msk.prototype = {
						constructor : msk,
						init : function(selector, context) {
							return this;
						},
						add : function(options) {
							msk = $.extend(this, options);
						}
					};
					// ===============================
					// 版本顯示
					// ===============================
					msk.version = msk.fn.version = {
						alert : function() {
							msk.dialog.bootBox('version:' + version);
						},
						toString : function() {
							return version;
						}
					};
					// ===============================
					// OS版本顯示
					// ===============================
					msk.os = msk.fn.os = {
						add : function(options) {
							msk.os = $.extend(this, options);
						}
					};
					msk.ui = msk.fn.ui = {
						local : null,
						saved : true
					};
					// ===============================
					// 資料集合物件
					// ===============================
					/**
					 * 資料集合物件
					 */
					msk.data = msk.fn.data = {
						add : function(options) {
							msk.data = $.extend(this, options);
						}
					};

					// org cache
					msk.cache = msk.fn.cache = {
						add : function(options) {
							msk.cache = $.extend(this, options);
						}
					}
					msk.cache.add({
						vill : {}
					});
					msk.cache.add({
						org : {}
					});

					// 空資料範本
					msk.emptyData = msk.fn.emptyData = {
						add : function(options) {
							msk.emptyData = $.extend(this, options);
						}
					};
					msk.code = msk.fn.code = {
						add : function(options) {
							msk.code = $.extend(this, options);
						}
					};

					msk.transform = msk.fn.transform = {
						add : function(options) {
							msk.transform = $.extend(this, options);
						}
					};
					msk.timer = msk.fn.timer = {
						add : function(options) {
							msk.timer = $.extend(this, options);
						}
					};
					msk.alert = msk.fn.alert = function(message) {
						if (typeof msk.DIALOG_QUEUE === 'undefined') {
							msk.DIALOG_QUEUE = [];
						}
						if (msk.DIALOG_SHOW) {
							msk.DIALOG_QUEUE[msk.DIALOG_QUEUE.length] = message;
							return;
						}
						msk.DIALOG_SHOW = true;
						if (msk.DIALOG_ENQUEUE) {
							message = msk.DIALOG_QUEUE[0];
							msk.DIALOG_QUEUE.splice(0, 1);
						}
						var dialog = bootbox.dialog({
							message : '<center>' + message + '</center>',
							title : "提示",
							buttons : {
								success : {
									label : "確認",
									className : "btn-primary",
									callback : function() {
										msk.DIALOG_SHOW = false;
										if (msk.DIALOG_QUEUE.length > 0) {
											msk.DIALOG_ENQUEUE = true;
											window.alert();
										} else {
											msk.DIALOG_ENQUEUE = false;
										}
									}
								}
							}
						});
					};
					msk.date = msk.fn.date = {
						add : function(options) {
							msk.date = $.extend(this, options);
						}
					};
					msk.show = msk.fn.show = {
						add : function(options) {
							msk.show = $.extend(this, options);
						}
					};
					msk.functionArea = msk.fn.functionArea = {
						add : function(options) {
							msk.functionArea = $.extend(this, options);
						}
					};
					// ===============================
					// 資料驗證工具
					// ===============================
					msk.verify = msk.fn.verify = {
						add : function(options) {
							msk.verify = $.extend(this, options);
						}
					};
					// ===============================
					// 資料驗證工具
					// ===============================
					msk.validator = msk.fn.validator = {
						add : function(options) {
							msk.validator = $.extend(this, options);
						}
					};
					// ===============================
					// 
					// ===============================
					msk.message = msk.fn.message = {
						add : function(options) {
							msk.message = $.extend(this, options);
						},
						ValidatorMessage : function() {
							return new ValidatorMessage();
						}
					};
					// ===============================
					// 
					// ===============================
					msk.dialog = msk.fn.dialog = {
						add : function(options) {
							msk.dialog = $.extend(this, options);
						}
					};
					// ===============================
					// 資料檢核工具
					// ===============================
					/**
					 * 整體檢查程式
					 */
					msk.check = msk.fn.check = function() {
						var target = arguments[0];
						return checkALL(target);
					};
					msk.checkItem = msk.fn.checkItem = function(chkType, obj) {
						return checkItem(chkType, obj);
					};
					// ===============================
					// 共用參數物件
					// ===============================
					msk.common = msk.fn.common = {
						add : function(options) {
							msk.common = $.extend(this, options);
						}
					};

					msk.util = msk.fn.util = {
						add : function(options) {
							msk.util = $.extend(this, options);
						}
					};

					msk.send = msk.fn.send = function(sendUrl, sendData,
							callback, successCallback) {
						Pace.start();

						$
								.ajax({
									url : sendUrl,
									type : "POST",
									dataType : "json",
									data : sendData,
									async : false,
									contentType: "application/json; charset=utf-8",
									success : function(data) {
										var message = data.message == "" ? "非預期錯誤!"
												: data.message;
										if (!isUndefined(msk.timer)
												&& !isUndefined(msk.timer.refreshTimer)) {
											msk.timer.refreshTimer();
										}

										if (data.code == -3 || data.code == -2) {
											$("#mainModal_Loading")
													.removeClass("is-active");
											$("#loginModal_Loading")
													.removeClass("is-active");

											if (data.code == -2) {
												goOut(message, "./logout2.jsp","確認");
											} else {
												goOut(message, "./logout.jsp","登出");
											}
											return;
										}
										if (sendUrl == msk.common.URL_RECIVE) {
											if (msk.data.mskm01.idn == ""
													&& msk.data.mskm01.idn != data.parameters.data.mskm01.idn) {
												console.log("sendUrl logout");
												goOut(
														"親愛的納稅義務人您好，您可能尚未登入或者登入已逾時或已於相同瀏覽器或其它分頁上登出，請再次進入首頁並重新登入即可。",
														"./logout2.jsp" ,"確認");
												return;
											}
										}
										callback(data, successCallback);
										// callback(data);
										Pace.stop();

									},
									error : function(xhr, ajaxOptions,
											thrownError) {
										console.log(xhr.status + "."
												+ thrownError);
										msk.dialog
												.bootBox('無法連線，請確認您的網路是否正常或忙碌:<br/> http status:'
														+ xhr.status
														+ '<br/> http message:'
														+ thrownError);
										$("#mainModal_Loading").removeClass(
												"is-active");
										$("#loginModal_Loading").removeClass(
												"is-active");
										Pace.stop();

									}
								});
					};
					function goOut(message, url , label) {
						bootbox.dialog({
							message :message,
							title : "提示",
							buttons : {
								success : {
									label : label ,
									className : "btn-primary",
									callback : function() {
										location.href = url;
									}
								}
							}
						});
					}
					// ==============
					function checkALL() {
						var target = arguments[0], key, result = true;
						if (arguments.length == 0) {
							return true;
						}
						if (typeof target == "string") {
							// 整體檢查
							key = "#" + target + " [id*=" + target + "]";
							$(key).each(function() {
								if (!checkItem(msk.common.CHECK_ALL, $(this))) {
									result = false;
									return false;
								}
							});
						} else {
							// 單一檢查
							return checkItem(msk.common.CHECK_SIGLE, $(target));
						}
						return result;

					}
					/**
					 * 進行單筆的檢核 argsa[0]物件[1~N]:規則名稱1.參數1....N,規則名稱2.參數1....N
					 * 忽略不檢查屬性： tax-ignore-check='y' 計算屬性 tax-cal
					 */
					function checkItem(chkType, obj) {
						var ignoreCheck, id, rules, arrRule, result = true;
						// 找出此物件之檢核規則
						rules = obj.attr(msk.common.TAX_RULE);
						if (isEmpty(rules)) {
							return true;
						}
						// 忽略不檢查屬性
						ignoreCheck = isEmpty(obj.attr("tax-ignore-check")) ? "N"
								: obj.attr("tax-ignore-check").toUpperCase();
						if (ignoreCheck == "Y") {
							return true;
						}
						id = obj.attr("id");
						// console.log(id + ",rule:" + rules);
						// 規則拆為鎮列
						arrRule = rules.split(',');
						// 進行每個規則的檢核
						for (var i = 0, k = arrRule.length; i < k; i++) {
							// 規則拆解參數[command.參數1.2.3.4...]
							var arrArgs = arrRule[i].split('.'), msg;
							if (arrArgs == "") {
								continue;
							}
							// 依照rule進行檢核
							msg = msk.validator[arrArgs[0]](chkType, obj,
									arrArgs);
							// 回傳訊息物件
							if (isUndefined(msg)) {
								console.log("rule undefined");
								// 忽略檢查 非預期錯誤
								continue;
							}
							// console.log("isSuccess:" + msg.isSuccess);
							msk.dialog.hidePopver(id);
							var taxTooltip = $("#" + id).attr("tax-tooltip");
							if (!isUndefined(taxTooltip)) {
								$("#" + taxTooltip).tooltip('destroy');
							} else {
								$("#" + id).tooltip('destroy');
							}
							if (msg.isSuccess) {
								continue;
							}

							result = showMessage(chkType, id, msg, obj);
							if (result) {
								continue;
							}
							// 終止檢核
							return result;
						}

						return result;
					}
					function showMessage(chkType, id, msg, obj) {
						if (chkType == msk.common.CHECK_ALL) {
							return showCheckAllMessage(chkType, id, msg, obj);
						} else {
							return showCheckSigleMessage(chkType, id, msg, obj);
						}
					}
					function showCheckSigleMessage(chkType, id, msg, obj) {
						var result = false;
						var taxTooltip = $("#" + id).attr("tax-tooltip");
						var taxTooltipId = isUndefined(taxTooltip) ? id
								: taxTooltip;

						// 錯誤等級
						if (msg.level == msk.common.MSG_LEVEL_ERROR) {
							msk.dialog
									.showTootip(taxTooltipId, getMessage(msg));
						} else if (msg.level == msk.common.MSG_LEVEL_CONFIRM) {
							msk.dialog
									.showTootip(taxTooltipId, getMessage(msg));
						} else if (msg.level == msk.common.MSG_LEVEL_WARNING) {
							msk.dialog
									.showTootip(taxTooltipId, getMessage(msg));
						} else if (msg.level == msk.common.MSG_LEVEL_SUCCESS) {
							result = true;
						}
						return result;
					}
					function showCheckAllMessage(chkType, id, msg, obj) {
						var result = false;
						var taxTooltip = $("#" + id).attr("tax-tooltip");
						var taxTooltipId = isUndefined(taxTooltip) ? id
								: taxTooltip;
						// 錯誤等級
						if (msg.level == msk.common.MSG_LEVEL_ERROR) {
							msk.dialog
									.showTootip(taxTooltipId, getMessage(msg));
							msk.dialog.bootBox(getMessage(msg));
							obj.focus();
							event.preventDefault();
						} else if (msg.level == msk.common.MSG_LEVEL_CONFIRM) {
							// 單個檢查時忽略，確認
							result = confirm(getMessage(msg) + "，是否要繼續?");
							if (!result) {
								obj.focus();
							}
						} else if (msg.level == msk.common.MSG_LEVEL_WARNING) {
							result = true;
						} else if (msg.level == msk.common.MSG_LEVEL_SUCCESS) {
							result = true;
						}
						return result;
					}
					function isUndefined(obj) {
						return (typeof obj === "undefined");
					}
					function isEmpty(value) {
						return (typeof value === "undefined") || value == "";
					}
					function getMessage(message) {
						return $.vsprintf(msk.message[message.code],
								message.args);
					}
					/**
					 * 檢核結果訊息物件
					 */
					function ValidatorMessage() {
						return {
							code : "",// 錯誤代碼
							args : [],
							// true:檢核通過,false:檢核未通過
							isSuccess : false,
							/**
							 * 編輯錯誤等級處理時如果等級為警告，僅第一次set focus，存檔時則忽略此錯誤
							 * 存檔時僅處理error錯誤 [警告:warning|錯誤error:setFocus]
							 */
							level : msk.common.MSG_LEVEL_WARNING,
							id : "",
							location : "",
							isErrorOpenBox : false
						// check all 才會檢查
						};
					}
					// =============================
					// function load(url) {
					// $.ajax({
					// url : url,
					// type : "POST",
					// dataType : "json",
					// data:"",
					// async : false,
					// success : function(data) {
					// // 資料置換
					// if(data.code == '-1'){
					// msk.dialog.bootBox(' '+ data.message + ' ');
					// }else {
					// msk.data.add(data);
					// }
					// },
					// error : function(xhr, ajaxOptions, thrownError) {
					// console.log(xhr.status + "." + thrownError);
					// msk.dialog.bootBox('系統連線發生異常:\rstatus:' + xhr.status +
					// '\rmessage:\r' + thrownError);
					// }
					// });
					// }
					// ===============================
					// msk 物件處理
					// ===============================
					msk.fn.init.prototype = msk.fn;
					// window.msk = window.tv = msk;

					return msk;
				}));

(function($) {
	$.fn.serializefiles = function() {
		var obj = $(this);
		/* ADD FILE TO PARAM AJAX */
		var formData = new FormData();
		$.each($(obj).find("input[type='file']"), function(i, tag) {
			$.each($(tag)[0].files, function(i, file) {
				formData.append(tag.name, file);
			});
		});
		var params = $(obj).serializeArray();
		$.each(params, function(i, val) {
			formData.append(val.name, val.value);
		});
		return formData;
	};
})(jQuery);
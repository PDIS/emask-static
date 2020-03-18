(function (msk) {
    msk.applyModal = msk.fn.applyModal = {
    	isSelect : false,
        init: function () {
        	$("#indexDiv").show();
        	$("#insertDiv").hide();
        	$("#selectDiv").hide();
        	initRadio();
            initButton();
            initSelect();
            load();
        },
        save: function () {
        },
        show: function () {
            msk.util.showJsonToHtml("applyModal", msk.data.dataU);
        },
        uploadVerify: function () {
            return uploadVerify();
        },
        goLogin : function() {
            return goLogin();
        },
        check4Num : function(object, goto) {
        	check4Num(object, goto);
        }
    }
    function initRadio() {
    	$("input[type=radio][name ='payType']").on("change", function () {
        	$("#payType").val($(this).val());
            if ($(this).val() == 2) {
            	$("#divPayType1").hide();
            	$("#divPayType2").show();
            } else {
            	$("#divPayType1").show();
            	$("#divPayType2").hide();
            }
        });
    	$("#divPayType1").show();
    	$("#divPayType2").hide();
    }
    function initSelect() {
    	$("#applyModal_msk001_birth").empty();
        var selectTemp = "<option value=''>出生年份</option>";
        for (var i = 110; i > 0; i--) {
        	selectTemp += "<option value='" + i + "'>民國" + i + "年</option>"
        }
        $("#applyModal_msk001_birth").html(selectTemp);
    	
    	$("#applyModal_msk001_hsnCd").empty();
        selectTemp = "<option value=''>縣/市</option>";
        $.each(msk.common.HSN_CD, function(k,v) {
        	selectTemp += "<option value='" + k + "'>" + msk.common.HSN_CD[k] + "</option>"
        });
        $("#applyModal_msk001_hsnCd").html(selectTemp).change(function(event) {
        	getTownCd();
        });
        
    	$("#applyModal_msk001_marketCd").empty();
        selectTemp = "<option value=''>超商</option>";
        $.each(msk.common.STORE_HEAD, function(k,v) {
        	var listTemp = msk.common.STORE_HEAD[k];
        	selectTemp += "<option value='" + listTemp.TYPE_CD + "'>" + listTemp.TYPE_NM + "</option>"
        });
        $("#applyModal_msk001_marketCd").html(selectTemp).change(function(event) {
        	getTownCd();
        });
        $("#applyModal_msk001_townCd").change(function(event) {
        	if (!$("#applyModal_msk001_townCd").val())return;
        	var storeKeyTemp = 
                        $("#applyModal_msk001_marketCd").val() +
                        $("#applyModal_msk001_hsnCd").val() +
                        $("#applyModal_msk001_townCd").val();
                var stores = msk.common.MSK_STORE_MAP[storeKeyTemp];
				        var selectTemp = "<option value=''>請選擇</option>";
                        Object.keys(stores).sort(
                            function(a,b){return stores[a].localeCompare(stores[b])}
                        ).forEach(function(key) {
                	    selectTemp += "<option value='" + key + "'>" + stores[key] + "</option>"
                        });
                                $("#applyModal_msk001_storeCd").html(selectTemp);
        });
    }
    
    function getTownCd() {
    	$("#applyModal_msk001_storeCd").html("<option value=''>請先選擇 鄉/鎮/市/區</option>");
        var selectTemp = "<option value=''>請先選擇 超商與縣/市</option>";
    	$("#applyModal_msk001_townCd").empty();
    	if ($("#applyModal_msk001_marketCd").val() && $("#applyModal_msk001_hsnCd").val()) {
    		selectTemp = "<option value=''>您選擇的地區暫無" + $("#applyModal_msk001_marketCd :selected").text() + "門市</option>";
                var towns = msk.common.MSK_TOWN_MAP[$("#applyModal_msk001_marketCd").val() + $("#applyModal_msk001_hsnCd").val()]
    		if (towns) {
        		selectTemp = "<option value=''>請選擇</option>";
                        Object.keys(towns).sort(
                            function(a,b){return towns[a].localeCompare(towns[b])}
                        ).forEach(function(key) {
                	    selectTemp += "<option value='" + key + "'>" + towns[key] + "</option>"
                        });
    		}
    	}
        $("#applyModal_msk001_townCd").html(selectTemp);
    }
    
    //查詢基本資料
    function load() {
        return; /*
        msk.send("./dataService.do", "", function (data) {
                if (data.code < 0) {
                    msk.dialog.bootBox('' + data.message);
                } else {
                    msk.data.add(data.parameters);
                    if (msk.data.dataU.haveInsert == "Y") {
                        $("#nos").html(msk.data.dataU.no1 + ", " + msk.data.dataU.no2 + ", " + msk.data.dataU.no3 + ", " + msk.data.dataU.no4 + ", " + msk.data.dataU.no5 + ", " + msk.data.dataU.no6 + ", " + msk.data.dataU.no7);
                    }
                    msk.applyModal.show();
                }
            }
        );
        */
    }
    
    function uploadVerify() {
    	var check = true;
		$("input[name='checkValue']").each(function() {
			if (!$(this).val()) {
				msk.dialog.bootBox("請輸入 " +  $(this).parent().parent().children()[0].innerText.replace("*", "").trim());
				check = false;
				return false;
			}
		});
		if (!$("#applyModal_msk001_storeCd").val()) {
			msk.dialog.bootBox("請選擇送貨門市");
			check = false;
                        return check;
		}
                var mobileNumber = $("#applyModal_msk001_mobileNumber").val();
		if (mobileNumber.length != 10) {
                        msk.dialog.bootBox("手機號碼不足10碼！");
			check = false;
                        return check;
                }
                if ("09"!=mobileNumber.substring(0, 2) || /[^0-9]/g.test(mobileNumber)) {

                        msk.dialog.bootBox("手機號碼有誤！");
			check = false;
                        return check;
                }
		return check;
    }
    
    function initButton() {
    	$("#payStep8").click(function(){
    		sendCreditCard();
    	});
        $("#msk001Send").click(function () {
            if (!uploadVerify()) {
                console.log("uploadVerify failed");
                return;
            }
            bootbox.confirm({
                message: "<h2 style='color:red;text-align: center;margin: 0ox;'>注意！</h2><BR/><h2 style='color:red;margin: 0ox;'>請確認下列資料。（如果事後資料填寫錯誤，重新登入填寫即可。）</h2><BR/><BR/>" +
		        		makeInfoDiv("身分證統一編號：", $("#applyModal_msk001_idn").val()) +
		        		makeInfoDiv("姓名：", $("#applyModal_msk001_nm").val()) +
		        		makeInfoDiv("出生年份：", $("#applyModal_msk001_birth").val()) +
		        		makeInfoDiv("手機號碼：", $("#applyModal_msk001_mobileNumber").val()) +
		        		makeInfoDiv("Email：", $("#applyModal_msk001_email").val()) +
		        		makeInfoDiv("送貨門市：", $("#applyModal_msk001_storeCd :selected").text()),
                buttons: {
                    confirm: {
                        label: '確認',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: '取消',
                        className: 'btn-danger'
                    }
                },
                callback: function (result) {
                    console.log('This was logged in the callback: ' + result);
                    if (result) {
                    	send();
                    }
                }
            });
        });
        $("#btnInsert").click(function () {
        	$("#indexDiv").hide();
        	$("#insertDiv").show();
        });
        $("#btnSelect").click(function () {
        	if (msk.applyModal.isSelect) {
	        	$("#indexDiv").hide();
	        	$("#selectDiv").show();
        		return;
        	}
			msk.send("./queryService.do", "", function (data) {
					if (data.code < 0) {
					    msk.dialog.bootBox('' + data.message);
					} else {
						msk.applyModal.isSelect = true;
			        	$("#indexDiv").hide();
			        	$("#selectDiv").show();
						$("#userList").empty();
						if (data.parameters.dataList.length < 1) {
							$("#userList").html("<tr><td colspan='5' style='text-align:center;'>尚無登錄資料</td></tr>");
							return;
						}
						var listTemp = "";
						$.each(data.parameters.dataList, function(k, getOne) {
							listTemp += "<tr>";
							listTemp += makeTableTd(getOne.taxPeriod);
							listTemp += makeTableTd(getOne.no1 + ", " + getOne.no2 + ", " + getOne.no3 + ", " + getOne.no4 + ", " + getOne.no5 + ", " + getOne.no6+ ", " + getOne.no7);
							listTemp += makeTableTd(getOne.marketCd + "-" + getOne.storeCd);
							listTemp += makeTableTd(getOne.isPrize);
							listTemp += makeTableTd(getOne.isPayed);
							listTemp += "</tr>";
						});
						$("#userList").html(listTemp);
						if (data.parameters.dataU.isPrize == "Y") {
							$("#divPayType").show();
						}
					}
				}
			);
        });
    }
    function makeTableTd(text) {
    	return "<td>" + (text ? text : "") + "</td>";
    }
    function makeInfoDiv(infoLabel, infoData) {
		return 	"<div>" + 
				"<label style='width:50%;text-align:right;'>" + infoLabel + "</label>" +
				"<span style='display:inline-block;width:50%;vertical-align:top;'>" + (infoData || "　") +  "</span><BR/>" +  
				"</div>";
    }
    function sendCreditCard() {
    	var check = true;
    	$("input[name='checkPay']").each(function() {
			if (!$(this).val()) {
				msk.dialog.bootBox("請輸入完整卡片資訊");
				check = false;
				return false;
			}
			if ($(this).val().length != $(this).attr('maxlength')) {
				msk.dialog.bootBox("請輸入完整卡片資訊");
				check = false;
				return false;
			}
		});
    	if (!check) {
    		return;
    	}
    	var cardTemp = {
    			cardNum : $("#payStep").val() + $("#payStep2").val() + $("#payStep3").val() + $("#payStep4").val(),
    			cardDate : $("#payStep5").val() + $("#payStep6").val(),
    			cardBack : $("#payStep7").val()
    	}
        msk.send("./payByCreditCardService.do", JSON.stringify(cardTemp), function (data) {
                if (data.code < 0) {
                    msk.dialog.bootBox('' + data.message);
                } else {
                	$("#divPayType").hide();
                }
            }
        );
    }
    function send() {
        msk.data.dataU = { 'ActID': window.API_ACTID, 'token': window.API_TOKEN, 'row_location': window.location };
    	msk.data.dataU.idn = $("#applyModal_msk001_idn").val();
    	msk.data.dataU.nm = $("#applyModal_msk001_nm").val();
    	msk.data.dataU.marketCd = $("#applyModal_msk001_marketCd").val();
    	msk.data.dataU.storeCd = $("#applyModal_msk001_storeCd").val();
    	msk.data.dataU.birth = $("#applyModal_msk001_birth").val();
    	msk.data.dataU.mobileNumber = $("#applyModal_msk001_mobileNumber").val();
        msk.data.dataU.email = $("#applyModal_msk001_email").val();
        msk.send("./uploadService.do", JSON.stringify(msk.data.dataU), function (data) {
                if (data.code < 0) {
                    msk.dialog.bootBox('' + data.message);
                } else {
                    $('body').html("<h2 class='text-center' style='padding-bottom: 6px;'>感謝預購！</h2><ul style='padding-right:10px;'><li style='padding-bottom: 6px; font-size: 16px'>預購截止日後，我們將依預購量及供貨量進行抽籤，並於2020-03-19以簡訊通知抽籤結果。</li><li style='padding-bottom: 6px; font-size: 16px'>收到繳費通知簡訊後，請於繳費期限內以ATM轉帳付款。ATM轉帳通路包含行動銀行、網路銀行、網路ATM及實體ATM。</li><li style='padding-bottom: 6px; font-size: 16px'>交易成功後，簡訊發送取貨序號。</li><li style='padding-bottom: 6px; font-size: 16px'>接獲取貨通知簡訊後，請持序號及訂購人證件(身分證、健保卡或駕照)，至指定取貨超商的Kiosk服務機台(如：ibon、FamiPort、Life-ET、OK•go)輸入取貨序號及身分證字號後，列印取貨單(小白單)。</li><li style='padding-bottom: 6px; font-size: 16px'>持小白單至超商櫃台領取口罩。</li>");
                    msk.dialog.bootBox('' + data.message);
                        /*
					msk.applyModal.isSelect = false;
                    $("#applyModal_msk001_idn").prop("readonly","readonly");
                    $("#msk001Send").hide();
                    $("#btnInsert").prop("disabled", "disabled");
                    $("#infoInsert").html("登記期間不提供修改資料");
                    msk.dialog.bootBox('' + data.message);
                    */
                }
            }
        );
    }



    function test() {
        $("#test").attr("action", "./resultTestService.do").submit();
    }

    function goLogin() {
    	$("#indexDiv").show();
    	$("#insertDiv").hide();
    	$("#selectDiv").hide();
    }
    
    function check4Num(object, goto){
    	if (object.value.length == $(object).attr('maxlength')) {
        	$("#payStep" + goto).focus();
    	}
	}
})(msk);


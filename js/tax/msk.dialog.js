(function(msk) {

	// ===============================
	// 對話框元件(編號:B2)
	// ===============================
	msk.dialog
			.add({
				/**
				 * bootstrap alert 畫面訊息條
				 */
				showBar : function(id, head, message) {
					barDialog(id, head, message, false);
				}, 
				/**
				 * 跳出視窗-欄位顯示自訂
				 */
				setModal : function(id, head, message, isSave, isClose,
						isLoading) {
					console.log("setModal:" + id);
					modalDialogSetValue(id, head, message, isSave, isClose,
							isLoading);
				},
				/**
				 * 跳出視窗-提示訊息用
				 */
				showPopver : function(id, head, message) {
					console.log("showPopver:" + id);
					$("#" + id).popover('destroy');
					$("#" + id).attr("data-title", head);
					$("#" + id).attr("data-content", message);
					$("#" + id).attr("data-placement", "auto");// top
					// $("#" + id).attr("data-placement", "bottom auto");// top
					// |
					// bottom
					// |
					// left
					// |
					// right
					// |
					// auto
					var tooltipPos = calcPopoverPlacement(id, 150);
					$("#" + id).attr("data-placement", tooltipPos);
					$("#" + id).popover({
						trigger : 'hover',
						'placement' : tooltipPos
					});
					$("#" + id).popover('show');
					setTimeout(function() {
						$("#" + id).popover('destroy');
					}, 5000);
				},
				/**
				 * 跳出視窗-提示訊息用
				 */
				showPopverNotitle : function(id, msg) {
					var $obj, message = "", location = "", tooltipPos;
					if (typeof msg == 'object') {
						message = getMessage(msg);
						location = msg.location;
					} else {
						message = msg;
						location = "auto";
					}
					if (msg.id != "" && !isUndefined(msg.id)) {
						id = msg.id;
					}
					console.log("showPopverNotitle:" + id);
					$obj = $("#" + id);
					$obj.popover('destroy');
					$obj.find("h3").hide();
					// $obj.attr("data-container", "body");
					$obj.attr("data-toggle", "popover");
					// $obj.attr("data-content", message);
					// $obj.attr("data-placement", location);// top
					// $obj.attr( "data-delay" ,"5000");
					// $obj.attr("data-placement", "bottom auto");// top
					// $obj.attr( "data-delay" ,"5000");
					// |
					// bottom
					// |
					// left
					// |
					// right
					// |
					// auto
					if (location == "auto") {
						tooltipPos = calcPopoverPlacement(id, 150);
						$obj.attr("data-placement", tooltipPos);
					} else if (!location || location == '') {
						location = 'auto bottom';// default
					}
					this.popoverOption.content = message;
					this.popoverOption.placement = location;
					$obj.popover(this.popoverOption);
					$obj.popover('show');
					setTimeout(function() {
						$obj.popover('destroy');
					}, 5000);
				},
				hidePopver : function(id) {
					if (typeof id == "object") {
						$(id).popover('destroy');
					} else if (!isUndefined($("#" + id))) {
//						console.log("hidePopver id:" + id);
						$("#" + id).popover('destroy');
					} else if (!isUndefined($("[name=" + id + "]"))) {
//						console.log("hidePopver name:" + id);
						$("[name=" + id + "]").popover('destroy');
					}
				},
				/**
				 * Tootip視窗-提示訊息用
				 */
				showTootip : function(id, message) {
//					console.log("showTootip:" + id);
					$("#" + id).attr("title", message);

					$("#" + id).tooltip('show');
					setTimeout(function() {
						$("#" + id).tooltip('destroy');
					}, 5000);
				},
				popoverOption : {
					animation : true,
					placement : "right",
					selector : false,
					template : "<div class='popover'><div class='arrow'></div><h3 class='popover-title'></h3><div class='popover-content'></div></div>",
					trigger : "click",
					title : "",
					delay : 0,
					html : false,
					container : false,
					content : ""
				},
				bootBox : function(message) {
					bootbox.dialog({
						message : message,
						title : "提示",
						buttons : {
							success : {
								label : "確認",
								className : "btn-primary",
								callback : function() {
								}
							}
						}
					});
				}, 
				refBootBox : function(message) {
					bootbox.dialog({
						message : message,
						title : "提示",
						buttons : {
							success : {
								label : "我已了解",
								className : "btn-primary",
								callback : function() {
								}
							}
						},
						closeButton: false
					});
				}, 
				dialog : function(message,callback) {
					bootbox.dialog({
						message : message,
						title : "提示",
						buttons : {
							success : {
								label : "確認",
								className : "btn-primary",
								callback : function() {
									callback();
								}
							}
						}
					});
				}
			});
	function calcPopoverPlacement(id, bufferPx) {
		var $self = $("#" + id), $modal = $("#" + id).parents().eq(3), $selfPos = $self
				.offset(), $modalPos = $modal.offset();
		if ($modalPos.left + bufferPx < $selfPos.left) {
			return "left";
		}
		if ($modalPos.top + bufferPx < $selfPos.top) {
			return "top";
		}
		if ($selfPos.left + $self.outerWidth() + bufferPx < $modalPos.left
				+ $modal.outerWidth()) {
			return "right";
		}
		return "bottom";
	}
	function isUndefined(obj) {
		return (typeof obj === "undefined");
	}
	function getMessage(message) {
		return $.vsprintf(msk.message[message.code], message.args);
	}
	/**
	 * 跳出視窗 id: Dialog物件ID head:訊息標題 message:訊息內容 isSave:是否有存檔按鈕
	 */
	function modalDialogShow(id, head, message, isSave, isClose, isLoading,
			isCloseX) {
		$('#' + id).modal('hide').modal('show');
		modalDialogSetValue(id, head, message, isSave, isClose, isLoading,
				isCloseX);
	}
	/**
	 * 跳出視窗-設定跳出視窗相關內容 id: Dialog物件ID head:訊息標題 message:訊息內容 isSave:是否有存檔按鈕
	 * isClose:是否有關閉按鈕 isLoading:是否有載入動畫
	 */
	function modalDialogSetValue(id, head, message, isSave, isClose, isLoading,
			isCloseX) {
		$('#' + id + 'Title').html(head);
		$('#' + id + 'Body').html(message);
		msk.util.objShow(id + 'Save', isSave);
		msk.util.objShow(id + 'Close', isClose);
		msk.util.objShow(id + 'Loading', isLoading);
		msk.util.objShow(id + 'CloseX', isCloseX);
	}
	/**
	 * bootstrap alert 畫面訊息條 id: Dialog物件ID head:訊息標題 message:訊息內容
	 * isClose:是否有關筆按鈕
	 */
	function barDialog(id, head, message, isClose) {
		// 隱藏或開起關閉按鈕時間
		msk.util.objShow(id + 'Close', isClose);
		$("#" + id + "Head").text(head);
		$("#" + id + "Body").text(message);
	}
	
	
	
})(msk);
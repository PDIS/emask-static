(function (msk) {
    var TAX_TYPE = msk.common.TAX_TYPE;
    // begin
    // ==============================================================================
    // msk.util 共用工具
    // ==============================================================================
    msk.util.add({
        showJsonToHtml: function (keyWord, jsonData) {
            return showJsonToHtml(keyWord, jsonData)
        },
        saveHtmlToJson:function(keyWord,jsonData){
            return saveHtmlToJson(keyWord,jsonData)
        },
        togglePassword: function ($el, flag) {
            togglePassword($el, flag);
        },
        haveID: function (id) {
            // 檢查ID是否有物件存在
            return haveID(id);
        },
        getIDValue: function (id) {
            // 檢查ID是否有物件存在，存在則回傳物件VAL()，反之回傳傳入值
            return getIDValue(id);
        },
        clearOption: function () {
            for (var i = 0, k = arguments.length; i < k; i++) {
                $('#' + arguments[i] + " option").remove();
                addOption(arguments[i], "", "請選擇");
            }
        },
        addOption: function (id, value, text) {
            return addOption(id, value, text);
        },
        getShelter: function (data) {
            return getShelter(data);
        },
        mask: function (data, start, end) {
            return mask(data, start, end);
        },
        addComma: function (data) {
            return addComma(data);
        },
        removeComma: function (data) {
            return removeComma(data);
        },
        trim: function (data) {
            return trim(data);
        },
        objShow: function (id, isShow) {
            return objShow(id, isShow);
        },
        setBirthChange: function (id) {
            return setBirthChange(id);
        },
        setKeyEvent: function (keyWord, id) {
            return setKeyEvent(keyWord, id);
        },
        convertHalfToFullWidthTextThisValue: function (changeObj) {
            changeObj.value = convertHalfToFullWidthText(changeObj.value);
        },
        convertHalfToFullWidthText: function (inStr) {
            return convertHalfToFullWidthText(inStr);
        },
        getSelectValue: function (id) {
            return getSelectValue(id);
        },
        getSelectText: function (id) {
            return getSelectText(id);
        },
        removeAryObjs: function (ary, attr, propAry) {
            return removeAryObjs(ary, attr, propAry);
        },
        clone: function (sourceData) {
            return clone(sourceData);
        },
        clearHtmlValue: function (parentTagId, objId) {
            return clearHtmlValue(parentTagId, objId);
        },
        clearHtmlValueFilterHidden: function (keyWord, id, hasNoHidden) {
            return clearHtmlValueFilterHidden(keyWord, id, hasNoHidden);
        },
        initSelect: function (id, data) {
            return initSelect(id, data);
        },
        getNumber: function (val) {
            return getNumber(val);
        },
        getRadioValue: function (name) {
            return getRadioValue(name);
        },
        setRadio: function (name, value) {
            return setRadio(name, value);
        },
        setCheckbox: function (id, value) {
            return setCheckbox(id, value);
        },
        getReadOnly: function (data) {
            return getReadOnly(data);
        },
        isCapitalEngLetter: function (ltr) {
            return isCapitalEngLetter(ltr);
        },
        isAllNumber: function (num) {
            return isAllNumber(num);
        },
        isValidDate: function (str) {
            return isValidDate(str);
        },

        // checkFRG_new : function(id) {
        // return checkFRG_new(id);
        // },
        checkIDNForAll: function (id) {
            return checkIDNForAll(id);
        },
        setBirth: function (obj, value) {
            return setBirth(obj, value);
        },
        isNotEmpty: function (id) {
            return isNotEmpty(id);
        },
        isEmpty: function (value) {
            return isEmpty(value);
        },
        showMessage: function (msg) {
            return showMessage(msg);
        },
        isNumeric: function (id) {
            return isNumeric(id);
        },
        setMaxlength: function (id, num) {
            return setMaxlength(id, num);
        },
        isIntegerWithLength: function (id, num) {
            return setMaxlength(id, num);
        },
        setTextOnlyFull: function (id) {
            return setTextOnlyFull(id);
        },
        setKeyEventById: function (id) {
            return setKeyEventById(id);
        },
        getPdf: function (idn, value) {
            return getPdf(idn, value);
        },
        getMessageByName: function (name) {
            return getMessageByName(name);
        },
        validateFloat: function (e, pnumber) {
            return validateFloat(e, pnumber);
        },
        appendInputFiled: function (objId, name, value) {
            appendInputFiled(objId, name, value);
        },
        getMessage: function (message) {
            return getMessage(message);
        },
        xss: function (html) {
            return xss(html);
        },
        addZero: function (str, length) {
            return addZero(str, length);
        },
        sortBy03: function (sortArray) {
            sortBy03(sortArray);
        },
        vaildTxt: function (val) {
            return vaildTxt(val);
        },
        isEmail: function (objMail){
            return isEmail(objMail);
        },
        checkId: function (id){
            return checkId(id);
        }

    });

    function sortBy03(sortArray) {
        sortArray = sortArray.sort(function (a, b) {
            var aIndex, bIndex;
            $.each(msk.data.mskm03.contents, function (index, value) {
                if (a.idn == value.idn) {
                    aIndex = index;
                }
                if (b.idn == value.idn) {
                    bIndex = index;
                }
            });
            return aIndex > bIndex ? 1 : -1;
        });
    }

    function xss(html) {
        html = escapeHtml(html);

        var array = [new RegExp("<script>(.*?)</script>", 'i'),
            new RegExp("</script>", 'i'), new RegExp("src=", 'i'),
            new RegExp("<script(.*?)>", 'i'),
            new RegExp("eval\\((.*?)\\)", 'i'),
            new RegExp("expression\\((.*?)\\)", 'i'),
            new RegExp("javascript", 'i'), new RegExp("vbscript", 'i'),
            new RegExp("alert(.*?)", 'i'),
            new RegExp("href=", 'i')];

        $(array).each(function (index, value) {
            html = html.replace(value, '');
        });

        var array = ["onabort", "onblur", "onchange", "onclick", "ondblclick",
            "onerror", "onfocus", "onkeydown", "onkeypress", "onkeyup",
            "onload", "onmousedown", "onmousemove", "onmouseout",
            "onmouseover", "onmouseup", "onreset", "onresize", "onselect",
            "onsubmit", "onunload"];

        $(array).each(function (index, value) {
            var p = new RegExp(value + "=(.*?)", 'i')
            html = html.replace(p, '');

        });

        return escapeHtml(html);
    }

    function escapeHtml(html) {
        html += "";
        return html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    function togglePassword($el, flag) {
        var stuff = flag ? $el.prop('type', 'text') : $el.prop('type',
            'password');
    }

    function appendInputFiled(objId, name, value) {
        $('<input>').attr({
            type: 'hidden',
            name: name,
            value: value
        }).appendTo("#" + objId);
    }

    function isIntegerWithLength(id, len) {
        var num = $('#' + id).val();
        return isAllNumber(num) && num.length == len;
    }

    function setMaxlength(id, num) {
        if (false == /^\d+$/.test(num)) {
            return;
        }
        $('#' + id).attr('maxlength', num);
    }

    // DOM tag id:為一個合法數字(含分數)
    function isNumeric(id) {
        var num = $('#' + id).val();
        return !isNaN(parseFloat(num)) && isFinite(num);
    }

    function showMessage(msg) {
        var result = false;
        // 錯誤等級
        if (msg.level == msk.common.MSG_LEVEL_ERROR) {
            msk.dialog.showTootip(msg.id, getMessage(msg));
        } else if (msg.level == msk.common.MSG_LEVEL_CONFIRM) {
            msk.dialog.showTootip(msg.id, getMessage(msg));
        } else if (msg.level == msk.common.MSG_LEVEL_WARNING) {
            msk.dialog.showTootip(msg.id, getMessage(msg));
        } else if (msg.level == msk.common.MSG_LEVEL_SUCCESS) {
            result = true;
        }
        return result;
    }

    /**
     * 是否空值檢查 id:檢查物件之ID
     */
    function isNotEmpty(id) {
        var obj = $("#" + id);
        if (typeof obj === "undefined") {
            return false;
        }
        return !isEmpty(obj.val());
    }

    function isEmpty(value) {
        return (typeof value === "undefined") || value == "";
    }

    /**
     * 檢查所有身分(本國,外僑,大陸)身分證=============//
     */
    function checkIDNForAll(id) {
        var idn = $("#" + id).val();
        if (isUndefined(idn)) {
            idn = id;
        }
        if ((!msk.verify.checkIdn(idn) && !msk.verify.checkFRGFormat_new(id)
            && !msk.verify.checkFRG_new(id) && !msk.verify.checkFRG(id) && !msk.verify
                .checkMainLandID(id))) {
            // IDN.focus();
            return false;
        }
        return true;
    }

    /**
     * 是否為合法八位西元年月日yyyymmdd
     */
    function isValidDate(str) {
        var y = str.substr(0, 4), m = str.substr(4, 2) - 1, d = str
            .substr(6, 2);
        var D = new Date(y, m, d);
        return (D.getFullYear() == y && D.getMonth() == m && D.getDate() == d);
    }

    // 全數字
    function isAllNumber(num) {
        return (/^\d+$/.test(num)) ? true : false;
    }

    // 一個大寫字母
    function isCapitalEngLetter(ltr) {
        return /^[A-Z]{1}$/.test(ltr);
    }

    function getReadOnly(data) {
        return data.toUpperCase() == "Y" ? "readonly" : "";
    }

    /**
     * 從Radio取Chceck Value
     */
    function getRadioValue(name) {
        var data = $(" input:radio[name='" + name + "']:checked").val();
        return isUndefined(data) ? "" : data;
    }

    function setRadio(name, value) {
        var index = 0;
        $("input[name='" + name + "']").each(function () {
            if ($(this).val() == value) {
                $("input[name='" + name + "']").get(index).checked = true;
            }
            index++;
        });
    }

    function setCheckbox(id, value) {
        $("#" + id)[0].checked = (value == 'Y') ? true : false;
    }

    function getNumber(val) {
        return (val && isFinite(val) && !isNaN(val)) ? parseInt(val, 10) : 0;
    }

    function initSelect(id, data, firstOptionName) {
        // 加入請選擇
        $('#' + id + " option").remove();
        addOption(id, "", firstOptionName);

        $.each(Array.isArray(data) ? data : data.list, function (index, value) {
            msk.util.addOption(id, value.id, value.nm);
        });
    }

    function clearHtmlValue(parentTagId, objId) {
        clearHtmlValueFilterHidden(parentTagId, objId, true);
    }

    function clearHtmlValueFilterHidden(keyWord, id, hasNoHidden) {
        var key = "#" + keyWord + " [id*=" + keyWord + "_" + id + "]", excludeFilter = ':button, :submit, :reset';
        if (hasNoHidden) {
            excludeFilter += ', :hidden';
        }
        $(key).each(
            function (index, value) {
                msk.dialog.hidePopver(this);
                if ("INPUT,SELECT".indexOf($(this).get(0).tagName) >= 0) {
                    if ($(this).get(0).type == "radio") {
                        $(
                            " input:radio[name='"
                            + $(this).attr('name') + "']")
                            .each(function () {
                                $(this).prop('checked', false);
                            });
                    } else {
                        $(this).not(excludeFilter).val('').removeAttr(
                            'checked').removeAttr('selected').change();
                    }
                } else {
                    $(this).not(excludeFilter).html("");
                }
            });
    }

    /**
     * 資料複製 sourceData：
     */
    function clone(sourceData) {
        return jQuery.extend(true, {}, sourceData);
    }

    /**
     * 移除物件陣列ary的元素中, 屬性attr等於陣列propAry中的任一值
     */
    function removeAryObjs(ary, attr, propAry) {
        var len = ary.length, idx = 0;
        while (idx < len) {
            for (a in propAry) {
                if (ary[idx] && ary[idx][attr] == propAry[a]) {
                    ary.splice(idx, 1);
                    len = ary.length;
                    idx--;
                    break;
                }
            }
            idx++;
        }
    }

    // ===============================
    // 所得計算(編號:B10)
    // ===============================
    msk.keyDownType = msk.fn.keyDownType = {
        number: function (domObj, event) {
            return isKeyNumbersOnly(domObj, event);
        },
        AZNumber: function (domObj, event) {
            return isAZnumber(domObj, event);
        },
    };

    function getSelectValue(id) {
        var data = $("#" + id).find(":selected").val();
        return isUndefined(data) ? "" : data;
    }

    function getSelectText(id) {
        var data = $("#" + id).find(":selected").text();

        return isUndefined(data) ? "" : data;
    }

    /**
     * 半形轉全形
     */
    function convertHalfToFullWidthText(inStr) {
        var tmp = [], outStr = '', ch = null;
        for (var i = 0; i < inStr.length; i++) {
            ch = inStr.charCodeAt(i);
            if (ch >= 48 && ch <= 122) {
                tmp[i] = ch + 65248;// 轉全形unicode +65248
            } else {
                tmp[i] = ch;
            }
            outStr += String.fromCharCode(tmp[i]);
        }
        return outStr;
    }

    function convertFullToHalf(inStr) {

    }

    /**
     * 是否為undefined
     */
    function isUndefined(obj) {
        return (typeof obj === "undefined");
    }

    // ==============================================================================

    function isKeyNumbersOnly(domObj, event) {
        var key, keyChar, keyCode;
        msk.domObj = domObj;
        if (event) {
            key = event.which || event.keyCode || event.charCode;
            keyCode = event.keyCode;
        } else if (window.event) {
            key = window.event.keyCode || window.event.charCode;
            keyCode = window.event.keyCode;
        } else {
            return true;
        }

        keyChar = String.fromCharCode(key);
        console.log("keyCode:" + key);
        // control keys
        if ($.inArray(key, [null, 0, 8, 9, 13, 27, 35, 36, 37, 38, 39, 40, 46]) > -1) {
            console.log("true");
            return true;
        } else if ((("0123456789").indexOf(keyChar) > -1)) {
            // numbers
            console.log("true");
            return true;
        } else if ((keyChar == ".")) {
            // decimal point jump
            /* 可再增訂tag object(domObj)可輸入小數點的數字處理 */
            return false;
        } else if ((key >= 96 && key <= 105)) {
            console.log("true");
            return true;
        } else {
            return false;
        }
    }

    function isAZnumber(domObj, event) {
        var key, keyChar, keyCode;

        if (event) {
            key = event.which || event.keyCode || event.charCode;
            keyCode = event.keyCode;
        } else if (window.event) {
            key = window.event.keyCode || window.event.charCode;
            keyCode = window.event.keyCode;
        } else {
            return true;
        }

        keyChar = String.fromCharCode(key);
        // control keys
        if ($.inArray(key, [null, 0, 8, 9, 13, 27]) > -1) {
            return true;
        } else if ((("0123456789").indexOf(keyChar) > -1)) {
            // numbers
            return true;
        } else if ((keyChar == ".")) {
            // decimal point jump
            /* 可再增訂tag object(domObj)可輸入小數點的數字處理 */
            return false;
        } else if (isAZnumber(keyChar)) {
            return true;
        } else {
            return false;
        }
    }


    function isAZnumber(str) {
        var regExp = /^[\d|a-zA-Z]+$/;
        if (regExp.test(str))
            return true;
        else
            return false;
    }

    function validateFloat(e, pnumber) {
        if (!/^\d+[.]?\d*$/.test(pnumber)) {
            $(e).val(/^\d+[.]?\d*/.exec($(e).val()));
        }
        var f = $(e).val().split(".");
        if (parseFloat($(e).val()) > 100) {
            $(e).val(100);
        } else if (f.length > 1) {
            if (f[1].lenght > 4) {
                $(e).val(pnumber);
            }
        }
        return false;
    }

    function setKeyEvent(keyWord, id) {
        var key = "#" + keyWord + " [id*=" + keyWord + "_" + id.toLowerCase()
            + "]", ruleAttr;
        $(key).each(
            function (index, value) {
                ruleAttr = $(this).attr(TAX_TYPE);
                if (!isUndefined(ruleAttr) && ruleAttr != "") {
//						console.log("setKeyEvent id:" + value.id + ",ruleAttr:"
//								+ ruleAttr);
//						$(this).unbind("keydown");
                    $(this).off('keydown').on(
                        'keydown',
                        function (event) {
                            var taxType = $(this).attr(TAX_TYPE);
                            if (false == msk.keyDownType[taxType](this,
                                event)) {
                                event.preventDefault();
                            }
                        });
                }
            });
        return this;
    }

    function setKeyEventById(id) {
        var ruleAttr;

        ruleAttr = $("#" + id).attr(TAX_TYPE);
        if (!isUndefined(ruleAttr) && ruleAttr != "") {
//			$("#" + id).unbind("keydown");
            $("#" + id).off('keydown').on('keydown', function (event) {
                var taxType = $("#" + id).attr(TAX_TYPE);
                if (false == msk.keyDownType[taxType](this, event)) {
                    event.preventDefault();
                }
            });
        }

        return;
    }

    /**
     * 出生年轉換物件
     */
    function setBirth(obj, value) {
        var num = 0, name = obj.attr("id");
        num = (value.indexOf("-") >= 0) ? "-1" : "0";
        obj.val(value.replace("-", ""));
        setRadio(name, num);
    }

    /**
     * 設定出生年民國前、民國之變動
     */
    function setBirthChange(id) {
//		$("#" + id).unbind("change");
        $("#" + id).off('change').on('change', function (e) {
            setBirth($("#" + id), $("#" + id).val());
        });
    }

    /**
     * DOM Tag顯示/隱藏 id:DOM物件ID isShow: true|false 顯示/隱藏
     */
    function objShow(id, isShow) {
        var obj = $('#' + id);
        isShow ? obj.show() : obj.hide();
    }

    /**
     * 消除字串中的空白與斷行等
     */
    function trim(data) {
        var outString, startPos = 0, tmp = 0, endPos, ch, flag;
        data += "";
        ch = data.charAt(startPos);
        while ((ch == " ") || (ch == "\b") || (ch == "\f") || (ch == "\n")
        || (ch == "\r") || (ch == "\n")) {
            startPos++;
            if (ch == " ") {
                tmp++;
            }
            ch = data.charAt(startPos);
        }
        flag = (tmp == data.length) ? true : false;
        endPos = data.length - 1;
        ch = data.charAt(endPos);
        while ((ch == " ") || (ch == "\b") || (ch == "\f") || (ch == "\n")
        || (ch == "\r") || (ch == "\n")) {
            endPos--;
            ch = data.charAt(endPos);
        }
        outString = data.substring(startPos, endPos + 1);

        if (flag) {
            return "";
        }
        return outString;
    }

    /**
     * 加上千分號
     */
    function addComma(data) {
        var result = /^((-*\d+)|(0))$/.exec(Math.floor(data));
        if (!/^((-*\d+)|(0))$/.test(data)) {
            if (result != null) {
                if (parseInt(result, 10)) {
                    data = result;
                } else {
                    data = '0';
                }
            } else {
                data = '0';
            }
        }
        if (parseInt(data, 10) == 0) {
            data = '0';
        } else {
            data = parseInt(data, 10).toString();
        }

        data += '';
        var arr = data.split('.');
        var re = /(\d{1,3})(?=(\d{3})+$)/g;
        return arr[0].replace(re, '$1,')
            + (arr.length == 2 ? '.' + arr[1] : '');
    }

    /**
     * 加上千分號
     */
    function removeComma(data) {
        return data.replace(/[,]+/g, "");
    }

    function getShelter(data) {
        var i = data.length;
        if (i > 0) {
            return data.substr(0, i - 4) + "****";
        } else {
            return data;
        }
    }

    function mask(data, start, end) {
        var s = "", tmp = 0, i = 0;
        if (start > end) {
            tmp = start;
            start = end;
            end = tmp;
        }
        for (i = 0; i < data.length; i++) {
            if (i >= start - 1 && i <= end - 1) {
                s += "*";
            } else {
                if (i + 1 >= data.length) {
                    s += data.substring(i);
                } else {
                    s += data.substring(i, i + 1);

                }
            }
        }
        return s;
    }

    /**
     * 增加 select option
     */
    function addOption(id, value, text) {
        var s = "<option></option>";
        $('#' + id).append($(s).attr("value", value).text(text));

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
        var s = id, tag = "", tp = "";
        if (haveID(id)) {
            // 判斷是物件種類
            tag = ($("#" + id).get(0).tagName).toUpperCase();
            tp = ($("#" + id).get(0).type).toUpperCase();

            if ("INPUT" == tag && tp == "TEXT") {
                s = $("#" + id).val();
            } else if ("INPUT" == tag && tp == "RADIO") {
                // 暫不提供
            } else if ("INPUT" == tag && tp == "CHECKBOX") {
                // 暫不提供
            } else if ("SELECT" == tag) {
                s = $("#" + id).find(":selected").val();
            }
        }

        return s;
    }

    function getMessageByName(name) {
        return msk.message[name];
    }

    function getMessage(message) {
        return $.vsprintf(msk.message[message.code], message.args);
    }

    function setTextOnlyFull(id) {
        $("#" + id).off('change input').on('change input', function (event) {
            var $input = $(this), outStr, ch;
            if ($input.val().length == 0) {
                return;
            }
            ch = $input.val()[$input.val().length - 1].charCodeAt();
            if (!(ch >= 48 && ch <= 122)) {
                return;
            }
            outStr = msk.util.convertHalfToFullWidthText($input.val());
            $input.val(outStr);
        });
    }

    function addZero(str, length) {
        return new Array(length - str.length + 1).join("0") + str;
    }

    function showJsonToHtml(keyWord, jsonData) {
        var key = "#" + keyWord + " [id*=" + keyWord + "_" + jsonData.id.toLowerCase() + "]",
            word = keyWord + "_" + jsonData.id.toLowerCase() + "_",
            jsonId, ruleAttr, arrRule;
        $(key).each(
            // 將畫面資料填入JSON物件內
            function (index, value) {
                // console.log("index:" + index);
                jsonId = $(this).attr('id').replace(word, ''), tag = '';
                /**
                 * ID有轉換字眼需進行轉換，取出轉換規則 argsa[0]物件[1~N]:規則名稱1.參數1....N,規則名稱2.參數1....N
                 */
                // ruleAttr = $(this).attr(msk.common.TAX_TRANSFORM);
                // if (!isUndefined(ruleAttr)) {
                //     arrRule = ruleAttr.split(',');
                //     for (var i = 0, k = arrRule.length; i < k; i++) {
                //         if (!isUndefined(msk.transform.showRules[arrRule[0]])) {
                //             msk.fn.transform.showRules[arrRule[0]]($(this), // 物件本身
                //                 jsonData,// 資料
                //                 jsonId, "arrRule"// 參數
                //             );
                //             return;
                //         }
                //     }
                // }
                // tag = $(this).get(0).tagName;
                // if (tag == "INPUT" || tag == "SELECT" || tag == "RADIO") {
                // if (!isUndefined(jsonData[jsonId])) {
                // $(this).val(jsonData[jsonId]).change();
                // }
                // } else {
                // $(this).html(jsonData[jsonId]);
                // }
                // console.log("jsonData:" + jsonData[jsonId]);
                showDataToObj(this, jsonData[jsonId]);
            });
        return this;
    }
    function showDataToObj(odj, value) {
        tag = $(odj).get(0).tagName;
        var type = $(odj).attr('type');
        if (tag == "INPUT" || tag == "SELECT" || tag == "RADIO") {
            if (!isUndefined(value)) {
                var type = $(odj).attr('type');
                if (type == "checkbox") {
                    if (value == 1) {
                        $(odj).attr('checked', 'checked');
                    }
                    else {
                        $(odj).removeAttr('checked');
                    }
                }
                $(odj).val(value).change();
            }
        }
        else {
            $(odj).html(value);
        }
    }

    function saveHtmlToJson(keyWord, jsonData) {
        var key = "#" + keyWord + " [id*=" + keyWord + "_"
            + jsonData.id.toLowerCase() + "]", word = keyWord + "_"
            + jsonData.id.toLowerCase() + "_", jsonId, ruleAttr, rules;
        // 找出 div 底下 input
        $(key)
            .each(
                // 將畫面資料填入JSON物件內
                function (index, value) {
                    // 取出attr
                    // ID有轉換字眼需進行轉換，取出轉換規則

                    // ruleAttr = $(this).attr(msk.common.TAX_TRANSFORM);
                    jsonId = $(this).attr('id').replace(word, '');
                    // if (!isUndefined(ruleAttr)) {
                    //     rules = ruleAttr.split('.');
                    //     if (rules.length > 0) {
                    //         if (!isUndefined(msk.transform.saveRules[rules[0]])) {
                    //             msk.fn.transform.saveRules[rules[0]](
                    //                 $(this), jsonData, jsonId,
                    //                 rules);
                    //             return;
                    //         }
                    //     }
                    // }
                    if (!isUndefined(jsonData[jsonId])) {
                        // if($(this).prop("tagName")=="FONT"){
                        // return ;
                        // }else{
                        jsonData[jsonId] = $(this).val() == null ? ""
                            : $(this).val();
                        // }
                        var type = $(this).attr('type');
                        if (type == 'checkbox') {
                            jsonData[jsonId] = $(this).prop('checked') ? 1 : 0;
                        }
                    }
                });
    }

    //檢核是否非全半形數字
    function vaildTxt(val){
        var res = /^[^a-zA-Z0-9]*$/;
        var resEng = /^[^ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ]*$/;
        var resEngs = /^[^ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ]*$/;
        var resNum = /^[^１２３４５６７８９０]*$/;
        var at = /^[^\!\@\#\$\%\^\&\*\(\)\_\+\<\>\?\,\！\＠\＃\＄\％\-\\\/\{\}\[\]\~\︿\＆\＊\（\）\＿\＋\＜\＞\？\，\－\／\｛\｝\～]*$/;
        var at2 = /^[\S]*$/;

        return res.test(val) && resEng.test(val) && resEngs.test(val) && resNum.test(val) && at.test(val) && at2.test(val);
    }

    function isEmail(email){
        // var filter = /^([a-zA-Z0-9_\-])+([\.\w\-])*@(([a-zA-Z0-9_\-])+\.)+([a-zA-Z0-9]{2,3})+$/;
        var filter = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        if(!filter.test(email)){
            console.log(email);
            return false;
        }
        return true;
    }

    function checkId(TId)
    {
        var Id  =   TId.value.charAt(0).toUpperCase();
        var Falg = "";
        if(TId.value.length != 10)
        {
            alert('身分證統一編號必須為10位英數字');
            TId.focus();
            return false;
        }
        if(Id.match('[^A-Z]')) {
            alert('身分證第一個字母必須為英文字母');
            TId.focus();
            return false;
        }
        /*if (Id < 'A' || Id > 'Z')
        {
            alert('身分證第一個字母必須為英文字母');
            TId.focus();
            return false;
        }
    */
        if (parseInt(TId.value.charAt(1))!='1' && parseInt(TId.value.charAt(1))!='2')
        {
            alert('身分證第二碼請輸入1或2');
            TId.focus();
            return false;
        }

        var val = new Array(11);

        for ( i=1; i<=9; i++)
            val[i+1] = parseInt(TId.value.charAt(i));


        if (Id=='A'){
            val[0]=1;
            val[1]=0;
        }else if (Id=='B'){
            val[0]=1;
            val[1]=1;
        }else if (Id=='C'){
            val[0]=1;
            val[1]=2;
        }else if (Id=='D'){
            val[0]=1;
            val[1]=3;
        }else if (Id=='E'){
            val[0]=1;
            val[1]=4;
        }else if (Id=='F'){
            val[0]=1;
            val[1]=5;
        }else if (Id=='G'){
            val[0]=1;
            val[1]=6;
        }else if (Id=='H'){
            val[0]=1;
            val[1]=7;
        }else if (Id=='I'){
            val[0]=3;
            val[1]=4;
        }else if (Id=='J'){
            val[0]=1;
            val[1]=8;
        }else if (Id=='K'){
            val[0]=1;
            val[1]=9;
        }else if (Id=='L'){
            val[0]=2;
            val[1]=0;
        }else if (Id=='M'){
            val[0]=2;
            val[1]=1;
        }else if (Id=='N'){
            val[0]=2;
            val[1]=2;
        }else if (Id=='O'){
            val[0]=3;
            val[1]=5;
        }else if (Id=='P'){
            val[0]=2;
            val[1]=3;
        }else if (Id=='Q'){
            val[0]=2;
            val[1]=4;
        }else if (Id=='R'){
            val[0]=2;
            val[1]=5;
        }else if (Id=='S'){
            val[0]=2;
            val[1]=6;
        }else if (Id=='T'){
            val[0]=2;
            val[1]=7;
        }else if (Id=='U'){
            val[0]=2;
            val[1]=8;
        }else if (Id=='V'){
            val[0]=2;
            val[1]=9;
        }else if (Id=='W'){
            val[0]=3;
            val[1]=2;
        }else if (Id=='X'){
            val[0]=3;
            val[1]=0;
        }else if (Id=='Y'){
            val[0]=3;
            val[1]=1;
        }else if (Id=='Z'){
            val[0]=3;
            val[1]=3;
        }

        var check = 0;
        check = (val[1]*9+val[0])%10;
        for( i=2; i<=9; i++)
            check += val[i] * (10-i);

        var remainder = check % 10;
        remainder = remainder + val[10];
        if ( (remainder % 10)  == 0)
        {
            return true;
        }
        else
        {
            agree = confirm("你輸入之身分證統一編號不正確，是否要繼續？");
            if(!agree)
            {
                TId.focus();
                return false;
            }else{
                return true;
            }
        }
    }
})(msk);
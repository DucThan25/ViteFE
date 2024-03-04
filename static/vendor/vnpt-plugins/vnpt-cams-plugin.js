/************************************************************************/
/*                      VNPT-CAMS PLUGIN                                */
/************************************************************************/
cams_plugin_functionId = {
    signCms         : 0,
    signHash        : 1,
    setLicenseKey   : 2,
    checkPlugin     : 3,
    getVersion      : 4,
    getTokenInfo    : 5,
    getCertInfo     : 6,
    initToken       : 7,
    unlockToken     : 8,
    generateKey     : 9,
    importCert      : 10,
    generateCsrWithExistKey : 11,
    generateCsrWithNewKey: 12,
    changePIN       :  13,
    checkLoginToken : 14,
	signXml			: 15
};

var camsPluginPort = 3883;
var camsWebSocket;
var camsCheckPluginCallback;
var camsTimeOut = 3000;
var camsCheckPluginCall = -1; // -1 - chưa call, 1 - da call
var camsPluginStatus = 0; // -1: failed, 0: chưa check, 1: đã check
var camsCheckPluginRejectCallback;

function functionName(fun) {
    var ret = fun.toString();
    ret = ret.substr('function '.length);
    ret = ret.substr(0, ret.indexOf('('));
    return ret;
}
function getLastError(data) {
    console.log(data);
}
function get_browser() {
    var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return { name: 'IE', version: (tem[1] || '') };
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) {
            //return tem.slice(1).join(' ').replace('OPR', 'Opera');
            return {
                name: tem.slice(1)[0].replace('OPR', 'Opera'),
                version: tem.slice(1)[1]
            };
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    //return M.join(' ');
    return {
        name: M[0],
        version: M[1]
    };
};
function getOsName() {
    var OSName = "Unknown";
    if (window.navigator.userAgent.indexOf("Windows NT 10.0") != -1) OSName = "Windows 10";
    if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSName = "Windows 8";
    if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSName = "Windows 7";
    if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OSName = "Windows Vista";
    if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OSName = "Windows XP";
    if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OSName = "Windows 2000";
    if (window.navigator.userAgent.indexOf("Mac") != -1) OSName = "MAC";
    if (window.navigator.userAgent.indexOf("X11") != -1) OSName = "UNIX";
    if (window.navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux";
    return OSName;
}
function getCallbackFuntion(funcCallback) {
    if (funcCallback != null) {
        if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true))
            return funcCallback.toString().match(/^function\s*([^\s(]+)/)[1];
        else
            return funcCallback.name;
    }
    else {
        return "callbackDefault";
    }

}

// for IE
var iePlugin;
function VnptInternetExplorerCallback(result) {
    var resSplit = result.split("*");
    // check plugin
    if (camsCheckPluginCall === 1) {
        camsCheckPluginCall = -1;
        if (resSplit[0] === "1") {
            camsTimeOut = 5000;
        }
    }
    //window[resSplit[1]](resSplit[0]);
    if (resSplit[0].indexOf(returnPluginSignal) !== -1) // check plugin advanced
    {
        var sigHex = resSplit[0].substr(returnPluginSignal.length, resSplit[0].length - returnPluginSignal.length);
        var validateRes = doVerify(pluginSignal, sigHex);
        if (validateRes) {
            window[resSplit[1]]("1");
        }
        else {
            window[resSplit[1]]("-1");
        }
    }
    else {
        window[resSplit[1]](resSplit[0]);
    }
}
var init = 0;
//var defaultPort = 0;
var vnpt_cams_plugin = {
    connect: function (port, data) {
        if (get_browser().name === "IE" || get_browser().name === "MSIE") {
            if (navigator.userAgent.indexOf("Windows NT 10.0") !== -1) {
                if (camsWebSocket == null || camsPluginStatus != 1) {
                    camsWebSocket = new WebSocket("wss://localhost:" + port + "/plugin");
                }
                else {
                    // do something when connected
                    camsWebSocket.send(data);
                }

                // opened
                camsWebSocket.onopen = function () {
                    camsPluginStatus = 1;
                    camsWebSocket.send(data);
                }
                // closed
                camsWebSocket.onclose = function () {
                    camsPluginStatus = 0;
                }
                // message
                camsWebSocket.onmessage = function (message) {
                    // handle data	     
                    var result = message.data;
                    var resSplit = result.split("*");
                    // check plugin
                    if (camsCheckPluginCall === 1) {
                        camsCheckPluginCall = -1;
                        if (resSplit[0] === "1") {
                            camsTimeOut = 5000;
                        }
                    }
                    window[resSplit[1]](resSplit[0]);
                }
                // error
                camsWebSocket.onerror = function () {
                    camsPluginStatus = 0;
                }

            }
            else {
                //console.log("For IE < 11");
                try {
                    iePlugin = new ActiveXObject("CAMSIEModule.Main");
                    var pluginEvents = iePlugin.PluginEvents();
                    pluginEvents.ScriptCallbackObject = VnptInternetExplorerCallback;
                    iePlugin.Execute(data);
                }
                catch (Err) {
                    //console.log(Err.description);
                    var obj = JSON.parse(data);
                    if (obj.functionID === 7) {
                        //VnptInternetExplorerCallback("-1");
                        window[obj.funcCallback]("-1");
                    }
                }
            }
        }
        else {
            return new Promise(function (success, reject) {
                camsCheckPluginRejectCallback = success;
                if (camsWebSocket == null || camsPluginStatus != 1) {
                    camsWebSocket = new WebSocket("wss://localhost:" + port + "/plugin");
                }
                else {
                    // do something when connected
                    camsWebSocket.send(data);
                }
                // opened
                camsWebSocket.onopen = function () {
                    camsPluginStatus = 1;
                    camsWebSocket.send(data);
                }
                // closed
                camsWebSocket.onclose = function () {
                    camsPluginStatus = 0;
                }
                // message
                camsWebSocket.onmessage = function (message) {
                    // handle data	     
                    var result = message.data;
                    var resSplit = result.split("*");
                    // check plugin
                    if (camsCheckPluginCall === 1) {
                        camsCheckPluginCall = -1;
                        if (resSplit[0] === "1") {
                            camsTimeOut = 5000;
                        }
                    }
                    // return
                    if (resSplit[1] === "callbackDefault") {
                        success(resSplit[0]);
                    }
                    else {
                        window[resSplit[1]](resSplit[0]);
                    }
                }
                // error
                camsWebSocket.onerror = function () {
                    //console.log("Error");
                    camsPluginStatus = 0;
                    //reject("Catch Error");
                    if (camsCheckPluginCallback == null) {
                        reject("-1");
                    }
                    else {
                        camsCheckPluginCallback("-1");
                    }
                }
            });
        }
    },
    sendMessageToPlugin: function (data) {
        data.domain = window.location.hostname;
        if (data.domain === "") {
            data.domain = window.location.href;
        }
        var jsData = "";
        jsData += JSON.stringify(data);
        return this.connect(camsPluginPort, jsData);
    },
    ///
    setLicenseKey: function (license, funcCallback) {
        var args = [
            license
        ];
        //
        var callInfo = {};
        callInfo.functionID = cams_plugin_functionId.setLicenseKey;
        callInfo.funcCallback = getCallbackFuntion(funcCallback);
        callInfo.args = args;
        //
        return this.sendMessageToPlugin(callInfo);
    },
    checkPlugin: function (funcCallback) {
        camsCheckPluginCallback = funcCallback;
        camsCheckPluginCall = 1;
        camsTimeOut = 3000;
        var args = [
            ""
        ];
        //
        var callInfo = {};
        callInfo.functionID = cams_plugin_functionId.checkPlugin;
        callInfo.funcCallback = getCallbackFuntion(funcCallback);
        callInfo.args = args;
        //
        return this.sendMessageToPlugin(callInfo);
    },
    getVersion: function (funcCallback) {
        camsCheckPluginCallback = funcCallback;
        var callInfo = {};
        var args = [
            ""
        ];
        //
        callInfo.functionID = cams_plugin_functionId.GetVersion;
        callInfo.funcCallback = getCallbackFuntion(funcCallback);
        callInfo.args = args;
        //
        return this.sendMessageToPlugin(callInfo);
    },
    checkBrowser: function () {
        var browser = get_browser();
        switch (browser.name.toLowerCase()) {
            case "chrome":
                if (browser.version > 52) {
                    return true;
                }
            case "firefox":
                if (browser.version > 49) {
                    return true;
                }
            case "opera":
                if (browser.version > 26) {
                    return true;
                }
            case "edge":
                if (browser.version > 15) {
                    return true;
                }
            case "ie":
                if (browser.version > 6) {
                    return true;
                }
            case "msie":
                if (browser.version > 6) {
                    return true;
                }
            case "safari":
                if (browser.version > 10) {
                    return true;
                }
            default:
                console.log("Browser not supported yet");
                return false;
        }
    },
    ///
    getTokenInfo: function (dll_list, funcCallback) {
        var args = [
            dll_list
        ];
        //
        var callInfo = {};
        callInfo.functionID = cams_plugin_functionId.getTokenInfo;
        callInfo.funcCallback = getCallbackFuntion(funcCallback);
        callInfo.args = args;
        //
        return this.sendMessageToPlugin(callInfo);
    },
    getCertInfo: function (dllName, tokenSerial, funcCallback) {
        var args = [
            dllName,
            tokenSerial
        ];
        //
        var callInfo = {};
        callInfo.functionID = cams_plugin_functionId.getCertInfo;
        callInfo.funcCallback = getCallbackFuntion(funcCallback);
        callInfo.args = args;
        //
        return this.sendMessageToPlugin(callInfo);
    },
    generateKey: function (keyLength, dllName, serialNumber, funcCallback) {
        var args = [
            keyLength,
            dllName,
            serialNumber
        ];
        //
        var callInfo = {};
        callInfo.functionID = cams_plugin_functionId.generateKey;
        callInfo.funcCallback = getCallbackFuntion(funcCallback);
        callInfo.args = args;
        //
        return this.sendMessageToPlugin(callInfo);
    },
    generateCsrWithNewKey: function (keyLength, dllName, serialNumber, funcCallback) {
        var args = [
            keyLength,
            dllName,
            serialNumber
        ];
        //
        var callInfo = {};
        callInfo.functionID = cams_plugin_functionId.generateCsrWithNewKey;
        callInfo.funcCallback = getCallbackFuntion(funcCallback);
        callInfo.args = args;
        //
        return this.sendMessageToPlugin(callInfo);
    },
    generateCsrWithExistKey: function (dll_list, certBase64, funcCallback) {
        var args = [
            dll_list,
            certBase64
        ];
        //
        var callInfo = {};
        callInfo.functionID = cams_plugin_functionId.generateCsrWithExistKey;
        callInfo.funcCallback = getCallbackFuntion(funcCallback);
        callInfo.args = args;
        //
        return this.sendMessageToPlugin(callInfo);
    },

    importCert: function (dllName, tkSerialNumber, cert, destroyOldCert, funcCallback) {
        var args = [
            dllName,
            tkSerialNumber,
            cert,
            destroyOldCert
        ];
        //
        var callInfo = {};
        callInfo.functionID = cams_plugin_functionId.importCert;
        callInfo.funcCallback = getCallbackFuntion(funcCallback);
        callInfo.args = args;
        //
        return this.sendMessageToPlugin(callInfo);
    },
    initToken: function (dllName, tkSerialNumber, soPIN, userPIN, funcCallback) {
        var args = [
            dllName,
            tkSerialNumber,
            soPIN,
            userPIN
        ];
        //
        var callInfo = {};
        callInfo.functionID = cams_plugin_functionId.initToken;
        callInfo.funcCallback = getCallbackFuntion(funcCallback);
        callInfo.args = args;
        //
        return this.sendMessageToPlugin(callInfo);
    },
    unlockToken: function (dllName, tkSerialNumber, soPIN, userPIN, funcCallback) {
        var args = [
            dllName,
            tkSerialNumber,
            soPIN,
            userPIN
        ];
        //
        var callInfo = {};
        callInfo.functionID = cams_plugin_functionId.unlockToken;
        callInfo.funcCallback = getCallbackFuntion(funcCallback);
        callInfo.args = args;
        //
        return this.sendMessageToPlugin(callInfo);
    },
    signCms: function (data, certBase64, funcCallback) {
        var args = [
            data,
            certBase64
        ];
        //
        var callInfo = {};
        callInfo.functionID = cams_plugin_functionId.signCms;
        callInfo.funcCallback = getCallbackFuntion(funcCallback);
        callInfo.args = args;
        //
        return this.sendMessageToPlugin(callInfo);
    },
    // 0: SO PIN, 1: USER PIN
    changePIN: function (dllName, tokenSerial, oldPIN, newPIN, pinType, funcCallback) {
        var callInfo = {};
        callInfo.functionID = cams_plugin_functionId.changePIN;

        if (funcCallback) {
            if ((navigator.userAgent.indexOf("MSIE") !== -1) || (!!document.documentMode === true))
                callInfo.funcCallback = funcCallback.toString().match(/^function\s*([^\s(]+)/)[1];
            else
                callInfo.funcCallback = funcCallback.name;
        }
        else {
            callInfo.funcCallback = "callbackDefault";
        }

        var args = [
            dllName,
            tokenSerial,
            oldPIN,
            newPIN,
            pinType
        ];
        callInfo.args = args;
        return this.sendMessageToPlugin(callInfo);
    },
    checkLoginToken: function (dllName, tokenSerial, pin, pinType, funcCallback) {
        var callInfo = {};
        callInfo.functionID = cams_plugin_functionId.checkLoginToken;

        if (funcCallback) {
            if ((navigator.userAgent.indexOf("MSIE") !== -1) || (!!document.documentMode === true))
                callInfo.funcCallback = funcCallback.toString().match(/^function\s*([^\s(]+)/)[1];
            else
                callInfo.funcCallback = funcCallback.name;
        }
        else {
            callInfo.funcCallback = "callbackDefault";
        }

        var args = [
            dllName,
            tokenSerial,
            pin,
            pinType
        ];
        callInfo.args = args;
        return this.sendMessageToPlugin(callInfo);
    },
	signXml: function (dllName, pin, certBase64, data, funcCallback) {
        var args = [
			dllName,
			pin,
			certBase64,
            data
        ];
        //
        var callInfo = {};
        callInfo.functionID = cams_plugin_functionId.signXml;
        callInfo.funcCallback = getCallbackFuntion(funcCallback);
        callInfo.args = args;
        //
        return this.sendMessageToPlugin(callInfo);
    },
};



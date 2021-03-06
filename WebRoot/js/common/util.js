//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

//清除cookie
function clearCookie(name) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = name + "= " + "; expires=" + date.toUTCString();

}

function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function redirectIndexPage() {
    window.location.href = '/home/index.html';
}

function redirectAdminIndexPage() {
    window.location.href = '/admin/admin.html';
}

function zajax(conf) {
    // 初始化 
    var url = conf.url;
    var type = conf.type;
    type = (type == null || type == "" || typeof(type) == "undefined") ? "post" : type;
    var async = conf.async;
    async = (async == null || typeof(async) == "undefined") ? "true" : async;
    var data = conf.data;
    data = (data == null || data == "" || typeof(data) == "undefined") ? {
        "date": {}
    } : data;
    var successfn = conf.success;
    var errorfn = conf.error;
    //发送ajax请求
    $.ajax({
        url: url,
        type: type,
        async: async,
        data: data,
        dataType: "json",
        success: function(d) {
            successfn(d);
        },
        error: function(e) {
            errorfn(e);
        }
    });
}


function getAllApps() {
    var appsArr = [];
    zajax({
        url: "findAllApplications.action",
        type: "post",
        async: false,
        success: function(data) {
            appsArr = data.apps
        },
        error: function(data) {
            console.log(data.retMSG);
        }
    });
    return appsArr;
}

function getAllDepartments() {
    var depsArr = [];
    zajax({
        url: "listDepartments.action",
        type: "post",
        async: false,
        success: function(data) {
            depsArr = data.deps
        },
        error: function(data) {
            console.log(data.retMSG);
        }
    });
    return depsArr;
}

function getAllEnvs() {
    var envsArr = [];
    zajax({
        url: "listEnvs.action",
        type: "post",
        async: false,
        success: function(data) {
            envsArr = data.envs;
        },
        error: function(data) {
            alert(data.retMSG);
        }
    })
    return envsArr;
}


function getAllAppType() {
    var appTypes = [];
    zajax({
        type: "post",
        url: "listApplicationTypes.action",
        async: false,
        success: function(data) {
            appTypes = data.apptypes;
        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
    return appTypes;
}


function isTesterFunc() {
    var isTester;
    if (getCookie("token").length < 3) {
        isTester = false;
        return isTester;
    };
    zajax({
        url: "verifyAuthorization.action",
        type: "post",
        data: {
            "id": getCookie("userid"),
            "permissionvalue": 2
        },
        async: false,
        success: function(data) {
            if (data.retCode == "1000") {
                isTester = true;
            } else {
                isTester = false;
            }
        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
    return isTester;
}


function getAllVMS() {
    var vms = []
    zajax({
        type: "post",
        url: "listVmInfos.action",
        async: false,
        success: function(data) {
            vms = data.vms;
        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
    return vms;
}


function getAllServers() {
    var servers = []
    zajax({
        type: "post",
        url: "listServerInfos.action",
        async: false,
        success: function(data) {
            servers = data.serverinfos;
        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
    return servers;
}



function getAllPositions() {
    var positionsArr = [];
    zajax({
        type: "post",
        url: "listPositions.action",
        async: false,
        success: function(data) {
            if (data.retCode == "1000") {
                positionsArr = data.poss;
            } else {
                alert(data.retMSG);
            }
        },
        error: function(data) {
            alert(data.retMSG);
        }
    });
    return positionsArr;
}


function ops(opid) {
    var userAuth = false;
    zajax({
        type: "post",
        url: "verifyAuthorization.action",
        async: false,
        data: {
            "id": getCookie("userid"),
            "permissionvalue": opid
        },
        success: function(data) {
            if (data.retCode == "1000") {
                userAuth = true;
            } else {
                userAuth = false;
            }
        },
        error: function(data) {
            userAuth = false;
        }
    });
    return userAuth;
}

function compareDate(a, b) {
    var aArr = a.split("-");
    var starttime = new Date(aArr[0], aArr[1], aArr[2]);
    var starttimes = starttime.getTime();

    var bArr = b.split("-");
    var endtime = new Date(bArr[0], bArr[1], bArr[2]);
    var endtimes = endtime.getTime();

    if (starttimes > endtimes) {
        return false;
    } else
        return true;
}


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

function zajax(conf) {
    // 初始化 
    var url = conf.url;
    var type = conf.type;
    type = (type == null || type == "" || typeof(type) == "undefined") ? "post" : type;
    var async = conf.async;
    async = (async == null || typeof(async) == "undefined") ? "true" : async;
    var data = conf.data;
    data = (data == null || data == "" || typeof(data) == "undefined") ? {
        "date": new Date().getTime()
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
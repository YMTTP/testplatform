/**
 * Created by chenjiazhu on 2016/12/1.
 */
var monitordetails = avalon.define({
    $id: 'monitordetails',
    mtid: getUrlVars()["mtid"],
    updateMTInfoOff: true,
    updateMTInfoOn: false,
    
    mtDesc: "",
    mtCreater: "",
    mtTime: "",
   
    loadMTInfo: function() {
        zajax({
            type: "post",
            url: "findMonitorTaskById.action",
            data: {
                "taskId": monitordetails.mtid
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    monitordetails.mtDesc = data.monitortask.desc;
                    monitordetails.mtCreater = data.monitortask.creator.displayname;
                    monitordetails.mtTime = data.monitortask.time;
                     
                } else {
                    alert(data.retMSG);       
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
  
    updateMTbasicInfo: function() {
        monitordetails.updateMTInfoOff = false;
        monitordetails.updateMTInfoOn = true;
        $('.chosen-select option[value=' + monitordetails.stAppId + ']').attr("selected", "selected");
        $(".chosen-select").trigger("chosen:updated");
        monitordetails.listAppEnvs(monitordetails.stAppId);
    },
    cancleMTbasicInfo: function() {
        monitordetails.loadMTInfo();
        monitordetails.updateMTInfoOff = true;
        monitordetails.updateMTInfoOn = false;
    },
    saveMTbasicInfo: function() {
        if (monitordetails.mtDesc=="") {
            alert("描述不能为空");
            return;
        }
        zajax({
            type: "post",
            url: "updateMonitorTask.action",
            data: {
                "taskId": monitordetails.mtid,
                "desc": monitordetails.mtDesc,          
            },
            success: function(data) {
                if (data.retCode == "1000") {
                    alert(data.retMSG);
                    monitordetails.loadMTInfo();
                    monitordetails.updateMTInfoOff = true;
                    monitordetails.updateMTInfoOn = false;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        });
    },
   
    isTester: false,
    isTesterFunc: function () {
        if (model.getCookie("token").length < 3) {
            monitordetails.isTester = false;
            return;
        };
        $.ajax({
            type: "post",
            url: 'verifyAuthorization.action',
            data: {
                "id": model.getCookie("userid"),
                "permissionvalue": 2
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    monitordetails.isTester = true;
                }
                else {
                    monitordetails.isTester = false;
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    monitorConfigList: [],
    monitorVmInfos: [],
    
    monitorConfigId:"",
    monitorVmId:0,
    monitorVmIp:"",
    monitorVmName:"",
    monitorIsActive:"",
    monitorComment:"",
    
    monitorLast:"",
    itemComment:"",
    
    addMTCBTN:false,
    updateMTCBTN:false,
 
    listMonitorConfig: function () {    	
        $.ajax({
            type: "post",
            url: 'findMonitorConfigListByTaskId.action',
            data: {
                "taskId": monitordetails.mtid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    monitordetails.monitorConfigList = data.MonitorConfigs;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    
    loadVmList: function () {
        $.ajax({
            type: "post",
            url: 'listVmInfos.action',
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    var temArr = [];
                    temArr = data.vms;
                    monitordetails.monitorVmInfos = temArr;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    
    loadaddMTCModal: function (id) {
    	//monitordetails.loadVmList();
        if (id == "0") {
            monitordetails.monitorVmIp = monitordetails.monitorIsActive = monitordetails.monitorComment = "";
            monitordetails.addMTCBTN = true;
            monitordetails.updateMTCBTN = false;
        }
        else {
        	monitordetails.monitorConfigId=id;
            monitordetails.loadMTMonitorConfigById(id);
            monitordetails.addMTCBTN = false;
            monitordetails.updateMTCBTN = true;
        }
        $('#addMTCModal').modal('show');
    },
    
    loadMTMonitorConfigById: function (id) {
        $.ajax({
            type: "post",
            url: 'findMonitorConfigById.action',
            data: {
                "configId": id
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    monitordetails.monitorConfigId = data.MonitorConfig.id;
                    monitordetails.monitorVmId = data.MonitorConfig.vm.id;
                    monitordetails.monitorVmIp = data.MonitorConfig.vm.ip;
                    monitordetails.monitorVmName = data.MonitorConfig.vm.name;
                    monitordetails.monitorIsActive = data.MonitorConfig.isActive;
                    monitordetails.monitorComment = data.MonitorConfig.comment;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    
    createMTMonitorConfig: function () {
        if (monitordetails.mtid == "") {
            alert("taskId不能为空");
            return;
        }
        if (monitordetails.monitorVmIp == "") {
            alert("机器不能为空");
            return;
        }
        $.ajax({
            type: "post",
            url: 'createMonitorConfig.action',
            data: {
                "taskId": monitordetails.mtid,
                "vmIp": monitordetails.monitorVmIp,
                "isActive": monitordetails.monitorIsActive,
                "configComment": monitordetails.monitorComment
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    monitordetails.listMonitorConfig();
                    $('#addMTCModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    
    updateMTMonitorConfig: function (id) {
        if (monitordetails.mtid == "") {
            alert("taskId不能为空");
            return;
        }
        if (monitordetails.monitorVmIp == "") {
            alert("机器不能为空");
            return;
        }
        $.ajax({
            type: "post",
            url: 'updateMonitorConfig.action',
            data: {
            	"configId":monitordetails.monitorConfigId,
                "taskId": monitordetails.mtid,
                "vmIp": monitordetails.monitorVmIp,
                "isActive": monitordetails.monitorIsActive,
                "configComment": monitordetails.monitorComment
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    monitordetails.listMonitorConfig();
                    $('#addMTCModal').modal('hide');
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    
    loadStartMonitorModal: function () {
        $('#startMonitorModal').modal('show');
    },
    

	currentMonitorItemId:"",
    configItemList:[],
    configItemId:"",
    configItemComment:"",
    configItemStartTime:"",
    configItemEndTime:"",
    
    startMonitorBTN:false,
    endMonitorBTN:false,
    
    listMonitorItem: function () {
    	
    	monitordetails.getCurrentMonitorItem();
    	
        $.ajax({
            type: "post",
            url: 'findMonitorItemByTaskId.action',
            data: {
                "taskId": monitordetails.mtid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                    monitordetails.configItemList = data.items;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    
    getCurrentMonitorItem: function () {
        $.ajax({
            type: "post",
            url: 'getCurrentMonitorItem.action',
            data: {
                "taskId": monitordetails.mtid
            },
            dataType: "json",
            success: function (data) {
                if (data.retCode == "1000") {
                	monitordetails.currentMonitorItemId=data.id;
                	if(data.id==0)
                		{
                			monitordetails.startMonitorBTN=true;
                			monitordetails.endMonitorBTN=false;                			
                		}
                	else
                		{
                		monitordetails.startMonitorBTN=false;
            			monitordetails.endMonitorBTN=true;
                		}
                    
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (data) {
                alert(data.retMSG);
            }
        });
    },
    
    startMonitor:function(){
		 $.ajax({
	            type: "post",
	            url: 'startMonitor.action',
	            data: {
	                "taskId": monitordetails.mtid,
	                "last": monitordetails.monitorLast,
	                "itemComment": monitordetails.itemComment
	            },
	            dataType: "json",
	            success: function (data) {
	                if (data.retCode == "1000") {
	                	var itemId = data.itemId;
	                	
	                	monitordetails.listMonitorItem();
	                    $('#startMonitorModal').modal('hide');
	                    
	                    monitordetails.endMonitorBTN=true;
	                    monitordetails.startMonitorBTN=false;
	                    
	                	monitordetails.postStartMonitor(itemId);
	                	
	                } else {
	                    alert(data.retMSG);
	                }
	            },
	            error: function (data) {
	                alert(data.retMSG);
	            }
	        });
	},
	
	postStartMonitor:function (itemId) {
		for(var i=0;i<monitordetails.monitorConfigList.length;i++)
		{
		var element = monitordetails.monitorConfigList[i];
		if(element.isActive==true)
		{
		$.ajax({
			//contenType: "application/x-www-form-urlencoded",
            type: "GET",
            dataType : 'jsonp',  
            jsonp:"jsoncallback",  
            url: 'http://'+element.vm.ip+':8034/Monitor/StartMonitorMachine',
//            url: 'http://localhost:58949/Monitor/StartMonitorMachine',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Access-Control-Allow-Origin","*");
            },
            data: {
                "configId": monitordetails.monitorConfigList[i].id,
                "itemId": itemId,
                //"startTime": new Date().toLocaleString(),
                "startTime": monitordetails.currentTime(),
                "lastTime": monitordetails.monitorLast,
                //"ReCallUrl": window.location.host
                "ReCallUrl": "http://better.ymatou.com/",
                "ip":element.vm.ip
            },
            success: function (data) {
                if (data.Data == "0") {
//                	alert("向服务器发送启动监控指令成功。");
                } else {
                    alert("向服务器发送监控指令失败。"+data.Message);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("请求数据异常，状态码：" + XMLHttpRequest.status+",Error:"+errorThrown+",textStatus:"+textStatus);
            }
        });
		
		}

		}
	},
	
	postStopMonitor:function () {
		for(var i=0;i<monitordetails.monitorConfigList.length;i++)
		{
		var element = monitordetails.monitorConfigList[i];
		if(element.isActive==true)
		{
		
		$.ajax({
			//contenType: "application/x-www-form-urlencoded",
            type: "GET",
            dataType : 'jsonp',  
            jsonp:"jsoncallback",  
            url: 'http://'+element.vm.ip+':8034/Monitor/StopMonitorMachine',
//            url: 'http://localhost:58949/Monitor/StopMonitorMachine',
//            beforeSend: function (xhr) {
//                xhr.setRequestHeader("Access-Control-Allow-Origin","*");
//            },

            success: function (data) {
                if (data.Data == "0") {
//                	 alert("向服务器发送停止监控指令成功。");
                } else {
                    alert("向服务器发送停止监控指令失败。"+data.Message);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("请求数据异常，状态码：" + XMLHttpRequest.status+ ",<br/>"+XMLHttpRequest.readyState+  ",<br/>"+XMLHttpRequest.responseText+",<br/>Error:"+errorThrown+",<br/>textStatus:"+textStatus);
            }
        });
		
		}

		}
	},
	currentTime:function()	{
		var d = new Date(),str = '';
		 str += d.getFullYear()+'-';
		 str  += d.getMonth() + 1+'-';
		 str  += d.getDate()+' ';
		 str += d.getHours()+':'; 
		 str  += d.getMinutes()+':'; 
		str+= d.getSeconds(); 
		return str;
	},
	stopMonitor:function () {
	if(confirm("是否确认停止监控！"))
		{
	  $.ajax({
          type: "post",
          url: 'stopMonitor.action',
          data: {
              "currentItemId": monitordetails.currentMonitorItemId
          },
          dataType: "json",
          success: function (data) {
              if (data.retCode == "1000") {
                  monitordetails.listMonitorItem();
                  
                  monitordetails.endMonitorBTN=false;
                  monitordetails.startMonitorBTN=true;
                  
                  monitordetails.postStopMonitor();
              } else {
                  alert(data.retMSG);
              }
          },
          error: function (data) {
              alert(data.retMSG);
          }
      });
		}
},

stressTaskNames:[],
stressTaskId:"",

showRelateStressTaskModal:function (id) {
	monitordetails.currentMonitorItemId=id;
	$('#relateStressTaskModal').modal('show');
	
	 $.ajax({
         type: "post",
         url: 'listStressTasks.action',        
         dataType: "json",
         success: function (data) {
             if (data.retCode == "1000") {
            	 
            	 monitordetails.stressTaskNames=data.stressTaskNames;            	 
             } else {
                 alert(data.retMSG);
             }
         },
         error: function (data) {
             alert(data.retMSG);
         }
     });
},

relateStress:function () {
	monitordetails.currentMonitorItemId=id;
	 $.ajax({
         type: "post",
         url: 'createMonitorRelation.action',  
         data: {
             "stressTaskId": monitordetails.stressTaskId,
             "itemId": monitordetails.currentMonitorItemId
         },
         dataType: "json",
         success: function (data) {
             if (data.retCode == "1000") {
            	 $('#showMonitorInfoModal').modal('hide');    
            	 alert("关联成功！");
             } else {
                 alert(data.retMSG);
             }
         },
         error: function (data) {
             alert(data.retMSG);
         }
     });
},

configStrs:[],

times:[],
cpus:[],
memorys:[],
dReads:[],
dWrites:[],
nReceives:[],
nSends:[],

viewMonitorItem:function (id) {
	monitordetails.currentMonitorItemId=id;
	 $.ajax({
         type: "post",
         url: 'getMonitorInfo.action',
         data: {
        	 "taskId": monitordetails.mtid,
             "itemId": id
         },
         dataType: "json",
         success: function (data) {
             if (data.retCode == "1000") {
            	 $('#showMonitorInfoModal').modal('show');
            	 monitordetails.configStrs=data.configStrs;
            	 
            	 monitordetails.times=data.times;
            	 monitordetails.cpus=data.cpus;
            	 monitordetails.memorys=data.memorys;
            	 monitordetails.dReads=data.dReads;
            	 monitordetails.dWrites=data.dWrites;
            	 monitordetails.nReceives=data.nReceives;
            	 monitordetails.nSends=data.nSends;            	 

        		 monitordetails.showMonitorItem(0);
             } else {
                 alert(data.retMSG);
             }
         },
         error: function (data) {
             alert(data.retMSG);
         }
     });
},
showMonitorItem:function (index) {
	$.oneinfochart($(".chartdiv1"), "CPU占用率(%)", "CPU", "%",monitordetails.times[index], monitordetails.cpus[index]);
    $.oneinfochart($(".chartdiv2"), "内存使用情况(MB)", "Memory", "MB",monitordetails.times[index], monitordetails.memorys[index]);
    $.twoinfochart($(".chartdiv3"), "磁盘IO（KB/s）", "Disk（I/O）Read","Disk（I/O）Write", "（KB/s）",monitordetails.times[index], monitordetails.dReads[index], monitordetails.dWrites[index]);
    $.twoinfochart($(".chartdiv4"), "网络IO（KB/s)", "Network（I/O）Receive", "Network（I/O）Write", "（KB/s）", monitordetails.times[index], monitordetails.nReceives[index], monitordetails.nSends[index]);
},

refreshMonitorInfo:function () {
	
	 $.ajax({
        type: "post",
        url: 'getMonitorInfo.action',
        data: {
       	 "taskId": monitordetails.mtid,
            "itemId": monitordetails.currentMonitorItemId
        },
        dataType: "json",
        success: function (data) {
            if (data.retCode == "1000") {
           	 monitordetails.configStrs=data.configStrs;
           	 
           	 monitordetails.times=data.times;
           	 monitordetails.cpus=data.cpus;
           	 monitordetails.memorys=data.memorys;
           	 monitordetails.dReads=data.dReads;
           	 monitordetails.dWrites=data.dWrites;
           	 monitordetails.nReceives=data.nReceives;
           	 monitordetails.nSends=data.nSends;
           	 

       		 monitordetails.showMonitorItem(0);

            } else {
                alert(data.retMSG);
            }
        },
        error: function (data) {
            alert(data.retMSG);
        }
    });
}

});

avalon.ready(function() {
    $(".chosen-select").chosen({
        no_results_text: "没有找到",
        allow_single_deselect: true,
        width: "300px"
    });
    monitordetails.isTester = isTesterFunc();
    monitordetails.appList = getAllApps();
    monitordetails.loadMTInfo();
    monitordetails.listMonitorConfig();
    monitordetails.listMonitorItem();
    $(".chosen-select").chosen().change(function () {
        monitordetails.stAppId = this.value;
        monitordetails.listAppEnvs(monitordetails.stAppId);
    });
    
    $("#stresstask").chosen().change(function () {
    	monitordetails.stressTaskId = this.value;
    });
});

monitordetails.$watch("appList", function(newValue) {
    $(".chosen-select").trigger("chosen:updated");
});

/**
 * Created by 陈佳珠 on 2017/5/18.
 */
var h5task = avalon.define({
	$id : 'h5task',
	taskid : getUrlVars()["taskid"],
	name : "",
	url : "",
	recordid : "",
	creater : "",
	time : "",

	getH5TasksById : function() {
		zajax({
			type : "post",
			url : "getH5TasksById.action",
			data : {
				"taskid" : h5task.taskid
			},
			success : function(data) {
				if (data.retCode == "1000") {
					h5task.name = data.h5task.name;
					h5task.url = data.h5task.url;
					h5task.recordid = data.h5task.recordid;
					h5task.creater = data.h5task.creator.displayname;
					h5task.time = data.h5task.time;
				} else {
					alert(data.retMSG);
				}
			},
			error : function(data) {
				alert(data.retMSG);
			}
		});
	},

	recordList : [],
	listRecord : function() {
		zajax({
			type : "post",
			url : 'findH5RecordByTaskId.action',
			data : {
				"taskid" : h5task.taskid
			},
			success : function(data) {
				var temArr = [];
				temArr = data.h5record;
				for (i = 0; i < temArr.length; i++) {
					var statusObj = new Object();
					if (temArr[i].status == "0") {
						temArr[i].statusText = "创建记录成功";
					} else if (temArr[i].status == "1") {
						temArr[i].statusText = "发送执行指令成功";
					} else if (temArr[i].status == "2") {
						temArr[i].statusText = "运行成功";
					} else if (temArr[i].status == "3") {
						temArr[i].statusText = "结果入库成功";
					} else if (temArr[i].status == "-1") {
						temArr[i].statusText = "发送执行指令失败";
					} else if (temArr[i].status == "-2") {
						temArr[i].statusText = "运行失败";
					}else if (temArr[i].status == "4") {
						temArr[i].statusText = "回调失败";
					}

				}
				h5task.recordList = temArr;
			},
			error : function(data) {
				alert(data.retMSG);
			}
		});
	},

	deviceList : [],
	listDevice : function() {
		$("#loadDiv").show();
		zajax({
			type : "post",
			url : 'getExecutableDeviceList.action',
			data : {
				"taskid" : h5task.taskid
			},
			success : function(data) {
				h5task.deviceList = data.deviceList;

				if (h5task.deviceList.length == 0) {
					$("#EmptyLb").show();

				} else {
					$("#EmptyLb").hide();

				}
				$("#showDeviceDiv").show();
				$("#loadDiv").hide();
			},
			error : function(data) {
				alert(data.retMSG);
				$("#loadDiv").hide();
			}
		});
	},

	exec : function() {
		$("input[type='checkbox']").each(function() {
			if ($(this).get(0).checked) {

				var name = $(this).parent().text();
				// alert(name);
				var ss = name.split("-");

				h5task.createH5Record(ss[0], ss[1]);
				$("#showDeviceDiv").hide();
			}

		});
	},
	createH5Record : function(ip, device) {

		zajax({
			type : "post",
			url : 'createH5Record.action',
			data : {
				"taskid" : h5task.taskid,
				"ip" : ip,
				"device" : device,
				"creatorid" : getCookie("userid"),

			},
			success : function(data) {
				if (data.retCode != "1000") {				
					alert(data.retMSG);
				}
				
				if (data.retCode != "1002") {
					h5task.listRecord();
				} 
			},
			error : function(data) {
				alert(data.retMSG);
			}
		});
	},
	
	clearDevice : function() {

		zajax({
			type : "post",
			url : 'clearDevice.action',
			data : {
				"creatorid" : getCookie("userid"),

			},
			success : function(data) {
				if (data.retCode != "1000") {				
					alert(data.retMSG);
				}
				
			},
			error : function(data) {
				alert(data.retMSG);
			}
		});
	},

	isTester : false
});

avalon.ready(function() {

	h5task.isTester = isTesterFunc();
	h5task.getH5TasksById();
	h5task.listRecord();
	$("#showDeviceDiv").hide();
	$("#loadDiv").hide();
	$("#EmptyLb").hide();
});

/**
 * Created by 陈佳珠 on 2017/5/18.
 */
var h5detail = avalon.define({
    $id: 'h5detail',
    recordid: getUrlVars()["recordid"],
    statusText:"",
    recordinfo:"", 
    result:"",
    domainresult:[],
    resourceresult:[],
    deviceinfo:"",
    imgresult:[],
        
    findRecordInfo : function() {
		zajax({
			type : "post",
			url : 'findH5RecordById.action',
			data : {
				"recordid" : h5detail.recordid
			},
			success : function(data) {
				h5detail.recordinfo = data.h5record;
				
					if (h5detail.recordinfo.status == "0") {
						h5detail.statusText = "创建记录成功";
					} else if (h5detail.recordinfo.status == "1") {
						h5detail.statusText = "发送执行指令成功";
					} else if (h5detail.recordinfo.status == "2") {
						h5detail.statusText = "运行成功";
					} else if (h5detail.recordinfo.status == "3") {
						h5detail.statusText = "结果入库成功";
					} else if (h5detail.recordinfo.status == "-1") {
						h5detail.statusText = "发送执行指令失败";
					} else if (h5detail.recordinfo.status == "-2") {
						h5detail.statusText = "运行失败";
					}
			},
			error : function(data) {
				alert(data.retMSG);
			}
		});
	},
	
	findResult : function() {
		zajax({
			type : "post",
			url : 'findH5ResultByRecordId.action',
			data : {
				"recordid" : h5detail.recordid
			},
			success : function(data) {
				h5detail.result = data.h5result[0];
				h5detail.result.pageSize=h5detail.result.pageSize/1024;
			},
			error : function(data) {
				alert(data.retMSG);
			}
		});
	},

	findDomainResult : function() {
		zajax({
			type : "post",
			url : 'findH5DomainResultsByRecordId.action',
			data : {
				"recordid" : h5detail.recordid
			},
			success : function(data) {
				h5detail.domainresult = data.H5DomainResults;				
			},
			error : function(data) {
				alert(data.retMSG);
			}
		});
	},

	findResourceResult : function() {
		zajax({
			type : "post",
			url : 'findH5ResourceResultsByRecordId.action',
			data : {
				"recordid" : h5detail.recordid
			},
			success : function(data) {
				h5detail.resourceresult = data.H5ResourceResults;				
			},
			error : function(data) {
				alert(data.retMSG);
			}
		});
	},

	findImgResult : function() {
		zajax({
			type : "post",
			url : 'findH5ImageResultsByRecordId.action',
			data : {
				"recordid" : h5detail.recordid
			},
			success : function(data) {
				h5detail.imgresult = data.H5ImageResults;	
				
				$.each(h5detail.imgresult, function(name, value) {
				     this.size=Math.round(this.size/1024).toFixed(2);      //this指向当前属性的值
				    
				});
			},
			error : function(data) {
				alert(data.retMSG);
			}
		});
	},
	findDeviceInfo : function() {
		zajax({
			type : "post",
			url : 'findH5DeviceInfoByRecordId.action',
			data : {
				"recordid" : h5detail.recordid
			},
			success : function(data) {
				h5detail.deviceinfo = data.H5DeviceInfo;				
			},
			error : function(data) {
				alert(data.retMSG);
			}
		});
	},

  
});

avalon.ready(function() {
	h5detail.findRecordInfo();
	h5detail.findResult();
	h5detail.findDomainResult();
	h5detail.findResourceResult();
	h5detail.findImgResult();
	h5detail.findDeviceInfo();
	
});

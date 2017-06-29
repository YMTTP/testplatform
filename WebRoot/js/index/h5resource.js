/**
 * Created by 陈佳珠 on 2017/6/28.
 */
var h5resource = avalon.define({
    $id: 'h5resource',
    recordid: getUrlVars()["recordid"],
    type: getUrlVars()["type"],
    value: getUrlVars()["value"],
    
    statusText:"",
    recordinfo:"", 
    result:"",
    results:[],
        
    findRecordInfo : function() {
		zajax({
			type : "post",
			url : 'findH5RecordById.action',
			data : {
				"recordid" : h5resource.recordid
			},
			success : function(data) {
				h5resource.recordinfo = data.h5record;
				
					if (h5resource.recordinfo.status == "0") {
						h5resource.statusText = "创建记录成功";
					} else if (h5resource.recordinfo.status == "1") {
						h5resource.statusText = "发送执行指令成功";
					} else if (h5resource.recordinfo.status == "2") {
						h5resource.statusText = "运行成功";
					} else if (h5resource.recordinfo.status == "3") {
						h5resource.statusText = "结果入库成功";
					} else if (h5resource.recordinfo.status == "-1") {
						h5resource.statusText = "发送执行指令失败";
					} else if (h5resource.recordinfo.status == "-2") {
						h5resource.statusText = "运行失败";
					}
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
				"recordid" : h5resource.recordid
			},
			success : function(data) {
				h5resource.imgresult = data.H5ImageResults;	
				
				$.each(h5resource.imgresult, function(name, value) {
				     this.responsesize=(this.responsesize/1024).toFixed(2);      //this指向当前属性的值
				    
				});
			},
			error : function(data) {
				alert(data.retMSG);
			}
		});
	},
	
	H5OriginalSource : function() {
		zajax({
			type : "post",
			url : 'findH5OriginalSourceByRecordId.action',
			data : {
				"recordid" : h5resource.recordid,
				"type" : h5resource.type,
				"value" : h5resource.value,
			},
			success : function(data) {
				h5resource.results = data.H5Results;	
				
				$.each(h5resource.results, function(name, value) {
				     this.responsesize=(this.responsesize/1024).toFixed(2);      //this指向当前属性的值
				    
				});
			},
			error : function(data) {
				alert(data.retMSG);
			}
		});
	},
  
});

avalon.ready(function() {
	h5resource.findRecordInfo();
	h5resource.H5OriginalSource();
	
});

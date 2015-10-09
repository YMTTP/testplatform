function register(){
	var username = "testtp";
	var displayname = "测试用户";
	var cellphone = "13816700001";
	var remark = "备注信息";
	var telephone = "13816700001";
	var department = "1";
	var position = "1";
	
	$.ajax({
		type : "post",
		url : 'register.action',
		dataType : "json",
		data : {
			"username" : username,
			"displayname" : displayname,
			"cellphone" : cellphone,
			"remark" : remark,
			"telephone" : telephone,
			"department" : department,
			"position" : position
			
		},
		success : function(data) {
			var result = JSON.stringify(data);
			$("#register").html(result)
			
		},
		error : function(data){
			alert(data.retMSG);
		}
	});
}
var model = avalon.define({
	$id : 'vm',
	scrollTopHeight : 0,
	fixedNav : "",
	scrollTopVal : function() {
		$(window).scroll(function() {
			model.scrollTopHeight = $(window).scrollTop();
		});
	},
	offline : true,
	online : false,
	loginShow : function() {
		$('.theme-popover-mask').fadeIn(100);
		$('.theme-popover').slideDown(200);
	},
	loginClose : function() {
		$('.theme-popover-mask').fadeOut(100);
		$('.theme-popover').slideUp(200);
	},
	login : function() {
		var username = "";
		var password = "123456";

		$.ajax({
			type : "post",
			url : 'login.action',
			dataType : "json",
			data : {
				"username" : username,
				"password" : password

			},
			success : function(data) {
				var result = JSON.stringify(data);
				alert(result);
			},
			error : function(data) {
				alert(data.retMSG);
			}
		});
	}
});

model.$watch("scrollTopHeight", function(v) {
	if (v > 50) {
		model.fixedNav = "fixedNav";
	} else {
		model.fixedNav = "";
	}
});

model.scrollTopVal();
var querycodevm = avalon.define({
	$id: 'querycodevm',
	sActionUser: "",
	Mobile: "",
	SITSellerCodeInfos: queryCode(1, 0),
	UATSellerCodeInfos: [],
	STRESSSellerCodeInfos: [],
	SITBuyerCodeInfos: queryCode(2, 0),
	UATBuyerCodeInfos: [],
	STRESSBuyerCodeInfos: [],
	queryBuyerCode: function(channelid, envid) {
		var queryPhoneNo = querycodevm.sActionUser.trim();
		if (envid == 0) {
			querycodevm.SITBuyerCodeInfos = queryCode(channelid, envid, queryPhoneNo);
		} else if (envid == 1) {
			querycodevm.UATBuyerCodeInfos = queryCode(channelid, envid, queryPhoneNo);
		} else if (envid == 2) {
			querycodevm.STRESSBuyerCodeInfos = queryCode(channelid, envid, queryPhoneNo);
		}
		querycodevm.sActionUser = "";
	},
	querySellerCode: function(channelid, envid) {
		var queryPhoneNo = querycodevm.Mobile.trim();
		if (envid == 0) {
			querycodevm.SITSellerCodeInfos = queryCode(channelid, envid, queryPhoneNo);
		} else if (envid == 1) {
			querycodevm.UATSellerCodeInfos = queryCode(channelid, envid, queryPhoneNo);
		} else if (envid == 2) {
			querycodevm.STRESSSellerCodeInfos = queryCode(channelid, envid, queryPhoneNo);
		}
		querycodevm.Mobile = "";
	},
	loadSITTAB: function() {
		querycodevm.sActionUser = "";
		querycodevm.Mobile = "";
        querycodevm.SITBuyerCodeInfos = queryCode(2,0);
        querycodevm.SITSellerCodeInfos = queryCode(1,0);
        $('#SIT').tab('show');
    },
    loadUATTAB: function() {
		querycodevm.sActionUser = "";
		querycodevm.Mobile = "";
        querycodevm.UATBuyerCodeInfos = queryCode(2,1);
        querycodevm.UATSellerCodeInfos = queryCode(1,1);
        $('#UAT').tab('show');
    },
    loadSTESSTAB: function() {
		querycodevm.sActionUser = "";
		querycodevm.Mobile = "";
        querycodevm.STRESSBuyerCodeInfos = queryCode(2,2);
        querycodevm.STRESSSellerCodeInfos = queryCode(1,2);
        $('#STRESS').tab('show');
    }
});


function queryCode(queryChannelId, envid, phoneno) {
	var queryChannelId = (queryChannelId == null || queryChannelId == "" || typeof(queryChannelId) == "undefined") ? "1" : queryChannelId;
	var envid = (envid == null || envid == "" || typeof(envid) == "undefined") ? "0" : envid;
	var phoneno = (phoneno == null || phoneno == "" || typeof(phoneno) == "undefined") ? "" : phoneno;
	var dataParams = {
		"queryChannelId": queryChannelId,
		"envid": envid,
		"phoneno": phoneno
	}
	var codeInfos = {};
	zajax({
		url: "queryValidateCode.action",
		type: "post",
		data: dataParams,
		async: false,
		success: function(data) {
			if (data.retCode == "1000") {
				codeInfos = data.validateCodeInfos;
			} else {
				alert(data.retMSG);
			}
		},
		error: function(data) {
			alert(data.retMSG);
		}
	})
	return codeInfos;
}
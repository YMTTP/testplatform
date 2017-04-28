/**
 * Created by chenjiazhu on 2017/2/15.
 */
var monitordeploy = avalon.define({
    $id: 'monitordeploy',
   
    //VM Start
    pagesize1: "20",
    pagesize1Cls: "pageSizeSelected",
    pagesize2: "50",
    pagesize2Cls: "",
    pagesize3: "100",
    pagesize3Cls: "",
    changePageSize: function(pgsize) {
        monitordeploy.jpageSize = pgsize;
        monitordeploy.listVmInfosByPage("init");
    },
    clearsearch: function() {
        monitordeploy.conType = "";
        monitordeploy.listVmInfosByPage("init");
    },
    jpageIndex: 1,
    jpageSize: 20,
    envType: "STRESS",
    conType: "",
    
    vmsList: [],
    
    listVmInfosByPage: function(tag) {
        if (tag) {
            monitordeploy.jpageIndex = 1;
        }
        $.ajax({
            type: "post",
            url: 'listVmInfosByPageByEnvType.action',
            data: {
                "pageindex": monitordeploy.jpageIndex,
                "pagesize": monitordeploy.jpageSize,
                "type": monitordeploy.conType,
                "envType": monitordeploy.envType
            },
            dataType: "json",
            success: function(data) {
                if (tag) {
                    $('#pagination').bootpag({
                        total: data.pagenum,
                        page: monitordeploy.jpageIndex
                    });
                }
                if (data.retCode == "1000") {
                    monitordeploy.vmsList = data.vms;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("请求数据异常，状态码：" + XMLHttpRequest.status+",Error:"+errorThrown+",textStatus:"+textStatus);
            }
        });
    },
    
    postViewStatus: function(name, status1,status2,ip) {
       if(status1==null || status1=="")
       {
    	   status1=0;
       }
       
       if(status2==null || status2=="")
       {
    	   status2=0;
       }
       
       $(".loadDiv_view_"+name).show();
       $(".buttonDiv_view_"+name).hide();
       
       // 检查Monitor状态    	
    	$.ajax({
            type: "GET",
            dataType : 'jsonp',  
            jsonp:"jsoncallback",  
            url: "http://"+ip+":8034/Deploy/ReturnOk",

            success: function (data) {
            	  if(data.data=="ok")
  			    {
  			    	if(status1!="ok")
  			    	{
  			    		monitordeploy.updateMonitorStatus(ip,"ok");
  			    	}
  			    }
  			    else
  			    {
  			    	if(status1!="fail")
  			    	{
  			    		monitordeploy.updateMonitorStatus(ip,"fail");
  			    	}
  			    }
            	  
            	  $(".loadDiv_view_"+name).hide();
                  $(".buttonDiv_view_"+name).show();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("请求数据异常，状态码：" + XMLHttpRequest.status+",Error:"+errorThrown+",textStatus:"+textStatus);
                $(".loadDiv_view_"+name).hide();
                $(".buttonDiv_view_"+name).show();
            }
        });
    	
    	// 检查ClientSetup状态    	
    	$.ajax({
            type: "GET",
            dataType : 'jsonp',  
            jsonp:"jsoncallback",  
            url: "http://"+ip+":8035/Deploy/ReturnOk",

            success: function (data) {
            	if(data.data="ok")
  			    {
  			    	if(status1!="ok")
  			    	{
  			    		monitordeploy.updateClientSetupStatus(ip,"ok");
  			    	}
  			    }
  			    else
  			    {
  			    	if(status1!="fail")
  			    	{
  			    		monitordeploy.updateClientSetupStatus(ip,"fail");
  			    	}
  			    }
            	
            	 
            	$(".loadDiv_view_"+name).hide();
                $(".buttonDiv_view_"+name).show();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("请求数据异常，状态码：" + XMLHttpRequest.status+",Error:"+errorThrown+",textStatus:"+textStatus);
                
                $(".loadDiv_view_"+name).hide();
                $(".buttonDiv_view_"+name).show();
            }
        });
    },
    
    updateMonitorStatus: function(ip,status) {
        
        $.ajax({
            type: "post",
            url: 'updateMonitorStatus.action',
            data: {
                "ip": ip,
                "status1": status,
            },
            dataType: "json",
            success: function(data) {
               
                if (data.retCode != "1000") {
                	 alert("更新"+ip+"Monitor状态失败！");
                } 
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("请求数据异常，状态码：" + XMLHttpRequest.status+ ",<br/>"+XMLHttpRequest.readyState+  ",<br/>"+XMLHttpRequest.responseText+",<br/>Error:"+errorThrown+",<br/>textStatus:"+textStatus);
            }
        });
    },
    
    updateClientSetupStatus: function(ip,status) {
        
        $.ajax({
            type: "post",
            url: 'updateClientSetupStatus.action',
            data: {
                "ip": ip,
                "status2": status,
            },
            dataType: "json",
            success: function(data) {
               
                if (data.retCode != "1000") {
                	 alert("更新"+ip+"ClientSetupStatus！");
                } 
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("请求数据异常，状态码：" + XMLHttpRequest.status+ ",<br/>"+XMLHttpRequest.readyState+  ",<br/>"+XMLHttpRequest.responseText+",<br/>Error:"+errorThrown+",<br/>textStatus:"+textStatus);
            }
        });
    },
    
    postDeploy: function(name,ip) {
        
        $(".loadDiv_"+name).show();
        $(".buttonDiv_"+name).hide();
        
        $.ajax({
            type: "post",
            url: 'deploy.action',
            data: {
                "ip": ip,
                "status1": status,
            },
            dataType: "json",
            success: function(data) {
            	$(".loadDiv_"+name).hide();
                $(".buttonDiv_"+name).show();
                
            	if(data.data=="false")
 			    {
 			    	alert("更新"+ip+"客户端失败！");
 			    } 
            	else
            		{
            		monitordeploy.listVmInfosByPage();
            		}
            	
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            	$(".loadDiv_"+name).hide();
	            $(".buttonDiv_"+name).show();
                alert("请求数据异常，状态码：" + XMLHttpRequest.status+ ",<br/>"+XMLHttpRequest.readyState+  ",<br/>"+XMLHttpRequest.responseText+",<br/>Error:"+errorThrown+",<br/>textStatus:"+textStatus);
            }
        });
     },
     
    loadVmTAB: function() {
        monitordeploy.listVmInfosByPage("init");
        $('#vms').tab('show');
    },
    //VM END
    userOps: ops(4),
    bootpagFuc: function() {
    	 
        $('#pagination').bootpag({
            total: 1,
            maxVisible: 10
        }).on('page', function(event, num) {
            monitordeploy.jpageIndex = num;
            monitordeploy.listVmInfosByPage();
        });
    }
});

avalon.ready(function() {
    if (monitordeploy.userOps) {
        monitordeploy.loadVmTAB();
       
    } else {
        redirectAdminIndexPage();
    }
    monitordeploy.bootpagFuc();
//    $(".loadDiv").hide();
});


monitordeploy.$watch("jpageSize", function(newValue) {
    monitordeploy.pagesize1Cls = "";
    monitordeploy.pagesize2Cls = "";
    monitordeploy.pagesize3Cls = "";
    if (newValue == monitordeploy.pagesize1) {
        monitordeploy.pagesize1Cls = "pageSizeSelected";
    } else if (newValue == monitordeploy.pagesize2) {
        monitordeploy.pagesize2Cls = "pageSizeSelected";
    } else if (newValue == monitordeploy.pagesize3) {
        monitordeploy.pagesize3Cls = "pageSizeSelected";
    }
})
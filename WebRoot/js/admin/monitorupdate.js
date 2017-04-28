/**
 * Created by chenjiazhu on 2017/2/15.
 */
var monitorupdate = avalon.define({
    $id: 'monitorupdate',
   
    //VM Start
    pagesize1: "20",
    pagesize1Cls: "pageSizeSelected",
    pagesize2: "50",
    pagesize2Cls: "",
    pagesize3: "100",
    pagesize3Cls: "",
    changePageSize: function(pgsize) {
        monitorupdate.jpageSize = pgsize;
        monitorupdate.listVmInfosByPage("init");
    },
    clearsearch: function() {
        monitorupdate.conType = "";
        monitorupdate.listVmInfosByPage("init");
    },
    jpageIndex: 1,
    jpageSize: 20,
    envType: "STRESS",
    conType: "",
    
    vmsList: [],
    
    listVmInfosByPage: function(tag) {
        if (tag) {
            monitorupdate.jpageIndex = 1;
        }
        $.ajax({
            type: "post",
            url: 'listVmInfosByPageByEnvType.action',
            data: {
                "pageindex": monitorupdate.jpageIndex,
                "pagesize": monitorupdate.jpageSize,
                "type": monitorupdate.conType,
                "envType": monitorupdate.envType
            },
            dataType: "json",
            success: function(data) {
                if (tag) {
                    $('#pagination').bootpag({
                        total: data.pagenum,
                        page: monitorupdate.jpageIndex
                    });
                }
                if (data.retCode == "1000") {
                    monitorupdate.vmsList = data.vms;
                } else {
                    alert(data.retMSG);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("请求数据异常，状态码：" + XMLHttpRequest.status+",Error:"+errorThrown+",textStatus:"+textStatus);
            }
        });
    },
    
    postViewStatus: function(status1,status2,ip) {
       if(status1==null || status1=="")
       {
    	   status1=0;
       }
       
       if(status2==null || status2=="")
       {
    	   status2=0;
       }
       
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
  			    		monitorupdate.updateMonitorStatus(ip,"ok");
  			    	}
  			    }
  			    else
  			    {
  			    	if(status1!="fail")
  			    	{
  			    		monitorupdate.updateMonitorStatus(ip,"fail");
  			    	}
  			    }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("请求数据异常，状态码：" + XMLHttpRequest.status+",Error:"+errorThrown+",textStatus:"+textStatus);
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
  			    		monitorupdate.updateClientSetupStatus(ip,"ok");
  			    	}
  			    }
  			    else
  			    {
  			    	if(status1!="fail")
  			    	{
  			    		monitorupdate.updateClientSetupStatus(ip,"fail");
  			    	}
  			    }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("请求数据异常，状态码：" + XMLHttpRequest.status+",Error:"+errorThrown+",textStatus:"+textStatus);
            }
        });
    },
    
    postUpdateMonitor: function(name,version1,ip) {
        if(version1==null || version1=="")
        {
     	   	version1=0;
        }

        $(".loadDiv_"+name).show();
        $(".buttonDiv_"+name).hide();
        
        //更新Monitor    	
     	$.ajax({
            type: "GET",
            dataType : 'jsonp',  
            jsonp:"jsoncallback",  
            url: "http://"+ip+":8035/Deploy/UpdateClient",
            data:{
            	lastVersion: version1 
            },
            success: function (data) {
            	
            	$(".loadDiv_"+name).hide();
                $(".buttonDiv_"+name).show();
                
            	if(data.data=="false")
 			    {
 			    	alert("更新"+ip+"Monitor失败！");
 			    }
 			    else
 			    { 	
 			    	//由于部署重启站点需要时间，特在这边等待一秒
 			    	 setTimeout(
 			    			function () {
 			    	$.ajax({
 			            type: "GET",
 			            dataType : 'jsonp',  
 			            jsonp:"jsoncallback",  
 			            url: "http://"+ip+":8034/Deploy/Version",
 			           
 			            success: function (data) {
 			            	
 			            	 if(data.data!=version1)
 	 			    		  {
 	 			    			 monitorupdate.updateMonitorVersion(ip,data.data);
 	 			    		  }
 			            },
 			            error: function (XMLHttpRequest, textStatus, errorThrown) {
 			            	
 			            	$(".loadDiv_"+name).hide();
 			                $(".buttonDiv_"+name).show();
 			                
 			                alert("请求数据异常，状态码：" + XMLHttpRequest.status+",Error:"+errorThrown+",textStatus:"+textStatus);
 			            }
 			        });
 			    	}
 			    , 12000);
 			    }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            	
            	$(".loadDiv_"+name).hide();
                $(".buttonDiv_"+name).show();
                
                alert("请求数据异常，状态码：" + XMLHttpRequest.status+",Error:"+errorThrown+",textStatus:"+textStatus);
            }
        });

     },
     
     postUpdateSetup: function(name,version2,ip) {
         if(version2==null || version2=="")
         {
      	   	version1=0;
         }
         
         $(".loadDiv_"+name).show();
         $(".buttonDiv_"+name).hide();
         
      	//更新ClientSetup
     	$.ajax({
             type: "GET",
             dataType : 'jsonp',  
             jsonp:"jsoncallback",  
             url: "http://"+ip+":8034/Deploy/UpdateClient",
             data:{
             	lastVersion: version2 
             },
             success: function (data) {
            	 
            	 $(".loadDiv_"+name).hide();
                 $(".buttonDiv_"+name).show();
                 
             	if(data.data=="false")
  			    {
  			    	alert("更新"+ip+"ClientSetup失败！");
  			    }
  			    else
  			    {
  			    	//由于部署重启站点需要时间，特在这边等待一秒
			    	 setTimeout(
			    			function () {
  			    	$.ajax({
  			             type: "GET",
  			             dataType : 'jsonp',  
  			             jsonp:"jsoncallback",  
  			             url: "http://"+ip+":8035/Deploy/Version",
  			            
  			             success: function (data) {
  			            	 
  			            	if(data.data!=version2)
    			    		  {
    			    			 monitorupdate.updateClientSetupVersion(ip,data.data);
    			    		  }
  			             },
  			             error: function (XMLHttpRequest, textStatus, errorThrown) {
  			            	 
  			            	 $(".loadDiv_"+name).hide();
  			                 $(".buttonDiv_"+name).show();
  			                 
  			                 alert("请求数据异常，状态码：" + XMLHttpRequest.status+",Error:"+errorThrown+",textStatus:"+textStatus);

  			             }
  			         });
			    	}
		 			, 12000);
  			    }
             },
             error: function (XMLHttpRequest, textStatus, errorThrown) {
            	 
            	 $(".loadDiv_"+name).hide();
                 $(".buttonDiv_"+name).show();
                 
                 alert("请求数据异常，状态码：" + XMLHttpRequest.status+",Error:"+errorThrown+",textStatus:"+textStatus);

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
    
    updateMonitorVersion: function(ip,version) {
        
        $.ajax({
            type: "post",
            url: 'updateMonitorVersion.action',
            data: {
                "ip": ip,
                "version1": version,
            },
            dataType: "json",
            success: function(data) {
               
                if (data.retCode != "1000") {
                	 alert("更新"+ip+"Monitor版本失败！");
                } 
            },
            error: function(data) {
                alert(error);
            }
        });
    },
    
  updateClientSetupVersion: function(ip,version) {
        
        $.ajax({
            type: "post",
            url: 'updateClientSetupVersion.action',
            data: {
                "ip": ip,
                "version2": version,
            },
            dataType: "json",
            success: function(data) {
               
                if (data.retCode != "1000") {
                	 alert("更新"+ip+"ClientSetup版本失败！");
                } 
            },
            error: function(data) {
                alert(error);
            }
        });
    },
    
    loadVmTAB: function() {
        monitorupdate.listVmInfosByPage("init");
        $('#vms').tab('show');
    },
    //VM END
    userOps: ops(4),
    bootpagFuc: function() {
    	 
        $('#pagination').bootpag({
            total: 1,
            maxVisible: 10
        }).on('page', function(event, num) {
            monitorupdate.jpageIndex = num;
            monitorupdate.listVmInfosByPage();
        });
    }
});

avalon.ready(function() {
    if (monitorupdate.userOps) {
        monitorupdate.loadVmTAB();
       
    } else {
        redirectAdminIndexPage();
    }
    monitorupdate.bootpagFuc();
//    $(".loadDiv").hide();
});


monitorupdate.$watch("jpageSize", function(newValue) {
    monitorupdate.pagesize1Cls = "";
    monitorupdate.pagesize2Cls = "";
    monitorupdate.pagesize3Cls = "";
    if (newValue == monitorupdate.pagesize1) {
        monitorupdate.pagesize1Cls = "pageSizeSelected";
    } else if (newValue == monitorupdate.pagesize2) {
        monitorupdate.pagesize2Cls = "pageSizeSelected";
    } else if (newValue == monitorupdate.pagesize3) {
        monitorupdate.pagesize3Cls = "pageSizeSelected";
    }
})
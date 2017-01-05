(function ($){
    $.oneinfochart = function (container,title,desc,ydesc, times, infos) {
        var num = 0;
        $.each(infos, function (index, value) {
            num += value;
        });
        num /= infos.size();    
        num=Math.round(num*100)/100;        
        
        container.highcharts({
            chart: {
                type: 'area'
            },
            title: {
                text: title,
                x: -20 //center
            },
            subtitle: {
                text: "平均值：" + num,
                x: -20
            },
            xAxis: {
                categories: times
            },
            yAxis: {
                title: {
                    text: ydesc
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: ydesc
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: desc,
                data: infos
            }]
        });
    },
    $.twoinfochart = function (container,title,desc1,desc2,ydesc, times, infos1, infos2) {
        var num1 = 0;
        $.each(infos1, function (index, value) {
            num1 += value;
        });
        num1 /= infos1.size(); 
        num1=Math.round(num1*100)/100; 

        var num2 = 0;
        $.each(infos2, function (index, value) {
            num2 += value;
        });
        num2 /= infos2.size(); 
        num2=Math.round(num2*100)/100; 
        
        container.highcharts({
            chart: {
                type: 'area'
            },
            title: {
                text: title,
                x: -20 //center
            },
            subtitle: {
                text: desc1+"平均值:" + num1+","+desc2+"平均值:"+num2,
                x: -20
            },
            xAxis: {
                categories: times
            },
            yAxis: {
                title: {
                    text: ydesc
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    //color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: ydesc
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
            	color:"#0033FF",
                name: desc1,
                data: infos1
            },
            {
            	color:'#F08080',
                name: desc2,
                data: infos2
            }]
        });
    },
    $.fourareachart = function (container, times, infos1, infos2, infos3, infos4) {
        var num1 = 0;        
        var infoArrary1 = [];
        var value;
        
        for(var i=0;i<infos1.size();i++)
        {
        	value = infos1[i];
        	num1 += value.data2;
        	
        	var infoArray=[];        	
        	infoArray.push(value.time);
        	infoArray.push(value.data1);
        	infoArray.push(value.data2);            

            infoArrary1.push(infoArray);
        }
       
        num1 /= infos1.size();  

        var num2 = 0;
        var infoArrary2 = [];
        for(var i=0;i<infos2.size();i++)
        {
        	value = infos2[i];
            num2 += value.data2;

            var infoArray=[];        	
            infoArray.push(value.time);
            infoArray.push(value.data1);
            infoArray.push(value.data2);            

            infoArrary2.push(infoArray);
        };
        num2 /= infos2.size();   
        
        var num3 = 0;
        var infoArrary3 = [];
        for(var i=0;i<infos3.size();i++)
        {
        	value = infos3[i];
            num3 += value.data2;

            var infoArray=[];        	
            infoArray.push(value.time);
            infoArray.push(value.data1);
            infoArray.push(value.data2);            

            infoArrary3.push(infoArray);
        };
        num3 /= infos3.size();    
        
        var num4 = 0;
        var infoArrary4 = [];
        for(var i=0;i<infos4.size();i++)
        {
        	value = infos4[i];
            num4 += value.data2;

            var infoArray=[];        	
            infoArray.push(value.time);
            infoArray.push(value.data1);
            infoArray.push(value.data2);            

            infoArrary4.push(infoArray);
        };
        num4 /= infos4.size();   
        
        var ava1=Math.round(num1*100)/100; 
        var ava2=Math.round((num2-num1)*100)/100;
        var ava3=Math.round((num3-num2)*100)/100; 
        var ava4=Math.round((num4-num3)*100)/100; 
        
        var desc = "UserTime平均值:" + ava1.toString()+", SystemTime平均值:"+ava2.toString()+", Softirq平均值:"+ava3.toString()+", IdleTime平均值:"+ava4.toString();
        
        container.highcharts({
        	 chart: {
     	        type: 'arearange',
     	        zoomType: 'x'
     	    },
     	    
     	    title: {
     	        text: 'CPU占用率'
     	    },
     	    
     	   subtitle: {
               text: desc
           },
     	    xAxis: {
     	    	 categories: times
     	    	 //type: 'string'
     	    },
     	    
     	    yAxis: {
     	        title: {
     	            text: '%'
     	        }
     	    },
     	
     	    tooltip: {
     	        crosshairs: true,
     	        shared: true,
     	        valueSuffix: '%'
     	    },
     	    
     	    legend: {
     	        enabled: true
     	    },
     	
     	    series: [{
     	        	name: 'System Time',
     	        	color:'#EA0000',
     	        	data: infoArrary1
     	    	},
     	    	{
     	        	name: 'Softirq Time',
     	        	color:'#CCFF80',
     	        	data: infoArrary2
     	    	},
     	    	{
     	        	name: 'User Time',
     	        	color:'#000079',
     	        	data: infoArrary3
     	    	},
     	    	{
     	        	name: 'Idle Time',
     	        	color:'#00BB00',
     	        	data: infoArrary4
     	    	},
               ]
        });
    }
})(jQuery);
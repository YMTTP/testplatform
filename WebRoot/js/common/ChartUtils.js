(function ($){
    $.oneinfochart = function (container,title,desc,ydesc, times, infos) {
        var num = 0;
        $.each(infos, function (index, value) {
            num += value;
        });
        num /= infos.length;    

        container.highcharts({
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
                valueSuffix: ''
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
        num1 /= infos1.length;    

        var num2 = 0;
        $.each(infos2, function (index, value) {
            num2 += value;
        });
        num2 /= infos2.length;   
        
        container.highcharts({
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
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: ''
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
    }
})(jQuery);
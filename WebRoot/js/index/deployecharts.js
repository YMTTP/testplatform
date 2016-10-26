var mounth = {
    dateCell: '#inpdate',
    format: "YYYY-MM",
    minDate: "2016-10-01", //最小日期
    maxDate: "2099-12-31", //最大日期
    isTime: false
};
jeDate(mounth);


var echartsvm = avalon.define({
    $id: 'echartsvm',
    SIT1DailyArr: [],
    SIT2DailyArr: [],
    UATDailyArr: [],
    STRESSDailyArr: [],
    DailyArr: [],
    DailyOption: {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['SIT1', 'SIT2', 'UAT', 'STRESS']
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            x: 'right',
            y: 'center',
            feature: {
                mark: { show: true },
                dataView: { show: false, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            data: []
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: 'SIT1',
            type: 'bar',
            stack: '按月统计',
            data: []
        }, {
            name: 'SIT2',
            type: 'bar',
            stack: '按月统计',
            data: []
        }, {
            name: 'UAT',
            type: 'bar',
            stack: '按月统计',
            data: []
        }, {
            name: 'STRESS',
            type: 'bar',
            stack: '按月统计',
            data: []
        }]
    },
    conMonth: "",
    clearsearch: function() {
        echartsvm.conMonth = "";
        echartsvm.buildHistoryDaily();
    },
    buildHistoryDaily: function() {
        var tempYear, tempMonth;
        if (echartsvm.conMonth == "") {
            var searchDate = new Date();
            tempYear = searchDate.getFullYear();
            tempMonth = searchDate.getMonth()+1;
        } else {
            tempDate = echartsvm.conMonth;
            tempYear = tempDate.split("-")[0];
            tempMonth = tempDate.split("-")[1];
        }
        zajax({
            url: "buildHistoryDaily.action",
            type: "post",
            data: {
                year: tempYear,
                month: tempMonth
            },
            success: function(data) {
                if (data.retCode == 1000) {
                    echartsvm.SIT1DailyArr = data.sit1;
                    echartsvm.SIT2DailyArr = data.sit2;
                    echartsvm.UATDailyArr = data.uat;
                    echartsvm.STRESSDailyArr = data.stress;
                    for (i = 0; i < data.sit1.length; i++) {
                        echartsvm.DailyArr[i] = i + 1;
                    }
                    echartsvm.DailyOption.xAxis[0].data = echartsvm.DailyArr;
                    for (j = 0; j < echartsvm.DailyOption.series.length; j++) {
                        var envName = echartsvm.DailyOption.series[j].name;
                        switch (envName) {
                            case "SIT1":
                                echartsvm.DailyOption.series[j].data = echartsvm.SIT1DailyArr;
                                break;
                            case "SIT2":
                                echartsvm.DailyOption.series[j].data = echartsvm.SIT2DailyArr;
                                break;
                            case "UAT":
                                echartsvm.DailyOption.series[j].data = echartsvm.UATDailyArr;
                                break;
                            case "STRESS":
                                echartsvm.DailyOption.series[j].data = echartsvm.STRESSDailyArr;
                                break;
                        }

                    }

                    var myChart = echarts.init(document.getElementById('testchart'));
                    myChart.setOption(echartsvm.DailyOption);

                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        })
    }

});

avalon.ready(function() {
    echartsvm.buildHistoryDaily();
})

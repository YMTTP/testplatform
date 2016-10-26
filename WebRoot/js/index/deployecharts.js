var mounth = {
    dateCell: '#inpdate',
    format: "YYYY-MM",
    minDate: "2016-10-01", //最小日期
    maxDate: "2099-12-31", //最大日期
    isTime: false,
    choosefun: function(elem, val) {
        echartsvm.buildHistoryDaily();
        echartsvm.buildHistoryDailyAppCount();
    },
    clearfun: function(elem, val) {
        echartsvm.buildHistoryDaily();
        echartsvm.buildHistoryDailyAppCount();
    },
    okfun: function(elem, val) {
        echartsvm.buildHistoryDaily();
        echartsvm.buildHistoryDailyAppCount();
    }
};
jeDate(mounth);
var year = {
    dateCell: '#inpyear',
    format: "YYYY",
    minDate: "2016-10-01", //最小日期
    maxDate: "2099-12-31", //最大日期
    isTime: false,
    choosefun: function(elem, val) {
        echartsvm.buildHistoryMonthly();
        echartsvm.buildHistoryMonthlyAppCount();
    },
    clearfun: function(elem, val) {
        echartsvm.buildHistoryMonthly();
        echartsvm.buildHistoryMonthlyAppCount();
    },
    okfun: function(elem, val) {
        echartsvm.buildHistoryMonthly();
        echartsvm.buildHistoryMonthlyAppCount();
    }
};
jeDate(year);


var echartsvm = avalon.define({
    $id: 'echartsvm',
    SIT1DailyArr: [],
    SIT2DailyArr: [],
    UATDailyArr: [],
    STRESSDailyArr: [],
    DailyArr: [],
    DailyOption: {
        title: {
            text: '过去一个月编译',
            x: 'center',
            textStyle: {
                fontSize: 18,
                fontWeight: 'bolder',
                color: '#333'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['SIT1', 'SIT2', 'UAT', 'STRESS'],
            x: 'right'
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
    SIT1MounthlyArr: [],
    SIT2MounthlyArr: [],
    UATMounthlyArr: [],
    STRESSMounthlyArr: [],
    MounthArr: [],
    MounthOption: {
        title: {
            text: '过去一年编译',
            x: 'center',
            textStyle: {
                fontSize: 18,
                fontWeight: 'bolder',
                color: '#333'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['SIT1', 'SIT2', 'UAT', 'STRESS'],
            x: 'right'
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
    conYear: "",
    buildHistoryMonthly: function() {
        var tempYear;
        if (echartsvm.conYear == "") {
            var searchDate = new Date();
            tempYear = searchDate.getFullYear();
        } else {
            tempYear = echartsvm.conYear;
        }
        zajax({
            url: "buildHistoryMonthly.action",
            type: "post",
            data: {
                year: tempYear
            },
            success: function(data) {
                if (data.retCode == 1000) {
                    echartsvm.SIT1MounthlyArr = data.sit1;
                    echartsvm.SIT2MounthlyArr = data.sit2;
                    echartsvm.UATMounthlyArr = data.uat;
                    echartsvm.STRESSMounthlyArr = data.stress;
                    for (i = 0; i < data.sit1.length; i++) {
                        echartsvm.MounthArr[i] = i + 1;
                    }
                    echartsvm.MounthOption.xAxis[0].data = echartsvm.MounthArr;
                    for (j = 0; j < echartsvm.MounthOption.series.length; j++) {
                        var envName = echartsvm.MounthOption.series[j].name;
                        switch (envName) {
                            case "SIT1":
                                echartsvm.MounthOption.series[j].data = echartsvm.SIT1MounthlyArr;
                                break;
                            case "SIT2":
                                echartsvm.MounthOption.series[j].data = echartsvm.SIT2MounthlyArr;
                                break;
                            case "UAT":
                                echartsvm.MounthOption.series[j].data = echartsvm.UATMounthlyArr;
                                break;
                            case "STRESS":
                                echartsvm.MounthOption.series[j].data = echartsvm.STRESSMounthlyArr;
                                break;
                        }

                    }

                    var mounthlyChart = echarts.init(document.getElementById('mounthlychart'));
                    mounthlyChart.setOption(echartsvm.MounthOption);

                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        })
    },
    SIT1MounthlyAppArr: [],
    SIT2MounthlyAppArr: [],
    UATMounthlyAppArr: [],
    STRESSMounthlyAppArr: [],
    buildHistoryMonthlyAppCount: function() {
        var tempYear;
        if (echartsvm.conYear == "") {
            var searchDate = new Date();
            tempYear = searchDate.getFullYear();
        } else {
            tempYear = echartsvm.conYear;
        }
        zajax({
            url: "buildHistoryMonthlyAppCount.action",
            type: "post",
            data: {
                year: tempYear
            },
            success: function(data) {
                if (data.retCode == 1000) {
                    echartsvm.SIT1MounthlyAppArr = data.sit1;
                    echartsvm.SIT2MounthlyAppArr = data.sit2;
                    echartsvm.UATMounthlyAppArr = data.uat;
                    echartsvm.STRESSMounthlyAppArr = data.stress;
                    for (i = 0; i < data.sit1.length; i++) {
                        echartsvm.MounthArr[i] = i + 1;
                    }
                    echartsvm.MounthOption.xAxis[0].data = echartsvm.MounthArr;
                    for (j = 0; j < echartsvm.MounthOption.series.length; j++) {
                        var envName = echartsvm.MounthOption.series[j].name;
                        switch (envName) {
                            case "SIT1":
                                echartsvm.MounthOption.series[j].data = echartsvm.SIT1MounthlyAppArr;
                                break;
                            case "SIT2":
                                echartsvm.MounthOption.series[j].data = echartsvm.SIT2MounthlyAppArr;
                                break;
                            case "UAT":
                                echartsvm.MounthOption.series[j].data = echartsvm.UATMounthlyAppArr;
                                break;
                            case "STRESS":
                                echartsvm.MounthOption.series[j].data = echartsvm.STRESSMounthlyAppArr;
                                break;
                        }

                    }

                    var mounthlyAppChart = echarts.init(document.getElementById('mounthlyAppchart'));
                    mounthlyAppChart.setOption(echartsvm.MounthOption);

                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        })
    },
    buildHistoryDaily: function() {
        var tempYear, tempMonth;
        if (echartsvm.conMonth == "") {
            var searchDate = new Date();
            tempYear = searchDate.getFullYear();
            tempMonth = searchDate.getMonth() + 1;
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

                    var dailyChart = echarts.init(document.getElementById('dailychart'));
                    dailyChart.setOption(echartsvm.DailyOption);

                } else {
                    alert(data.retMSG);
                }
            },
            error: function(data) {
                alert(data.retMSG);
            }
        })
    },
    SIT1MounthlyAppArr: [],
    SIT2MounthlyAppArr: [],
    UATMounthlyAppArr: [],
    STRESSMounthlyAppArr: [],
    buildHistoryDailyAppCount: function() {
        var tempYear, tempMonth;
        if (echartsvm.conMonth == "") {
            var searchDate = new Date();
            tempYear = searchDate.getFullYear();
            tempMonth = searchDate.getMonth() + 1;
        } else {
            tempDate = echartsvm.conMonth;
            tempYear = tempDate.split("-")[0];
            tempMonth = tempDate.split("-")[1];
        }
        zajax({
            url: "buildHistoryDailyAppCount.action",
            type: "post",
            data: {
                year: tempYear,
                month: tempMonth
            },
            success: function(data) {
                if (data.retCode == 1000) {
                    echartsvm.SIT1MounthlyAppArr = data.sit1;
                    echartsvm.SIT2MounthlyAppArr = data.sit2;
                    echartsvm.UATMounthlyAppArr = data.uat;
                    echartsvm.STRESSMounthlyAppArr = data.stress;
                    for (i = 0; i < data.sit1.length; i++) {
                        echartsvm.DailyArr[i] = i + 1;
                    }
                    echartsvm.DailyOption.xAxis[0].data = echartsvm.DailyArr;
                    for (j = 0; j < echartsvm.DailyOption.series.length; j++) {
                        var envName = echartsvm.DailyOption.series[j].name;
                        switch (envName) {
                            case "SIT1":
                                echartsvm.DailyOption.series[j].data = echartsvm.SIT1MounthlyAppArr;
                                break;
                            case "SIT2":
                                echartsvm.DailyOption.series[j].data = echartsvm.SIT2MounthlyAppArr;
                                break;
                            case "UAT":
                                echartsvm.DailyOption.series[j].data = echartsvm.UATMounthlyAppArr;
                                break;
                            case "STRESS":
                                echartsvm.DailyOption.series[j].data = echartsvm.STRESSMounthlyAppArr;
                                break;
                        }

                    }

                    var dailyAppChart = echarts.init(document.getElementById('dailyAppchart'));
                    dailyAppChart.setOption(echartsvm.DailyOption);

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
    echartsvm.buildHistoryDailyAppCount();
    echartsvm.buildHistoryMonthly();
    echartsvm.buildHistoryMonthlyAppCount();
    
})

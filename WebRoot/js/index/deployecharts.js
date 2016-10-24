var echartsvm = avalon.define({
    $id: 'echartsvm',
    option: {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['SIT', 'UAT', 'STRESS']
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
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: 'SIT',
            type: 'bar',
            stack: '按月统计',
            data: [120, 132, 101, 134, 90, 230, 210]
        }, {
            name: 'UAT',
            type: 'bar',
            stack: '按月统计',
            data: [220, 182, 191, 234, 290, 330, 310]
        }, {
            name: 'STRESS',
            type: 'bar',
            stack: '按月统计',
            data: [150, 232, 201, 154, 190, 330, 410]
        }]
    }

});

avalon.ready(function() {
    var myChart = echarts.init(document.getElementById('testchart'));
    myChart.setOption(echartsvm.option);
})

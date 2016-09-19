var mounthsChart = echarts.init(document.getElementById('mounthsChart'));
var mounthsOption = {
	title: {
		text: 'Jenkins历史12个月的编译数据',
		subtext: '数据来自后台服务Jenkins',
		sublink: 'http://serverci.better.ymatou.com/'
	},
	tooltip: {
		trigger: 'axis',
		backgroundColor: 'rgba(255,255,255,0.7)',
		axisPointer: {
			type: 'shadow'
		},
		formatter: function(params) {
			var res = '<div style="color:' + 'red' + '">';
			res += '<strong>' + params[0].name + '各环境编译次数</strong>'
			for (var i = 0, l = params.length; i < l; i++) {
				res += '<br/>' + params[i].seriesName + ' : ' + params[i].value
			}
			res += '</div>';
			return res;
		}
	},
	legend: {
		x: 'right',
		data: ['SIT1', 'UAT', 'STRESS']
	},
	calculable: true,
	xAxis: [{
		type: 'category',
		data: ['201603', '201603', '201604', '201605', '201606', '201607', '201608', '201609']
	}],
	yAxis: [{
		type: 'value'
	}],
	series: [{
		name: 'SIT1',
		type: 'bar',
		itemStyle: '#40e0d0',
		data: [1, 2, 3, 4, 5, 6, 7, 8]
	}, {
		name: 'UAT',
		type: 'bar',
		itemStyle: '#87cefa',
		data: [1, 2, 3, 4, 5, 6, 7, 8]
	}, {
		name: 'STRESS',
		type: 'bar',
		itemStyle: '#da70d6',
		data: [1, 2, 3, 4, 5, 6, 7, 8]
	}]
};
mounthsChart.setOption(mounthsOption);

var daysChart = echarts.init(document.getElementById('daysChart'));
var daysOption = {
	title: {
		text: 'Jenkins历史30天的编译数据',
		subtext: '数据来自后台服务Jenkins',
		sublink: 'http://serverci.better.ymatou.com/'
	},
	tooltip: {
		trigger: 'axis',
		backgroundColor: 'rgba(255,255,255,0.7)',
		axisPointer: {
			type: 'shadow'
		},
		formatter: function(params) {
			var res = '<div style="color:' + 'red' + '">';
			res += '<strong>' + params[0].name + '各环境编译次数</strong>'
			for (var i = 0, l = params.length; i < l; i++) {
				res += '<br/>' + params[i].seriesName + ' : ' + params[i].value
			}
			res += '</div>';
			return res;
		}
	},
	legend: {
		x: 'right',
		data: ['SIT1', 'UAT', 'STRESS']
	},
	calculable: true,
	xAxis: [{
		type: 'category',
		data: ['201603', '201603', '201604', '201605', '201606', '201607', '201608', '201609','201603', '201603', '201604', '201605', '201606', '201607', '201608', '201609','201603', '201603', '201604', '201605', '201606', '201607', '201608', '201609','201603', '201603', '201604', '201605', '201606', '201607', '201608', '201609','201603', '201603', '201604', '201605', '201606', '201607', '201608', '201609','201603', '201603', '201604', '201605', '201606', '201607', '201608', '201609', '201609', '201609', '201609']
	}],
	yAxis: [{
		type: 'value'
	}],
	series: [{
		name: 'SIT1',
		type: 'bar',
		itemStyle: '#40e0d0',
		data: [1, 2, 3, 4, 5, 6, 7, 8,1, 2, 3, 4, 5, 6, 7, 8,1, 2, 3, 4, 5, 6, 7, 8,1, 2, 3, 4, 5, 6, 7, 8, 6, 7, 8]
	}, {
		name: 'UAT',
		type: 'bar',
		itemStyle: '#87cefa',
		data: [1, 2, 3, 4, 5, 6, 7, 8,1, 2, 3, 4, 5, 6, 7, 8,1, 2, 3, 4, 5, 6, 7, 8,1, 2, 3, 4, 5, 6, 7, 8, 6, 7, 8]
	}, {
		name: 'STRESS',
		type: 'bar',
		itemStyle: '#da70d6',
		data: [1, 2, 3, 4, 5, 6, 7, 8,1, 2, 3, 4, 5, 6, 7, 8,1, 2, 3, 4, 5, 6, 7, 8,1, 2, 3, 4, 5, 6, 7, 8, 6, 7, 8]
	}]
};
daysChart.setOption(daysOption);
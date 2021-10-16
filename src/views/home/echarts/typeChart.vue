<template>
	<div id="type-chart" style="width:100%;height:260px;"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
	props: ['data'],
	data() {
		return {}
	},
	mounted() {
		const chartDom = document.getElementById('type-chart')
		const myChart = echarts.init(chartDom)
		console.log(myChart)
		const option = {
			tooltip: {
				trigger: 'item'
			},
			legend: {
				top: '5%',
				left: 'center'
			},
			series: [
				{
					name: 'Access From',
					type: 'pie',
					radius: ['40%', '70%'],
					avoidLabelOverlap: false,
					itemStyle: {
						borderRadius: 10,
						borderColor: '#fff',
						borderWidth: 2
					},
					label: {
						show: false,
						position: 'center'
					},
					emphasis: {
						label: {
							show: true,
							fontSize: '20',
							fontWeight: 'bold'
						}
					},
					labelLine: {
						show: false
					},
					data: this.data
				}
			]
		}
		option && myChart.setOption(option)
	}
}
</script>

<style>
</style>
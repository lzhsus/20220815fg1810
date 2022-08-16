import * as echarts from '../../utils/echart/echarts';
const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        ec: {},
        years:['2021','2020', '2019','2018','2017','2016','2015'],
        legend:[],
        series:[],
        series2:[],
        subject:1,//1文科 2理科
        province:''
    },
    onLoad (options) {
        this.setData({
            province:options.province
        })
    },
    changeSubjectclick(){
        this.data.subject = this.data.subject==1?2:1;
        let detail = this.data.canvasDatail;
        this.initChart(detail.canvas, detail.width, detail.height, detail.dpr, detail.wxNode)// 调用出初始化方法，进行echart初始化，重点在于传入的
    },
    getcollegeList(){   
        Api.collegeList({
            province:this.data.province
        }).then(res=>{
            if(res.success){
                res = res.result||{}
                let list = res.list||[]
                let legend = list.map(item=> { return item.type; })
                    legend = [...new Set(legend)];
                let series = []
                for(let i=0;i<legend.length;i++){
                    series.push({
                        name:legend[i],
                        type: 'line',       
                        smooth: false,
                        data:[],
                        data2:[],
                        data1:[]
                    })
                }
                let years = this.data.years||[]
                for(let i=0;i<series.length;i++){
                    let name = series[i].name;
                    let types = list.filter(item=>{ return name==item.type; })
                    for(let j=0;j<years.length;j++){
                        let yearArr = types.filter(item=>{ return years[j]==item.year; })
                        series[i].data.push(yearArr.length?yearArr[0].num01:0)
                        series[i].data1.push(yearArr.length?yearArr[0].num01:0)
                        series[i].data2.push(yearArr.length?yearArr[0].num02:0)
                    }
                }

                console.log(series)

                this.setData({
                    series:series,
                    legend:legend
                })
                let detail = this.data.canvasDatail;
                this.initChart(detail.canvas, detail.width, detail.height, detail.dpr, detail.wxNode)// 调用出初始化方法，进行echart初始化，重点在于传入的wxNode

            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    
    async echartBarInit({detail}){
        this.setData({
            canvasDatail:detail
        })
        console.log(detail)
        this.getcollegeList()
        // this.initChart(detail.canvas, detail.width, detail.height, detail.dpr, detail.wxNode)// 调用出初始化方法，进行echart初始化，重点在于传入的wxNode
    },
    initChart(canvas, width, height, dpr, wxNode) {
        //此方法中可以随意的使用this,可以愉快的动态赋值了
        console.log(this)
        const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr
        });
        canvas.setChart(chart);
        console.log(this.data.legend)
        let series = this.data.series
        for(let i=0;i<series.length;i++){
            if(this.data.subject==1) series[i].data = series[i].data1;
            if(this.data.subject==2) series[i].data = series[i].data2;
        }
        

        var option = { 
            title: {
                text: this.data.province+'-'+(this.data.subject==1?'文科':'理科'),
                left: 'center',
                top:16
            },
            xAxis: {
                type: 'category',
                data: this.data.years
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            legend: {
                data: this.data.legend,   
                bottom: 10,
            },
            yAxis: {
                type: 'value'
            },
            dataZoom: [
                {  
                    type: 'inside',  
                    show: true,  
                    xAxisIndex: [0],  
                    start: 0,//默认为1  
                    end: 100
                },
            ],
            grid: {  
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true,
            },
            series: series
        };
        chart.setOption(option);
        // 对传入的wxNode进行chart赋值，
        // 与常规的return chart不一样，此方式下return后没有实际意义
        wxNode.chart = chart;
        // return chart
        this.setData({
            subject:this.data.subject
        })
    },
    onShow: function () {

    },
})
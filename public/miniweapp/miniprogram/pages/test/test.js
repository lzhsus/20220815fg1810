const Api = require('../../services/api/index');
import * as echarts from '../../utils/echart/echarts';
import * as common from '../../common/common';
let wxNode = null,
    chart = null;
import moment from '../../utils/moment.min';
import {
    setShareImgLink,
    uploadFiles
} from '../../services/uploadFile.js';

import UdeskD from '../../utils/ud-sdk'
Page({
    data: {
        ec: {},
        canvasWidth: 1,
        canvasHeight: 1,
        url:''
    },
    async onLoad(options) {
        wx.showNavigationBarLoading({
            success:(res)=>{
                console.log('res',res)
                setTimeout(()=>{
                    wx.hideNavigationBarLoading()
                },5000)
            },
            fail:(fail)=>{
                console.log('fail',fail)
            }
        })
        wx.hideHomeButton()
        // Api.cloud_userInfo().then(res=>{
        //     if(res['success']){
        //         console.log(res)
        //     }else{

        //     }
        // })
        // wx.cloud.callFunction({
        //     name:"subscribeMessage"
        // })
        // common.compressImage()
        // this.downloadFile()
    },
    downloadFile() {
        Api.proPetList({
            type:4,
        }).then(async res=>{
            if(res['success']){
                res = res.result||{}
                let list = res.list||[]
                console.log(list.length)
                list = list.filter(item=>{ return !item.img_url })
                for(let i=0;i<list.length;i++){
                    let item = await common.downloadFile(list[i].coverURL);
                    if(item.success){
                        var images = await uploadFiles([item.path], 'pet')
                        await Api.fieldUpdata({
                            _id:list[i]._id,
                            name:"pet_list",
                            updataImage:true,
                            img_url:images[0].fileID.replace("cloud://lzhsus-1g4h29bs69c66542.6c7a-lzhsus-1g4h29bs69c66542-1301447037/","https://6c7a-lzhsus-1g4h29bs69c66542-1301447037.tcb.qcloud.la/")
                        })
                    }
                }
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                  })
            }
        })
        // 
    },
    openClick() {
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: async (res) => {
                // tempFilePath可以作为img标签的src属性显示图片
                let tempFilePaths = res.tempFilePaths
                tempFilePaths = tempFilePaths.map(item => {
                    return {
                        url: item
                    }
                })
                console.log('压缩前》》', tempFilePaths[0].url)

                let list = await common.compressImage(tempFilePaths);
                if (list.some(item => {
                        return !item.success
                    })) {
                    list = await common.compressImage(tempFilePaths, true);
                }


                wx.showShareImageMenu({
                    path: list[0].url,
                    fail: (res) => {
                        console.log(res)
                        if (res.errMsg.indexOf('deny') != -1 || res.errMsg.indexOf('denied') != -1) {
                            wx.showToast({
                                title: '保存相册失败，请设置权限！',
                                icon: 'none',
                                duration: 2000,
                            })
                            this.settingShow = true;
                            this.settingType = 'scope.writePhotosAlbum';
                        } else {
                            wx.showToast({
                                title: '保存相册失败，请重试！',
                                icon: 'none',
                                duration: 2000,
                            });
                        }
                    }
                });
                console.log('压缩后》》', list[0].url)
            }
        })
    },
    async echartBarInit({
        detail
    }) {
        wxNode = detail.wxNode;
        chart = null;
        chart = echarts.init(detail.canvas, null, {
            width: detail.width,
            height: detail.height,
            devicePixelRatio: detail.dpr
        });
        detail.canvas.setChart(chart);
    },
    initChart(values, times) {
        console.log('chart', chart)
        if (chart == null) {
            setTimeout(res => {
                this.initChart(seriesData)
            }, 500);
            return;
        }
        var option = {
            color: ['yellow'],
            xAxis: [{
                data: times.map(res => {
                    return Object.assign({}, {
                        value: res,
                        textStyle: {
                            color: "#ffffff"
                        }
                    })
                }),
                axisTick: {
                    show: false,
                    opacity: 0,
                    lineStyle: {
                        opacity: 0,
                        color: "red"
                    }
                }
            }],
            yAxis: [{
                show: false,
                type: 'value',
            }],
            series: [{
                type: 'line',
                areaStyle: {},
                data: values,
                nameTextStyle: {
                    color: "#ffffff"
                }
            }]
        };
        chart.setOption(option);
        wxNode.chart = chart;
    },
    async onShow() {
        // let res = {}
        // let list = res.result.petFamilyList;
        // console.log(list);
        // for(let i=0;i<list.length;i++){
        //     if(i==0) continue
        //     await Api.wxServerApiUpdata({
        //         name:"pet_list",
        //         data:Object.assign(list[i],{
        //             type:4
        //         })
        //     })
        // }
    },
})
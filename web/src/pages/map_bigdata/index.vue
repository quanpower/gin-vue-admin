<template>
    <div id="index">
        <dv-full-screen-container class="bg">
            <div class="dataweather">
                <div>
                    {{dataWeather.city}}
                    {{dataWeather.weathertemp}}
                    <img :src="dataWeather.icontemp" alt="">
                    {{dataWeather.peraturetemp}}
                </div>
            </div>
            <div class="datatime">
                <span>
                    {{dataTime.dateYear}} {{dataTime.dateWeek}} {{dataTime.dateDay}}
                </span>
            </div>
            <dv-loading v-if="loading">Loading...</dv-loading>
            <div v-else class="host-body">
                <top-header/>
                <div class="body-box">
                    <div class="content-box info-four">
                        <div>
                            <dv-border-box-8 class="bg-color-black" style="height: 1rem;padding: .2rem;">
                                <div class="topNumber">
                                    <top-number/>
                                    <top-number/>
                                </div>
                            </dv-border-box-8>
                        </div>
                        <div>
                            <dv-border-box-10 style="height: 1rem">
                                <center-form/>
                            </dv-border-box-10>
                        </div>
                        <div>
                            <dv-border-box-8 :reverse="true" class="bg-color-black"
                                             style="height: 1rem;padding: .2rem;">
                                <div class="topNumber topNumberRotate">
                                    <top-number/>
                                    <top-number/>
                                </div>
                            </dv-border-box-8>
                        </div>
                    </div>

                    <div class="content-box">
                        <div>
                            <dv-border-box-12>
                                <left-level :areaData="areaData"/>
                            </dv-border-box-12>
                            <dv-border-box-10>
                                <left-loops/>
                            </dv-border-box-10>
                        </div>
                        <div>
                            <dv-border-box-11 :title="chinaMapTitle">
                                <!--echarts地图-->
                                    <china
                                            @map-change="mapClick"
                                            @back-change="backClick"
                                    />
                                <!--高德地图-->
                                <!--<china-gaode/>-->
                            </dv-border-box-11>
                        </div>
                        <div>
                            <dv-border-box-13>
                                <right-province/>
                            </dv-border-box-13>
                            <dv-border-box-12>
                                <right-county/>
                            </dv-border-box-12>
                        </div>
                    </div>
                </div>
            </div>

        </dv-full-screen-container>
    </div>
</template>

<script>
    import {formatTime} from '@/utils/index2.js'
    import topHeader from "./topHeader"
    import topNumber from "./topNumber"
    import centerForm from "./centerForm"
    import leftLevel from "./leftLevel"
    import leftLoops from "./leftLoops"
    import china from "./china"
    import chinaGaode from "./chinaGaode"
    import rightProvince from "./rightProvince"
    import rightCounty from "./rightCounty"

    import {weatherOption} from '@/config/weatherOption'
    import axios from 'axios'
    import $ from "jquery"

    export default {
        name: "index",
        components: {
            topHeader,
            topNumber,
            centerForm,
            leftLevel,
            leftLoops,
            china,
            // chinaGaode,
            rightProvince,
            rightCounty,
        },
        data() {
            return {
                loading: true,
                dataTime: {
                    dateDay: null,
                    dateYear: null,
                    dateWeek: null,
                    weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                },
                dataWeather: {
                    city: '北京市',
                    dayweather: '晴',
                    nightweather: '多云',
                    weathertemp: '晴', // 根据时间判断选白天还是晚上的天气
                    nighttemp: '3℃',
                    daytemp: '15℃',
                    peraturetemp: '3℃~15℃', // 根据时间判断选白天还是晚上的温度
                    icontemp: 'https://cdn.heweather.com/cond_icon/100.png',
                },
                areaData: {
                    areaCode: "000000",
                    areaLevel: "county",
                    name: "中国",
                    areaName: "中国",
                },
            };
        },
        computed: {
            chinaMapTitle() {
                let areaName = this.areaData.areaName;
                if (areaName === 'china') {
                    areaName = '全国'
                }
                return areaName;
            }
        },
        created() {
            this.getDateTime();
            this.cancelLoading();
            this.requestGetWeather();
        },
        mounted() {

        },
        methods: {
            // 获取时间
            getDateTime() {
                setInterval(() => {
                    this.dataTime.dateYear = formatTime(new Date(), 'yyyy-MM-dd');
                    this.dataTime.dateWeek = this.dataTime.weekday[new Date().getDay()];
                    this.dataTime.dateDay = formatTime(new Date(), 'HH: mm: ss');
                }, 1000)
            },
            // 获取天气
            requestGetWeather() {

                // axios.get('https://api.asilu.com/weather_v2/')
                //     .then(res => {
                //             console.log('====1111===')
                //             console.log(res)
                //             if (res.status == 200) {
                //                 if (res.data.code == 0) {
                //                     // 已登录   
                //                     let currTime = new Date().getHours();
                //                     let dailyForecast = data.forecasts[0].casts[0];
                //                     let city = data.forecasts[0].city;
                //                     let daytemp = dailyForecast.daytemp + '℃';
                //                     let nighttemp = dailyForecast.nighttemp + '℃';
                //                     let weathertemp = '';
                //                     let peraturetemp = '';
                //                     if ((currTime >= 6) && (currTime < 18)) {
                //                         weathertemp = dailyForecast.dayweather;
                //                         peraturetemp = dailyForecast.nighttemp + "℃~" + dailyForecast.daytemp + "℃";
                //                     } else {
                //                         weathertemp = dailyForecast.nightweather;
                //                         peraturetemp = dailyForecast.daytemp + "℃~" + dailyForecast.nighttemp + "℃";
                //                     }
                //                     let icontemp = 'https://cdn.heweather.com/cond_icon/' + weatherOption.weatherCode[weathertemp] + '.png';
                //                     this.dataWeather = {city, daytemp, nighttemp, weathertemp, peraturetemp, icontemp}
                //                         }

                //                 }

                //             }
                //         )

                $.get({
                    //这里的url不能写到data对象的外面
                    url: 'https://api.asilu.com/weather_v2/',
                    dataType: 'jsonp',  // 请求方式为jsonp
                    success: (data) => {
                        if (data.status === '1') {
                            let currTime = new Date().getHours();
                            let dailyForecast = data.forecasts[0].casts[0];
                            let city = data.forecasts[0].city;
                            let daytemp = dailyForecast.daytemp + '℃';
                            let nighttemp = dailyForecast.nighttemp + '℃';
                            let weathertemp = '';
                            let peraturetemp = '';
                            if ((currTime >= 6) && (currTime < 18)) {
                                weathertemp = dailyForecast.dayweather;
                                peraturetemp = dailyForecast.nighttemp + "℃~" + dailyForecast.daytemp + "℃";
                            } else {
                                weathertemp = dailyForecast.nightweather;
                                peraturetemp = dailyForecast.daytemp + "℃~" + dailyForecast.nighttemp + "℃";
                            }
                            let icontemp = 'https://cdn.heweather.com/cond_icon/' + weatherOption.weatherCode[weathertemp] + '.png';
                            this.dataWeather = {city, daytemp, nighttemp, weathertemp, peraturetemp, icontemp}
                        }
                    }
                })
            },
            cancelLoading() {
                setTimeout(() => {
                    this.loading = false;
                }, 500);
            },
            mapClick(data) {
                this.areaData = data;
            },
            backClick(data) {
                this.areaData = data;
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/index.scss';

    #index {
        .dv-border-box-10, .dv-border-box-12, .dv-border-box-13, {
            height: inherit;
        }

        .dataweather {
            z-index: 999;
            position: absolute;
            top: .2rem;
            left: 1.1rem;
            font-size: .22rem;
            color: #fff;

            img {
                width: .3rem;
                height: .3rem;
                filter: brightness(3);
                vertical-align: bottom;
            }
        }

        .datatime {
            z-index: 999;
            position: absolute;
            top: .2rem;
            right: 1.1rem;
            font-size: .22rem;
            color: #fff;
        }

        .topNumber {
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center
        }

    }

</style>
